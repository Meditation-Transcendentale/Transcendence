

import { gameManager } from "./game/GameManager";
import { routeManager } from "./route/RouteManager";
import { sceneManager } from "./scene/SceneManager";
import { streamManager } from "./stream/StreamManager";

let loader: HTMLElement;

async function init() {
	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));

	// createUser();
	// createHtmlManager();
	streamManager.builder.connect();
	await sceneManager.loadMandatory();
	routeManager.nav(window.location.href.substring(window.location.origin.length), false, true);
	await gameManager.init();





	// const ws = new WebSocket(`wss://${window.location.hostname}:7000/ws`);
	// ws.onopen = () => console.log('Connected securely via WSS');
	// ws.onmessage = (event) => {
	// 	console.log(event.data);
	// 	if (event.data === 'reload') window.location.reload();
	// };



	// await App3D.init()
	// // .then(() => {
	// Router.nav(window.location.href.substring(window.location.origin.length), false, false);
	// App3D.run()
	// // })
	//
	// window.onbeforeunload = () => {
	// 	App3D.dispose();
	// }
	//
	// NotificationManager.setEnable(true);

	// window.addEventListener('keydown', (e) => {
	// 	if (e.key == 'Escape') {
	// 		Router.nav('/home', false, true)
	// 		Popup.removePopup();
	// 	}
	// 	if (e.key == "p") {
	// 		NotificationManager.addText(`${performance.now()}`)
	// 	}
	// 	//if (e.key == "") {
	// 	//	postRequest("friends/add", { inputUsername: "Erwan"});
	// 	//}
	// })
	//

	window.addEventListener('keydown', (e) => {
		if (e.key == 'Escape') {
			routeManager.nav('/home', false, true)
		}
	})



	loader!.remove();
	sceneManager.run();
}


function addLoader() {
	loader = document.createElement("div");
	loader.className = "loader-div";
	const l = document.createElement("span");
	l.className = "loader";
	loader.appendChild(l);
	document.body.appendChild(loader);
}

function alreadyOpen() {
	const t = document.createElement("span");
	t.innerText = "Transcendance already open in another Tab";
	t.className = "already-open";
	loader!.querySelector(".loader")?.remove();
	loader!.appendChild(t);

}

async function checkOnlyOneTab() {
	let first = true;
	const channel = new BroadcastChannel('tab');

	channel.postMessage("another-tab");
	channel.addEventListener("message", (msg) => {
		if (msg.data === "another-tab" && first) {
			channel.postMessage("already-open");
		}
		if (msg.data === "already-open") {
			first = false;
			//alert("aaaaaaaa");
		}
	})
	setTimeout(() => {
		if (first) { init() }
		else { alreadyOpen() }
	}, 10)


}

window.addEventListener("DOMContentLoaded", () => {
	addLoader();
	checkOnlyOneTab();
})

