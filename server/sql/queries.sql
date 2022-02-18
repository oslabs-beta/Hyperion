CREATE TABLE IF NOT EXISTS queries(
  _id           SERIAL PRIMARY KEY,
  schema_id     INTEGER NOT NULL REFERENCES schemas(_id)
)