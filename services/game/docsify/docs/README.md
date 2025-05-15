# Pong App Server Architecture

This document provides an overview of the server-side architecture, including service responsibilities, HTTP & WebSocket endpoints, NATS subjects, and typical request flows.

---

## 1. Service Overview

- **Lobby Manager Service**  
WS ws://${SERVER_ADDRESS}:${SERVER_PORT}?uuid=${UUID}&lobbyId=${lobbyId}
  - Hosts the **Lobby WebSocket** for players to join, setup game, signal readiness, and detect disconnects
  - HTTP `/lobby` endpoints : `/list`, `/create`, `/:id`
  - Websocket send :  `update`(lobby.update), `start`, `error`,
  - Websocket message: `join`, `ready`, `quit`
  - When all players are ready, publishes `game.${mode}.match.create` with a custom lobby template
  - When players join / leave a lobby, publishes `user.${uuid}.status.${new_status}`

- **Tournament Service**
  - todo

- **Matchmaking Service**  
  - Manages fixed‐mode queues in memory
  - When enough players match, publishes `game.${mode}.match.create` with fixed game template

- **Game Manager Service**  
  - Authoritative game-state controller
  - Subscribes to `game.${mode}.match.create`  events to spin up new games and respond
  - Subscribes to `game.${mode}.${gameId}.match.start` start tick loop game 
  - Subscribes to `game.${mode}.${gameId}.match.quit` start tick loop game 
  - Subscribes to `game.${mode}.${gameId}.match.input` handle user game input 

  - Publishes to `game.${mode}.${gameId}.match.setup` to prepare game and wait for players connection 
  - Publishes to `game.${mode}.${gameId}.match.end` end game
  - Publishes state deltas on old=`games.${match.mode}.${gameId}.state.update` new=`game.${mode}.${gameId}.match.state`
  - Publishes client stats on game end `user.${uuid}.stats` 
  
  - Request nats `game.${mode}.${gameId}.physics.request` request new tick to proper physic service and await result

- **Physics Services** (×3: `pong`, `pongBR`, `pongIO`)  
  - Listen on `physics.request.{mode}`
  - Subscribes to `game.*.*.match.end` to end game and clean it 
  - Compute physics ticks and return via `physics.response.{mode}`

- **User Interface Service**  

WS ws://${SERVER_ADDRESS}:${SERVER_PORT}?uuid=${UUID}&gameId=${GAMEID}&role=${ROLE}
  - Hosts the **Game uWebSocket.js** for real-time gameplay (inputs + state updates + event)
  - Websocket send : `welcome`, `error`, `stateUpdate`, `gameEnd`, `gameStart`
  - Websocket message: `paddleUpdate`, `quit`, `spectate`, `ready` 
  - Subscribes to `game.*.*.match.state` and pushes to connected clients
  - Subscribes to `game.*.*.match.setup` to prepare game and wait for players connection 
  - Subscribes to `game.*.*.match.end` to end game and clean it 
  - Publishes client inputs to `game.${mode}.${gameId}.match.input` 
  - Publishes client quit to `game.${mode}.${gameId}.match.quit` 
  - Publishes game start when all players are connected `game.${mode}.${gameId}.match.start` 
  - Publishes client status on connection/in game / in disconnects/ to `user.${uuid}.status.${new_status}` 

- **IA Service**  
  - Manages bot instances that connect over the Game WebSocket just like human clients

---

## 2. HTTP Endpoints

| Service               | Method | Path                        | Purpose                                  |
|-----------------------|--------|-----------------------------|------------------------------------------|
| **Lobby Manager**     | GET    | `/lobby/list`                  | List all active lobbies                  |
| **Lobby Manager**     | POST   | `/lobby/create`                  | Create a new custom lobby                |
| **Lobby Manager**     | GET    | `/lobby/{id}`             | Get lobby details (players, status, etc.)|
| **Matchmaking Service** | POST   | `/matchmaking/{game_type}/join`        | Enqueue player for quick match           |
| **Matchmaking Service** | POST   | `/matchmaking/{game_type}/leave`        | Remove player from matchmaking queue     |

### `Lobby Manager GET` `/lobby/list`

> **Purpose:** _List all active lobbies._

<details>
<summary>Request</summary>
_No body_
</details>

<details>
<summary>Response (Code to define)</summary>

[schemas/lobby-list.response.json](/schemas/lobby-list.response.json ':include :type=code json')

</details>

<details>
<summary>Errors</summary>

- `400 Bad Request` – when required fields are missing or invalid  
- `404 Not Found` – if the resource doesn’t exist  
- etc.
</details>

### `Lobby Manager POST` `/lobby/create`

> **Purpose:** _Create a new lobby (for online modes) or immediately start a game (for local/AI modes)._

| Field     | Type                         | Description                                                      |
|-----------|------------------------------|------------------------------------------------------------------|
| `mode`    | `"pong"` \| `"pongIO"` \| `"pongBR"`  | Which game mode to play.                                        |
| `map`     | `string`                     | Identifier of the map or arena.                                  |
| `submode` | `"local"` \| `"vs-ia"` \| `"online"` | *Only when* `mode == "pong"`.  `"local"`: two players on same keyboard `"vs-ia"`: single player vs. bot `"online"`: create a lobby others can join |

<details>
<summary>Request</summary>

```json
{
  "mode": "pong | pongIO | pongBR",
  "map": "classic",
  "submode": "local | vs-ia | online"
}
```
</details>

<details>
<summary>Response (Code to define)</summary>

```json
{
  "lobbyId": "string"
}
```

</details>

<details>
<summary>Errors</summary>

- `400 Bad Request` – when required fields are missing or invalid  
- `404 Not Found` – if the resource doesn’t exist  
- etc.
</details>
---

## 3. WebSocket: Lobby

**URL:** `ws://your-host/lobbies/{lobbyId}`  
**Purpose:** manage lobby membership, readiness, disconnects  

### Client → Server Messages

| Type        | Payload                                   | Description                              |
|-------------|-------------------------------------------|------------------------------------------|
| `join`      | ```json{ "userId": "string" }```        | Player joins the lobby                   |
| `ready`     | ```json{ "userId": "string" }```        | Player signals ready                     |
| `heartbeat` | ```json{ "userId": "string" }```        | Keep-alive to detect disconnects         |
| `launch` | ```json{ "userId": "string" }```        | Keep-alive to detect disconnects         |
| …           | …                                         | …                                        |

### Server → Client Messages

| Type           | Payload                                                       | Description                               |
|----------------|---------------------------------------------------------------|-------------------------------------------|
| `lobby.update` | ```json{ "players": ["u1","u2"], "status": "waiting" }```  | Current lobby state                       |
| `start`        | ```json{ "gameId": "string", "settings": {…} }```           | Lobby is full and game is about to start  |
| …              | …                                                             | …                                         |

---

## 4. WebSocket: Game-Play

**URL:** `ws://your-host/games/{gameId}`  
**Purpose:** real-time paddle inputs & state deltas  

### Client → Server Messages

| Type    | Payload                                         | Description                     |
|---------|-------------------------------------------------|---------------------------------|
| `input` | ```json{ "direction": "up" or "down" }```      | Player paddle movement         |
| `ping`  | ```json{ "ts": 123456789 }```                 | Latency measurement            |
| …       | …                                               | …                               |

### Server → Client Messages

| Type    | Payload                                                                 | Description                    |
|---------|-------------------------------------------------------------------------|--------------------------------|
| `state` | ```json{ "ball": {…}, "paddles": […], "scores": {…}, "ts": 123 }```    | Full or delta game state       |
| `pong`  | ```json{ "ts": 123456789 }```                                         | Response to ping               |
| …       | …                                                                       | …                              |

---

## 5. NATS Subjects

| Subject                   | Pattern                     | I/O       | Publisher           | Subscriber             | Purpose                             |
|---------------------------|-----------------------------|-----------|---------------------|------------------------|-------------------------------------|
| `game.create`             | (static)                    | pub/sub   | Lobby, Matchmaking  | Game Manager           | Spin up a new game instance         |
| `physics.request.{mode}`  | mode ∈ {pong,pongBR,pongIO} | req/rep   | Game Manager        | Physics Service (mode) | Send inputs+state → physics engine  |
| `physics.response.{mode}` | mode ∈ {…}                  | req/rep   | Physics Service     | Game Manager           | Physics engine tick result          |
| `state.update.{gameId}`   | `{gameId}`                  | pub/sub   | Game Manager        | UI Service             | Broadcast authoritative state delta |
| `game.input.{gameId}`     | `{gameId}`                  | pub/sub   | UI Service          | Game Manager           | Forward player inputs               |
| …                         | …                           | …         | …                   | …                      | …                                   |

---

### Subject: `game.create`

> **I/O:** publish/subscribe  
> **Publisher:** Lobby Manager or Matchmaking Service  
> **Subscriber:** Game Manager Service  
> **Purpose:** Instructs the Game Manager to create a new game instance with given settings.

```json
{
  "mode": "pong" | "pongBR" | "pongIO",
  "players": ["user1","user2"],
  "settings": {
    // any extra options: map name, ball speed, etc.
  }
}
```

## 6. Typical Request Flows

### A) Custom Lobby Path
1. **Join Lobby**: Client ↔️ Lobby WS ▶ `join` message
2. **Heartbeat & Ready**: WS heartbeats; clients send `ready` when prepared
3. **All Ready**: Lobby Manager emits `game.create { custom template }`
4. **Game Creation**: Game Manager creates instance, returns `gameId` + init state
5. **Switch WS**: Clients disconnect lobby WS, connect to Game WS
6. **Gameplay**: UI WS ⇄ Game Manager ⇄ Physics Services

### B) Quick-Match Path
1. **Enqueue**: Client → HTTP POST `/matchmaking/join`
2. **Queue**: Matchmaking holds players until queue full
3. **Matched**: Matchmaking publishes `matchmaking.matched { template }`
4. **Game Creation**: Lobby (or Matchmaking) triggers `game.create`
5. **Connect**: Clients connect to Game WS with returned `gameId`
6. **Gameplay**: UI WS ⇄ Game Manager ⇄ Physics Services

---

[/schemas/game-create.schema.json](/schemas/game-create.schema.json ':include :type=code json')

