const natsRequest = async (nats, jc, subject, data) => {
	try {
		const response = await nats.request(subject, jc.encode(data), { timeout: 1000 });
		const result = jc.decode(response.data);
		if (!result.success) {
			throw { status: result.status, code: result.code, message: result.message };
		}
		return result.data;
	} catch (error) {
		throw {
			status: error.status || 500,
			code: error.code || 500,
			message: error.message || "Internal Server Error",
		};
	}
};

export { natsRequest };
