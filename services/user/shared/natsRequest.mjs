const natsRequest = async (nats, jc, subject, data) => {

	console.log("NATS Request", subject, data);
	const response = await nats.request(subject, jc.encode(data), { timeout: 1000 });
	const result = jc.decode(response.data);
	if (!result.success) {
		throw { status: result.status, message: result.message };
	}
	return result.data;

};

export { natsRequest };
