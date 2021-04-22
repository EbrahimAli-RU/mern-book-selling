const mongooose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongooose.Schema({
    bookName: {
        type: String,
        required: [true, `Book name is required`],
        trim: true
    },
    authorName:
    {
        type: String,
        required: [true, `Author name is required`],
        trim: true
    },
    edition: {
        type: String,
        trim: true,
        required: [true, `Edition is required`],
    },
    publication: {
        type: String,
        trim: true,
        required: [true, `Publication is required`],
    },
    numberOfPage: {
        type: Number,
        min: [0, 'Page must be greater than 0'],
        required: [true, `Page number is required`],
    },
    missingPage: {
        type: String,
        required: [true, `Missing page is required`],
    },
    // seller: {

    // },
    region: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, `Region is required`],
    },
    city: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, `City is required`],
    },
    area: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, `Area is required`],
    },
    name: {
        type: String,
        required: [true, `Name is required`],
    },
    mobile: {
        type: Number,
        required: [true, `Mobile is required`],
    },
    language: {
        type: String,
        enum: ['English', 'Bangla'],
        required: [true, `Language is required`],
    },
    price: {
        type: Number,
        min: [0, 'price Must be greater than 0'],
        required: [true, `Price is required`],
    },
    coverphoto: {
        type: String,
        default: 'default.jpeg',
        required: [true, `This field is required`],
    },
    owner: String,
    photos: [{
        type: String,
        default: 'default.jpeg',
        required: [true, `This field is required`],
    }],
    slug: String
})

bookSchema.pre('save', function () {
    this.slug = this.bookName.toLowerCase();
})

// bookSchema.pre('save', function(req, res) {
//     console.log(req.user);
//     this.owner = req.user._id
// })

const Book = mongooose.model('book', bookSchema);
module.exports = Book;