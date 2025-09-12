import { decodeTournamentServerMessage, encodeClientMessage, encodeTournamentClientMessage } from "./proto/helper";
import { tournament } from "./proto/message.js";
import Router from "./Router";
import { User } from "./User";
import { getRequest } from "./requests";
import { createButton } from "./utils";


interface tournamentHtmlReference {
	tree: HTMLDivElement;
	leaveButton: HTMLInputElement;
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
	private players: Map<string, tournament.IPlayer> | null; //key:uuid value:Player
	// private tree: MatchNode | null;
	private readyCheckEnabled: boolean;
	private root: tournament.IMatchNode | null | undefined;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.root = null;
		this.players = null;
		this.readyCheckEnabled = false;
		this.ref = {
			tree: div.querySelector("#tournament-tree") as HTMLDivElement,
			leaveButton: div.querySelector("#leave-btn") as HTMLInputElement
		};

		// this.ref.ready.addEventListener("click", () => {
		// 	this.ws?.send(encodeClientMessage({ ready: { tournamentId: this.id as string } })); //encodeClientMessage to fix
		// })

		this.ref.leaveButton.addEventListener("click", () => {
			this.ws?.send(encodeTournamentClientMessage({ quit: { uuid: User.uuid as string, tournamentId: this.id as string } }));
			Router.nav("/play");
		});
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
		this.ws?.close();
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
			const buf = new Uint8Array(msg.data as ArrayBuffer);
			let payload;
			try {
				payload = decodeTournamentServerMessage(buf);
			} catch (err) {
				console.error("Failed to decode Tournament Server Messager", err);
				return;
			}
			if (payload.error) {
				this.id = null;
				this.ws?.close();
				this.ws = null;
				Router.nav("/play");
				return;
			}

			if (payload.update) {
				this.root = payload.update.tournamentRoot;
				if (this.root) this.treeResolve();
			}

			if (payload.readyCheck) {
				this.readyCheckEnabled = true;
			}

			if (payload.startGame) {
				const gameId = payload.startGame?.gameId;
				//need to close the ws + switch to ingame so being able to reconnect to the tournament at the end of the game
				if (gameId) {
					const map = "default"; //payload.start.map;
					this.readyCheckEnabled = false;
					Router.nav(encodeURI(`/game?id=${gameId}&mode=tournament&map=${map}`), false, false);
				}
				//can only leave through "leave" button on the tournament page, everyother thing make you come back to the tournament
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

	private renderMatchNode(node: tournament.IMatchNode | null | undefined): HTMLDivElement {
		const container = document.createElement('div');
		container.classList.add('match-node');

		const matchInfo = document.createElement('div');
		matchInfo.classList.add('match-info');

		const p1 = this.fillPlayer(node?.player1, node?.winner);
		const p2 = this.fillPlayer(node?.player2, node?.winner);

		if (node?.score) {
			const score1 = document.createElement('div');
			score1.textContent = node.score[0].toString();
			p1.appendChild(score1);

			const score2 = document.createElement('div');
			score2.textContent = node.score[1].toString();
			p2.appendChild(score2);
		}

		matchInfo.appendChild(p1);
		matchInfo.appendChild(p2);

		container.appendChild(matchInfo);

		if (node?.leftChild || node?.rightChild) {
			const childrenContainer = document.createElement('div');
			childrenContainer.classList.add('match-children');

			if (node?.leftChild) {
				const leftNode = this.renderMatchNode(node?.leftChild);
				childrenContainer.appendChild(leftNode);
			}

			if (node?.rightChild) {
				const rightNode = this.renderMatchNode(node?.rightChild);
				childrenContainer.appendChild(rightNode);
			}

			container.appendChild(childrenContainer);
		}

		return container;
	}

	private fillPlayer(player: tournament.IPlayer | null | undefined, winner: tournament.IPlayer | null | undefined): HTMLDivElement {
		const playerDiv = document.createElement('div');
		let exposedName;
		if (player !== null && player !== undefined) {
			exposedName = getRequest(`/info/uuid/${player.uuid}`)
				.then((json: any) => { return (json.username) });
			if (!player.connected) {
				const disconnectedIcon = document.createElement("span");
				disconnectedIcon.textContent = "⚠";
				disconnectedIcon.className = "disconnected-icon";
				playerDiv.appendChild(disconnectedIcon);
				playerDiv.classList.add("disconnected"); //ADD CSS 
			}
			else if (player.eliminated) {
				playerDiv.classList.add("eliminated");
			}
			else if (this.readyCheckEnabled && (winner === null || winner === undefined)) {
				if (!player.ready) {
					if (player.uuid === User.uuid) {
						const readyButton = createButton("Ready", (btn: HTMLInputElement) => {
							this.ws?.send(encodeTournamentClientMessage({ ready: { tournamentId: this.id as string } }));
							const check = document.createElement("span");
							check.textContent = "✔";
							check.className = "ready-checked";
							btn.replaceWith(check);
						});
						playerDiv.appendChild(readyButton);
					} else {
						const notReady = document.createElement("span");
						notReady.textContent = "✖";
						notReady.className = "notReady-checked";
						playerDiv.appendChild(notReady);
					}
				}
				else {
					const check = document.createElement("span");
					check.textContent = "✔";
					check.className = "ready-checked";
					playerDiv.appendChild(check);
				}
			}
			if (player.uuid == winner?.uuid)
				playerDiv.classList.add("winner");
		}
		else {
			exposedName = `TBD`;
		}
		playerDiv.textContent = `${exposedName}`;
		return (playerDiv);
	}


	private treeResolve(): void {
		this.ref.tree.innerHTML = '';
		const treeRoot = this.renderMatchNode(this.root);
		this.ref.tree.appendChild(treeRoot);
	}
}
