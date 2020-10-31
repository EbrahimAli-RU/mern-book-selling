const multer = require('multer')
const sharp = require('sharp')
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError(`Not an image! please upload an image`, 400), false)
    }
}

const upload = multer({
    storage,
    fileFilter: multerFilter
})

exports.uploadPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.body.photo = `UserPhoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/userPhoto/${req.body.photo}`);
    next();
})

const fObj = (obj, ...allowedFiled) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFiled.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj;
}
exports.updateMe = catchAsync(async (req, res, next) => {
    const filterObj = fObj(req.body, 'firstName', 'lastName', 'photo')
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj, { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedUser
        }
    })
})

exports.addWishList = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.wishList.length >= 19) {
        return next(new AppError(`You can't add more than 20 books to your wishList`, 400));
    }
    const isIncluded = user.wishList.includes(req.body.id)
    if (isIncluded) {
        return next(new AppError('Already added to your WishList', 400))
    }
    console.log(isIncluded);
    user.wishList.push(req.body.id)
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        message: 'Successfully added to wishList'
    })
})

exports.getWishList = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
        path: 'wishList',
    })
    const wishList = user.wishList;
    res.status(200).json({
        data: {
            result: user.wishList.length,
            wishList
        }
    })
})