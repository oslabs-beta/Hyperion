CREATE TABLE IF NOT EXISTS ssl_modes (
  _id       SERIAL PRIMARY KEY,
  ssl_mode  VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO ssl_modes (ssl_mode) VALUES ('ALLOW');
INSERT INTO ssl_modes (ssl_mode) VALUES ('PREFER');
INSERT INTO ssl_modes (ssl_mode) VALUES ('REQUIRE');
INSERT INTO ssl_modes (ssl_mode) VALUES ('VERIFY-CA');
INSERT INTO ssl_modes (ssl_mode) VALUES ('VERIFY-FULL');