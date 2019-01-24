DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("case", "pc components", 100.00, 30),
		("memory", "pc components", 150.00, 50),
        ("cpu", "pc components", 370.00, 20),
        ("motherboard", "pc components", 200, 50),
        ("hard drive", "pc components", 150.00, 120),
        ("video card", "pc components", 1500.00, 5),
        ("power supply", "pc components", 120.00, 200),
        ("mouse", "pc components", 80.00, 120),
        ("keyboard", "pc components", 100.00, 150),
        ("monitor", "pc components", 600.00, 20);