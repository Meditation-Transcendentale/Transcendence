// tests/message.test.js
import path from 'path'
import protobuf from 'protobufjs'
import {
	encodeUserStatus,
	encodeMatchCreateRequest,
	decodeMatchCreateResponse,
	decodeClient,
	encodeError,
	encodeStart,
	encodeUpdate,
	// if you have other helpers, import them here
} from '../src/proto/message.js'

describe('Protobuf encode/decode round-trip', () => {
	let root, UserStatus, MatchCreateRequest, MatchCreateResponse
	let ClientMessage, ErrorMessage, StartMessage, UpdateMessage

	beforeAll(() => {
		root = protobuf.loadSync(path.resolve(__dirname, '../src/proto/lobby.proto'))
		UserStatus = root.lookupType('lobby.UserStatus')
		MatchCreateRequest = root.lookupType('lobby.MatchCreateRequest')
		MatchCreateResponse = root.lookupType('lobby.MatchCreateResponse')
		ClientMessage = root.lookupType('lobby.ClientMessage')
		ErrorMessage = root.lookupType('lobby.ErrorMessage')
		StartMessage = root.lookupType('lobby.StartMessage')
		UpdateMessage = root.lookupType('lobby.UpdateMessage')
	})

	test('UserStatus encode/decode', () => {
		const obj = { uuid: 'u1', lobbyId: 'l1', status: 'joined' }
		const buf = encodeUserStatus(obj)
		const msg = UserStatus.decode(buf)
		expect(msg.uuid).toBe(obj.uuid)
		expect(msg.lobbyId).toBe(obj.lobbyId)
		expect(msg.status).toBe(obj.status)
	})

	test('MatchCreateRequest/Response', () => {
		const reqPlayers = ['u1', 'u2', 'u3']
		const reqBuf = encodeMatchCreateRequest({ players: reqPlayers })
		const reqMsg = MatchCreateRequest.decode(reqBuf)
		expect(reqMsg.players).toEqual(reqPlayers)

		// simulate a response
		const respObj = { gameId: 'game-123' }
		const respBuf = MatchCreateResponse.encode(MatchCreateResponse.create(respObj)).finish()
		const out = decodeMatchCreateResponse(respBuf)
		expect(out.gameId).toBe(respObj.gameId)
	})

	test('ClientMessage decode (ReadyMessage)', () => {
		// build raw ClientMessage
		const payload = { ready: { lobbyId: 'l1' } }
		const cm = ClientMessage.create({ ready: payload.ready })
		const buf = ClientMessage.encode(cm).finish()

		const decoded = decodeClient(buf)
		expect(decoded.ready.lobbyId).toBe('l1')
		expect(decoded.quit).toBeUndefined()
	})

	test('ErrorMessage encode', () => {
		const buf = encodeError('oops')
		const msg = ErrorMessage.decode(buf)
		expect(msg.message).toBe('oops')
	})

	test('StartMessage encode', () => {
		const obj = { lobbyId: 'l1', gameId: 'g1', map: 'arena' }
		const buf = encodeStart(obj)
		const msg = StartMessage.decode(buf)
		expect(msg.lobbyId).toBe(obj.lobbyId)
		expect(msg.gameId).toBe(obj.gameId)
		expect(msg.map).toBe(obj.map)
	})

	test('UpdateMessage encode', () => {
		const players = [
			{ uuid: 'u1', ready: false },
			{ uuid: 'u2', ready: true },
		]
		const obj = { lobbyId: 'l1', players, status: 'waiting' }
		const buf = encodeUpdate(obj)
		const msg = UpdateMessage.decode(buf)

		expect(msg.lobbyId).toBe(obj.lobbyId)
		expect(msg.status).toBe(obj.status)
		expect(msg.players.map(p => ({ uuid: p.uuid, ready: p.ready })))
			.toEqual(players)
	})
})

