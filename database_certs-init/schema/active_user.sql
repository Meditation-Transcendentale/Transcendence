CREATE TABLE IF NOT EXISTS active_user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	status TEXT NOT NULL CHECK (status IN ('online', 'offline', 'in_lobby', 'in_game')),
	lobby_gameId INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	UNIQUE (user_id)
);