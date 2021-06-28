const Filter = require('../model/filterModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addFilterData = catchAsync(async (req, res, next) => {
    const filterdata = await Filter.create(req.body);

    res.status(201).json({
        status: 'success',
        data: filterdata
    })
})

exports.getFilterData = catchAsync(async (req, res, next) => {
    const data = await Filter.find(req.query);

    res.status(200).json({
        status: 'success',
        data
    })

})

exports.updateFilter = catchAsync(async (req, res, next) => {
    const data = await Filter.findByIdAndUpdate(req.params.filterId, req.body,
        { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data
    })

})
exports.deleteFilter = catchAsync(async (req, res, next) => {
    const data = await Filter.findByIdAndDelete(req.params.filterId);

    res.status(200).json({
        status: 'success',
        data
    })

})