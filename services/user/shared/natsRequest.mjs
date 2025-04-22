import { handleErrorsNats } from "./handleErrors.mjs"

export const natsRequest = handleErrorsNats(async (nats, jc, subject, data) => {
	const response = await nats.request(subject, data, { timeout: 1000 });
	const result = jc.decode(response.data);
	if (!result.success) {
		throw { status: result.status, message: result.message };
	}
	return result.data;

});
