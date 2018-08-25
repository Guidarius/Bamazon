-- Create a database called 'Bamazon' and switch into it for this activity --
DELETE Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	itemID INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	category VARCHAR(20) NOT NULL,
	price DECIMAL(10) NOT NULL,
	stock INTEGER(11) NOT NULL,
	PRIMARY KEY (itemID)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, category, price, stock)
VALUES  ('Haribo Gummi Bears', 'Food', 10, 100),
		('Why Is My Body Changing: For Boys', 'Books', 12.99, 1000),
		('Sea Monkeys', 'Pets', 500, 100),
		('Rock', 'Pets', 4.25, 300),
		('Tide Pods', 'Food', 19.99, 500),
		('Owl', 'Pets', 100, 10000),
		('Connect Four', 'Games', 10, 4),
		('All My Friends Are Dead', 'Books', 15, 200),
		('Hungry Hungry Hippos', 'Children', 2.75, 90),
		('A Bag Of White Castle Burgers', 'Food', .50, 1200);
