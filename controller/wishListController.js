const WishList = require('../model/wishListModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addToWishList = catchAsync(async (req, res, next) => {
    req.body.wishList = req.user.id
    const wishList = await WishList.create(req.body)

    res.status(201).json({
        status: 'success',
        data: wishList
    })
})

