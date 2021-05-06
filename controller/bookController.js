const multer = require('multer');
const sharp = require('sharp');

const Book = require('./../model/bookModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
exports.uploadBookPhotos = upload.fields([
    { name: 'coverphoto', maxCount: 1 },
    { name: 'photos', maxCount: 3 }
])
const coverPhotoUploader = async (req) => {
    req.body.coverphoto = `Coverphoto-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.files.coverphoto[0].buffer)
        .resize(400, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/book/${req.body.coverphoto}`);
}

const otherPhotoUploader = async (req) => {
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
}

exports.resizeBookPhotos = catchAsync(async (req, res, next) => {

    if (!req.files.coverphoto && !req.files.photos) return next(new AppError('Please Upload Images!', 400));
    // 1. Cover photo
    await coverPhotoUploader(req)
    // 2. photos
    await otherPhotoUploader(req)
    next();
})

exports.resizeBookPhotoForUpdate = catchAsync(async (req, res, next) => {
    if (req.files.coverphoto && req.files.photos) {
        await coverPhotoUploader(req);
        await otherPhotoUploader(req);
        next();
    } else if (req.files.coverphoto) {
        await coverPhotoUploader(req);
        next()
    } else if (req.files.photos) {
        await otherPhotoUploader(req);
        next()
    } else {
        next();
    }
})

exports.createBook = catchAsync(async (req, res, next) => {
    req.body.owner = req.user.id
    console.log(req.body)
    const book = await Book.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.ownBook = catchAsync(async (req, res, next) => {
    const books = await Book.find({ owner: req.params.userId })
        .select('bookName coverphoto price');
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
    console.log(req.body)
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
    const book = await Book.findById(req.params.bookId)
    if (!book) {
        return next(new AppError(`Page not found`, 404));
    }
    res.status(200).json({
        status: 'success',
        data: book
    })
})