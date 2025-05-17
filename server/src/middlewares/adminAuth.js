const adminAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'You must be logged in.' });
    }

    // check for admin type
    const User = req.session.user;

    console.log(User.type);

    if (User.type !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only.' });
    }

    // Attach user info if needed later
    req.user = User;
    next();
};

module.exports = {adminAuth};
