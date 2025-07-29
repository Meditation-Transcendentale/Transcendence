// src/routes.js
import { handleErrors } from "../shared/handleErrors.mjs";

export default async function routes(fastify) {
	const { lobbyService, natsClient } = fastify;

	fastify.get('/lobby/list', handleErrors(async () => {
		return lobbyService.list();
	}));

	fastify.post('/lobby/create', handleErrors(async (req, reply) => {
		const state = lobbyService.create(req.body);
		reply.code(201).send(state);
	}));

	fastify.get('/lobby/:id', handleErrors(async (req, reply) => {
		const state = lobbyService.getLobby(req.params.id);
		return state;
	}));
};
