const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const response = require('../response/response');

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ user_login_id: user.user_login_id, email_id: user.email_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return response(err, 'token', 'Invalid token');
    }
}

const generateRefreshToken = (user) => {
    return jwt.sign({ user_login_id: user.user_login_id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
    });
}

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return response(err, 'token', 'Invalid refresh token');
    }
}

module.exports = { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };