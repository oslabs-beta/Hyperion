CREATE TABLE IF NOT EXISTS app.sessions (
  _id             SERIAL        PRIMARY KEY, 
  user_id         INTEGER       NOT NULL REFERENCES app.users(_id),
  ssid            UUID          NOT NULL UNIQUE,
  is_active       BOOLEAN       NOT NULL DEFAULT true,
  expires_at      timestamp with time zone    NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '7 days', 
  created_at      timestamp with time zone    NOT NULL DEFAULT CURRENT_TIMESTAMP
);