CREATE TABLE IF NOT EXISTS brickbreaker_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    easy_mode_hscore INTEGER DEFAULT 0,
    normal_mode_hscore INTEGER DEFAULT 0,
    hard_mode_hscore INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);