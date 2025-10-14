

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





	window.addEventListener('keydown', (e) => {
		if (e.key == 'Escape') {
			if (stateManager.popup)
				return;
			if (stateManager.friendlist)
				htmlManager.friendlist.toogle();
			else
				routeManager.comeback();
		}
		if (e.key == "p") {
			console.log(sceneManager.camera.position, sceneManager.camera.getForwardRay().direction)
			// console.log(sceneManager.assets.ballMesh.absolutePosition);
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

