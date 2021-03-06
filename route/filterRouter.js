const express = require('express');
const router = express.Router();

const FilterController = require('../controller/filterController')
const authController = require('../controller/authController');

router.route('/').
    post(authController.protect, authController.restrictTo('admin'), FilterController.addFilterData).
    get(FilterController.getFilterData)

router.use(authController.protect, authController.restrictTo('admin'))
router.route('/:filterId')
    .patch(FilterController.updateFilter)
    .delete(FilterController.deleteFilter)

module.exports = router