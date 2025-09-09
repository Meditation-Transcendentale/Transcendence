import { decodeTournamentServerMessage, encodeClientMessage } from "./proto/helper";
import { tournament } from "./proto/message.js";
import Router from "./Router";
import { User } from "./User";


interface tournamentHtmlReference {
	tree: HTMLDivElement;
}

// interface Player {
// 	uuid: string | null;
// 	username: string | null;
// 	isReady: boolean;
// 	isConnected: boolean;
// 	isInGame: boolean;
// 	isEliminated: boolean;
// }

// interface MatchNode {
// 	player1: Player | null;
// 	player2: Player | null;
// 	left: MatchNode | null;
// 	right: MatchNode | null;
// 	parent: MatchNode | null;
// 	winner: Player | null;
// 	gameId: string | null;
// 	score: Array<number>;
// }


export default class Tournament {
	private div: HTMLDivElement;
	private ref: tournamentHtmlReference;
	private ws: WebSocket | null;
	private id: string | null;
	private players: Map<string, tournament.Player> | null; //key:uuid value:Player
	// private tree: MatchNode | null;
	private readyCheckEnabled: boolean;
	private root: tournament.MatchNode | null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.root = null;
		this.players = null;
		this.readyCheckEnabled = false;
		this.ref = {
			tree: div.querySelector("#tournament-tree") as HTMLDivElement
		};

		// this.ref.ready.addEventListener("click", () => {
		// 	this.ws?.send(encodeClientMessage({ ready: { tournamentId: this.id as string } })); //encodeClientMessage to fix
		// })

	}


	public load(params: URLSearchParams) {
		if (!this.ws) {
			this.setupWs(params.get("id") as string);
		} else if (this.id && this.id == params.get("id")) {
			//nav to past tournament
		}
		document.querySelector('#home-container')?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private setupWs(id: string) {
		const url = `wss://${window.location.hostname}:7000/tournament?uuid=${encodeURIComponent(User.uuid as string)}&tournamentId=${encodeURIComponent(id as string)}`;
		console.log("URL", url);
		this.ws = new WebSocket(url);

		this.ws.onopen = (e) => {
			console.log(e);
			User.status = { tournament: id };
		}

		this.ws.onmessage = (msg) => {
			try {
				const payload: tournament.TournamentServerMessage = decodeTournamentServerMessage(new Uint8Array(msg.data));
			} catch (err) {
				console.error("Failed to decode Tournament Server Messager", err);
				return;
			}
			const buf = new Uint8Array(msg.data as ArrayBuffer);
			const payload = decodeTournamentServerMessage(buf);
			if (payload.error) {
				this.id = null;
				this.ws?.close();
				this.ws = null;
				Router.nav("/play");
				return;
			}

			if (payload.update) {

			}

			if (payload.readyCheck) {

			}

			if (payload.startGame) {
				const gameId = payload.startGame?.gameId;
				//need to close the ws + switch to ingame so being able to reconnect to the tournament at the end of the game
				const map = "default"; //payload.start.map;
				Router.nav(encodeURI(`/game?id=${gameId}&mode=tournament&map=${map}`), false, false);
				//can only leave through "leave" button on the tournament page, everyother thing make you come back to the tournament
			}
			switch (data.type) {
				case 'update':
					if (data.update.players != null) {
						if (!this.players) {
							this.players = new Map(
								data.update.players != null
									? data.update.players
										.filter(p => p.uuid != null && p.ready != null)
										.map(p => [p.uuid as string, p.ready as boolean])
									: []
							);
						}
					}
					if (data.update.tree != null) {
						this.tree = payload.update.tree as MatchNode;
						this.treeResolve();
					}

			}

			if (payload.start != null) {
				this.ws?.close();
			}
		}

		this.ws.onclose = () => {
			this.id = null;
			this.ws = null;
			User.status = null;
		}

		this.ws.onerror = (err) => {
			console.warn(err);
		}
	}

	private renderMatchNode(node: MatchNode | null): HTMLDivElement {
		const container = document.createElement('div');
		container.classList.add('match-node');

		const matchInfo = document.createElement('div');
		matchInfo.classList.add('match-info');

		const p1 = document.createElement('div');
		p1.textContent = `Player 1: ${node?.player1?.username ?? 'TBD'}`; //how to smoothly get player names ?
		matchInfo.appendChild(p1);

		const p2 = document.createElement('div');
		p2.textContent = `Player 2: ${node?.player2?.username ?? 'TBD'}`;
		matchInfo.appendChild(p2);

		const score = document.createElement('div');
		score.textContent = node?.score
			? `Score: ${node.score[0]} vs ${node.score[1]}`
			: 'Score: - vs -';
		matchInfo.appendChild(score);

		const winner = document.createElement('div');
		winner.textContent = `Winner: ${node?.winner?.username ?? 'Pending'}`;
		matchInfo.appendChild(winner);

		container.appendChild(matchInfo);

		if (node?.left || node?.right) {
			const childrenContainer = document.createElement('div');
			childrenContainer.classList.add('match-children');

			if (node?.left) {
				const leftNode = this.renderMatchNode(node?.left);
				childrenContainer.appendChild(leftNode);
			}

			if (node?.right) {
				const rightNode = this.renderMatchNode(node?.right);
				childrenContainer.appendChild(rightNode);
			}

			container.appendChild(childrenContainer);
		}

		return container;
	}


	private treeResolve(): void {
		this.ref.tree.innerHTML = '';
		const treeRoot = this.renderMatchNode(this.tree);
		this.ref.tree.appendChild(treeRoot);
	}
}
