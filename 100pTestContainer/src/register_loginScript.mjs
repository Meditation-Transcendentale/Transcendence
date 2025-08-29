import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config({ path: "../../.env" });

const API_URL = 'https://localhost:3000';

async function main()
{
	for (let i = 1; i <= 100; i++) {

		let username = `user${i}`;
		let password = `Password${i}`;

		const agent = new https.Agent({ rejectUnauthorized: false });

		try {
			await axios.post(`https://register-service:4001/`, {
				username: username,
				password: password
			}, { headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, httpsAgent: agent });

			console.log(`Registered: ${username}`);

			const response = await axios.post(`https://auth-service:4002/login`, {
				username: username,
				password: password
			}, { headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, httpsAgent: agent });
			console.log(`Logged in: ${username}, Token: ${response.data.token}`);

		}
		catch (error) {
			console.error(`Error with ${username}:`, error.response ? error.response.data : error.message);
		}

	}
}

main();