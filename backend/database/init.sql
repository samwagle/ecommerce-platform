CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

INSERT INTO products (name, price)
VALUES
    ('Laptop', 80000),
    ('Mechanical Keyboard', 5000),
    ('Monitor', 25000);
