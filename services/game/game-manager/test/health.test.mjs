import { test, expect } from 'vitest'
import Fastify from 'fastify'

test('GET /health returns ok', async () => {
  const app = Fastify()
  app.get('/health', async () => ({ status: 'ok', service: 'test-service' }))

  const res = await app.inject({ method: 'GET', url: '/health' })
  const json = res.json()

  expect(res.statusCode).toBe(200)
  expect(json.status).toBe('ok')
})
