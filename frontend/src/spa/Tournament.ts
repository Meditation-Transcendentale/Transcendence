import {
	encodeTournamentClientMessage,
	decodeTournamentServerMessage,
} from './proto/helper';
import { User } from './User';
import { postRequest } from './requests';
import { App3D } from '../3d/App';
import Router from './Router';

type PlayerState = {
	uuid: string;
	ready: boolean;
	connected: boolean;
	eliminated: boolean;
};

type Score = {
	values?: number[];
	forfeit?: boolean;
};

type MatchNode = {
	player1Id?: string | null;
	player2Id?: string | null;
	left?: MatchNode | null;
	right?: MatchNode | null;
	winnerId?: string | null;
	score?: Score | null;
	gameId?: string | null;
};

type ServerMsg = {
	update?: { tournamentRoot?: MatchNode | null; players?: PlayerState[] };
	readyCheck?: { deadlineMs: number };
	startGame?: { gameId: string };
	error?: { message: string };
};

export default class TournamentPage {
	private div: HTMLElement;
	private ws: WebSocket | null = null;

	private tournamentId: string | null;

	private tree: MatchNode | null = null;
	private players = new Map<string, PlayerState>();

	private readyActive = false;
	private readyDeadline = 0;
	private countdownTimer: number | null = null;

	private css: HTMLLinkElement;

	private rootEl!: HTMLDivElement;
	private toolbarEl!: HTMLDivElement;
	private treeEl!: HTMLDivElement;

	constructor(div: HTMLElement) {
		this.div = div;
		this.tournamentId = null;
		this.css = div.querySelector("link") as HTMLLinkElement;
		document.body.appendChild(this.css);
		this.initDOM();
	}

	public load(params: URLSearchParams) {
		console.log ("AAAAAAAAAAAAAAAAAAAAA");
		if (!this.tournamentId)
			this.tournamentId = params.get("id") as string;

		const url = `wss://${window.location.hostname}:7000/sacrifice?uuid=${encodeURIComponent(
			User.uuid as string
		)}&tournamentId=${encodeURIComponent(this.tournamentId as string)}`;

		this.ws = new WebSocket(url);
		this.ws.binaryType = 'arraybuffer';

		this.ws.onmessage = async (msg) => {
			console.log(`MESSAGE RECEIVED`);
			const buf = new Uint8Array(msg.data as ArrayBuffer);
			if (!buf) return;
			const payload = decodeTournamentServerMessage(new Uint8Array(buf)) as ServerMsg;

			if (payload.update) {
				console.log(`UPDATE RECEIVED: ${payload.update.tournamentRoot}`);
				if (payload.update.tournamentRoot !== undefined) this.tree = payload.update.tournamentRoot ?? null;
				if (Array.isArray(payload.update.players)) this.players = new Map(payload.update.players.map((p) => [p.uuid, p]));
			}
			if (payload.readyCheck) {
				console.log(`READY CHECK RECEIVED: ${payload.readyCheck.deadlineMs}`);
				this.readyActive = true;
				this.readyDeadline = payload.readyCheck.deadlineMs;
				this.startReadyCountdown();
			}
			if (payload.startGame) {
				console.log(`START GAME RECEIVED`);
				Router.nav(encodeURI(`/cajoue?id=${payload.startGame.gameId}&mod=tournament&map=default&tournamentId=${this.tournamentId}`), false, true);
				this.ws?.close();
			}
			this.render();
		};

		this.ws.onclose = () => {
			this.ws = null;
			this.stopReadyCountdown();
		};

		App3D.setVue("tournament");

		if (!document.body.contains(this.div)) {
			document.body.appendChild(this.div);
		}
	}

	unload() {
		// this.div.remove();
		this.stopReadyCountdown();
		if (this.ws) {
			try { this.ws.close(); } catch { }
			// this.ws = null;
		}
	}

	private initDOM() {
		this.div.innerHTML = '';

		this.rootEl = document.createElement('div');
		this.rootEl.id = 'tournament';
		this.rootEl.className = 'tournament-root';

		this.toolbarEl = document.createElement('div');
		this.toolbarEl.className = 'toolbar';

		const countdown = document.createElement('span');
		countdown.className = 'ready-countdown';
		countdown.style.marginRight = 'auto';
		countdown.style.fontVariantNumeric = 'tabular-nums';

		const leaveBtn = document.createElement('button');
		leaveBtn.id = 'leave-btn';
		leaveBtn.textContent = 'Leave';
		leaveBtn.addEventListener('click', () => this.sendQuit());

		this.toolbarEl.append(countdown, leaveBtn);

		this.treeEl = document.createElement('div');
		this.treeEl.id = 'tournament-tree';
		this.treeEl.className = 'bracket';

		this.rootEl.append(this.toolbarEl, this.treeEl);
		this.div.appendChild(this.rootEl);

		this.render();
	}

	private render() {
		this.treeEl.innerHTML = '';
		if (!this.tree) return;

		const root = this.renderNode(this.tree, 'root', 0);
		this.treeEl.appendChild(root);
	}

	private sendReady() {
		if (!this.ws) return;
		const buf = encodeTournamentClientMessage({ ready: {} });
		this.ws.send(buf);
		if (User.uuid) {
			const me = this.players.get(User.uuid);
			if (me) {
				me.ready = true;
				this.players.set(User.uuid, me);
				this.render();
			}
		}
	}

	private sendQuit() {
		if (!this.ws) return;
		this.tournamentId = null;
		const buf = encodeTournamentClientMessage({ quit: {} });
		this.ws.send(buf);
	}

	private startReadyCountdown() {
		const badge = this.toolbarEl.querySelector('.ready-countdown') as HTMLSpanElement | null;
		const tick = () => {
			if (!badge) return;
			const ms = Math.max(0, this.readyDeadline - Date.now());
			const s = Math.ceil(ms / 1000);
			badge.textContent = `Ready check: ${s}s`;
			if (ms <= 0) {
				this.stopReadyCountdown();
				this.readyActive = false;
				badge.textContent = '';
				this.render();
			}
		};
		tick();
		this.stopReadyCountdown();
		this.countdownTimer = window.setInterval(tick, 200);
	}

	private stopReadyCountdown() {
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer);
			this.countdownTimer = null;
		}
	}

	private renderNode(node: MatchNode, side: 'root' | 'left' | 'right', depth: number): HTMLElement {
		const wrap = document.createElement('div');
		wrap.className = `match-node side-${side}`;
		wrap.dataset.depth = String(depth);

		const box = document.createElement('div');
		box.className = 'match-info';

		const top = this.renderRow(node, node.player1Id ?? null, side);
		const bot = this.renderRow(node, node.player2Id ?? null, side);

		if (node.winnerId && node.player1Id && node.winnerId === node.player1Id) top.classList.add('winner');
		if (node.winnerId && node.player2Id && node.winnerId === node.player2Id) bot.classList.add('winner');

		box.appendChild(top);
		box.appendChild(bot);
		wrap.appendChild(box);

		if (node.left || node.right) {
			const kids = document.createElement('div');
			kids.className = 'match-children';
			kids.appendChild(node.left ? this.renderNode(node.left, 'left', depth + 1) : this.spacer());
			kids.appendChild(node.right ? this.renderNode(node.right, 'right', depth + 1) : this.spacer());
			wrap.appendChild(kids);
		}

		return wrap;
	}

	private spacer(): HTMLElement {
		const s = document.createElement('div');
		s.className = 'match-node';
		s.style.minWidth = '220px';
		s.style.visibility = 'hidden';
		return s;
	}

	private isActive(node: MatchNode): boolean {
		return !!node.player1Id && !!node.player2Id && !node.gameId && !node.winnerId;
	}

	private rowScore(node: MatchNode, pid: string | null): string | null {
		if (!node.winnerId && !node.score) return null;
		if (node.score?.forfeit) return pid && node.winnerId === pid ? 'W/O' : 'DQ';
		if (node.winnerId) return pid && node.winnerId === pid ? 'WIN' : '—';
		if (node.score?.values?.length) return node.score.values.join('–');
		return null;
	}

	private renderRow(node: MatchNode, pid: string | null, side: 'root' | 'left' | 'right'): HTMLDivElement {
		const row = document.createElement('div');

		const name = document.createElement('span');
		name.style.whiteSpace = 'nowrap';
		name.style.maxWidth = '160px';
		name.style.overflow = 'hidden';
		name.style.textOverflow = 'ellipsis';
		if (pid) {
			console.log(`PID NOT NULL`);
			postRequest("info/search", { identifier: pid, type: "uuid" })
				.then((json: any) => {
					name.textContent = json.data.username;
				});
		}

		const inner = document.createElement('div');
		const score = this.rowScore(node, pid);
		if (score) {
			inner.textContent = score;
		} else {
			const ps = pid ? this.players.get(pid) ?? null : null;
			const active = this.isActive(node);
			const selfUuid = User.uuid || null;
			if (this.readyActive && active && pid === selfUuid && !(ps && ps.ready) && !(ps && ps.eliminated) && (ps ? ps.connected : true)) {
				inner.replaceChildren(this.makeReadyButton());
			} else {
				const badge = this.statusBadge(ps);
				if (badge) inner.replaceChildren(badge);
			}
		}

		if (side === 'right') {
			row.append(inner, name);
			name.style.textAlign = 'right';
			row.style.flexDirection = 'row';
		} else {
			row.append(name, inner);
			name.style.textAlign = 'left';
			row.style.flexDirection = 'row';
		}

		const ps = pid ? this.players.get(pid) ?? null : null;
		if (ps?.eliminated) row.classList.add('eliminated');

		return row;
	}

	private makeReadyButton(): HTMLButtonElement {
		const b = document.createElement('button');
		b.textContent = 'Ready';
		b.addEventListener('click', () => this.sendReady());
		return b;
	}

	private statusBadge(p: PlayerState | null): HTMLElement | null {
		if (!p) return null;
		const s = document.createElement('span');
		s.className = 'ready-checked';
		if (p.eliminated) {
			s.textContent = 'DQ';
			return s;
		}
		if (!p.connected) {
			s.textContent = 'Disconnected';
			s.classList.add('disconnected');
			return s;
		}
		s.textContent = p.ready ? 'Ready' : 'Not ready';
		if (!p.ready) s.classList.add('notReady-checked');
		return s;
	}
}
