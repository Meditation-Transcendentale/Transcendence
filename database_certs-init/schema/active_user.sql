CREATE TABLE IF NOT EXISTS active_user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	status TEXT NOT NULL CHECK (status IN ('online', 'offline', 'in lobby', 'in game', 'in tournament')) DEFAULT 'offline',
	lobby_gameId TEXT, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_active_user_user_id_status ON active_user(user_id, status);