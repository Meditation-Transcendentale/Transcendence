import { meRequest, postRequest } from "./requests";
import Router from "./Router";
import { User } from "./User";
import { raiseStatus } from "./utils";


type homeHtmlReference = {
	info: HTMLInputElement,
	stats: HTMLInputElement,
	play: HTMLInputElement,
	friendlist: HTMLInputElement,
	quit: HTMLInputElement
};

class Home {
	private div: HTMLDivElement;
	private ref: homeHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			info: div.querySelector("#home-info") as HTMLInputElement,
			stats: div.querySelector("#home-stats") as HTMLInputElement,
			play: div.querySelector("#home-play") as HTMLInputElement,
			friendlist: div.querySelector("#home-friendlist") as HTMLInputElement,
			quit: div.querySelector("#home-quit") as HTMLInputElement
		};

		this.ref.info.addEventListener("click", () => {
			Router.nav("/info");
		})

		this.ref.stats.addEventListener("click", () => {
			Router.nav(`/stats?u=${User.username}&m=classic`);
		})

		this.ref.play.addEventListener("click", () => {
			Router.nav("/play");
		})

		this.ref.friendlist.addEventListener("click", () => {
			Router.nav("friendlist");
		})

		this.ref.quit.addEventListener("click", () => {
			postRequest("/auth/login", {})
				.then((json) => { this.logoutResolve(json) })
				.catch((resp) => { this.logoutReject(resp) })
		})
	}

	public load(params: URLSearchParams) {
		meRequest()
			.catch(() => window.location.reload());
		this.div.innerHTML = "";
		document.querySelector("#main-container")?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private logoutResolve(json: any) {
		raiseStatus(true, json.message);

		setTimeout(() => { window.location.reload() }, 300);
	}

	private logoutReject(resp: Response) {
		resp.json()
			.then((json) => raiseStatus(false, json.message));
	}
}

export default Home;
