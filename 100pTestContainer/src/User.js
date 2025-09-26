// USER CLASS


export class User {

	constructor(uuid, lobbyId) {
		this.uuid = uuid;
		this.lobbyId = lobbyId;
		this.tournamentId = null;
		this.gameId = null;
	}

	get uuid() { return this.uuid; };
	get lobbyId() { return this.lobbyId; };
	get tournamentId() { return this.tournamentId; };
	get gameId() { return this.gameId; };


	set tournamentId(tournamentId) { this.tournamentId = tournamentId; };
	set gameId(gameId) { this.gameId = gameId };
}
