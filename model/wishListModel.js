const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    // title: {
    //     type: String,
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // photo: {
    //     type: String,
    //     required: true
    // },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'book',
        required: true
    }
}, { timestamps: true })

wishListSchema.index({ user: 1, bookId: 1 }, { unique: true })

const wishList = mongoose.model('wishList', wishListSchema);

module.exports = wishList