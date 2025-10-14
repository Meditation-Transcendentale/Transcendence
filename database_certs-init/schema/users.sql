CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	uuid TEXT NOT NULL UNIQUE,
	provider TEXT NOT NULL CHECK (provider IN ('local', 'google', '42')) DEFAULT 'local',
	google_id TEXT NULL UNIQUE,
	username TEXT NOT NULL UNIQUE,
	password TEXT NULL,
	avatar_path TEXT DEFAULT '/cdn/default_avatar.jpg',
	role TEXT NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
	two_fa_enabled BOOLEAN DEFAULT FALSE,
	two_fa_secret TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
