import { profile } from "console";
import { postRequest } from "../networking/request";
import { stateManager } from "../state/StateManager";
import { streamManager } from "../stream/StreamManager";
import { User } from "../User";
import { IHtml } from "./IHtml";
import { routeManager } from "../route/RouteManager";

type PlayerState = {
  uuid: string;
  username: string;
  profilePictureSrc: string;
  ready: boolean;
  connected: boolean;
  eliminated: boolean;
};

type MatchNode = {
  player1Id?: string | null;
  player2Id?: string | null;
  left?: MatchNode | null;
  right?: MatchNode | null;
  winnerId?: string | null;
  score?: number[] | null;
  forfeitId?: string | null;
  gameId?: string | null;
};

export type TournamentServerUpdate = {
  tournamentRoot?: MatchNode | null;
  players?: PlayerState[];
};
export type TournamentServerReadyCheck = { deadlineMs: number };

export type TournamentServerMessage = {
  update?: TournamentServerUpdate;
  readyCheck?: TournamentServerReadyCheck;
  startGame?: { gameId: string };
  error?: { message: string };
  finished?: {};
};
export class TournamentHtml implements IHtml {
  private css: HTMLLinkElement;
  private div: HTMLDivElement;

  private tree: MatchNode | null = null;
  private oldTree: MatchNode | null = null;
  private players: Map<string, PlayerState>;

  private overlay: HTMLDivElement | null = null;

  private readyActive = false;
  private readyDeadline = 0;
  private countdownTimer: number | null = null;

  private rootEl!: HTMLDivElement;
  private toolbarEl!: HTMLDivElement;
  private treeEl!: HTMLDivElement;

  constructor() {
    this.css = document.createElement("link");
    this.css.rel = "stylesheet";
    this.css.type = "text/css";
    this.css.href = "/css/main.css";
    this.overlay = null;
    this.div = document.createElement("div");

    this.players = new Map<string, PlayerState>();
    this.initDOM();
  }

  public load() {
    document.head.appendChild(this.css);
    document.body.appendChild(this.div);
    this.div.appendChild(this.rootEl);
    if (this.overlay) this.overlay.remove();
  }

  public unload(): void {
    this.readyActive = false;
    this.css.remove();
    if (this.overlay) this.overlay.remove();
    this.div.remove();
    this.stopReadyCountdown();
    streamManager.tournament.disconnect();
  }

  public update(payload: TournamentServerUpdate) {
    this.tree = payload.tournamentRoot ?? null;
    if (Array.isArray(payload.players)) {
      for (const p of payload.players) {
        const existingPlayer = this.players.get(p.uuid);
        if (existingPlayer) {
          existingPlayer.ready = p.ready;
          existingPlayer.connected = p.connected;
          existingPlayer.eliminated = p.eliminated;
        } else {
          this.players.set(p.uuid, p);
        }
      }
    }
  }

  public readyCheck(payload: TournamentServerReadyCheck) {
    this.readyActive = true;
    this.readyDeadline = payload.deadlineMs;
    const me = this.players.get(User.uuid);
    if (me && !me.eliminated) {
      this.startReadyCountdown();
    }
    this.render();
  }

  public finished() {
    const root = this.tree;
    if (!root || !root.winnerId) return;

    const { gold, silver, bronzes } = this.computePodiumIds(root);

    this.injectPodiumStyles();

    this.showPodiumOverlay({ gold, silver, bronzes });
  }

  private initDOM() {
    this.div.innerHTML = "";

    this.rootEl = document.createElement("div");
    this.rootEl.id = "tournament";
    this.rootEl.className = "tournament-root";

    this.toolbarEl = document.createElement("div");
    this.toolbarEl.className = "toolbar";

    this.treeEl = document.createElement("div");
    this.treeEl.id = "tournament-tree";
    this.treeEl.className = "bracket";

    this.treeEl.innerHTML = `
			<div class="bracket-left"></div>
			<div class="bracket-center"></div>
			<div class="bracket-right"></div>
			`;
    ``;

    this.rootEl.append(this.toolbarEl, this.treeEl);
    this.div.appendChild(this.rootEl);
  }

  private sendReady() {
    streamManager.tournament.ready();
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
    streamManager.tournament.quit();
    stateManager.tournamentId = "";
  }

  private startReadyCountdown() {
    const badge = document.createElement("span");
    badge.className = "ready-countdown";
    badge.style.marginRight = "auto";
    badge.style.fontVariantNumeric = "tabular-nums";
    this.toolbarEl.appendChild(badge);
    const tick = () => {
      if (!badge) return;
      const ms = Math.max(0, this.readyDeadline - Date.now());
      const s = Math.ceil(ms / 1000);
      badge.textContent = `${s}`;
      if (ms <= 0) {
        this.stopReadyCountdown();
        this.readyActive = false;
        this.render();
      }
    };
    tick();
    this.stopReadyCountdown();
    this.countdownTimer = window.setInterval(tick, 200);
  }

  private stopReadyCountdown() {
    if (this.countdownTimer) {
      const badge = this.toolbarEl.querySelector(
        ".ready-countdown"
      ) as HTMLSpanElement | null;
      if (badge) this.toolbarEl.removeChild(badge);
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  private isActive(node: MatchNode): boolean {
    return (
      !!node.player1Id && !!node.player2Id && !node.gameId && !node.winnerId
    );
  }

  private rowScore(node: MatchNode, pid: string | null): string | null {
    if (!node.winnerId && !node.score) return null;
    if (node.forfeitId)
      return pid && node.winnerId === pid ? "Win" : "Disqualified";
    if (node.score?.length)
      return pid && node.player1Id === pid
        ? node.score[0].toString()
        : node.score[1].toString();
    return null;
  }

  private renderRow(
    node: MatchNode,
    pid: string | null,
    side: "root" | "left" | "right"
  ): HTMLDivElement {
    const row = document.createElement("div");

    const name = document.createElement("span");
    name.id = "tournament-player-username";
    name.style.flexGrow = "3";
    name.style.whiteSpace = "nowrap";
    name.style.maxWidth = "160px";
    name.style.overflow = "hidden";
    name.style.textOverflow = "ellipsis";

    const profilePicture = document.createElement("img");
    profilePicture.id = "tournament-profile-image";
    if (pid) {
      const player = this.players.get(pid);
      if (!player) return row;
      if (!player.username || !player.profilePictureSrc) {
        postRequest("info/search", { identifier: pid, type: "uuid" }).then(
          (json: any) => {
            player.username = json.data.username;
            player.profilePictureSrc = json.data.avatar_path;
          }
        );
      }
      name.textContent = player.username;
      profilePicture.src = player.profilePictureSrc;
    } else {
      name.textContent = "TBD";
      name.classList.add("tbd");
    }

    const inner = document.createElement("div");
    const score = this.rowScore(node, pid);
    if (score) {
      inner.textContent = score;
    } else {
      const ps = pid ? this.players.get(pid) ?? null : null;
      const active = this.isActive(node);
      const selfUuid = User.uuid || null;
      if (
        this.readyActive &&
        active &&
        pid === selfUuid &&
        !(ps && ps.ready) &&
        !(ps && ps.eliminated) &&
        (ps ? ps.connected : true)
      ) {
        inner.replaceChildren(this.makeReadyButton());
      } else {
        const badge = this.statusBadge(ps, side);
        if (badge) inner.replaceChildren(badge);
      }
    }

    row.style.flexDirection = "row";
    if (side === "right") {
      if (profilePicture.src) {
        row.append(inner, name, profilePicture);
        name.style.textAlign = "right";
        profilePicture.style.textAlign = "right";
      } else {
        row.append(inner, name);
        name.style.textAlign = "right";
      }
    } else {
      if (profilePicture.src) {
        row.append(profilePicture, name, inner);
        profilePicture.style.textAlign = "left";
        name.style.textAlign = "left";
      } else {
        row.append(name, inner);
        name.style.textAlign = "left";
      }
    }

    const ps = pid ? this.players.get(pid) ?? null : null;
    if (ps?.eliminated) row.classList.add("eliminated");

    return row;
  }

  private makeReadyButton(): HTMLButtonElement {
    const b = document.createElement("button");
    b.className = "ready-btn";
    b.textContent = "Ready";
    b.addEventListener("click", () => this.sendReady());
    return b;
  }

  private statusBadge(
    p: PlayerState | null,
    side: "root" | "left" | "right"
  ): HTMLElement | null {
    if (!p) return null;
    const s = document.createElement("span");
    s.className = "ready-checked";
    s.style.flexGrow = "1";
    if (p.eliminated) {
      s.textContent = "Disqualified";
      return s;
    }
    if (!p.connected) {
      s.textContent = "Disconnected";
      s.classList.add("disconnected");
      return s;
    }
    if (!this.readyActive) {
      s.textContent = side == "left" ? "Waiting ⏳" : "⏳ Waiting";
      return s;
    }
    if (side == "left") s.textContent = p.ready ? "Ready ✓" : "Ready ❔";
    else if (side == "right") s.textContent = p.ready ? "✓ Ready" : "❔ Ready";
    if (!p.ready) s.classList.add("notReady-checked");
    return s;
  }

  private makeGameItem(
    node: MatchNode,
    side: "left" | "right" | "root"
  ): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "game";

    const card = document.createElement("div");
    card.className = "match-info";

    if (this.isPlaying(node)) {
      li.classList.add("playing");
      const bar = document.createElement("div");
      bar.className = "playing-bar";
      card.appendChild(bar);

      const live = document.createElement("div");
      live.className = "live-pill";
      live.textContent = "LIVE";
      card.appendChild(live);
    }

    if (this.isMyCurrentNode(node)) {
      li.classList.add("my-match");
    }

    const top = this.renderRow(
      node,
      node.player1Id ?? null,
      side === "root" ? "left" : side
    );
    const bot = this.renderRow(
      node,
      node.player2Id ?? null,
      side === "root" ? "right" : side
    );

    if (node.winnerId && node.player1Id && node.winnerId === node.player1Id)
      top.classList.add("winner");
    if (node.winnerId && node.player2Id && node.winnerId === node.player2Id)
      bot.classList.add("winner");

    card.append(top, bot);
    if (node.gameId && !node.winnerId)
      card.addEventListener("click", () =>
        streamManager.tournament.spectate(node.gameId)
      );
    li.appendChild(card);
    return li;
  }

  private collectLevels(root: MatchNode | null): MatchNode[][] {
    const levels: MatchNode[][] = [];
    if (!root) return levels;
    let q: MatchNode[] = [root];
    let depth = 1;
    while (q.length) {
      levels[depth] = q.slice();
      const next: MatchNode[] = [];
      for (const n of q) {
        if (n.left) next.push(n.left);
        if (n.right) next.push(n.right);
      }
      q = next;
      depth++;
    }
    return levels;
  }

  private makeRoundColumn(
    lane: "left" | "right" | "center",
    depthIndex: number,
    nodes: MatchNode[] | undefined,
    hasChildrenNextDepth: boolean
  ): HTMLUListElement {
    const ul = document.createElement("ul");
    ul.className = `round ${lane}`;
    if (hasChildrenNextDepth) ul.classList.add("has-children");

    const spacer = () => {
      const li = document.createElement("li");
      li.className = "spacer";
      return li;
    };

    if (lane === "center") {
      ul.appendChild(spacer());
      ul.appendChild(spacer());
      return ul;
    }

    const items = (nodes ?? []).map((n) => this.makeGameItem(n, lane));
    ul.appendChild(spacer());

    if (depthIndex === 1) {
      for (let i = 0; i < items.length; i++) {
        ul.appendChild(items[i]);
        if (i !== items.length - 1) ul.appendChild(spacer());
      }
    } else {
      for (let i = 0; i < items.length; i += 2) {
        const topItem = items[i];
        const botItem =
          items[i + 1] ?? (items[i].cloneNode(true) as HTMLLIElement);
        topItem.classList.add("game-top");
        botItem.classList.add("game-bottom");

        const mid = document.createElement("li");
        mid.className = "game-spacer";

        ul.append(topItem, mid, botItem);

        if (i + 2 < items.length) ul.appendChild(spacer());
      }
    }

    ul.appendChild(spacer());
    return ul;
  }

  public render() {
    let newTree = this.treeEl;
    const leftLane = newTree.querySelector(".bracket-left") as HTMLElement;
    const ctrLane = newTree.querySelector(".bracket-center") as HTMLElement;
    const rightLane = newTree.querySelector(".bracket-right") as HTMLElement;

    leftLane.innerHTML = "";
    ctrLane.innerHTML = "";
    rightLane.innerHTML = "";

    if (!this.tree) return;

    const leftLevels = this.collectLevels(this.tree.left ?? null);
    const rightLevels = this.collectLevels(this.tree.right ?? null);

    const leftDepths = Object.keys(leftLevels)
      .map(Number)
      .sort((a, b) => a - b);
    for (const d of leftDepths) {
      const col = this.makeRoundColumn(
        "left",
        d,
        leftLevels[d],
        !!leftLevels[d + 1]
      );
      leftLane.appendChild(col);
    }

    const finalCard = this.makeGameItem(this.tree, "root");
    finalCard.classList.add("final");
    const centerCol = this.makeRoundColumn("center", 0, [], false);
    centerCol.insertBefore(finalCard, centerCol.lastElementChild);
    ctrLane.appendChild(centerCol);

    const rightDepths = Object.keys(rightLevels)
      .map(Number)
      .sort((a, b) => a - b);
    for (const d of rightDepths) {
      const col = this.makeRoundColumn(
        "right",
        d,
        rightLevels[d],
        !!rightLevels[d + 1]
      );
      rightLane.appendChild(col);
    }
    this.treeEl = newTree;
  }

  private isPlaying(node: MatchNode): boolean {
    return !!node.gameId && !node.winnerId;
  }

  private isMyCurrentNode(node: MatchNode): boolean {
    const uid = User.uuid || null;
    if (!uid) return false;
    const amIn = node.player1Id === uid || node.player2Id === uid;
    return amIn && !node.winnerId;
  }

  private computePodiumIds(root: MatchNode): {
    gold: string | null;
    silver: string | null;
    bronzes: string[];
  } {
    const gold = root.winnerId ?? null;

    const finalists = [root.player1Id ?? null, root.player2Id ?? null];
    const silver = finalists.find((id) => id && id !== gold) ?? null;

    const bronzes: string[] = [];
    const sides = [root.left ?? null, root.right ?? null];

    for (const semi of sides) {
      if (!semi || !semi.winnerId || !semi.player1Id || !semi.player2Id)
        continue;
      const loser =
        semi.player1Id === semi.winnerId ? semi.player2Id : semi.player1Id;
      if (loser) bronzes.push(loser);
    }

    return { gold, silver, bronzes };
  }

  private injectPodiumStyles() {
    if ((this as any)._podiumStyleElV2) return;
    const css = document.createElement("style");
    css.id = "tournament-podium-styles-v2";

    document.head.appendChild(css);
    (this as any)._podiumStyleElV2 = css;
  }

  private showPodiumOverlay(ids: {
    gold: string | null;
    silver: string | null;
    bronzes: string[];
  }) {
    this.overlay = document.createElement("div");
    this.overlay.className = "podium-overlay";
    this.overlay.setAttribute("role", "dialog");
    this.overlay.setAttribute("aria-label", "Tournament Podium");

    const wrap = document.createElement("div");
    wrap.className = "podium-wrap";

    const title = document.createElement("div");
    title.className = "podium-title";
    title.textContent = "Mysterious Podium";

    const renderPerson = (pid: string | null) => {
      const person = document.createElement("div");
      person.className = "person";

      const avatar = document.createElement("div");
      avatar.className = "avatar avatar--placeholder";

      const name = document.createElement("div");
      name.className = "name";

      if (pid) {
        const p = this.players.get(pid) || null;
        if (p) {
          name.textContent = p.username || "Mystery Player";
          if (p.profilePictureSrc) {
            const img = document.createElement("img");
            img.src = p.profilePictureSrc;
            avatar.classList.remove("avatar--placeholder");
            avatar.replaceChildren(img);
          } else if (p.username) {
            avatar.textContent = p.username.charAt(0).toUpperCase();
          }
        } else {
          avatar.textContent = "•";
        }
      } else {
        avatar.textContent = "•";
      }

      name.classList.add("glitch");
      name.setAttribute("data-text", name.textContent || "");

      person.append(avatar, name);
      return person;
    };

    const makeTier = (place: "gold" | "silver", pid: string | null) => {
      const tier = document.createElement("div");
      tier.className = `tier tier--${place}`;

      const badge = document.createElement("div");
      badge.className = "label";
      badge.textContent = place === "gold" ? "1st" : "2nd";

      if (place === "gold") {
        const crown = document.createElement("div");
        crown.className = "crown";
        crown.textContent = "👑";
        tier.appendChild(crown);
      }

      const plinth = document.createElement("div");
      plinth.className = "plinth";

      tier.append(badge, renderPerson(pid), plinth);
      return tier;
    };

    const makeBronzeTier = (pids: string[]) => {
      const tier = document.createElement("div");
      tier.className = "tier tier--bronze";

      const badge = document.createElement("div");
      badge.className = "label";
      badge.textContent = "3rd";

      const duo = document.createElement("div");
      duo.className = "duo";
      const [a, b] = [pids[0] ?? null, pids[1] ?? null];
      duo.append(renderPerson(a as any), renderPerson(b as any));

      const plinth = document.createElement("div");
      plinth.className = "plinth";

      tier.append(badge, duo, plinth);
      return tier;
    };

    wrap.append(
      makeTier("silver", ids.silver),
      makeTier("gold", ids.gold),
      makeBronzeTier(ids.bronzes)
    );

    const cta = document.createElement("button");
    cta.className = "cta";
    cta.innerHTML = `Leave the tournament<span aria-hidden="true">`;

    cta.addEventListener("click", () => {
      if (this.overlay) this.overlay.remove();
      this.rootEl.remove();
      routeManager.nav("/home");
    });

    for (let i = 0; i < 18; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = `${12 + Math.random() * 76}%`;
      s.style.bottom = `${-20 + Math.random() * 60}px`;
      s.style.animationDelay = `${Math.random() * 6}s`;
      this.overlay.appendChild(s);
    }

    this.overlay.append(title, wrap, cta);
    this.rootEl?.appendChild(this.overlay);
  }
}
