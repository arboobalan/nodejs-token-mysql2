const express = require('express');
const { register, login } = require('../controller/userController');
const authMiddleWare = require('../middleware/authMiddleware');
const { refreshAccessToken } = require('../controller/userController');
const response = require('../response/response');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh_token', refreshAccessToken);

router.get('/protected', authMiddleWare, (req, res) => {
    return response(res, 'success', 'This is a protected route', { user: req.user });
});

module.exports = router;