CREATE TABLE IF NOT EXISTS uris (
  _id           SERIAL PRIMARY KEY, 
  database_id   INTEGER NOT NULL REFERENCES databases (_id),
  uri           TEXT NOT NULL
);