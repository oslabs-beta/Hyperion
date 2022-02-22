CREATE TABLE IF NOT EXISTS connection_params (
  _id               SERIAL       PRIMARY KEY,
  db_id             INTEGER      NOT NULL REFERENCES databases(_id),
  host              VARCHAR(500) NOT NULL,
  port              INTEGER      NOT NULL CHECK (port > 0) AND (port < 65536),
  db_name           VARCHAR(500) NOT NULL,
  db_user           VARCHAR(255) NOT NULL,
  pwd               VARCHAR(255) NOT NULL,
  ssl_mode          INTEGER      NOT NULL REFERENCES ssl_modes(_id)
);