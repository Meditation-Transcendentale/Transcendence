import { decodeServerMessage, encodeClientMessage } from "../encode/helper";
import Router from "./Router";
import { User } from "./User";


interface tournamentHtmlReference {
	quit: HTMLInputElement;
	tree: HTMLDivElement;
}

interface MatchNode {
	player1: string | null;
	player2: string | null;
	winner: string | null;
	gameId: string | null;
	depth: number;
	left: MatchNode | null;
	right: MatchNode | null;
  }


export default class Tournament {
	private div: HTMLDivElement;
	private ref: tournamentHtmlReference;
	private ws: WebSocket | null;
	private id: string | null;
	private mode: string | null; //
	private players: Map<string, boolean> | null;
	private tree: MatchNode | null;	

	private gameIP = window.location.hostname;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ws = null;
		this.id = null;
		this.mode = null;
		this.ref = {
			quit: div.querySelector("#tournament-quit") as HTMLInputElement,
			tree: div.querySelector("#tournament-tree") as HTMLDivElement
		};

		// this.ref.ready.addEventListener("click", () => {
		// 	this.ws?.send(encodeClientMessage({ ready: { tournamentId: this.id as string } })); //encodeClientMessage to fix
		// })

		this.ref.quit.addEventListener("click", () => {
			this.ws?.close();
			User.status = null;
			Router.nav(`/play`, false, false); //
		})

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
		const url = `ws://${this.gameIP}:5019/tournament?uuid=${encodeURIComponent(User.uuid as string)}&tournamentId=${encodeURIComponent(id as string)}`;
		console.log("URL", url);
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";

		this.ws.onopen = (e) => {
			console.log(e);
			User.status = { tournament: id };
		}

		this.ws.onmessage = (msg) => {
			const buf = new Uint8Array(msg.data as ArrayBuffer);
			const payload = decodeServerMessage(buf);
			console.log('Raw message data:', new Uint8Array(msg.data));
			console.log('Decoded payload:', payload);
			if (payload.error != null) {
				this.id = null;
				this.ws?.close();
				this.ws = null;
				Router.nav("/home/play");
				return;
			}

			if (payload.update != null) {
				if (payload.update.players != null) {
					if (this)
					this.players = new Map(
						payload.update.players != null
							? payload.update.players
								.filter(p => p.uuid != null && p.ready != null)
								.map(p => [p.uuid as string, p.ready as boolean])
							: []
					);
				}
				if (payload.update.tree != null) {
					this.tree = payload.update.tree as MatchNode;
					this.treeResolve();
				}
			}

			if (payload.start != null) {
				const gameId = payload.start.gameId;
				const map = "default"; //payload.start.map;
				Router.nav(encodeURI(`/game?id=${gameId}&mod=${this.mode}&map=${map}`), false, false);
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
		p1.textContent = `Player 1: ${node?.player1 ?? 'TBD'}`; //how to smoothly get player names ?
		matchInfo.appendChild(p1);
	
		const p2 = document.createElement('div');
		p2.textContent = `Player 2: ${node?.player2 ?? 'TBD'}`;
		matchInfo.appendChild(p2);
	
		const winner = document.createElement('div');
		winner.textContent = `Winner: ${node?.winner ?? 'Pending'}`;
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
	

	private treeResolve() : void {
		this.ref.tree.innerHTML = '';
		const treeRoot = this.renderMatchNode(this.tree);
		this.ref.tree.appendChild(treeRoot);
	}
}
