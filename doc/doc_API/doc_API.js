import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

dotenv.config({ path: "../.env" });

const app = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(401).send({ message: 'Unauthorized' });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);


const apiGatewayDocs = JSON.parse(fs.readFileSync("./docs_json/api-gateway.json", "utf8"));
const authDocs = JSON.parse(fs.readFileSync("./docs_json/auth-service.json", "utf8"));
const updateUserInfoDocs = JSON.parse(fs.readFileSync("./docs_json/update_user_info-service.json", "utf8"));
const registerDocs = JSON.parse(fs.readFileSync("./docs_json/register-service.json", "utf8"));
const statsDocs = JSON.parse(fs.readFileSync("./docs_json/stats.json", "utf8"));
const getInfoDocs = JSON.parse(fs.readFileSync("./docs_json/get-info.json", "utf8"));

const mergedDocs = {
	openapi: "3.0.0",
	info: {
    	title: "Unified API Documentation",
    	version: "1.0.0"
  	},
  	paths: {

		...apiGatewayDocs.paths,
		...authDocs.paths,
		...updateUserInfoDocs.paths,
		...registerDocs.paths,
		...statsDocs.paths,
		...getInfoDocs.paths
  	},
  	components: {

		...apiGatewayDocs.components,
		...authDocs.components,
		...updateUserInfoDocs.components,
		...registerDocs.components,
		...statsDocs.components,
		...getInfoDocs.components
  	},
  	security: {

		...apiGatewayDocs.security,
		...authDocs.security,
		...updateUserInfoDocs.security,
		...registerDocs.security,
		...statsDocs.security,
		...getInfoDocs.security
  	}
};


app.register(fastifySwagger, {openapi: mergedDocs});

app.register(fastifySwaggerUI, { routePrefix: '/documentation', exposeRoute: true });

app.get('/docs', async (req, res) => {
	return mergedDocs;
});

// https://localhost:3000/docs/documentation/



const start = async () => {
	try {
		await app.listen({ port: 3001, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();



