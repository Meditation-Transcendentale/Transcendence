import { App3D } from "./3d/App";
import { NotificationManager } from "./spa/NotificationManager";
import { Popup } from "./spa/Popup";
import Router from "./spa/Router";
import { postRequest } from "./spa/requests";

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

	//Router.AUTHENTIFICATION = false;

	App3D.init()
		.then(() => {
			Router.nav(window.location.href.substring(window.location.origin.length), false, false);
			App3D.run()
		})

	window.onbeforeunload = () => {
		App3D.dispose();
	}

	NotificationManager.setEnable(true);

	window.addEventListener('keydown', (e) => {
		if (e.key == 'Escape') {
			Router.nav('/home', false, true)
			Popup.removePopup();
		}
		if (e.key == "p") {
			NotificationManager.addText(`${performance.now()}`)
		}
		//if (e.key == "") {
		//	postRequest("friends/add", { inputUsername: "Erwan"});
		//}
	})
}
window.addEventListener("DOMContentLoaded", () => { init() })


