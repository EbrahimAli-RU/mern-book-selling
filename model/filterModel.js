const mongoose = require('mongoose')

const filterSchema = new mongoose.Schema({
    allArea: [String],
    area: {
        type: String,
        required: [true, 'This field is required']
    }
})

const Filter = mongoose.model('filter', filterSchema)

module.exports = Filter;