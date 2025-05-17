const verifySession = async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            req.userID = req.session.user.user_id;
            next(); 
        } else {
            return res.status(401).json({ message: 'Unauthorized: Please login first.' });
        }
    } catch (err) {
        console.error('Session Error:', err);
        return res.status(500).json({ message: 'Error with session.' });
    }
};

module.exports = { verifySession };
