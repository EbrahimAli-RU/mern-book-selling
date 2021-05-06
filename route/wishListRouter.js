const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('../controller/authController');
const wishListController = require('../controller/wishListController');

router.use(authController.protect);

router.route('/')
    .post(authController.protect, wishListController.addToWishList)

router.route('/:userId').get(wishListController.getWishList)

router.route('/:wishListId')
    .delete(wishListController.deleteFromWishList)


module.exports = router