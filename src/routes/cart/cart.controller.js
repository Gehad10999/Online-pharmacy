const { pool } = require('../../models/config');

const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.userID; 

    try {
        const [productRows] = await pool.execute(
            'SELECT stock FROM products WHERE id = ? FOR UPDATE',
            [product_id]
        );

        if (productRows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const availableStock = productRows[0].stock;

        if (quantity > availableStock) {
            return res.status(400).json({
                message: `Only ${availableStock} items available in stock`,
            });
        }

        await pool.execute(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_id, quantity]
        );

        await pool.execute(
            'UPDATE products SET stock = stock - ? WHERE id = ?',
            [quantity, product_id]
        );

        return res.status(201).json({ message: 'Added to cart and stock updated' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const getCart = async (req, res) => {
    const { cartId } = req.params;
    const user_id = req.userID; 


    try {
        const [rows] = await pool.execute(
            `SELECT cart.id, cart.user_id, cart.product_id, cart.quantity,
                    products.name AS product_name, products.price AS product_price
            FROM cart
            JOIN products ON cart.product_id = products.id
            WHERE cart.id = ?`,
            [cartId]
        );
    
        if (rows.length === 0) {
            return res.status(404).json({ message: `Cart with ID ${cartId} not found.` });
        }
    
        return res.status(200).json(rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCart,
    addToCart
}