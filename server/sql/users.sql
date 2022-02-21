CREATE TABLE IF NOT EXISTS users (
  _id           SERIAL PRIMARY KEY, 
  username      VARCHAR(255) UNIQUE NOT NULL,
  email         VARCHAR(500) UNIQUE NOT NULL,
  email_valid   BOOLEAN             NOT NULL DEFAULT false,
  pwd           VARCHAR(255)        NOT NULL,
  phone_cc      VARCHAR(255),
  phone_number  VARCHAR(255),
  created_at    TIMESTAMPZ          NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_ip    INET NOT NULL
);