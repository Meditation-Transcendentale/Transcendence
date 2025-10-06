import { App3D } from "./3d/App";
import { NotificationManager } from "./spa/NotificationManager";
import { Popup } from "./spa/Popup";
import Router from "./spa/Router";
import { postRequest } from "./spa/requests";

let loader;

async function init() {
	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));

	const ws = new WebSocket(`wss://${window.location.hostname}:7000/ws`);
	ws.onopen = () => console.log('Connected securely via WSS');
	ws.onmessage = (event) => {
		console.log(event.data);
		if (event.data === 'reload') window.location.reload();
	};



	await App3D.init()
	Router.nav(window.location.href.substring(window.location.origin.length), false, false);
	App3D.run()

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
	})


	loader!.remove();
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


