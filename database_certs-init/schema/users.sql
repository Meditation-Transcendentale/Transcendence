CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	google_id TEXT NULL UNIQUE,
	username TEXT NOT NULL UNIQUE,
	email TEXT UNIQUE,
	password TEXT NULL,
	avatar_path TEXT,
	role TEXT NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
	two_fa_enabled BOOLEAN DEFAULT FALSE,
	two_fa_secret TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

