const path = require('path');
const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const app = express();

const bookRoute = require('./route/bookRouter')
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./route/userRouter')
const AppError = require('./utils/appError');
const filterRoute = require('./route/filterRouter');

//GLOBAL MIDDLEWARE
//SET SEQUERTY HTTP HEADER
// app.use(helmet())
//API REQUEST LIMITING TO PREVENT HEAVEY REQUEST 
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'To many request! please try later 1 hour later :('
})

app.use('/api', limiter)
//BODY PARSER, READING DATA FROM BODY
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }))

//DATA SANITIZE AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize())

//DATA SANITIZE AGAINST XSS
app.use(xss())

//CORE
app.use(cors());
app.use(cookieParser())

//PREVENT PARAMETER POLUTION
app.use(hpp())
//SERVING STATIC FILE
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/CoverPhoto')));
app.use(express.static(path.join(__dirname + '/public/book')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

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