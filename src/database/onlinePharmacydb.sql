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

select * from Users;
SELECT * FROM products;
SELECT * FROM cart;


TRUNCATE TABLE Users;
