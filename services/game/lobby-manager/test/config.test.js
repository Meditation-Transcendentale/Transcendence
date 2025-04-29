// test/config.test.js
import config from '../src/config.js'

test('config has all required keys and reasonable defaults', () => {
	expect(typeof config.PORT).toBe('number')
	expect(config.NATS_URL).toMatch(/^nats:\/\//)
	expect(typeof config.HEARTBEAT_INTERVAL).toBe('number')
	expect(config.MAX_PLAYERS).toHaveProperty('pong')
})

