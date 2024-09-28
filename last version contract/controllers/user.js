const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const nodemailer = require('nodemailer')
const multer = require('multer');

// Configure nodemailer with Ethereal email service provider
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587, // Port for TLS/STARTTLS
    secure: false, // Use TLS
    auth: {
        user: 'roberto.harris@ethereal.email', // replace with your Ethereal user
        pass: 'HxSQdxkNVP3QzSv6W6' // replace with your Ethereal password
    },
    tls: {
        rejectUnauthorized: false // This may be necessary if you face SSL issues
    }
});

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, tel } = req.body;
        const photo = req.file ? req.file.path : '';

        if (role !== "user" && role !== "admin") {
            return res.status(400).send({ msg: "Invalid role!" });
        }

        const foundUser = await user.findOne({ email });
        if (foundUser) {
            console.log('User with this email already exists');
            return res.status(400).send({ msg: "Try with another email!" });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Generate verification token
        const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const newUser = new user({
            firstName,
            lastName,
            email,
            password: hashPassword, 
            role,
            tel,
            photo: photo,
            verificationToken // Save the verification token
        });

        await newUser.save();

        // Send verification email
        const mailOptions = {
            from: 'roberto.harris@ethereal.email',
            to: email,
            subject: 'Verify Your Email',
            html: `
                <p>Click <a href="http://localhost:3000/verify/${verificationToken}">here</a> to verify your email.</p>
            `
        };
        await transporter.sendMail(mailOptions);

        // Generate the JWT token for immediate use
        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role 
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).send({ msg: 'User registered successfully! Verification email sent.', user: newUser, token });
    } catch (error) {
        res.status(400).send({ msg: "Cannot register the user!!!", error });
    }
};

// Route for verifying email
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user with the matching verification token
        const foundUser = await user.findOne({ email: decoded.email, verificationToken: token });
        if (!foundUser) {
            return res.status(400).send({ msg: "Invalid or expired token!" });
        }

        // Update the user's verification status and clear the verification token
        foundUser.verified = true;
        foundUser.verificationToken = undefined;
        await foundUser.save();

        res.status(200).send({ msg: "Email verified successfully!" });
    } catch (error) {
        res.status(400).send({ msg: "Email verification failed!", error });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return res.status(400).send({ error: [{ msg: "Bad credentials!" }] });
        }

        if (foundUser.status === 'blocked') {
            return res.status(403).send({ error: [{ msg: "Your account has been blocked. Please contact support." }] });
        }

        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword) {
            return res.status(400).send({ error: [{ msg: "Bad credentials!" }] });
        }

        const token = jwt.sign(
            {
                id: foundUser._id,
                role: foundUser.role
            },
            process.env.SECRET_KEY,
            { expiresIn: "3d" }
        );

        res.status(200).send({ msg: "Login successful", user: foundUser, token });
    } catch (error) {
        res.status(400).send({ msg: "Cannot login the user!" });
    }
};
