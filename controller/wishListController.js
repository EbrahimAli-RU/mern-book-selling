const WishList = require('./../model/wishListModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addToWishList = catchAsync(async (req, res, next) => {

    req.body.user = req.user.id
    console.log('CHECK', req.user.id, req.body)
    const data = await WishList.create(req.body)

    res.status(201).json({
        status: 'success',
        data: data
    })
})

exports.getWishList = catchAsync(async (req, res, next) => {

    const wishLists = await WishList.find({ user: req.user.id });

    res.status(200).json({
        status: 'success',
        data: wishLists
    })
})

exports.deleteFromWishList = catchAsync(async (req, res, next) => {
    const wishList = await WishList.findByIdAndDelete(req.params.wishListId)

    res.status(204).json({
        status: 'success'
    })
})