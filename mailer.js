const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        //  nodemailer transporter using your email service provider's details
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'projectus0001@gmail.com',
                pass: 'bwbe qpcd lqfb qkcj', 
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'projectus0001@gmail.com',
            to,
            subject,
            text,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendEmail;
