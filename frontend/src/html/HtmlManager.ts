import { AuthHtml } from "./AuthHtml";
import { CubeHtml } from "./CubeHtml";
import { LobbyHtml } from "./LobbyHtml";
import { NotificationHtml } from "./NotificationHtml";
import { PlayCreateHtml } from "./PlayCreateHtml";
import { PlayMapHtml } from "./PlayMapHtml";
import { PlayModeHtml } from "./PlayModeHtml";
import { TournamentHtml } from "./TournamentHtml";


class HtmlManager {
	public notification: NotificationHtml;
	public cube: CubeHtml;

	public auth: AuthHtml;
	public lobby: LobbyHtml;
	public playCreate: PlayCreateHtml;
	public playMode: PlayModeHtml;
	public playMap: PlayMapHtml;
	public tournament: TournamentHtml;


	constructor() {
		console.log("%c HTML Manager", "color: white; background-color: red");
		this.notification = new NotificationHtml();
		this.cube = new CubeHtml();

		this.auth = new AuthHtml();
		this.lobby = new LobbyHtml();
		this.playCreate = new PlayCreateHtml();
		this.playMode = new PlayModeHtml();
		this.playMap = new PlayMapHtml();
		this.tournament = new TournamentHtml();
	}
}

export const htmlManager = new HtmlManager();
