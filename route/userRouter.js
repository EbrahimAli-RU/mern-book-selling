const express = require('express');
const router = express.Router();

const wishlistRouter = require('./wishListRouter')
const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.use('/wishlist', wishlistRouter)

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


module.exports = router;