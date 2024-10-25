require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = (req ,res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "user not signed in/authorization failed"
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }else {
            return res.status(403).json({
                message: "user not signed in/authorization failed"
            });
        }
    } catch(err) {
        return res.status(403).json({
            message: "user not signed in/authorization failed"
        });
    }
}

module.exports = {
    authMiddleware
}