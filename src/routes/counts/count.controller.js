const { pool } = require('../../models/config');

const count = async (req, res) => {
    const summaryQuery = `
        SELECT 
            (SELECT COUNT(*) FROM Users) AS total_users,
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM orders) AS total_orders;
    `;

    try {
        const [results] = await pool.query(summaryQuery);
        return res.status(200).json(results[0]);  
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = {
    count
};
