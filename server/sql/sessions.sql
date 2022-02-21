CREATE TABLE IF NOT EXISTS sessions (
  _id             SERIAL        PRIMARY KEY, 
  user_id         INTEGER       NOT NULL REFERENCES users(_id),
  ssid            UUID          NOT NULL UNIQUE,
  is_active       BOOLEAN       NOT NULL DEFAULT true,
  auth_code       VARCHAR(255)  NOT NULL, -- 2FA code sent my email
  auth_code_valid BOOLEAN       NOT NULL DEFAULT false,
  expires_at      TIMESTAMPZ    NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '7 days', 
  created_at      TIMESTAMPZ    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_ip      INET          NOT NULL
);