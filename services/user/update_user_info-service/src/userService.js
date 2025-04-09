import database from "./update_user_infos.js";

const userService = {
    getUserFromUsername: async (username) => {
        const user = await database.get("SELECT * FROM users WHERE username = ?", username);
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        return user;
    },
    getUserFromId: async (id) => {
        const user = await database.get("SELECT * FROM users WHERE id = ?", id);
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        return user;
    },
    addFriendRequest: async (userId, friendId) => {
        await database.run(`INSERT INTO friendslist (user_id_1, user_id_2) VALUES (?, ?)`, userId, friendId);
    },
    getFriendshipFromId: async (friendshipId) => {
        const friendship = await database.get("SELECT * FROM friendslist WHERE id = ?", friendshipId);
        if (!friendship) {
            throw { status: 404, message: 'Friendship not found' };
        }
        return friendship;
    },
    acceptFriendRequest: async (friendshipId) => {
        await database.run(`UPDATE friendslist SET status = 'accepted' WHERE id = ?`, friendshipId);
    },
    declineFriendRequest: async (friendshipId) => {
        await database.run(`DELETE FROM friendslist WHERE id = ?`, friendshipId);
    },
    getFriendsRequests: async (userId) => {
        const friendRequestsList = await database.all("SELECT * FROM friendslist WHERE user_id_2 = ?", userId);
        if (friendRequestsList.length === 0) {
            throw { status: 404, message: 'No friend requests found' };
        }
        return friendRequestsList;
    },
    isFriendshipExisting: async (userId1, userId2) => {
        const friendship = await database.get(`SELECT * FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, userId1, userId2, userId2, userId1);
        return friendship;
    },
    deleteFriendship: async (friendshipId) => {
        await database.run(`DELETE FROM friendslist WHERE id = ?`, friendshipId);
    }
}

export default userService;