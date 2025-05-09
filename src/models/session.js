const session = require('express-session');

const Session = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true with https
        maxAge: 1000 * 60 * 60 // 1 day
    }
});

module.exports = {Session};