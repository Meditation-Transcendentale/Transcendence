import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const app = Fastify()
const PORT = process.env.PORT || 3000
const SERVICE_NAME = process.env.SERVICE_NAME || 'service'

app.get('/health', async () => ({ status: 'ok', service: SERVICE_NAME }))

app.listen({ port: PORT, host: '0.0.0.0' }, err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
