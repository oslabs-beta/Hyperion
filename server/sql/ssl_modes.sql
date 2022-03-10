CREATE TABLE IF NOT EXISTS app.ssl_modes (
  _id       SERIAL PRIMARY KEY,
  ssl_mode  VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO app.ssl_modes (ssl_mode) VALUES ('Allow');
INSERT INTO app.ssl_modes (ssl_mode) VALUES ('Prefer');
INSERT INTO app.ssl_modes (ssl_mode) VALUES ('Require');
INSERT INTO app.ssl_modes (ssl_mode) VALUES ('Verify-CA');
INSERT INTO app.ssl_modes (ssl_mode) VALUES ('Verify-Full');