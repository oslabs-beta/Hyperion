CREATE TABLE IF NOT EXISTS queries(
  _id         SERIAL        PRIMARY KEY,
  db_id       INTEGER       NOT NULL REFERENCES databases(_id),
  query_name  VARCHAR(255)  NOT NULL,
  query       TEXT          NOT NULL
)