
| Service               | Method | Path                        | Purpose                                  |
|-----------------------|--------|-----------------------------|------------------------------------------|
| **Lobby Manager**     | POST   | `/lobby/create`                  | Create a new custom lobby                |
| **Lobby Manager**     | GET    | `/lobby/list`                  | List all active lobbies                  |
| **Lobby Manager**     | GET    | `/lobby/{id}`             | Get lobby details (players, status, etc.)|

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
