CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  jwt_token TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP 
);