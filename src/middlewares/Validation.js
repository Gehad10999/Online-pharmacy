const {body, param} = require('express-validator');

const registerValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('phone_number')
        .isString()
        .isLength({ min: 11, max: 15 })
        .withMessage('Phone number must be between 10 and 15 characters'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
    .notEmpty()
    .isLength({ min: 11, max: 15 })
    .withMessage('Password is required'),
];

const productValidation = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price')
        .isFloat({ min: 0.01 }).
        withMessage('Price must be a number greater than 0'),
    body('stock')
        .isInt({ min: 1 })
        .withMessage('Stock must be an integer greater than 0'),
];

const getSpecificProductValidation = [
    param('productId').isInt({ min: 1 }).withMessage('Product ID must be a positive integer'),
];

const updatePriceValidation = [
    body('productId')
        .isInt()
        .withMessage('Product ID must be an integer'),
    body('price')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a number greater than 0'),
];


const cartValidation = [
    body('product_id')
        .isInt({ min: 1 })
        .withMessage('Product ID must be a positive integer'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be an integer greater than 0'),
];

const getCartValidation = [
    param('cartId')
        .isInt({ min: 1 })
        .withMessage('Cart ID must be a positive integer'),
];

module.exports = {
    registerValidation,
    loginValidation,
    productValidation, 
    updatePriceValidation,
    getSpecificProductValidation,
    cartValidation,
    getCartValidation
}