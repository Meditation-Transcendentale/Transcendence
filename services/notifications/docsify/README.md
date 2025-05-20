- **Notifications service**
WS ws://${SERVER_ADDRESS}:${SERVER_PORT}?uuid=${UUID}
    -  Hosts the **Notification WebSocket** for users to receive friend requests, game invite and firend status changes
    -  Websocket sends: `friend_request`, `game_invite`, `status_change`
    -  Subscribes to `notification.${uuid}.add` or change the `user.addFriendRequest` to send `friend_request` to the requested friend
    -  Subscribes to something for the game invite to send `game_invite` to the invited one 
    -  Subscribes to `user.${uuid}.status` to send `status_change` to all the user's friends