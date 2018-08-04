DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Detergent", "cleaning", 2.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels - 8pk", "cleaning", 5.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens - 10pk ", "stationary", 1.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebook - 100 sheets ", "stationary", 1.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bar Soap - 4pk", "Beauty", 3.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hairspray - max hold 10oz", "Beauty", 2.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diapers - 50pk", "Baby", 19.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Formula - 20oz", "Baby", 24.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples - 6ct", "Pantry", 3.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yogurt - 4pk", "Pantry", 3.00, 65);