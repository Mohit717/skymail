const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.me = decoded;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({
            message: 'Invalid or expired token.',
            error: err.message
        });
    }
}

module.exports = {
    authenticateToken
};