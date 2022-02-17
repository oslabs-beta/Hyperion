CREATE TABLE IF NOT EXISTS databases (
  _id             SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users (_id), 
  name            VARCHAR(255) NOT NULL,
  connection_type VARCHAR(255) NOT NULL
);