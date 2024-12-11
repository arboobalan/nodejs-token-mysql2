const { verifyToken } = require('../utils/jwtUtils');
const response = require('../response/response');

const authMiddleWare = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
        return response(res, 'token', 'Access Denied, Token Not Provided');
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        throw new Error("Action Failed", err);
    }
}

module.exports = authMiddleWare;