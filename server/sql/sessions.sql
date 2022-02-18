CREATE TABLE IF NOT EXISTS sessions (
  _id           SERIAL PRIMARY KEY, 
  user_id       INTEGER NOT NULL REFERENCES users(_id),
  session_id    VARCHAR(255) NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  expires_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() + interval '7 days', 
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);