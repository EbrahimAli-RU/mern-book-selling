const mongooose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongooose.Schema({
    bookName: {
        type: String,
        required: [true, `A book must have a name.`],
        trim: true
    },
    authorName:
    {
        type: String,
        required: [true, `A book Must have Author.`],
        trim: true
    },
    edition: {
        type: String,
        trim: true,
    },
    publication: {
        type: String,
        trim: true
    },
    numberOfPage: {
        type: Number,
        required: [true, 'Please provide Number of page']
    },
    missingPage: String,
    seller: {
        division: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        distict: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        subDistict: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        name: {
            type: String
        },
        mobile: {
            type: String
        },
    },
    language: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    coverphoto: {
        type: String,
        default: 'default.jpeg'
    },
    owner: String,
    photo: String,
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