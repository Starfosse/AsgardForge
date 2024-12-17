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
);