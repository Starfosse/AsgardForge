CREATE DATABASE IF NOT EXISTS asgardforge;
USE asgardforge;
CREATE USER IF NOT EXISTS 'starfosse'@'%' IDENTIFIED BY '4589';
GRANT ALL PRIVILEGES ON asgardforge.* TO 'starfosse'@'%';
FLUSH PRIVILEGES;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255),
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE collections (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    promotion_price DECIMAL(10, 2),
    stock INT NOT NULL DEFAULT 0,
    collection_id BIGINT NOT NULL,
    alert_stock INT NOT NULL DEFAULT 0,
    details TEXT,
    specifications TEXT,
    dimensions VARCHAR(255),
    weight DECIMAL(10, 2),
    material VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id)
);

CREATE TABLE product_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    image_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_reviews(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    customer_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- primary key (product_id, customer_id) -> à modifier pour plus tard

CREATE TABLE conversations_support(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    -- order_id BIGINT, ajouter plus tard le numéro de commande dans le ticket
    status ENUM('open', 'closed') NOT NULL DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE messages_support(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(conversation_id) REFERENCES conversations_support(id) ON DELETE CASCADE
);

CREATE TABLE orders(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    recipient_first_name VARCHAR(100) NOT NULL,
    recipient_last_name VARCHAR(100) NOT NULL,
    recipient_email VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20),
    shipping_address VARCHAR(255) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(10) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing','shipped', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_items(
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    promotion_price DECIMAL(10, 2),
    quantity INT NOT NULL,
    PRIMARY KEY(order_id, product_id),
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_product_collection ON products(collection_id);
CREATE INDEX idx_product_stock ON products(stock);
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_collection_name ON collections(name);
CREATE INDEX idx_message_support_conversation ON messages_support(conversation_id);