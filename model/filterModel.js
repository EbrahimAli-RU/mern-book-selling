const mongoose = require('mongoose')

const filterSchema = new mongoose.Schema({
    allArea: [{
        type: String,
        required: true,
        lowercase: true
    }],
    area: {
        type: String,
        required: [true, 'This field is required'],
        lowercase: true
    },
    filterType: {
        type: String,
        required: true,
        lowercase: true
    }
})

const Filter = mongoose.model('filter', filterSchema)

module.exports = Filter;