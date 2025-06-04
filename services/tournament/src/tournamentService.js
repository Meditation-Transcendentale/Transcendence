import config from './config.js'
import natsClient from './natsClient.js'

class MatchNode {
    constructor () {
        this.player1 = null;
        this.player2 = null;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.winner = null;
    }

    setWinner(playerId) {
        this.winner = playerId;
        if (this.parent) this.parent.receiveWinner(playerId);
      }
    
    receiveWinner(playerId) {

    }
}

class Tournament {
    constructor({ id, players }) {
        this.id = id;
        this.players = new Map (players, true); //uuid / bool(up)
        this.matches = [];
        this.root = this.buildTree(this.players.length());
    }

    buildTree(numPlayers) {
        const numMatches = numPlayers - 1;
        const nodes = [];
    
        for (let i = 0; i < numMatches; i++) {
            nodes.push(new MatchNode());
        }
      }
}

export default class tournamentService {
    constructor(id) {
        this.id = id;
        this._tournaments = new Map();
        this._interval = setInterval(() => this.cleanup(),
        config.HEARTBEAT_INTERVAL
        )
    }

    cleanup() {
        const now = Date.now();
        for (const [id, lobby] of this.tournaments) {
            if (
                tournaments.players.size === 0 ||
                now - lobby.createdAt > config.HEARTBEAT_INTERVAL * 2
            ) {
                this.tournaments.delete(id);
            }
        }
    }

    shutdown() {
        clearInterval(this._interval);
    }
}