const verifySession = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // Session exists
    } else {
        return res.status(401).json({ status: 'error', message: 'Unauthorized, session not found' });
    }
};

module.exports = {verifySession};