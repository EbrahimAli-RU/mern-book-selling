const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

//Creating JWT token
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIREIN });
}

exports.signup = catchAsync(async (req, res, next) => {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
        return next(new AppError('This Email is in used! Please try another one', 404))
    }
    const user = await User.create(req.body);
    const token = signToken(user._id);
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true
    }
    if (process.env.ENVIRONMENT === 'development') cookieOption.secure = false;
    res.cookie('jwt', token, cookieOption)
    console.log(res)
    res.status(201).json({
        status: 'success',
        data: {
            user,
            token
        }
    })
})



exports.signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError(`Please provide email and password`, 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError(`Invalid email or Password`, 401));
    }
    const token = signToken(user._id)
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
        // secure: false,
        httpOnly: false
    }
    if (process.env.ENVIRONMENT === 'development') cookieOption.secure = false
    res.cookie('jwt', token, cookieOption)
    res.status(201).json({
        status: 'success',
        data: {
            user: {
                _id: user._id
            },
            token
        }
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token, to = true;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        to = false
    }
    if (to || token === 'null') {
        return next(new AppError(`You are not logged in,Please login`, 401));
    }

    // Verify token is it valid or not
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const loggedInUser = await User.findById(decoded.id);
    if (!loggedInUser) {
        return next(new AppError('The user belonging to this token does not exist', 401));
    }

    if (await loggedInUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError(`You have recently changed your password, please log in again`, 401));
    }
    req.user = loggedInUser;
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`you don't have permission to perform this action`, 403))
        }

        next();
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError(`There is no user with this email`, 404));
    }
    // 2. Generate the random posted token
    const resetToken = user.createpasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3. send Email to user
    const url = `${req.protocol}://${req.get('host')}/api/v1/user/forgotPassword/${resetToken}`;
    const message = `Click below the link to set password`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Please set the password within 5 minutes',
            text: message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpire = undefined
        await user.save({ validateBeforeSave: false });

        return next(new AppError(`There is an error sending email, please try again later`, 500))
    }

})

exports.resetpassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new AppError(`Token is invalid or expired`, 400))
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        data: {
            token
        }
    })

})

exports.updatePassword = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
        return next(new AppError(`Your current password is worng`, 401));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        data: {
            token
        }
    })
})