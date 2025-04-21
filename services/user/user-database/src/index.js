import {connect, JSONCodec} from "nats";
import userService from "./userService.js";
import { handleErrorsNats } from "../../shared/handleErrors.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const jc = JSONCodec();
const nats = await connect({ servers: process.env.NATS_URL });

(handleErrorsNats(async () => {
    


}))();