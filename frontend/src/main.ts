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
	document.getElementById("status")?.addEventListener("status", (e) => {
		document.getElementById("status").setAttribute("ok", e.detail.ok);
		document.getElementById('status').innerHTML = e.detail.json;
	})

	const router = new Router();

	router.nav(window.location.pathname)

	// console.log(document.location.search);
	// const p = new URLSearchParams(document.location.search);
	// const u = new URL(document.location);
	// console.log(u.pathname);
	//
	// console.log(p.get("u"), p.get("m"))
}

window.addEventListener("DOMContentLoaded", () => { init() })

