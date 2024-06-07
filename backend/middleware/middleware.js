const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send({
            message: 'Token Not Found!',
        })
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(403).send({
            message: "Error While Auhtentication" + error
        })
    }
}

module.exports = authMiddleware