const { pool } = require('../../models/config');
const moment = require('moment'); // format date

const createOrder = async (req, res) => {
    try {
        const user_id = req.userID;
        const { address, payment_method } = req.body;

        console.log(user_id, req.body)

        const allowedPaymentMethods = ['visa', 'cash', 'paypal'];
            if (!allowedPaymentMethods.includes(payment_method)) {
                return res.status(400).json({ message: 'Invalid payment method. Allowed: visa, cash, paypal.' });
            }
        // fetch user data
        const [userRows] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) 
            return res.status(404).json({ message: 'User not found' });
        const user = userRows[0];

        // fetch cart
        const [cartItems] = await pool.query(
            'SELECT * FROM cart WHERE user_id = ?', [user_id]
        );
        if (cartItems.length === 0)
            return res.status(400).json({ message: 'Cart is empty' });

        // create order
        const [orderResult] = await pool.query(
            `INSERT INTO orders (user_id, user_name, address, phone_number, payment_method, status, order_date)
            VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
            [
                user_id,
                user.full_name,
                address,
                user.phone_number,
                payment_method,
                moment().format('YYYY-MM-DD HH:mm:ss')
            ]
        );
        const orderId = orderResult.insertId;

        // from cart to order items
        for (const item of cartItems) {
            await pool.query(
                `INSERT INTO order_items (order_id, product_id, quantity)
                VALUES (?, ?, ?)`,
                [orderId, item.product_id, item.quantity]
            );
        }

        // Delete cart
        await pool.query('DELETE FROM cart WHERE user_id = ?', [user_id]);

        return res.status(201).json({ message: 'Order placed successfully', order_id: orderId });

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const getUserOrders = async (req, res) => {
    try {
        const user_id =  req.userID;

        const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
        return res.status(200).json({ orders });
    } catch (err) {
        console.error('Error fetching user orders:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        return res.status(200).json({ orders });
    } catch (err) {
        console.error('Error fetching all orders:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;

        const validStatus = ['pending', 'confirmed', 'canceled'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const [result] = await pool.query('UPDATE orders SET status = ? WHERE order_id = ?', [status, order_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order status updated' });
    } catch (err) {
        console.error('Error updating order status:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const editOrder = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { address, payment_method } = req.body;

        const validPayment = ['visa', 'cash', 'paypal'];
        if (!validPayment.includes(payment_method)) {
            return res.status(400).json({ message: 'Invalid payment method' });
        }

        const [result] = await pool.query(
            'UPDATE orders SET address = ?, payment_method = ? WHERE order_id = ?',
            [address, payment_method, order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found or no changes made' });
        }

        return res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
        console.error('Error editing order:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        // Optional: delete related order_items first if ON DELETE CASCADE is not used
        await pool.query('DELETE FROM order_items WHERE order_id = ?', [order_id]);

        const [result] = await pool.query('DELETE FROM orders WHERE order_id = ?', [order_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Error deleting order:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    editOrder,
    deleteOrder
};