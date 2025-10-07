import { AuthHtml } from "./AuthHtml";
import { CubeHtml } from "./CubeHtml";
import { FriendlistHtml } from "./FriendlistHtml";
import { LobbyHtml } from "./LobbyHtml";
import { NotificationHtml } from "./NotificationHtml";
import { PlayCreateHtml } from "./PlayCreateHtml";
import { PlayJoinHtml } from "./PlayJoinHtml";
import { PlayMapHtml } from "./PlayMapHtml";
import { PlayModeHtml } from "./PlayModeHtml";
import { TournamentHtml } from "./TournamentHtml";


class HtmlManager {
	public notification: NotificationHtml;
	public cube: CubeHtml;
	public friendlist: FriendlistHtml;

	public auth: AuthHtml;
	public lobby: LobbyHtml;
	public playCreate: PlayCreateHtml;
	public playJoin: PlayJoinHtml;
	public playMode: PlayModeHtml;
	public playMap: PlayMapHtml;
	public tournament: TournamentHtml;

	constructor() {
		console.log("%c HTML Manager", "color: white; background-color: red");
		this.notification = new NotificationHtml();
		this.cube = new CubeHtml();
		this.friendlist = new FriendlistHtml();

		this.auth = new AuthHtml();
		this.lobby = new LobbyHtml();
		this.playCreate = new PlayCreateHtml();
		this.playMode = new PlayModeHtml();
		this.playMap = new PlayMapHtml();
		this.tournament = new TournamentHtml();
		this.playJoin = new PlayJoinHtml();

		const b = document.createElement("button");
		b.textContent = "SOCIAL";
		b.style.position = "absolute";
		b.style.bottom = "0";
		b.style.right = "0";
		b.addEventListener("click", () => {
			this.friendlist.toogle();
		})
		document.body.appendChild(b);
	}
}

export const htmlManager = new HtmlManager();
