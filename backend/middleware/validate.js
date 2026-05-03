const userMdl = require("../models/user.mdl");

const validateUsername = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await userMdl.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({
            message: 'Invalid request.',
            error: err.message
        });
    }
}

const validateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userMdl.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({
            message: 'Invalid request.',
            error: err.message
        });
    }
}

module.exports = {
    validateUsername,
    validateEmail
};