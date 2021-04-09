const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
    console.log(err);
    console.log(err.name, err.message);
    console.log(`UNCAUGHT EXCEPTION`);
    process.exit(1);
})

const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const Book = require('./model/bookModel');
const bookRoute = require('./route/bookRouter')
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./route/userRouter')
const AppError = require('./utils/appError');
const filterRoute = require('./route/filterRouter');

//Connect database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>
    console.log(`DB connection Successfull`))
    .catch(err => {
        console.log(err)
        console.log(`Fail to connect DB`)
    })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static(path.join(__dirname + '/public/CoverPhoto')));
app.use(express.static(path.join(__dirname + '/public/book')));

// app.use( function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-requested-With");

//     next();
// })

app.use('/api/v1/book', bookRoute);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/filter', filterRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
})

app.use(globalErrorHandler);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listing on port ${port}`);
})

process.on('unhandledRejection', err => {
    console.log(`UNHANDLEDREJECTION`);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
})

