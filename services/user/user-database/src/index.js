import {connect, JSONCodec} from "nats";
import userService from "./userService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const jc = JSONCodec();
const nats = await connect({ servers: process.env.NATS_URL });

(handleErrorsNats(async () => {

	const sub1 = nats.subscribe("user.getUserFromUsername");
	for await (const msg of sub1) {
		try {
			const username = jc.decode(msg.data);
			const user = userService.getUserFromUsername(username);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub2 = nats.subscribe("user.addGoogleUser");
	for await (const msg of sub2) {
		try {
			const { googleId, username, email, avatarPath } = jc.decode(msg.data);
			userService.addGoogleUser(googleId, username, email, avatarPath);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}
		
	const sub3 = nats.subscribe("user.checkUsernameAvailability");
	for await (const msg of sub3) {
		try {
			const username = jc.decode(msg.data);
			userService.checkUsernameAvailability(username);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub4 = nats.subscribe("user.registerUser");
	for await (const msg of sub4 ) {
		try {
			const { username, hashedPassword } = jc.decode(msg.data);
			userService.registerUser(username, hashedPassword);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub5 = nats.subscribe("user.getUserFromId");
	for await (const msg of sub5) {
		try {
			const id = jc.decode(msg.data);
			const user = userService.getUserFromId(id);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub6 = nats.subscribe("user.getUserFromHeader");
	for await (const msg of sub6) {
		try {
			const req = jc.decode(msg.data);
			const user = userService.getUserFromHeader(req);
			nats.publish(msg.reply, jc.encode({ success: true, data: user }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub7 = nats.subscribe("user.addFriendRequest");
	for await (const msg of sub7) {
		try {
			const { userId, friendId } = jc.decode(msg.data);
			userService.addFriendRequest(userId, friendId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub8 = nats.subscribe("user.getFriendshipFromId");
	for await (const msg of sub8) {
		try {
			const friendshipId = jc.decode(msg.data);
			const friendship = userService.getFriendshipFromId(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub9 = nats.subscribe("user.getFriendshipFromUser1Username");
	for await (const msg of sub9) {
		try {
			const { userId, friendId } = jc.decode(msg.data);
			const friendship = userService.getFriendshipFromUser1Username(userId, friendId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub10 = nats.subscribe("user.acceptFriendRequest");
	for await (const msg of sub10) {
		try {
			const friendshipId = jc.decode(msg.data);
			userService.acceptFriendRequest(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub11 = nats.subscribe("user.declineFriendRequest");
	for await (const msg of sub11) {
		try {
			const friendshipId = jc.decode(msg.data);
			userService.declineFriendRequest(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub12 = nats.subscribe("user.getFriendsRequests");
	for await (const msg of sub12) {
		try {
			const userId = jc.decode(msg.data);
			const friendRequestsList = userService.getFriendsRequests(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendRequestsList }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub13 = nats.subscribe("user.isFriendshipExisting");
	for await (const msg of sub13) {
		try {
			const { userId1, userId2 } = jc.decode(msg.data);
			const friendship = userService.isFriendshipExisting(userId1, userId2);
			nats.publish(msg.reply, jc.encode({ success: true, data: friendship }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub14 = nats.subscribe("user.deleteFriendship");
	for await (const msg of sub14) {
		try {
			const friendshipId = jc.decode(msg.data);
			userService.deleteFriendship(friendshipId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub15 = nats.subscribe("user.blockUser");
	for await (const msg of sub15) {
		try {
			const { userId, blockedUserId } = jc.decode(msg.data);
			userService.blockUser(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub16 = nats.subscribe("user.isBlocked");
	for await (const msg of sub16) {
		try {
			const { userId, blockedUserId } = jc.decode(msg.data);
			const isBlocked = userService.isBlocked(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true, data: isBlocked }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub17 = nats.subscribe("user.unblockUser");
	for await (const msg of sub17) {
		try {
			const { userId, blockedUserId } = jc.decode(msg.data);
			userService.unblockUser(userId, blockedUserId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub18 = nats.subscribe("user.getBlockedUsers");
	for await (const msg of sub18) {
		try {
			const userId = jc.decode(msg.data);
			const blockedUsers = userService.getBlockedUsers(userId);
			nats.publish(msg.reply, jc.encode({ success: true, data: blockedUsers }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub19 = nats.subscribe("user.updateUsername");
	for await (const msg of sub19) {
		try {
			const { username, userId } = jc.decode(msg.data);
			userService.updateUsername(username, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub20 = nats.subscribe("user.updateAvatar");
	for await (const msg of sub20) {
		try {
			const { avatar, userId } = jc.decode(msg.data);
			userService.updateAvatar(avatar, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub21 = nats.subscribe("user.updatePassword");
	for await (const msg of sub21) {
		try {
			const { hashedPassword, userId } = jc.decode(msg.data);
			userService.updatePassword(hashedPassword, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

	const sub22 = nats.subscribe("user.enable2FA");
	for await (const msg of sub22) {
		try {
			const { secret, userId } = jc.decode(msg.data);
			userService.enable2FA(secret, userId);
			nats.publish(msg.reply, jc.encode({ success: true }));
		} catch (error) {
			const status = error.status || 500;
			const message = error.message || "Internal Server Error";
			nats.publish(msg.reply, jc.encode({ success: false, status, message }));
		}
	}

}))();