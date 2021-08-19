process.on('uncaughtException', err => {
    console.log(err);
    console.log(err.name, err.message);
    console.log(`UNCAUGHT EXCEPTION`);
    process.exit(1);
})

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app')
const mongoose = require('mongoose');

//Connect database process.env.DATABASE_LOCAL
const url = `mongodb+srv://ebrahim:qtp8d4ep@book-selling.67wno.mongodb.net/book-selling?retryWrites=true&w=majority`
mongoose.connect(url, {
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


const port = process.env.PORT;
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
