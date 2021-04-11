const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const wishListController = require('../controller/wishListController');

router.use(authController.protect);

router.route('/')
    .post(wishListController.addToWishList)
    .get(wishListController.getWishList)

router.delete('/')
    .delete(wishListController.deleteFromWishList)


module.exports = router