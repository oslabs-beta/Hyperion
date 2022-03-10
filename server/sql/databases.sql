CREATE TABLE IF NOT EXISTS app.databases (
  _id                SERIAL       PRIMARY KEY,
  user_id            INTEGER      NOT NULL REFERENCES app.users(_id), 
  database_name      VARCHAR(255) NOT NULL,
  connection_type   VARCHAR(255)     NOT NULL REFERENCES app.connection_types(connection_type)
);