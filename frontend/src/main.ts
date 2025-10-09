

import { gameManager } from "./game/GameManager";
import { htmlManager } from "./html/HtmlManager";
import { NotificationType } from "./html/NotificationHtml";
import { Popup, PopupType } from "./html/Popup";
import { routeManager } from "./route/RouteManager";
import { sceneManager } from "./scene/SceneManager";
import { stateManager } from "./state/StateManager";
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
		if (e.key == 'Escape' && !stateManager.popup) {
			routeManager.nav('/home', false, true)
		}
		// if (e.key == "p") {
		// 	console.log(sceneManager.assets.ballMesh.position, sceneManager.assets.ballMesh.isEnabled(), sceneManager.assets.ballMesh.parent?.name, sceneManager.assets.ballRoot.position);
		// 	// const p = new Popup({
		// 	// 	type: PopupType.accept,
		// 	// 	title: "OUOA",
		// 	// 	text: "HERE iS my popup, to you that i do somet strane Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur et felis at efficitur. Donec elit urna, imperdiet vitae arcu eu, vehicula mattis leo. Aliquam ac enim sit amet mi faucibus volutpat. Donec id enim consectetur magna auctor interdum. In at enim venenatis, tincidunt ante at, semper nisl. Donec imperdiet sit amet leo vel condimentum. Vivamus vel nulla vel leo laoreet sollicitudin nec eget augue. Aliquam erat volutpat. Nullam sed egestas mauris, sed viverra velit. Etiam eleifend lorem tristique neque tincidunt viverra. Suspendisse eu est eget magna interdum congue vitae id magna. Quisque congue posuere faucibus. ",
		// 	// 	accept: () => { console.log("ACCEPT") },
		// 	// 	decline: () => { console.log("DECLINE") }
		// 	// })
		// 	// p.show();
		// }
		// if (e.key == "u") {
		// 	htmlManager.notification.add({
		// 		type: NotificationType.friendRequest,
		// 		username: "bob",
		// 		uuid: "17231823713123123"
		// 	})
		// }
		// if (e.key == "v") {
		// 	const p = new Popup({
		// 		type: PopupType.validation,
		// 		title: "validation",
		// 		input: "username",
		// 		submit: (password: string, token?: string, input?: string) => {
		// 			console.log(password, token, input);
		// 		},
		// 		abort: () => {
		// 			console.log("abort")
		// 		}
		// 	})
		// 	p.show();
		// }
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

