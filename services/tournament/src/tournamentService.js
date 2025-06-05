import config from './config.js'
import natsClient from './natsClient.js'



class MatchNode {
    constructor () {
        this.player1 = null; //playerId
        this.player2 = null; //playerId
        this.left = null; //MatchNode
        this.right = null; //MatchNode
        this.parent = null; //MatchNode
        this.winner = null; //playerId
    }

    setWinner(playerId) {
        this.winner = playerId;
        if (this.parent) this.parent.receiveWinner(playerId);
    }
    
    receiveWinner(playerId) {
        playerId == this.left.winner ? player1 = playerId : player2 = playerId;
    }
}

class Tournament {
    constructor({ id, players }) {
        this.id = id;
        this.players = new Map (shuffle(players), true); //uuid / bool(up)
        this.root = this.buildTree(this.players);
    }

    buildTournamentTree(players) {
        if (players.length === 0 || players.length % 2 !== 0) {
            throw new Error("Empty or odd playerlist");
        }
    
        const leaves = [];
        for (let i = 0; i < players.length; i += 2) {
            const node = new MatchNode();
            node.player1 = players[i];
            node.player2 = players[i + 1];
            leaves.push(node);
        }
    
        function pairMatches(nodes) {
            const nextRound = [];
            for (let i = 0; i < nodes.length; i += 2) {
                const parent = new MatchNode();
                const left = nodes[i];
                const right = nodes[i + 1];
                parent.left = left;
                parent.right = right;
                left.parent = parent;
                right.parent = parent;
                nextRound.push(parent);
            }
            return nextRound.length === 1 ? nextRound[0] : pairMatches(nextRound);
        }
    
        return pairMatches(leaves);
    }
}

export default class tournamentService {
    constructor() {
        this.tournaments = new Map();
        this.interval = setInterval(() => this.cleanup(),
        config.HEARTBEAT_INTERVAL
        )
    }

    create(players){
        const id = Date.now().toString();
        const tournament = new Tournament ({ id, players });
        this.tournaments.set(id, tournament);
    }

    cleanup() {
        const now = Date.now();
        for (const [id, lobby] of this.tournaments) {
            if (
                this.tournaments.players.size === 0 ||
                now - lobby.createdAt > config.HEARTBEAT_INTERVAL * 2
            ) {
                this.tournaments.delete(id);
            }
        }
    }

    shutdown() {
        clearInterval(this.interval);
    }
}

const shuffle = (players) => { 
    for (let i = players.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [players[i], players[j]] = [players[j], players[i]]; 
    } 
    return players; 
  }; 