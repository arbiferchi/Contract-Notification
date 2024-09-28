const user = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Configure nodemailer with your email service provider
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

// Controller for requesting password reset
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate password reset token with expiry time (1 hour)
        const resetToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Update user's document with reset token and expiry time
        await user.findOneAndUpdate({ email }, { resetToken, resetTokenExpiry: Date.now() + 3600000 });

        // Send password reset email
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `
                <p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p>
            `
        };
        await transporter.sendMail(mailOptions);

        res.status(200).send({ msg: 'Password reset email sent.' });
    } catch (error) {
        res.status(400).send({ msg: 'Password reset request failed.', error });
    }
};

// Controller for resetting password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the token is still valid (not expired)
        if (decoded && decoded.email) {
            const userDoc = await user.findOne({ email: decoded.email });

            // Check if the token in the database matches the token in the request
            if (userDoc.resetToken === token && userDoc.resetTokenExpiry > Date.now()) {
                // Hash the new password
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);

                // Update user's password and clear reset token fields
                userDoc.password = hashPassword;
                userDoc.resetToken = undefined;
                userDoc.resetTokenExpiry = undefined;
                await userDoc.save();

                res.status(200).send({ msg: 'Password reset successfully.' });
            } else {
                res.status(400).send({ msg: 'Invalid or expired token.' });
            }
        } else {
            res.status(400).send({ msg: 'Invalid token format.' });
        }
    } catch (error) {
        res.status(400).send({ msg: 'Password reset failed.', error });
    }
};
