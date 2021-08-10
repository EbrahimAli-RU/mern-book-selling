const AppError = require('./../utils/appError');

const devEnvironment = (err, res) => {
    res.status(err.statusCode).json({
        name: err.name,
        status: err.status,
        message: err.message,
        error: err,
        Stack: err.stack
    })
}

const prodEnvironment = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            name: err.name,
            status: err.status,
            message: err.message,
            error: err,
            Stack: err.stack
        })
    } else {
        res.status(err.statusCode).json({
            // status: 'error',
            // message: 'Something went wrong.'
            name: err.name,
            status: err.status,
            message: err.message,
            error: err,
            Stack: err.stack
        })
    }

}

const duplicateKeyHandler = err => {
    if (err.keyPattern.user === 1 & err.keyPattern.bookId === 1) {
        return new AppError(`Already in Your Wishlist :)`, 400);
    } else {
        let x;
        let txt = "";
        const duplicateKeys = Object.keys(err.keyValue);
        for (x in duplicateKeys) {
            txt += duplicateKeys[x] + ' ';
        }
        return new AppError(`${txt} has been taken.`, 400);
    }

}

const validationErrorHandler = err => {
    const message = err.message.split(':')[2]
    return new AppError(`${message}`, 400);
}

const invalidTokenHandler = err => {
    return new AppError(`${err.message}, Please login again!`, 401);
}

const expireTokenHandler = err => {
    return new AppError(`You are not logged in, please login again!`, 401);
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        devEnvironment(err, res);
    }
    if (process.env.NODE_ENV === 'production') {

        if (err.code === 11000) {
            console.log('11000')
            err = duplicateKeyHandler(err)
        }
        if (err.name === 'ValidationError') {
            console.log('CHECK')
            err = validationErrorHandler(err);
        }
        if (err.name === 'JsonWebTokenError') {
            err = invalidTokenHandler(err);
        }
        if (err.name === 'TokenExpiredError') {
            err = expireTokenHandler(err);
        }

        prodEnvironment(err, res);
    }

}