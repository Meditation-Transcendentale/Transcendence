// src/routes.js
export default async function routes(fastify) {
	const { lobbyService, natsClient } = fastify;

	fastify.get('/lobby/list', async () => {
		return lobbyService.list();
	});

	fastify.post('/lobby/create', async (req, reply) => {
		const state = lobbyService.create(req.body);
		reply.code(201).send(state);
	});

	fastify.post('/lobby/:id/join', async (req, reply) => {
		const state = lobbyService.join(req.params.id, req.body.userId);
		const buf = encodeJoin({ lobbyId: req.params.id, userId: req.body.userId });
		natsClient.publish('lobby.joined', buf);
		return state;
	});

	fastify.delete('/lobby/:id/leave', async (req, reply) => {
		const state = lobbyService.leave(req.params.id, req.body.userId);
		const buf = encodeLeave({ lobbyId: req.params.id, userId: req.body.userId });
		natsClient.publish('lobby.left', buf);
		return state;
	});
};
