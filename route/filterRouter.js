const express = require('express');
const router = express.Router();

const FilterController = require('../controller/filterController')

router.route('/').
    post(FilterController.addFilterData).
    get(FilterController.getFilterData)

module.exports = router