CREATE TABLE IF NOT EXISTS databases (
  _id             SERIAL       PRIMARY KEY,
  user_id         INTEGER      NOT NULL REFERENCES users(_id), 
  database_name   VARCHAR(255) NOT NULL,
  connection_type VARCHAR(255) NOT NULL REFERENCES connection_types(connection_type)
);