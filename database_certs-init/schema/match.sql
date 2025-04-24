CREATE TABLE IF NOT EXISTS match (
	match_id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	game_mode TEXT NOT NULL CHECK (game_mode IN ('classic', 'br', 'io')),
	winner_id INTEGER NOT NULL,
	total_players INTEGER NOT NULL,
	FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_match_game_mode ON match(game_mode);
CREATE INDEX IF NOT EXISTS idx_match_winner_id ON match(winner_id);
