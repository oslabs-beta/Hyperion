CREATE TABLE IF NOT EXISTS app.connection_types (
  _id              SERIAL       PRIMARY KEY,
  connection_type  VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO app.connection_types (connection_type) VALUES ('URI');
INSERT INTO app.connection_types (connection_type) VALUES ('CONNECTION_PARAMS');