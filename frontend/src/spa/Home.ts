import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
//import { homeVue } from "../Vue";
import { meRequest, postRequest } from "./requests";
import Router from "./Router";
import { User } from "./User";
import { raiseStatus } from "./utils";


interface homeHtmlReference {
	stats: { html: HTMLElement, id: number },
	play: { html: HTMLElement, id: number },
	bricks: { html: HTMLElement, id: number },
	exemple: { html: HTMLElement, id: number }
};

class Home {
	private div: HTMLDivElement;
	private ref: homeHtmlReference;


	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			stats: { html: div.querySelector("#home-stats") as HTMLElement, id: -1 },
			play: { html: div.querySelector("#home-play") as HTMLElement, id: -1 },
			bricks: { html: div.querySelector("#home-bricks") as HTMLElement, id: -1 },
			exemple: { html: div.querySelector("#home-exemple") as HTMLElement, id: -1 }
		};


		this.ref.stats.id = App3D.addCSS3dObject({
			html: this.ref.stats.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 9, 1.6)),
			enable: false
		})
		this.ref.play.id = App3D.addCSS3dObject({
			html: this.ref.play.html,
			width: 1,
			height: 1,
			world: (Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 7, 1.8))),
			enable: false
		})
		this.ref.bricks.id = App3D.addCSS3dObject({
			html: this.ref.bricks.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 5.05, 1.83)),
			enable: false
		})

		this.ref.exemple.id = App3D.addCSS3dObject({
			html: this.ref.exemple.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI * 1).multiply(Matrix.Translation(15, 6, -10)),
			enable: false
		})

		this.ref.stats.html.addEventListener("click", () => {
			Router.nav(`/stats?u=${User.username}`);
		})

		this.ref.play.html.addEventListener("click", () => {
			Router.nav("/play");
		})

		this.ref.bricks.html.addEventListener("click", () => {
			Router.nav("/brick")
		})

		this.ref.exemple.html.addEventListener("click", () => {
			Router.nav("/exemple")
		})




		// document.getElementById('home-play')?.addEventListener('click', () => {
		// 	console.log('play clicked');
		// });
		// const playBtn = document.getElementById('home-play');
		// 	console.log('playBtn:', playBtn);
		// 	playBtn?.addEventListener('click', () => {
		// 		console.log('play clicked');
		// });


		//this.ref.info.addEventListener("click", () => {
		//	Router.nav("/info");
		//})
		//
		//this.ref.stats.addEventListener("click", () => {
		//	Router.nav(`/stats?u=${User.username}`);
		//})
		//
		//this.ref.play.addEventListener("click", () => {
		//	Router.nav("/play");
		//})
		//
		//this.ref.friendlist.addEventListener("click", () => {
		//	Router.nav("/friendlist");
		//})

		//this.ref.quit.addEventListener("click", () => {
		//	postRequest("auth/logout", {})
		//		.then((json) => { this.logoutResolve(json) })
		//		.catch((resp) => { this.logoutReject(resp) })
		//});

		if (Router.AUTHENTIFICATION) {
			const url = `ws://localhost:7011/notification?uuid=${encodeURIComponent(User.uuid as string)}`;

			const notificationSocket = new WebSocket(url);
			notificationSocket.onopen = () => {
				console.log('Connected to notificationSocket server')
			}

			notificationSocket.onmessage = (event) => {
				const message = JSON.parse(event.data)
				console.log('Received message:', message)

				switch (message.type) {
					case 'notification.friendRequest':
						console.log('Friend request:', message.data)
						break
					case 'notification.friendAccept':
						console.log('Friend accepted:', message.data)
						break
					case 'notification.gameInvite':
						console.log('Game invite:', message.data)
						break
					case 'notification.status':
						console.log('Status update:', message.data)
						break
					default:
						console.warn('Unknown message type:', message.type)
				}
			}

			notificationSocket.onerror = (err) => {
				console.error('WebSocket error:', err)
			}

			notificationSocket.onclose = () => {
				console.log('WebSocket connection closed')
			}
		}
	}

	public load(params: URLSearchParams) {
		//App3D.loadVue('home');
		//meRequest()
		//.catch(() => window.location.reload());
		App3D.setVue("home");
		App3D.setCSS3dObjectEnable(this.ref.stats.id, true);
		App3D.setCSS3dObjectEnable(this.ref.play.id, true);
		App3D.setCSS3dObjectEnable(this.ref.bricks.id, true);
		App3D.setCSS3dObjectEnable(this.ref.exemple.id, true);
		//(document.querySelector("#main-container") as HTMLDivElement)?.remove();

		// document.querySelector("#main-container")?.appendChild(this.div);

		// const playFrame = document.getElementById('play-frame');
		// if (playFrame) {
		// 	playFrame.addEventListener('click', () => {
		// 		console.log('play clicked');
		// 		Router.nav('/play');
		// 	});
		// } else {
		// 	console.warn('Play frame not found!');
		// }

		// App3D.loadVue('home');
		// const mainContainer = document.querySelector("#main-container") as HTMLDivElement;
		// mainContainer.innerHTML = "";
		// mainContainer.appendChild(this.div);

		// // Now the elements exist in the DOM, attach events:
		// const playBtn = this.div.querySelector("#home-play");
		// if (playBtn) {
		// 	playBtn.addEventListener("click", () => {
		// 		console.log("play clicked");
		// 		Router.nav('/play');
		// 	});
		// } else {
		// 	console.warn("Play button not found in Home view!");
		// }
	}

	public async unload() {
		App3D.setCSS3dObjectEnable(this.ref.stats.id, false);
		App3D.setCSS3dObjectEnable(this.ref.play.id, false);
		App3D.setCSS3dObjectEnable(this.ref.bricks.id, false);
		App3D.setCSS3dObjectEnable(this.ref.exemple.id, false);

		//App3D.unloadVue('home');
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

	private setNotificationManager(url: string){
		const notificationSocket = new WebSocket(url);
		notificationSocket.onopen = () => {
			console.log('Connected to notificationSocket server');
		  }
		  
		notificationSocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log('Received message:', message);
		  
			switch (message.type) {
			  case 'notification.friendRequest':
				console.log('Friend request:', message.data);
				break
			  case 'notification.friendAccept':
				console.log('Friend accepted:', message.data);
				break
			  case 'notification.gameInvite':
				console.log('Game invite:', message.data);
				break
			  case 'notification.status':
				console.log('Status update:', message.data);
				break
			  default:
				console.warn('Unknown message type:', message.type);
			}
		}
		  
		notificationSocket.onerror = (err) => {
			console.error('WebSocket error:', err);
		}
		  
		notificationSocket.onclose = () => {
			console.log('WebSocket connection closed');
		}
	}
}

export default Home;
