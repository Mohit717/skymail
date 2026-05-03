const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/user.mdl');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if the user already exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'That email is already registered. Try logging in instead.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Your password must be at least 6 characters long.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create the new user
        const user = new User({
            email,
            username: email.split('@')[0],
            password: hashedPassword,
            name,
            verified: true,
            verificationToken
        });
        await user.save();

        // Send the verification email
        // const transporter = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: process.env.SMTP_PORT,
        //     secure: process.env.SMTP_SECURE === 'true',
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASS
        //     },
        //     tls: { rejectUnauthorized: false }
        // });

        // const verificationUrl = `http://localhost:3000/verify?token=${verificationToken}`;
        // await transporter.sendMail({
        //     from: '"Custom SMTP" <no-reply@trapmail.com>',
        //     to: email,
        //     subject: 'Please verify your email address',
        //     html: `
        //         <p>Hi ${name || ''},</p>
        //         <p>Thank you for signing up! Please confirm your email address by clicking the link below:</p>
        //         <p><a href="${verificationUrl}">Verify My Email</a></p>
        //         <p>If you didn’t create this account, you can ignore this message.</p>
        //     `
        // });

        res.status(201).json(user._id);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong while creating your account. Please try again later.',
            error: err.message
        });
    }
};

const verify = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).send('This verification link is invalid or has expired.');

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.send('Your email has been successfully verified! You can now log in.');
    } catch (err) {
        res.status(500).send('Something went wrong during verification. Please try again later.');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Incorrect email or password.' });

        if (!user.verified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect email or password.' });
        const role = user.owner ? 'user' : 'admin';
        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ accessToken: token });
    } catch (err) {
        res.status(500).json({
            message: 'We couldn’t log you in right now. Please try again later.',
            error: err.message
        });
    }
};

module.exports = {
    register,
    verify,
    login
};
