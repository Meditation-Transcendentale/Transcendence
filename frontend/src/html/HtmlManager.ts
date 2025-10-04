import { AuthHtml } from "./AuthHtml";
import { CubeHtml } from "./CubeHtml";
import { LobbyHtml } from "./LobbyHtml";
import { NotificationHtml } from "./NotificationHtml";
import { PlayCreateHtml } from "./PlayCreateHtml";
import { PlayMapHtml } from "./PlayMapHtml";
import { PlayModeHtml } from "./PlayModeHtml";


class HtmlManager {
	public notification: NotificationHtml;
	public cube: CubeHtml;

	public auth: AuthHtml;
	public lobby: LobbyHtml;
	public playCreate: PlayCreateHtml;
	public playMode: PlayModeHtml;
	public playMap: PlayMapHtml;


	constructor() {
		console.log("%c HTML Manager", "color: white; background-color: red");
		this.notification = new NotificationHtml();
		this.cube = new CubeHtml();

		this.auth = new AuthHtml();
		this.lobby = new LobbyHtml();
		this.playCreate = new PlayCreateHtml();
		this.playMode = new PlayModeHtml();
		this.playMap = new PlayMapHtml();
	}
}

export const htmlManager = new HtmlManager();
