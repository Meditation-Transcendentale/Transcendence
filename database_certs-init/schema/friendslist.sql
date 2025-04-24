CREATE TABLE IF NOT EXISTS friendslist (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id_1 INTEGER NOT NULL,
	user_id_2 INTEGER NOT NULL,
	status TEXT NOT NULL CHECK (status IN ('pending', 'accepted')) DEFAULT 'pending',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE (user_id_1, user_id_2)
);

CREATE INDEX IF NOT EXISTS idx_friendslist_user_id_1 ON friendslist(user_id_1);
CREATE INDEX IF NOT EXISTS idx_friendslist_user_id_2 ON friendslist(user_id_2);
CREATE INDEX IF NOT EXISTS idx_friendslist_status ON friendslist(status);

CREATE INDEX IF NOT EXISTS idx_friendslist_user1_user2 ON friendslist(user_id_1, user_id_2);
CREATE INDEX IF NOT EXISTS idx_friendslist_user2_user1 ON friendslist(user_id_2, user_id_1);