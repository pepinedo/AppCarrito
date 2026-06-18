-- DROP DATABASE AppCarrito;

CREATE DATABASE IF NOT EXISTS AppCarrito;
USE AppCarrito;

-- 1. Usuarios
CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL 
);

-- 2. Ingredientes
CREATE TABLE IF NOT EXISTS ingredients (
    ingredientId INT PRIMARY KEY AUTO_INCREMENT, -- Corregido: ingretientId -> ingredientId
    name VARCHAR(100) NOT NULL,
    details TEXT
);

-- 3. Platos
CREATE TABLE IF NOT EXISTS plates (
    plateId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 4. Relación Platos e Ingredientes (CORREGIDO)
CREATE TABLE IF NOT EXISTS plate_ingredient ( 
    plateId INT,
    ingredientId INT,
    PRIMARY KEY (plateId, ingredientId),
    FOREIGN KEY (plateId) REFERENCES plates(plateId) ON DELETE CASCADE, -- Corregido a plateId
    FOREIGN KEY (ingredientId) REFERENCES ingredients(ingredientId) ON DELETE CASCADE
);

-- 5. Carritos
CREATE TABLE IF NOT EXISTS carts (
    cartId INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT
);

-- 6. Relación Usuarios y Carritos
CREATE TABLE IF NOT EXISTS user_cart ( 
    userId INT,
    cartId INT,
    PRIMARY KEY (userId, cartId),
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (cartId) REFERENCES carts(cartId) ON DELETE CASCADE
);

-- 7. Relación Platos y Carritos (CORREGIDO)
CREATE TABLE IF NOT EXISTS plate_cart ( -- Corregido el espacio en "IF NOT EXISTS"
    cartId INT,
    plateId INT,
    PRIMARY KEY (cartId, plateId),
    FOREIGN KEY (cartId) REFERENCES carts(cartId) ON DELETE CASCADE,
    FOREIGN KEY (plateId) REFERENCES plates(plateId) ON DELETE CASCADE -- Corregido: apuntaba a 'id' que ya no existe
);