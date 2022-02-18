CREATE TABLE IF NOT EXISTS connection_params (
  _id          SERIAL PRIMARY KEY,
  database_id  INTEGER NOT NULL REFERENCES databases(_id),
  host         VARCHAR(500) NOT NULL,
  port         INTEGER NOT NULL,
  database     VARCHAR(500) NOT NULL,
  db_user      VARCHAR(255) NOT NULL,
  password     VARCHAR(255) NOT NULL,
  ssl_mode     VARCHAR(255) NOT NULL
);