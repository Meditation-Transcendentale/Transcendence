// src/routes.js
import { handleErrors } from "../shared/handleErrors.mjs";

export default async function routes(fastify) {
	const { lobbyService, natsClient } = fastify;

	fastify.get('/list', handleErrors(async (req, reply) => {
		reply.send({ lobbies: lobbyService.list() });
		return lobbyService.list();
	}));

	fastify.post('/create', handleErrors(async (req, reply) => {
		const state = lobbyService.create(req.body);
		reply.code(201).send(state);
	}));

	fastify.get('/:id', handleErrors(async (req, reply) => {
		const state = lobbyService.getLobby(req.params.id);
		reply.send({ state: state });
		return state;
	}));
};
