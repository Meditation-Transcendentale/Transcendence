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
	// const response = await checkMe();
	// console.log(response);
	//
	// if (response.ok) {
	// 	router.nav("/home");
	// } else {
	// 	router.nav("/auth");
	// }
}

window.addEventListener("DOMContentLoaded", () => { init() })

