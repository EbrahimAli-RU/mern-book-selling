const path = require('path');
const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const app = express();

const bookRoute = require('./route/bookRouter')
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./route/userRouter')
const AppError = require('./utils/appError');
const filterRoute = require('./route/filterRouter');

//GLOBAL MIDDLEWARE
//API REQUEST LIMITING TO PREVENT HEAVEY REQUEST 
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'To many request! please try later 1 hour later :('
})

app.use('/api', limiter)

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static(path.join(__dirname + '/public/CoverPhoto')));
app.use(express.static(path.join(__dirname + '/public/book')));

//ROUTES
app.use('/api/v1/book', bookRoute);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/filter', filterRoute);

//ERROR HANDLER
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
})

app.use(globalErrorHandler);


module.exports = app