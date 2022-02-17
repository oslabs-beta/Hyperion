CREATE TABLE IF NOT EXISTS databases (
  _id SERIAL  PRIMARY KEY,
  name        VARCHAR(255),
  uri         VARCHAR(500),
  host        VARCHAR(500),
  username    VARCHAR(500),
  database    VARCHAR(500),
  port        INTEGER, 
  password    VARCHAR(500),
  sslmode     VARCHAR(255),
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);