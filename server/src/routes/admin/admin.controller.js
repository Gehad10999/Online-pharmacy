const {pool} = require('../../models/config');

const promoteToAdmin = async (req, res) => {
    try {
        const { user_id } = req.body; 

        if (!user_id) {
        return res.status(400).json({ status: 'error', message: 'user_id is required' });
        }

        if (user_id === req.session.user.user_id) {
        return res.status(400).json({ status: 'error', message: 'You cannot change your own role' });
        }

        const [result] = await pool.query(
        `UPDATE Users SET type = 'admin' WHERE user_id = ?`,
        [user_id]
        );

        if (result.affectedRows === 0) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        return res.status(200).json({ status: 'success', message: 'User promoted to admin successfully' });
    } catch (err) {
        console.error("Error in promoteToAdmin:", err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = { promoteToAdmin };
