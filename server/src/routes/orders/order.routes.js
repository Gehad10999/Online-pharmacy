const express = require('express');
const orderRouter = express.Router();
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    editOrder,
    deleteOrder
} = require('./order.controller');

const { verifySession } = require('../../middlewares/verifySession');
const { adminAuth } = require('../../middlewares/adminAuth');

orderRouter.post(
    '/create',
    verifySession,
    createOrder
);

orderRouter.get(
    '/myorders',
    verifySession,
    getUserOrders
);

orderRouter.get(
    '/all',
    adminAuth,
    verifySession,
    getAllOrders
);

orderRouter.put(
    '/:order_id',
    adminAuth,
    verifySession,
    updateOrderStatus
);

orderRouter.put(
    '/edit/:order_id',
    verifySession,
    editOrder
);

orderRouter.delete(
    '/:order_id',
    verifySession,
    deleteOrder
);

module.exports = {orderRouter};
