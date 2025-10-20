import { User } from "../User";
import { Ath } from "./AthHtml";
import { AuthHtml } from "./AuthHtml";
import { CubeHtml } from "./CubeHtml";
import { FriendlistHtml } from "./FriendlistHtml";
import { LobbyHtml } from "./LobbyHtml";
import { NotificationHtml } from "./NotificationHtml";
import { PlayCreateHtml } from "./PlayCreateHtml";
import { PlayJoinHtml } from "./PlayJoinHtml";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { TournamentHtml } from "./TournamentHtml";


class HtmlManager {
	public notification: NotificationHtml;
	public cube: CubeHtml;
	public ath: Ath;
	public friendlist: FriendlistHtml;
	public profile: Profile;

	public auth: AuthHtml;
	public lobby: LobbyHtml;
	public playCreate: PlayCreateHtml;
	public playJoin: PlayJoinHtml;
	public tournament: TournamentHtml;

	public settings!: Settings;


	public friendbtn!: HTMLButtonElement;

	private _once = true;

	constructor() {
		console.log("%c HTML Manager", "color: white; background-color: red");
		this.notification = new NotificationHtml();
		this.cube = new CubeHtml();
		this.ath = new Ath();
		this.friendlist = new FriendlistHtml();
		this.profile = new Profile();

		this.auth = new AuthHtml();
		this.lobby = new LobbyHtml();
		this.playCreate = new PlayCreateHtml();
		this.tournament = new TournamentHtml();
		this.playJoin = new PlayJoinHtml();


		this.friendbtn = document.createElement("button");
		this.friendbtn.className = "friendlist-toggle";
		this.friendbtn.textContent = "❖";
		this.friendbtn.addEventListener("click", () => {
			this.friendlist.toogle();
		})
	}

	public init() {
		if (!this._once)
			return;
		this.settings = new Settings();
		User.status = "online";
		this._once = true;
	}

	public addFriendbtn() {
		if (!document.body.contains(this.friendbtn))
			document.body.appendChild(this.friendbtn);
	}

	public removeFriendbtn() {
		this.friendbtn.remove();
	}
}

export const htmlManager = new HtmlManager();
