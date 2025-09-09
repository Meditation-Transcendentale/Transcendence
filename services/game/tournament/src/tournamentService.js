    import config from './config.js';
import {
    decodeMatchEnd,
    encodeTournamentServerMessage, 
    encodeMatchCreateRequest,
    decodeMatchCreateResponse } from './proto/helper';
import natsClient from './natsClient.js';

class MatchNode {
    constructor() {
        this.player1 = null; //map object {uuid -> {isReady/isConnected/isEliminated/isInGame}}
        this.player2 = null; //map object {uuid -> {isReady/isConnected/isEliminated/isInGame}}
        this.left = null; //MatchNode
        this.right = null; //MatchNode
        this.parent = null; //MatchNode
        this.winner = null; //map object {uuid -> {isReady/isConnected/isEliminated/isInGame}}
        this.gameId = null; //string
        this.score = null; //int array
    }

    setResult(matchData) {
        this.score = matchData.score;
        this.winner = matchData.winnerId == 0 ? this.player1 : this.player2;
        this.player1.isReady = false;
        this.player2.isReady = false;
        const loser = matchData.winnerId == 0 ? this.player2 : this.player1;
        loser.isEliminated = true;
        this.player1.isInGame = false;
        this.player2.isInGame = false;
        if (this.parent) this.parent.receiveWinner(this.winner);
    }

    receiveWinner(newWinner) {
        newWinner == this.left.winner ? this.player1 = newWinner : this.player2 = newWinner;
    }

    *getActiveMatches() {
        function* traverse(node) {
            if (!node) return;

            if (node.player1 && !node.player1.isEliminated && node.player2 && !node.player2.isEliminated && !node.winner) {
                yield node;
                return;
            }

            yield* traverse(node.left);
            yield* traverse(node.right);
        }

        yield* traverse(this);
    }
}

class Tournament {
    constructor(id, players, uwsApp) {
        this.uwsApp = uwsApp;
        this.id = id;
        this.players = new Map(shuffle(players).map(p => [p, { isReady: false, isConnected: false, isEliminated: false, isInGame: false }]));
        this.root = this.buildTournamentTree(this.players);
        this.current_round = 0;

        const subTournamentEndGame = natsClient.subscribe('games.tournament.*.match.end');
        (async () => {
            for await (const msg of subTournamentEndGame) {
                const [, , gameId] = msg.subject.split(".");
                match = this.findMatchByGameId(this.root, gameId);
                if (!match) { return; }
                const data = decodeMatchEnd(msg.data);
                match.setResult(data);
                if (match == this.root) continue;
                sendUpdate();
                if (areAllMatchesFinished()) sendReadyCheck();
            }
        })
    }

    sendReadyCheck() {
        const readyBuf = encodeServerMessage({});
        this.uwsApp.publish(this.id, readyBuf, true);
    }

    sendUpdate() {
        const updateBuf = encodeServerMessage({
            update: {
                tournamentId: this.id,
                players: [...this.players.entries()].map(([player_uuid, playerData]) => ({
                    uuid: player_uuid,
                    isReady: playerData.isReady,
                    isConnected: playerData.isConnected,
                    isEliminated: playerData.isEliminated,
                    isInGame: playerData.isInGame
                })),
                tournamentRoot: this.root
            }
        });
        this.uwsApp.publish(this.id, updateBuf, true);
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

    getState() {
        return {
            tournamentId: this.id,
            players: [...this.players.entries()].map(([player_uuid, isReady, isConnected, isEliminated]) => ({
                uuid: player_uuid,
                ready: isReady,
                connected: isConnected,
                eliminated: isEliminated
            })),
            tree: this.root
        }
    }

    areAllMatchesFinished() {
        return [...this.players.values()]
            .every(playerData => !playerData.isInGame);
    }

    getPlayerByUuid(uuid) {
        return this.players.get(uuid);
    }

    allNonEliminatedPlayersReady() {
        return [...this.players.values()]
            .filter(playerData => !playerData.isEliminated)
            .every(playerData => playerData.isReady);
    }

    addPlayer(userId) {
        if (this.players.has(userId)) {
            throw new Error(`Player already in tournament`)
        }
        natsClient.publish(`notification.${userId}.status`, encodeStatusUpdate({ sender: userId, status: "in tournament", option: this.id }));
        this.players.set(userId, { isReady: false, isConnected: true, isEliminated: false })
    }
}

export default class tournamentService {
    constructor() {
        this.tournaments = new Map();
        this.interval = setInterval(() => this.cleanup(),
            config.HEARTBEAT_INTERVAL
        )
    }

    create(players, uwsApp) {
        const id = Date.now().toString();
        const tournament = new Tournament(id, players, uwsApp);
        this.tournaments.set(id, tournament);
        return (id);
    }

    join(tournamentId, userId) {
        const tournament = this.tournaments.get(tournamentId)
        if (!tournamentId) throw new Error('Lobby not found')
        tournament.addPlayer(userId)
        return tournament.getState()
    }

    quit(tournamentId, userId) {
        const tournament = this.tournaments.get(tournamentId)
        if (!tournament) return null
        const player = tournament.player.get(userId);
        if (!player) return null;
        player.isConnected = false;
        player.isEliminated = false;
        tournament.sendUpdate();
        return tournament.getState();
    }



    async ready(ws, tournamentId, playerId) {
        const tournament = this.tournaments.get(tournamentId);
        if (!tournament) throw new Error('Tournament not found');

        const player = tournament.players.get(playerId);
        if (!player) throw new Error('Player not in tournament')

        player.isReady = true;

        tournament.sendUpdate();

        if (tournament.allNonEliminatedPlayersReady()) {
            for (const match of tournament.root.getActiveMatches()) {
                const reqBuf = encodeMatchCreateRequest({
                    players: [match.player1.key, match.player2.key],
                });
                try {
                    const replyBuf = await natsClient.request(
                        `games.tournament.match.create`,
                        reqBuf, {}
                    );
                    const resp = decodeMatchCreateResponse(replyBuf);
                    match.gameId = resp.gameId;
                    const startBuf = encodeTournamentServerMessage({
                        startGame: {
                            gameId: match.gameId
                        }
                    });
                    ws.send(startBuf, true);
                }
                catch (err) {
                    const buf = encodeTournamentServerMessage({ error: { message: err.message } });
                    ws.send(buf, true);
                }
            }
        }
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


    getTournament(tournamentId) {
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
