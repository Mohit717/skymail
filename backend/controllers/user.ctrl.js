const bcrypt = require('bcrypt');
const { generateUsername } = require('../utils/helper');
const userMdl = require('../models/user.mdl');

const uniqueUsername = async (req, res) => {
    try {
        const username = await generateUsername();
        res.status(200).json(username);
    } catch (err) {
        res.status(500).json({ message: 'Failed to generate username.', error: err.message });
    }
}

const registerUser = async (req, res) => {
    const { me } = req
    const { name, username, email, password } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new userMdl({
            name,
            username,
            email,
            password: hashedPassword,
            verified: true,
            owner: me.id
        });
        await user.save();

        res.status(201).json({ message: 'Registred successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed.', error: err.message });
    }
}

const resetPassword = async (req, res) => {
    const { id, password } = req.body;
    try {
        const _user = await userMdl.findOne({ _id: id })
        if (!_user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        _user.password = hashedPassword;
        await _user.save();

        res.status(201).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Reset Password failed.', error: err.message });
    }
}

const profile = async (req, res) => {
    const { me } = req;
    try {
        const _user = await userMdl.findOne({ _id: me.id }).select('-password');
        res.status(200).send(_user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
}

module.exports = {
    uniqueUsername,
    registerUser,
    resetPassword,
    profile
}
