-- MySQL migration for bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(60),
  location VARCHAR(255),
  service VARCHAR(255),
  preferredDate DATE,
  message TEXT,
  deposit INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX IF NOT EXISTS idx_bookings_createdAt ON bookings (createdAt DESC);
