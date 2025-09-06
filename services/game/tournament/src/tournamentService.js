import config from './config.js';
import { decodeMatchEnd } from './proto/helper';

class MatchNode {
    constructor() {
        this.player1 = null; //uuid
        this.player2 = null; //uuid
        this.left = null; //MatchNode
        this.right = null; //MatchNode
        this.parent = null; //MatchNode
        this.winner = null; //uuid
        this.gameId = null;
        this.score = null;
        this.depth = null;
    }

    setResult(matchData) {
        this.score = matchData.score;
        this.winner = matchData.winnerId == 0 ? player1 : player2;
        if (this.parent) this.parent.receiveWinner(this.winner);
    }

    receiveWinner(playerId) {
        playerId == this.left.winner ? player1 = playerId : player2 = playerId;
    }
}

class Tournament {
    constructor(nc, jc, id, players, uwsApp) {
        this.nc = nc;
        this.jc = jc;
        this.uwsApp = uwsApp;
        this.id = id;
        this.players = new Map(shuffle(players).map(p => [p, { ready: false }]));
        this.root = this.buildTournamentTree(this.players);
        this.current_round = 0;

        const subTournamentEndGame = nc.subscribe('games.tournament.*.match.end');
        (async () => {
            for await (const msg of subTournamentEndGame) {
                const [, , gameId] = msg.subject.split(".");
                match = this.findMatchByGameId(this.root, gameId);
                if (!match) { return; }
                const data = decodeMatchEnd(msg.data);
                match.setResult(data);
                if (match == this.root) {
                    sendGgwp();
                    return;
                }
                if (!areAllMatchesFinishedAtDepth(this.root, match.depth)) {
                    this.sendReadyCheck();
                    this.sendUpdate();
                }
            }
        })
    }

    sendGgwp() {
        const ggwpBuf = this.jc.encode({
            type: `ggwp`,
            winnerUuid: this.winner
        });
        this.uwsApp.publish(this.id, ggwpBuf);
    }

    sendReadyCheck() {
        const readyBuf = this.jc.encode({
            type: `ready_check`
        });
        [...this.players.keys()].forEach((key) => {
            this.players.set(key, false);
        });
        this.uwsApp.publish(this.id, readyBuf);
    }

    sendUpdate() {
        const updateBuf = this.jc.encode({
            type: `update`,
            players: [...this.players.entries()].map(([player_uuid, isReady]) => ({
                uuid: player_uuid,
                ready: isReady,
            })),
            tree: this.root
        });
        this.uwsApp.publish(this.id, updateBuf);
    }

    buildTournamentTree(players) {
        if (players.length === 0 || players.length % 2 !== 0) {
            throw new Error("Empty or odd playerlist");
        }

        const leaves = [];
        for (let i = 0; i < players.length; i += 2) {
            const node = new MatchNode();
            node.player1 = players[i].key;
            node.player2 = players[i + 1].key;
            leaves.push(node);
        }
        function pairMatches(nodes, depth) {
            const nextRound = [];
            for (let i = 0; i < nodes.length; i += 2) {
                const parent = new MatchNode();
                parent.depth = depth;
                const left = nodes[i];
                const right = nodes[i + 1];
                parent.left = left;
                parent.right = right;
                left.parent = parent;
                right.parent = parent;
                nextRound.push(parent);
            }
            return nextRound.length === 1 ? nextRound[0] : pairMatches(nextRound, depth + 1);
        }

        return pairMatches(leaves, 0);
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

    markReady(playerId) {
        const player = this.players.get(playerId);
        if (!p) throw new Error('Player not in tournament');
        player.ready = true;
    }

    getState() {
        return {
            tournamentId: this.id,
            players: [...this.players.entries()].map(([player_uuid, isReady]) => ({
                uuid: player_uuid,
                ready: isReady,
            })),
            tree: this.root
        }
    }

    getNodesAtDepth(root, targetDepth) {
        const result = [];

        function traverse(node) {
            if (!node) return;
            if (node.depth === targetDepth) result.push(node);
            else {
                traverse(node.left);
                traverse(node.right);
            }
        }

        traverse(root);
        return result;
    }

    areAllMatchesFinishedAtDepth(root, depth) {
        const nodes = getNodesAtDepth(root, depth);
        return nodes.every(node => node.winner !== null);
    }

    getPlayerByUuid(uuid) {
        return this.players.get(uuid);
    }

}

export default class tournamentService {
    constructor(nc, jc) {
        this.tournaments = new Map();
        this.interval = setInterval(() => this.cleanup(),
            config.HEARTBEAT_INTERVAL
        )
        this.nc = nc;
        this.jc = jc;
    }

    create(players, uwsApp) {
        const id = Date.now().toString();
        const tournament = new Tournament(this.nc, this.jc, id, players, uwsApp);
        this.tournaments.set(id, tournament);
        return (id);
    }

    async ready(tournamentId, playerId) {
        const tournament = this.tournaments.get(tournamentId);
        if (!tournament) throw new Error('Tournament not found');

        const player = tournament.players.get(playerId);
        if (!player) throw new Error('Player eliminated | not in tournament')

        const match = tournament.findMatchByPlayer(playerId);
        if (!match) throw new Error('Match not found')

        tournament.markReady(playerId);

        tournament.sendUpdate();

        const state = tournament.getState();

        if (tournament.getPlayerByUuid(match.player1_uuid).ready && tournament.getPlayerByUuid(match.player2_uuid).ready) { //add MatchCreate encode/decode functions
            const reqBuf = encodeMatchCreateRequest({
                players: [match.player1.uuid, match.player2.uuid],
            })
            try {
                const replyBuf = await natsClient.request(
                    `games.tournament.match.create`,
                    reqBuf, {}
                )
                const resp = decodeMatchCreateResponse(replyBuf);
                match.gameId = resp.gameId;

                //send
            } catch (err) {
                console.error('Failed to create game:', err);
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

    getTournament(tournamentId){
        return (this.tournaments.get(tournamentId));
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
