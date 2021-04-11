const multer = require('multer');
const sharp = require('sharp');

const Book = require('./../model/bookModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// const { delete } = require('../route/bookRouter');


//In case you don't need to process photo before save to DB you
//Can directly save to Database

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/coverPhoto');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `Coverphoto-${req.user.id}-${Date.now()}.${ext}`);
//     }
// })


//If you need to process before save to DB
const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError(`Not an image! please upload an image`, 400), false)
    }
}

const upload = multer({
    storage,
    fileFilter: multerFilter
})

// For single photo and access req.file
// exports.uploadCoverPhoto = upload.single('coverPhoto');
exports.uploadCoverPhoto = upload.fields([
    { name: 'coverphoto', maxCount: 1 },
    { name: 'photos', maxCount: 3 }
])

exports.resizeCoverPhoto = catchAsync(async (req, res, next) => {
    // 1. Cover photo
    if (!req.files.coverphoto || !req.files.photos) return next();
    const imageCover = `Coverphoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.files.coverphoto[0].buffer)
        .resize(400, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/book/${imageCover}`);
    req.body.coverphoto = imageCover

    // 2. photos
    req.body.photos = [];
    await Promise.all(req.files.photos.map(async (el, i) => {
        const fileName = `otherBookphoto-${req.user.id}-${Date.now()}-${i}.jpeg`
        await sharp(req.files.photos[i].buffer)
            .resize(400, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/book/${fileName}`);

        req.body.photos.push(fileName);
        // req.body.photos = fileName
    }))
    next();
})

exports.createBook = catchAsync(async (req, res, next) => {
    req.body.owner = req.user.id
    console.log(req.files)
    const book = await Book.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.ownBook = catchAsync(async (req, res, next) => {
    console.log(req.params.userId)
    const books = await Book.find({ owner: req.params.userId });
    res.status(200).json({
        status: 'success',
        data: {
            length: books.length,
            books
        }
    })
})



exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!(book)) {
        return next(new AppError(`Page not found`, 404));
    }
    res.status(201).json({
        status: 'success',
        data: {
            book: null
        }
    })
})

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body,
        { new: true, runValidators: true });
    if (!book) {
        return next(new AppError(`Page not found`, 404));
    }
    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.getBooks = catchAsync(async (req, res, next) => {
	console.log(req.query)
    let gg = `/^${req.query.slug}/i`
    gg = eval(gg)
    let queryObj = { ...req.query }
    const excludedField = ['sort', 'slug'];
    excludedField.forEach(el => delete queryObj[el]);
    queryObj = { ...queryObj, slug: { $regex: gg } }
    bookQuery = Book.find(queryObj)
        .select('bookName coverphoto price slug division distict subDistict');
    //Sort by price 
    if (req.query.sort) {
        bookQuery = bookQuery.sort(req.query.sort);
    }
    const books = await bookQuery;
    res.status(200).json({
        status: 'success',
        data: {
            result: books.length,
            books
        }
    })
})

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.bookId).populate({
        path: 'owner',
        select: '-__v -passwordChangeAt -role'
    });
    if (!book) {
        return next(new AppError(`Page not found`, 404));
    }
    res.status(200).json({
        status: 'success',
        data: book
    })
})