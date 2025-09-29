// USER CLASS

export class User {
  constructor(uuid, lobbyId) {
	this.uuid = uuid;
	this.lobbyId = lobbyId;
	this.tournamentId = null;
	this.gameId = null;
  }

  setTournamentId(newTournamentId) {
    this.tournamentId = newTournamentId;
  }
  
  setGameId(newGameId) {
    this.gameId = newGameId;
  }
}
