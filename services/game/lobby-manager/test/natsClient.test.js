// test/natsClient.test.js
import natsClient from '../src/natsClient.js'
import { connect, StringCodec } from 'nats'

jest.setTimeout(10000)

describe('natsClient', () => {
	let nc, handlerCalled = false

	beforeAll(async () => {
		nc = await natsClient.connect('nats://demo.nats.io:4222') // or mock connect
	})

	afterAll(async () => {
		await natsClient.close()
	})

	test('publish + subscribe works', done => {
		const sc = StringCodec()
		natsClient.subscribe('test.subject', msg => {
			expect(msg).toEqual({ foo: 'bar' })
			handlerCalled = true
			done()
		})
		natsClient.publish('test.subject', { foo: 'bar' })
	})

	test('close() actually closes', async () => {
		const before = nc.isClosed()
		await natsClient.close()
		expect(nc.isClosed()).toBe(true)
		// reconnect for other tests
		nc = await natsClient.connect('nats://demo.nats.io:4222')
	})
})

