-- NOT READY YET
CREATE TABLE IF NOT EXISTS schemas (
  _id            SERIAL PRIMARY KEY,
  database_id    INTEGER NOT NULL REFERENCES databases(_id)
);