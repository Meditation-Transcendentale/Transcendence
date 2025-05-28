import { App } from "./3d/App";
import Router from "./spa/Router";



//async function init() {
//	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));
//
//	Router.nav(window.location.href.substring(window.location.origin.length), false, false);
//}
//

async function init() {
	const app = new App();
	app.init()
		.then(() => { app.run() })

	window.onbeforeunload = () => {
		app.dispose();
	}
}
window.addEventListener("DOMContentLoaded", () => { init() })


