const crypto = require('crypto');
const mongoose = require('mongoose');
const PhoneNumber = require('awesome-phonenumber');
const validator = require('validator');
const bcrtptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Required'],
        minlength: [8, `Password length would be at least 8`],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return this.password === value
            },
            message: 'Confirm password is not same as password'
        }
    },
    wishList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'book'
    }],
    photo: String,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrtptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;
    next();
})

userSchema.methods.passwordChangedAfter = async function (JWTtimeStamp) {

    if (this.passwordChangeAt) {
        const passwordChangeAtTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000);
        return JWTtimeStamp < passwordChangeAtTimeStamp;
    }

    return false;
}


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrtptjs.compare(candidatePassword, userPassword);
}


userSchema.methods.createpasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire = Date.now() + 5 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model('user', userSchema);
module.exports = User;



// userSchema.pre('save', function(next) {
//     const regionCode = PhoneNumber.getRegionCodeForCountryCode( 880 );
//         const pn = PhoneNumber( this.phone, regionCode );
//         if(pn.isValid()) {
//             this.phone = this.phone
//             next();
//         } else {
//             this.phone = undefined
//             console.log('ERRor')
//         }
// })