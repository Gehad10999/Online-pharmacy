CREATE DATABASE OnlinePharmacy;

USE OnlinePharmacy;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  stock INT
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,  
    user_id INT,                              
    name_user VARCHAR(100) NOT NULL,          
    quantity INT NOT NULL,                   
    address VARCHAR(255) NOT NULL,            
    status ENUM('pending', 'confirmed', 'canceled') DEFAULT 'pending', 
    phone_number VARCHAR(20) NOT NULL,       
    payment_method ENUM('cash', 'visa', 'paypal') DEFAULT 'cash',     
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,                    
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)                 
        REFERENCES users(user_id)             -- References the user_id in the users table
        ON DELETE CASCADE                     -- If a user is deleted, delete all their orders
        ON UPDATE CASCADE                     -- If a user's ID is updated, update it in orders too
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

ALTER TABLE orders CHANGE name_user user_name VARCHAR(100);

ALTER TABLE orders DROP COLUMN quantity;

select * from Users;
SELECT * FROM products;
SELECT * FROM cart;
SELECT * FROM orders;
SELECT * FROM order_items;

ALTER TABLE Users
ADD COLUMN type ENUM('u', 'a') NOT NULL DEFAULT 'u';

-- for delete all data in tables
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE cart;
TRUNCATE TABLE products;
TRUNCATE TABLE Users; 
SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE Users
add COLUMN type ENUM('user', 'admin') NOT NULL default 'user';

ALTER TABLE products ADD image_url VARCHAR(255);
ALTER TABLE products ADD category VARCHAR(50) NOT NULL DEFAULT 'medicine';

INSERT INTO products (name, price, stock, image_url, category) VALUES
-- Cosmetics
('Matte Lipstick', 220.00, 50, 'logo.jpeg', 'cosmetics'),
('Fit Me Foundation', 295.00, 40, '/logo.jpeg', 'cosmetics'),

-- Haircare
('L\'Oréal Paris Elvive Shampoo', 101.00, 30, 'logo.jpeg', 'haircare'),

-- Mom & Baby
('Hero Baby Apple Compote', 42.00, 25, 'logo.jpeg', 'mombaby'),

-- Medicine
('Vitacare Vitamin D3', 360.00, 100, 'logo.jpeg', 'medicine'),

-- Skincare
('Garnier SkinActive', 75.00, 60, 'logo.jpeg', 'skincare');

INSERT INTO Users (full_name, email, password, phone_number, type) VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword1', '0123456789', 'user'),
('Bob Smith', 'bob@example.com', 'hashedpassword2', '0987654321', 'admin'),
('Carol White', 'carol@example.com', 'hashedpassword3', '0111222333', 'user');

-- Insert sample products
INSERT INTO products (name, price, stock, image_url, category) VALUES
('Matte Lipstick', 220.00, 50, 'logo.jpeg', 'cosmetics'),
('Fit Me Foundation', 295.00, 40, 'logo.jpeg', 'cosmetics'),
('L\'Oréal Paris Elvive Shampoo', 101.00, 30, 'logo.jpeg', 'haircare'),
('Hero Baby Apple Compote', 42.00, 60, 'logo.jpeg', 'mombaby'),
('Vitacare Vitamin D3', 360.00, 25, 'logo.jpeg', 'medicine'),
('Garnier SkinActive', 75.00, 45, 'logo.jpeg', 'skincare');

-- Insert sample cart items (assume user_id 1 and 3 have carts)
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 1, 2),  -- Alice has 2 Matte Lipstick
(1, 3, 1),  -- Alice has 1 Shampoo
(3, 5, 3);  -- Carol has 3 Vitamin D3

-- Insert sample orders (assume Bob placed orders)
INSERT INTO orders (user_id, user_name, address, status, phone_number, payment_method, order_date) VALUES
(2, 'Bob Smith', '123 Main St, Cityville', 'confirmed', '0987654321', 'visa', '2025-05-01 10:00:00'),
(2, 'Bob Smith', '123 Main St, Cityville', 'pending', '0987654321', 'cash', '2025-05-05 15:30:00');

-- Insert sample order_items for those orders
INSERT INTO order_items (order_id, product_id, quantity) VALUES
(2, 1, 1),  -- 1 Matte Lipstick in order 1
(2, 2, 2),  -- 2 Fit Me Foundation in order 1
(3, 4, 1);  -- 1 Hero Baby Apple Compote in order 2

