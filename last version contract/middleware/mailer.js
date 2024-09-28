const nodemailer = require('nodemailer');

// Create a transporter object using Mailtrap's SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',  // Mailtrap SMTP host
    port: 2525,                // Mailtrap SMTP port (2525 is default)
    auth: {
        user: '9d9bf93c4dadbf',  // Replace with your Mailtrap username
        pass: '15e0fb7b4779ee'   // Replace with your Mailtrap password
    }
});

// Function to send an email
const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'arbi.ferchichi53@gmail.com', // Sender address
            to,    // List of receivers
            subject, // Subject line
            text,   // Plain text body
            // You can also add HTML content if needed
        });
        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
