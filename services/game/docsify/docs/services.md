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

