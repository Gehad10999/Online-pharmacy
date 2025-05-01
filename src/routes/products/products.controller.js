const { pool } = require('../../models/config');

const addProduct = async (req, res) => {
    const { name, price, stock } = req.body;

    try {
        const [product] = await pool.execute('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock]);
        res.status(201).json({ message: 'Product added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products');
        return res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSpicificProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT id, name, price, stock FROM products WHERE id = ?',
            [productId]
        );
    
        if (rows.length === 0) {
            return res.status(404).json({ message: `Product with ID ${productId} not found.` });
        }
    
        return res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updatePrice = async (req, res) => {
    const { productId, price } = req.body;
    try {
        await pool.execute('UPDATE products SET price = ? WHERE id = ?', [price, productId]);
        res.json({ message: 'Price updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getSpicificProduct,
    updatePrice
}