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
    }
}, { timestamps: true })

const WishList = mongoose.model('wishList', wishListSchema);