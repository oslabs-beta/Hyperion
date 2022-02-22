CREATE TABLE IF NOT EXISTS sessions (
  _id             SERIAL        PRIMARY KEY, 
  user_id         INTEGER       NOT NULL REFERENCES users(_id),
  ssid            UUID          NOT NULL UNIQUE,
  is_active       BOOLEAN       NOT NULL DEFAULT true,
  expires_at      TIMESTAMPZ    NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '7 days', 
  created_at      TIMESTAMPZ    NOT NULL DEFAULT CURRENT_TIMESTAMP
);