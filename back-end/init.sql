CREATE USER IF NOT EXISTS 'starfosse'@'%' IDENTIFIED BY '4589';
GRANT ALL PRIVILEGES ON asgardforge.* TO 'starfosse'@'%';
FLUSH PRIVILEGES;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255),
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    email VARCHAR(100),
    access_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    refresh_token VARCHAR(100),
);

CREATE TABLE `products` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    promotion INTEGER DEFAULT 0,
    main_image_url VARCHAR(255),
    image_gallery JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    stock_quantity INTEGER DEFAULT 0,
);