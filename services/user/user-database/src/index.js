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

    



}))();