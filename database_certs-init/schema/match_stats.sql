CREATE TABLE IF NOT EXISTS match_stats (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	match_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	is_winner BOOLEAN NOT NULL,
	goals_scored INTEGER,
	goals_conceded INTEGER,
	placement INTEGER,
	FOREIGN KEY (match_id) REFERENCES match(match_id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE (match_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_match_stats_match_id ON match_stats(match_id);
CREATE INDEX IF NOT EXISTS idx_match_stats_user ON match_stats(user_id);
