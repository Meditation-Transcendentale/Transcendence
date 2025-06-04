import Router from "./spa/Router";



async function init() {
	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));

	Router.nav(window.location.href.substring(window.location.origin.length), false, false);
}

window.addEventListener("DOMContentLoaded", () => { init() })