//import { UI } from "./UI";

//const ui = new UI();
//
import Router from "./Router";



async function init() {
	// const checkMe = async function meRequest() {
	// 	const response = await fetch("https://localhost:3000/info/me", {
	// 		method: 'GET',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 		},
	// 		credentials: 'include',
	// 	});
	//
	// 	const data = await response.json();
	// 	console.log(response);
	//
	// 	const final = {
	// 		message: data,
	// 		status: response.status,
	// 		ok: response.ok
	// 	};
	// 	return final;
	// };
	//
	console.log("Page load with url: ", window.location.href.substring(window.location.origin.length));

	document.getElementById("status")?.addEventListener("status", (e) => {
		document.getElementById("status").setAttribute("ok", e.detail.ok);
		document.getElementById('status').innerHTML = e.detail.json;
	})


	Router.nav(window.location.href.substring(window.location.origin.length))

	// console.log(document.location.search);
	// const p = new URLSearchParams(document.location.search);
	// const u = new URL(document.location);
	// console.log(0, document.location.hostname);
	// console.log(1, u.pathname);
	// console.log(2, u);
	//
	// console.log(3, p.get("u"), p.get("m"))
	//
	// const r = { t: 2 };

}

window.addEventListener("DOMContentLoaded", () => { init() })

