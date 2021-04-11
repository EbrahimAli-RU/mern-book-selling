const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const wishListController = require('../controller/wishListController');

router.route('/')
    .post(authController.protect, wishListController.addToWishList)


module.exports = router