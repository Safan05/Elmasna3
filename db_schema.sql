-- users table
CREATE TABLE users (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  verification_code VARCHAR(6),
  verification_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(20) NOT NULL DEFAULT 'none'
);

-- payment_methods table
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_uuid UUID REFERENCES users(uuid) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- e.g., 'credit_card', 'paypal'
  details JSONB, -- store card info, paypal email, etc. (encrypted in production)
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Products table
CREATE TABLE Products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  rating INT DEFAULT 0,
  description TEXT,
  thumbnail VARCHAR(255),
  sku VARCHAR(50) UNIQUE,
  availabilityStatus VARCHAR(20) DEFAULT 'in_stock',
  discountPercentage DECIMAL(5, 2) DEFAULT 0,
  warrantyInformation TEXT,
  shippingInformation TEXT,
);

-- images table
CREATE TABLE productImages (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES Products(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(100),
  is_primary BOOLEAN DEFAULT false
);