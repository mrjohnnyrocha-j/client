CREATE ROLE read_access NOINHERIT;
GRANT CONNECT ON DATABASE joaorocha TO read_access;
GRANT USAGE ON SCHEMA public TO read_access;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read_access;

CREATE ROLE write_access NOINHERIT;
GRANT read_access TO write_access;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO write_access;

CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT write_access TO app_user;
