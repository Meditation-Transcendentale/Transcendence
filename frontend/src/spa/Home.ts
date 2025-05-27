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
			Router.nav(`/stats?u=${User.username}`);
		})

		this.ref.play.addEventListener("click", () => {
			Router.nav("/play");
		})

		this.ref.friendlist.addEventListener("click", () => {
			Router.nav("/friendlist");
		})

		this.ref.quit.addEventListener("click", () => {
			postRequest("auth/logout", {})
				.then((json) => { this.logoutResolve(json) })
				.catch((resp) => { this.logoutReject(resp) })
		});

		const url = `ws://localhost:7011/notification?uuid=${encodeURIComponent(User.uuid as string)}`;

		const socket = new WebSocket(url);
		socket.onopen = () => {
			console.log('Connected to WebSocket server')
			// Optional: send a message (for debug)
			// socket.send(JSON.stringify({ type: 'ping', data: 'hello server' }))
		  }
		  
		  socket.onmessage = (event) => {
			const message = JSON.parse(event.data)
			console.log('Received message:', message)
		  
			switch (message.type) {
			  case 'notification.friendrequest':
				console.log('Friend request:', message.data)
				break
			  case 'notification.invite':
				console.log('Game invite:', message.data)
				break
			  case 'notification.status':
				console.log('Status update:', message.data)
				break
			  case 'notification.friendaccepted':
				console.log('Friend accepted:', message.data)
				break
			  default:
				console.warn('Unknown message type:', message.type)
			}
		  }
		  
		  socket.onerror = (err) => {
			console.error('WebSocket error:', err)
		  }
		  
		  socket.onclose = () => {
			console.log('WebSocket connection closed')
		  }
	}

	public load(params: URLSearchParams) {
		meRequest()
			.catch(() => window.location.reload());
		(document.querySelector("#main-container") as HTMLDivElement).innerHTML = "";
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
