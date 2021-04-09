const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.route('/signup').post(authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetpassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.patch('/updateMe',
    authController.protect,
    userController.uploadPhoto,
    userController.resizeUserPhoto,
    userController.updateMe);

router.post('/addWishList', authController.protect, userController.addWishList);
router.post('/updatewishlist', authController.protect, userController.updateWishList)
router.get('/wishList', authController.protect, userController.getWishList);

module.exports = router;