import { decodeMatchCreateRequest } from '../../game/game-manager/src/proto/helper.js';
import { decodeMatchCreateResponse, encodeMatchCreateRequest } from '../../game/lobby-manager/src/proto/helper.js';
import config from './config.js'
import natsClient from './natsClient.js'



class MatchNode {
    constructor () {
        this.player1 = null; //tournament.players
        this.player2 = null; //tournament.players
        this.left = null; //MatchNode
        this.right = null; //MatchNode
        this.parent = null; //MatchNode
        this.winner = null; //tournament.players
        this.gameId = null;
        this.score = null;
        this.round = null;
    }

    setWinner(playerId) {
        this.winner = playerId;
        this.winner.ready = false;
        if (this.parent) this.parent.receiveWinner(playerId);
    }
    
    receiveWinner(playerId) {
        playerId == this.left.winner ? player1 = playerId : player2 = playerId;
    }
}

class Tournament {
    constructor({ nc, id, players }) {
        this.nc = nc;
        this.id = id;
        this.players = new Map(shuffle(players).map(p => [{ uuid: p }, { ready: false }]));
        this.root = this.buildTree(this.players);
        this.current_round = 0;

        const subTournamentEndGame = nc.subscribe ('games.tournament.*.match.end');
        (async () => {
            for await (const msg of subTournamentEndGame) {
                //const decode msg.data somehow
                const [, , gameId] = msg.subject.split(".");
                match = this.findMatchByGameId(this.root, gameId);
                if (!match) { return; }
                //match.setWinner(msg.data)//will see what there is in the msg
                //if (match == this.root)
                //end of tournament, return;
                //if it was the last game from this round, send ready-check 
            }
        })
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

    findMatchByPlayer(root, playerId) {
        if (!root) return null;
    
        if (root.player1 === playerId || root.player2 === playerId) return root;
    
        const leftResult = findMatchByPlayer(root.left, playerId);
        if (leftResult) return leftResult;
    
        return findMatchByPlayer(root.right, playerId);
    }

    findMatchByGameId(root, gameId) {
        if (!root) return null;
    
        if (root.gameId == gameId) return root;
    
        const leftResult = findMatchByGameId(root.left, gameId);
        if (leftResult) return leftResult;
    
        return findMatchByGameId(root.right, gameId);
    }

    markReady(playerId){
        const player = this.players.get(playerId);
        if (!p) throw new Error('Player not in tournament');
        player.ready = true;  
    }

    getState() { //NEED TO CREATE THE ENCODE/DECODE
		return {
			tournamentId: this.id,
			players: [...this.players.entries()].map(([uuid, { isReady }]) => ({
				uuid,
				ready: isReady,
			})),
            tree: this.root
		}
	}

}

export default class tournamentService {
    constructor(nc) {
        this.tournaments = new Map();
        this.interval = setInterval(() => this.cleanup(),
            config.HEARTBEAT_INTERVAL
        )
        this.nc = nc;
    }

    create(players){
        const id = Date.now().toString();
        const tournament = new Tournament ({ id, players });
        this.tournaments.set(id, tournament);
        return (id)
    }

    async ready (tournamentId, playerId) {
        const tournament = this.tournaments.get(tournamentId);
        if (!tournament) throw new Error('Tournament not found');

        const player = tournament.players.get(playerId);
        if (!player) throw new Error ('Player eliminated | not in tournament')

        const match = tournament.findMatchByPlayer(playerId);
        if (!match) throw new Error ('Match not found')

        tournament.markReady(playerId);
        
        const state = tournament.getState(); //players + tree

        if (match.player1.ready && match.player2.ready)
        {
            const reqBuf = encodeMatchCreateRequest({
                players: [match.player1.uuid, match.player2.uuid],
            })
            try {
                const replyBuf = await natsClient.request(
                    `games.online.match.create`,
                    reqBuf, {}
                )
                const resp = decodeMatchCreateResponse(replyBuf);
                match.gameId = resp.gameId;
                
                //send
            } catch (err) {
                console.error ('Failed to create game:', err);
            }
        }

        return state
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