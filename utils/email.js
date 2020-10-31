const nodemailer = require('nodemailer');

const sendEmail = async option => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,

        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let EmailOption = {
        from: `Book-Selling <ebrahimali.cse.ru@gmail.com`,
        to: option.email,
        subject: option.subject,
        text: option.text
    }

    await transporter.sendEmail(EmailOption);
}

module.exports = sendEmail;