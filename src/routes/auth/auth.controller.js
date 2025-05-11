const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../../models/config');
const session = require('express-session');

// login function
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // console.log(req.body);

    try {
        const [result] = await pool.query('SELECT * FROM Users WHERE email = ?;', [email]);

        if (result.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        //store the token and user data in the session
        req.session.jwt = token;
        req.session.user = {user_id: user.user_id, full_name: user.full_name, email: user.email, type: user.type};

        console.log("Login successful for user:", user.user_id, "type is: ", user.type);
        return res.status(200).json({ status: 'success', id: user.user_id, token: token });

    } catch (err) {
        console.error("Error in login:", err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Register Function
const register = async (req, res) => {
    const { full_name, email, password, phone_number, type } = req.body;

    try {
        // check from type 
        if (type !== "user" && type !== "admin") {
            return res.status(401).json({
                status: 'error',
                message: 'type must be (user) or (admin")'
            });
        }

        // Check if the email already exists
        const [existingUsers] = await pool.query(`SELECT email FROM Users WHERE email = ?`, [email]);
    
        if (existingUsers.length > 0) {
            return res.status(400).json({ status: 'error', message: 'Email already exists for this user' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user
        await pool.query(
            `INSERT INTO Users (full_name, email, password, phone_number, type) VALUES (?, ?, ?, ?, ?)`,
            [full_name, email, hashedPassword, phone_number, type]
        );

        console.log("User registered successfully:", full_name);
    
        const newToken = jwt.sign({ id: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        //store the token and user data in the session
        req.session.jwt = newToken;
        req.session.user = {full_name, email, phone_number, type, user_id};
    
        return res.status(201).json({ status: 'success', message: 'User registered successfully', token: newToken });

    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Logout function
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ status: 'error', message: 'Logout failed' });
        }

        res.clearCookie('connect.sid');
        return res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    });
};

module.exports = {
    login,
    register,
    logout
};
