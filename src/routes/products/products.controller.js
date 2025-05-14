const { pool } = require('../../models/config');

const addProduct = async (req, res) => {
    const { name, price, stock, image_url } = req.body;

    console.log("Received data:", req.body);

    try {
        const [existing] = await pool.execute(
            'SELECT id FROM products WHERE name = ?',
            [name]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Product with this name already exists.' });
        }

        const [result] = await pool.execute(
            'INSERT INTO products (name, price, stock, image_url) VALUES (?, ?, ?, ?)',
            [name, price, stock, image_url]
        );

        const insertedId = result.insertId;

        return res.status(201).json({
            success: true,
            message: 'Product added',
            productID: insertedId
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products');
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
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

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Product with ID ${productId} not found.` });
        }
        return res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, stock } = req.body;

    try {
        const fields = [];
        const values = [];

        if (name !== undefined) {
            fields.push('name = ?');
            values.push(name);
        }

        if (price !== undefined) {
            fields.push('price = ?');
            values.push(price);
        }

        if (stock !== undefined) {
            fields.push('stock = ?');
            values.push(stock);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'No fields provided to update.' });
        }

        values.push(productId);

        const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;

        const [result] = await pool.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Product with ID ${productId} not found.` });
        }

        return res.status(200).json({ message: 'Product updated' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getLowStockProducts = async (req, res) => {
    const query = `SELECT name, image_url, stock FROM products WHERE stock < 5`;

    try {
        const [rows] = await pool.query(query);
        res.status(200).json({ low_stock_products: rows });
    } catch (err) {
        console.error('Error fetching low stock products:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getSpicificProduct,
    // updatePrice,
    deleteProduct,
    editProduct,
    getLowStockProducts
}