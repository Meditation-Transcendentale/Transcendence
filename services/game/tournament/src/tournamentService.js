import config from './config.js';
import {
    decodeMatchEnd,
    encodeTournamentServerMessage,
    encodeMatchCreateRequest,
    decodeMatchCreateResponse
} from './proto/helper.js';
import natsClient from './natsClient.js';

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class MatchNode {
    constructor() {
        this.player1Id = null;
        this.player2Id = null;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.winnerId = null;
        this.gameId = null;
        this.score = null;
        this.creating = false;
    }

    setResult(matchData) {
        this.score = matchData.score ?? null;
        this.winnerId = matchData.winnerId === 0 ? this.player1Id : this.player2Id;
        if (this.parent) this.parent.receiveWinner(this.winnerId);
    }

    receiveWinner(childWinnerId) {
        if (this.left && this.left.winnerId === childWinnerId) this.player1Id = childWinnerId;
        else this.player2Id = childWinnerId;
    }

    *getActiveMatches() {
        function* traverse(node) {
            if (!node) return;
            const readyToStart = !!node.player1Id && !!node.player2Id && !node.gameId && !node.winnerId;
            if (readyToStart) {
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
    constructor(id, playerIds, uwsApp) {
        this.id = id;
        this.uwsApp = uwsApp;

        this.players = playerIds.map((id) => ({
            id,
            isReady: false,
            isConnected: false,
            isEliminated: false
        }));

        this.root = this.buildTournamentTree();
        this.createdAt = Date.now();

        this.readyActive = false;
        this.readyDeadlineMs = 0;
        this.readyTimer = null;

        this.scheduling = false;

        natsClient.subscribe('games.tournament.*.match.end', (data, msg) => {
            const parts = String(msg.subject || '').split('.');
            const gameId = parts[2];
            if (!gameId) return;

            const match = this.findMatchByGameId(this.root, gameId);
            if (!match) return;

            const decoded = decodeMatchEnd(data);
            match.setResult(decoded);

            this.autoAdvanceWalkovers();
            this.sendUpdate();
            this.maybeStartReadyCheck();
        });
    }

    sendReadyCheck() {
        for (const p of this.players) {
            if (!p.isEliminated) p.isReady = false;
        }
        this.readyActive = true;
        this.readyDeadlineMs = Date.now() + 20_000;
        if (this.readyTimer) clearTimeout(this.readyTimer);
        this.readyTimer = setTimeout(() => this.handleReadyTimeout(), 20_000);

        const buf = encodeTournamentServerMessage({
            readyCheck: { deadlineMs: this.readyDeadlineMs }
        });
        this.uwsApp.publish(this.id, buf, true);
        this.sendUpdate();
    }

    sendUpdate() {
        const buf = encodeTournamentServerMessage({
            update: {
                tournamentRoot: this.root,
                players: this.players.map((p) => ({
                    uuid: p.id,
                    ready: p.isReady,
                    connected: p.isConnected,
                    eliminated: p.isEliminated
                }))
            }
        });
        this.uwsApp.publish(this.id, buf, true);
    }

    buildTournamentTree() {
        if (this.players.length === 0) throw new Error('Empty player list');
        if (this.players.length % 2 !== 0) throw new Error('Odd player count not supported');

        const ids = this.players.map((p) => p.id);
        const leaves = [];
        for (let i = 0; i < ids.length; i += 2) {
            const node = new MatchNode();
            node.player1Id = ids[i];
            node.player2Id = ids[i + 1];
            leaves.push(node);
        }

        function pair(nodes) {
            const next = [];
            for (let i = 0; i < nodes.length; i += 2) {
                const parent = new MatchNode();
                const left = nodes[i];
                const right = nodes[i + 1];
                parent.left = left;
                parent.right = right;
                left.parent = parent;
                right.parent = parent;
                next.push(parent);
            }
            return next.length === 1 ? next[0] : pair(next);
        }

        return pair(leaves);
    }

    findMatchByPlayer(root, playerId) {
        if (!root) return null;
        if (root.player1Id === playerId || root.player2Id === playerId) return root;
        const l = this.findMatchByPlayer(root.left, playerId);
        if (l) return l;
        return this.findMatchByPlayer(root.right, playerId);
    }

    findMatchByGameId(root, gameId) {
        if (!root) return null;
        if (root.gameId === gameId) return root;
        const l = this.findMatchByGameId(root.left, gameId);
        if (l) return l;
        return this.findMatchByGameId(root.right, gameId);
    }

    getPlayerByUuid(uuid) {
        return this.players.find((p) => p.id === uuid) || null;
    }
    allConnected() {
        return this.players.every((p) => p.isConnected || p.isEliminated);
    }
    allNonEliminatedPlayersReady() {
        const alive = this.players.filter((p) => !p.isEliminated);
        return alive.length > 0 && alive.every((p) => p.isReady);
    }
    hasAnyActiveMatch() {
        const it = this.root.getActiveMatches();
        return !it.next().done;
    }

    maybeStartReadyCheck() {
        if (this.readyActive) return;
        if (!this.allConnected()) return;
        if (this.hasAnyActiveMatch()) this.sendReadyCheck();
    }

    async handleReadyTimeout() {
        this.readyTimer = null;

        for (const match of this.root.getActiveMatches()) {
            const p1 = this.getPlayerByUuid(match.player1Id);
            const p2 = this.getPlayerByUuid(match.player2Id);
            const r1 = !!p1 && !p1.isEliminated && p1.isReady;
            const r2 = !!p2 && !p2.isEliminated && p2.isReady;

            if (r1 && r2) {
            } else if (r1 && !r2) {
                if (p2 && !p2.isEliminated) p2.isEliminated = true;
                match.setResult({ winnerId: 0, score: { forfeit: true } });
            } else if (!r1 && r2) {
                if (p1 && !p1.isEliminated) p1.isEliminated = true;
                match.setResult({ winnerId: 1, score: { forfeit: true } });
            } else {
                if (p1 && !p1.isEliminated) p1.isEliminated = true;
                if (p2 && !p2.isEliminated) p2.isEliminated = true;
            }
        }

        this.autoAdvanceWalkovers();
        await this.scheduleReadyMatches();
        this.readyActive = false;
        this.sendUpdate();
        this.maybeStartReadyCheck();
    }

    subtreeHasEligible(node) {
        if (!node) return false;
        if (node.winnerId) return true;
        if (!node.left && !node.right) {
            const a = node.player1Id ? this.getPlayerByUuid(node.player1Id) : null;
            const b = node.player2Id ? this.getPlayerByUuid(node.player2Id) : null;
            const ae = !!a && !a.isEliminated;
            const be = !!b && !b.isEliminated;
            return ae || be;
        }
        return this.subtreeHasEligible(node.left) || this.subtreeHasEligible(node.right);
    }

    autoAdvanceWalkovers() {
        let changed = true;
        while (changed) {
            changed = false;
            const visit = (node) => {
                if (!node || node.winnerId) return;
                visit(node.left);
                visit(node.right);
                if (!node.left || !node.right) return;

                const leftEligible = this.subtreeHasEligible(node.left);
                const rightEligible = this.subtreeHasEligible(node.right);

                if (!leftEligible && node.right.winnerId) {
                    node.winnerId = node.right.winnerId;
                    if (node.parent) node.parent.receiveWinner(node.winnerId);
                    changed = true;
                } else if (!rightEligible && node.left.winnerId) {
                    node.winnerId = node.left.winnerId;
                    if (node.parent) node.parent.receiveWinner(node.winnerId);
                    changed = true;
                }
            };
            visit(this.root);
        }
    }

    async scheduleReadyMatches() {
        if (this.scheduling) return;
        this.scheduling = true;
        try {
            const candidates = [];
            for (const m of this.root.getActiveMatches()) {
                candidates.push(m);
                console.log("ADD CANDIDATE");
            }

            for (const match of candidates) {
                if (!match || match.creating || match.gameId) continue;

                const p1 = this.getPlayerByUuid(match.player1Id);
                const p2 = this.getPlayerByUuid(match.player2Id);
                if (!p1 || !p2) continue;
                if (p1.isEliminated || p2.isEliminated) continue;
                if (!p1.isReady || !p2.isReady) continue;

                match.creating = true;
                const reqBuf = encodeMatchCreateRequest({ players: [match.player1Id, match.player2Id] });
                try {
                    const replyBuf = await natsClient.request('games.tournament.match.create', reqBuf, { timeout: 5000 });
                    const resp = decodeMatchCreateResponse(replyBuf);
                    if (!resp || !resp.gameId) throw new Error('Invalid match.create response');
                    match.gameId = resp.gameId;
                    console.log(`new game: ${match.gameId}|p1:${match.player1Id}|p2:${match.player2Id}`);
                    const startBuf = encodeTournamentServerMessage({ startGame: { gameId: match.gameId } });
                    this.uwsApp.publish(`user.${match.player1Id}`, startBuf, true);
                    this.uwsApp.publish(`user.${match.player2Id}`, startBuf, true);
                } catch (err) {
                    const buf = encodeTournamentServerMessage({ error: { message: String(err?.message || err) } });
                    this.uwsApp.publish(`user.${match.player1Id}`, buf, true);
                    this.uwsApp.publish(`user.${match.player2Id}`, buf, true);
                } finally {
                    match.creating = false;
                }
            }
        } finally {
            this.scheduling = false;
        }
    }

    addPlayer(userId) {
        const p = this.getPlayerByUuid(userId);
        if (!p) throw new Error(`Player ${userId} not in this tournament`);
        p.isConnected = true;
        this.sendUpdate();
        this.maybeStartReadyCheck();
    }

    quit(userId) {
        const p = this.getPlayerByUuid(userId);
        if (!p || p.isEliminated) return;

        p.isConnected = false;
        p.isEliminated = true;

        const m = this.findMatchByPlayer(this.root, userId);
        if (m && !m.winnerId && m.player1Id && m.player2Id) {
            const winnerSide = (m.player1Id === userId) ? 1 : 0;
            m.setResult({ winnerId: winnerSide, score: { forfeit: true } });
        }

        this.autoAdvanceWalkovers();
        this.sendUpdate();
        this.maybeStartReadyCheck();
    }
}

export default class tournamentService {
    constructor() {
        this.tournaments = new Map();
        this.interval = setInterval(() => this.cleanup(), config.HEARTBEAT_INTERVAL);
    }

    create(players, uwsApp) {
        const id = Date.now().toString();
        const shuffled = shuffle(players);
        const t = new Tournament(id, shuffled, uwsApp);
        this.tournaments.set(id, t);
        return id;
    }

    join(tournamentId, userId) {
        const t = this.tournaments.get(tournamentId);
        if (!t) throw new Error('Tournament not found');
        t.addPlayer(userId);
        return t.getState?.() ?? { tournamentId, tree: t.root };
    }

    quit(tournamentId, userId) {
        const t = this.tournaments.get(tournamentId);
        if (!t) return null;
        t.quit(userId);
        return t.getState?.() ?? { tournamentId, tree: t.root };
    }

    async ready(ws, tournamentId, playerId) {
        const t = this.tournaments.get(tournamentId);
        if (!t) throw new Error('Tournament not found');

        const p = t.getPlayerByUuid(playerId);
        if (!p || p.isEliminated) throw new Error('Player not eligible');

        p.isReady = true;
        t.sendUpdate();

        if (t.readyActive && t.allNonEliminatedPlayersReady()) {
            if (t.readyTimer) {
                clearTimeout(t.readyTimer);
                t.readyTimer = null;
            }
            await t.scheduleReadyMatches();
            t.readyActive = false;
            t.sendUpdate();
            t.maybeStartReadyCheck();
        }
    }

    getTournament(tournamentId) {
        return this.tournaments.get(tournamentId);
    }

    cleanup() {
        const now = Date.now();
        for (const [id, t] of this.tournaments) {
            if (t.players.length === 0 || now - t.createdAt > config.HEARTBEAT_INTERVAL * 2) {
                this.tournaments.delete(id);
            }
        }
    }

    shutdown() {
        clearInterval(this.interval);
    }
}
