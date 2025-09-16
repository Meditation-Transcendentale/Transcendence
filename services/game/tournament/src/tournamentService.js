// tournamentService.js — array-based players rewrite
// Source refs: :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1} :contentReference[oaicite:2]{index=2}

import config from './config.js';
import {
  decodeMatchEnd,
  encodeTournamentServerMessage,
  encodeMatchCreateRequest,
  decodeMatchCreateResponse
} from './proto/helper.js';
import natsClient from './natsClient.js';

/** Fisher–Yates shuffle */
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
    this.player1Id = null; // string
    this.player2Id = null; // string
    this.left = null;      // MatchNode
    this.right = null;     // MatchNode
    this.parent = null;    // MatchNode
    this.winnerId = null;  // string
    this.gameId = null;    // string
    this.score = null;     // any
    this.creating = false; // guard for match.create
  }

  setResult(matchData) {
    this.score = matchData.score;
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
  /**
   * @param {string} id
   * @param {string[]} playerIds - already shuffled IDs
   * @param {uWS.TemplatedApp} uwsApp
   */
  constructor(id, playerIds, uwsApp) {
    this.uwsApp = uwsApp;
    this.id = id;

    // Array model: [{ id, isReady, isConnected, isEliminated, isInGame }]
    this.players = playerIds.map((id) => ({
      id,
      isReady: false,
      isConnected: false,
      isEliminated: false,
      isInGame: false
    }));

    this.root = this.buildTournamentTree();
    this.createdAt = Date.now();
    this.current_round = 0;

    natsClient.subscribe('games.tournament.*.match.end', (data, msg) => {
      const [, , gameId] = msg.subject.split('.');
      const match = this.findMatchByGameId(this.root, gameId);
      if (!match) return;
      const decodedData = decodeMatchEnd(data);
      match.setResult(decodedData);
      if (match === this.root) return;
      if (this.areAllMatchesFinished()) this.sendReadyCheck();
      this.sendUpdate();
    });
  }

  sendReadyCheck() {
    const buf = encodeTournamentServerMessage({ readyCheck: {} });
    this.uwsApp.publish(this.id, buf, true);
  }

  sendUpdate() {
    const buf = encodeTournamentServerMessage({
      update: { tournamentRoot: this.root }
    });
    this.uwsApp.publish(this.id, buf, true);
  }

  buildTournamentTree() {
    if (this.players.length === 0) throw new Error('Empty playerlist');

    if (this.players.length % 2 !== 0) throw new Error('Odd player count not supported');

    const ids = this.players.map((p) => p.id);
    const leaves = [];
    for (let i = 0; i < ids.length; i += 2) {
      const node = new MatchNode();
      node.player1Id = ids[i];
      node.player2Id = ids[i + 1];
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

  getState() {
    return {
      tournamentId: this.id,
      players: this.players.map((p) => ({
        uuid: p.id,
        ready: p.isReady,
        connected: p.isConnected,
        eliminated: p.isEliminated
      })),
      tree: this.root
    };
  }

  areAllMatchesFinished() {
    return !!this.root && !!this.root.winnerId;
  }

  getPlayerByUuid(uuid) {
    return this.players.find((p) => p.id === uuid) || null;
  }

  allNonEliminatedPlayersReady() {
    const alive = this.players.filter((p) => !p.isEliminated);
    return alive.length > 0 && alive.every((p) => p.isReady);
  }

  addPlayer(userId) {
    const p = this.getPlayerByUuid(userId);
    if (!p) throw new Error(`Player ${userId} not in this tournament`);
    p.isConnected = true;
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
    const tournament = new Tournament(id, shuffled, uwsApp);
    this.tournaments.set(id, tournament);
    return id;
  }

  join(tournamentId, userId) {
    const tournament = this.tournaments.get(tournamentId);
    if (!tournament) throw new Error('Tournament not found');
    tournament.addPlayer(userId);
    return tournament.getState();
  }

  quit(tournamentId, userId) {
    const tournament = this.tournaments.get(tournamentId);
    if (!tournament) return null;
    const p = tournament.getPlayerByUuid(userId);
    if (!p) return null;
    p.isConnected = false;
    p.isEliminated = true;
    tournament.sendUpdate();
    return tournament.getState();
  }

  async ready(ws, tournamentId, playerId) {
    const tournament = this.tournaments.get(tournamentId);
    if (!tournament) throw new Error('Tournament not found');

    const player = tournament.getPlayerByUuid(playerId);
    if (!player) throw new Error('Player not in tournament');

    player.isReady = true;

    tournament.sendUpdate();

    if (tournament.allNonEliminatedPlayersReady()) {
      for (const match of tournament.root.getActiveMatches()) {
        if (match.creating || match.gameId) continue;
        match.creating = true;
        const reqBuf = encodeMatchCreateRequest({
          players: [match.player1Id, match.player2Id]
        });
        try {
          const replyBuf = await natsClient.request('games.tournament.match.create', reqBuf, {});
          const resp = decodeMatchCreateResponse(replyBuf);
          match.gameId = resp.gameId;
          const startBuf = encodeTournamentServerMessage({
            startGame: { gameId: match.gameId }
          });
          tournament.uwsApp.publish(tournament.id, startBuf, true);
        } catch (err) {
          const buf = encodeTournamentServerMessage({ error: { message: err.message } });
          tournament.uwsApp.publish(tournament.id, buf, true);
        } finally {
          match.creating = false;
        }
      }
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [id, t] of this.tournaments) {
      if (t.players.length === 0 || now - t.createdAt > config.HEARTBEAT_INTERVAL * 2) {
        this.tournaments.delete(id);
      }
    }
  }

  getTournament(tournamentId) {
    return this.tournaments.get(tournamentId);
  }

  shutdown() {
    clearInterval(this.interval);
  }
}
