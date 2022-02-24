CREATE TABLE IF NOT EXISTS app.connection_params (
  _id               SERIAL       PRIMARY KEY,
  db_id             INTEGER      NOT NULL REFERENCES app.databases(_id),
  host              VARCHAR(500) NOT NULL,
  port              INTEGER      NOT NULL CHECK (port > 0 AND port < 65536),
  dbname            VARCHAR(500) NOT NULL,
  username          VARCHAR(255) NOT NULL,
  password          VARCHAR(255) NOT NULL,
  sslmode           VARCHAR(255) NOT NULL REFERENCES app.ssl_modes(ssl_mode)
);