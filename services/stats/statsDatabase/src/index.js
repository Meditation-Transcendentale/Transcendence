import {connect, StringCodec} from "nats";
import statService from "./statService";

const sc = StringCodec();
const nats = await connect({ servers: process.env.NATS_URL });

nats.subscribe("stats.getPlayerStats", async (msg) => {

});

