//import { UI } from "./UI";

//const ui = new UI();
//
import Router from "./Router";



async function init() {
	const checkMe = async function meRequest() {
		const response = await fetch("https://localhost:3000/info/me", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		return final;
	};
	const router = new Router();

	const response = await checkMe();
	console.log(response);

	if (response.ok) {
		router.nav("/home");
	} else {
		router.nav("/auth");
	}



}

window.addEventListener("DOMContentLoaded", () => { init() })
