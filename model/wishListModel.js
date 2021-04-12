const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true })

const wishList = mongoose.model('wishList', wishListSchema);

module.exports = wishList