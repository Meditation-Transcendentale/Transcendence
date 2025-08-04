import { App3D } from "./3d/App";
import Router from "./spa/Router";

//async function init() {
//	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));
//
//	Router.nav(window.location.href.substring(window.location.origin.length), false, false);
//}
//


async function init() {
	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));

	const ws = new WebSocket(`wss://${window.location.hostname}:7000/ws`);
	ws.onopen = () => console.log('Connected securely via WSS');
	ws.onmessage = (event) => {
		console.log(event.data);
		if (event.data === 'reload') window.location.reload();
	};

	// Router.AUTHENTIFICATION = false;

	App3D.init()
		.then(() => {
			Router.nav(window.location.href.substring(window.location.origin.length), false, false);
			App3D.run()
		})

	window.onbeforeunload = () => {
		App3D.dispose();
	}

	window.addEventListener('keydown', (e) => {
		if (e.key == 'Escape') {
			Router.nav('/home', false, true)
		}
	})
}
window.addEventListener("DOMContentLoaded", () => { init() })


