CREATE TABLE IF NOT EXISTS app.uris (
  _id           SERIAL PRIMARY KEY, 
  database_id   INTEGER NOT NULL REFERENCES app.databases (_id),
  uri           TEXT NOT NULL
);