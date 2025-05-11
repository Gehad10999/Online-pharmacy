// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; 

//     if (!token) {
//         return res.status(403).json({ error: 'No token provided' });
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             console.log(err)
//             return res.status(401).json({ error: 'Failed to authenticate token' });
//         }
//         req.userID = decoded.id;
//         next();
//     });
// };

// module.exports = { verifyToken }; 

// middleware/session.js

const Session = async (req, res, next) => {
    try {
        if (req.session && req.session.user_id) {
            req.userID = req.session.user_id;
            return next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: Please login first.' });
        }
    } catch (err) {
        console.error('Session Error:', err);
        return res.status(500).json({ message: 'Error with session.' });
    }
};

module.exports = { Session };
