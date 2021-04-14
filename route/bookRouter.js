const express = require('express');
const router = express.Router();

const bookController = require('./../controller/bookController');
const authController = require('./../controller/authController');

router.route('/')
    .post(
        authController.protect,
        bookController.uploadBookPhotos,
        bookController.resizeBookPhotos,
        bookController.createBook)
    .get(bookController.getBooks);

router.route('/:userId/ownBooks')
    .get(bookController.ownBook);

router.route('/:bookId')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(authController.protect, bookController.deleteBook);

module.exports = router;