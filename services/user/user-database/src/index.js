import {connect, JSONCodec} from "nats";
import userService from "./userService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const jc = JSONCodec();
const nats = await connect({ servers: process.env.NATS_URL });

async function handleNatsSubscription(subject, handler) {
    const sub = nats.subscribe(subject);
    for await (const msg of sub) {
        try {
            await handler(msg);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            nats.publish(msg.reply, jc.encode({ success: false, status, message }));
        }
    }
}

handleErrorsNats(async () => {
	await Promise.all([
		handleNatsSubscription("user.getUserFromUsername", async (msg) => {
			const { username } = jc.decode(msg.data);
			const user = userService.getUserFromUsername(username);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		}),
		handleNatsSubscription("user.addGoogleUser", async (msg) => {
			const { googleId, username, email, avatarPath } = jc.decode(msg.data);
			userService.addGoogleUser(googleId, username, email, avatarPath);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.checkUsernameAvailability", async (msg) => {
			const { username } = jc.decode(msg.data);
			userService.checkUsernameAvailability(username);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.registerUser", async (msg) => {
			const { uuid, username, hashedPassword } = jc.decode(msg.data);
			userService.registerUser(uuid, username, hashedPassword);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.getUserFromId", async (msg) => {
			const { id } = jc.decode(msg.data);
			const user = userService.getUserFromId(id);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		}),
		handleNatsSubscription("user.getUserFromUUID", async (msg) => {
			const { uuid } = jc.decode(msg.data);
			const user = userService.getUserFromUUID(uuid);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		}),
		handleNatsSubscription("user.getUserFromHeader", async (msg) => {
			const { headers }  = jc.decode(msg.data);
			const user = userService.getUserFromHeader(headers);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		}),
		handleNatsSubscription("user.addFriendRequest", async (msg) => {
			const { userId, friendId } = jc.decode(msg.data);
			userService.addFriendRequest(userId, friendId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.getFriendshipFromId", async (msg) => {
			const { friendshipId } = jc.decode(msg.data);
			const friendship = userService.getFriendshipFromId(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		}),
		handleNatsSubscription("user.getFriendshipFromUser1Username", async (msg) => {
			const { userId, friendId } = jc.decode(msg.data);
			const friendship = userService.getFriendshipFromUser1Username(userId, friendId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		}),
		handleNatsSubscription("user.acceptFriendRequest", async (msg) => {
			const { friendshipId } = jc.decode(msg.data);
			userService.acceptFriendRequest(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.declineFriendRequest", async (msg) => {
			const { friendshipId } = jc.decode(msg.data);
			userService.declineFriendRequest(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.getFriendsRequests", async (msg) => {
			const { userId } = jc.decode(msg.data);
			const friendRequestsList = userService.getFriendsRequests(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendRequestsList }));
		}),
		handleNatsSubscription("user.isFriendshipExisting", async (msg) => {
			const { userId1, userId2 } = jc.decode(msg.data);
			const friendship = userService.isFriendshipExisting(userId1, userId2);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		}),
		handleNatsSubscription("user.deleteFriendship", async (msg) => {
			const { friendshipId } = jc.decode(msg.data);
			userService.deleteFriendship(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.blockUser", async (msg) => {
			const { userId, blockedUserId } = jc.decode(msg.data);
			userService.blockUser(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.isBlocked", async (msg) => {
			const { userId, blockedUserId } = jc.decode(msg.data);
			const isBlocked = userService.isBlocked(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true, data: isBlocked }));
		}),
		handleNatsSubscription("user.unblockUser", async (msg) => {
			const { userId, blockedUserId } = jc.decode(msg.data);
			userService.unblockUser(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.getBlockedUsers", async (msg) => {
			const { userId } = jc.decode(msg.data);
			const blockedUsers = userService.getBlockedUsers(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: blockedUsers }));
		}),
		handleNatsSubscription("user.updateUsername", async (msg) => {
			const { username, userId } = jc.decode(msg.data);
			userService.updateUsername(username, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.updateAvatar", async (msg) => {
			const { avatar, userId } = jc.decode(msg.data);
			userService.updateAvatar(avatar, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.updatePassword", async (msg) => {
			const { hashedPassword, userId } = jc.decode(msg.data);
			userService.updatePassword(hashedPassword, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.enable2FA", async (msg) => {
			const { secret, userId } = jc.decode(msg.data);
			userService.enable2FA(secret, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.disable2FA", async (msg) => {
			const { userId } = jc.decode(msg.data);
			userService.disable2FA(userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		}),
		handleNatsSubscription("user.getUserInfo", async (msg) => {
			const { userId } = jc.decode(msg.data);
			const userInfo = userService.getUserInfo(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: userInfo }));
		}),
		handleNatsSubscription("user.getFriendlist", async (msg) => {
			const { userId } = jc.decode(msg.data);
			const friendlist = userService.getFriendlist(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendlist }));
		}),
	]);
})();
