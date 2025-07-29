// src/routes.js
export default async function routes(fastify) {
	const { lobbyService, natsClient } = fastify;

	fastify.get('/list', async () => {
		return lobbyService.list();
	});

	fastify.post('/create', async (req, reply) => {
		const state = lobbyService.create(req.body);
		reply.code(201).send(state);
	});

	fastify.get('/:id', async (req, reply) => {
		try {
			const state = lobbyService.getLobby(req.params.id);
			return state;
		} catch (err) {
			reply.code(404).send({ error: err.message });
		}
	});
};
