const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const response = require('../response/response');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');
const refreshTokens = new Set();

const register = async (req, res) => {
    try {
        const { user_name, email_id, pass_word } = req.body;
        const hashedpwd = await bcrypt.hash(pass_word, 10);

        await User.create({ user_name, email_id, pass_word: hashedpwd });
        return response(res, 'success', 'User Registered Successfully');

    } catch (err) {
        return response(res, 'error', err);
    }
}

const login = async (req, res) => {
    try {
        const { email_id, pass_word } = req.body;

        const user = await User.findByEmail(email_id);
        if (!user) {
            return response(res, 'error', 'Invalid Email or Password');
        }
        const isMatch = await bcrypt.compare(pass_word, user.pass_word);
        if (!isMatch) {
            return response(res, 'error', 'Invalid Email or Password');
        }

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.add(refreshToken)
        return response(res, 'success', 'Login Successfully', { token: token, refresh_token: refreshToken });
    } catch (err) {
        return response(res, 'error', err);
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token || !refreshTokens.has(refresh_token)) {
            return response(res, 'token', 'Invalid refresh token');
        }

        const decoded = verifyRefreshToken(refresh_token);
        const user = await User.findById(decoded.user_login_id);
        if (!user) {
            return response(res, 'error', 'User not found');
        }

        const newAccessToken = generateToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.delete(refresh_token);
        refreshTokens.add(newRefreshToken);

        return response(res, 'success', 'New Token Generated Successfully', { token: newAccessToken, refresh_token: newRefreshToken, });
    } catch (err) {
        return response(res, 'error', err);
    }
};

module.exports = { register, login, refreshAccessToken };