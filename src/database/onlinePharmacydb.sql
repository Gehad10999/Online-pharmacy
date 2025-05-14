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
MODIFY COLUMN type ENUM('user', 'admin') NOT NULL;

ALTER TABLE products ADD image_url VARCHAR(255);
