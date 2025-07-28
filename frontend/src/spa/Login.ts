import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
//import { loginVue } from "../Vue";
import Router from "./Router";

import { postRequest } from "./requests";
import { raiseStatus } from "./utils";


type authHtmlReference = {
	login: { html: HTMLDivElement, id: number },
	lusername: HTMLInputElement,
	lpassword: HTMLInputElement,
	switch: { html: HTMLDivElement, id: number },
	swLogin: HTMLInputElement,
	swRegister: HTMLInputElement
	register: { html: HTMLDivElement, id: number },
	rusername: HTMLInputElement,
	rpassword: HTMLInputElement,
	submit: { html: HTMLInputElement, id: number },
	enter: HTMLInputElement,
	//twofaToken: HTMLInputElement;
	//twofa: HTMLInputElement;
}



class Login {
	private div: HTMLDivElement;
	private ref: authHtmlReference;

	private css: HTMLElement;

	constructor(div: HTMLDivElement) {
		this.div = div;
		//
		this.ref = {
			login: { html: this.div.querySelector("#login-form") as HTMLDivElement, id: -1 },
			lusername: this.div.querySelector("#login-username") as HTMLInputElement,
			lpassword: this.div.querySelector("#login-password") as HTMLInputElement,
			switch: { html: this.div.querySelector("#switch") as HTMLDivElement, id: -1 },
			swLogin: this.div.querySelector("#switch-login") as HTMLInputElement,
			swRegister: this.div.querySelector("#switch-register") as HTMLInputElement,
			register: { html: this.div.querySelector("#register-form") as HTMLDivElement, id: -1 },
			rusername: this.div.querySelector("#register-username") as HTMLInputElement,
			rpassword: this.div.querySelector("#register-password") as HTMLInputElement,
			submit: { html: this.div.querySelector("#auth-submit-d") as HTMLInputElement, id: -1 },
			enter: this.div.querySelector("#auth-enter") as HTMLInputElement,

			//twofaToken: this.div.querySelector("#login-2fa-token") as HTMLInputElement,
			//twofa: this.div.querySelector("#login-2fa-submit") as HTMLInputElement,
		};
		//
		//this.ref.login.addEventListener("submit", (ev) => {
		//	ev.preventDefault();
		//	postRequest("auth/login", {
		//		username: this.ref.username.value,
		//		password: this.ref.password.value
		//	})
		//		.then((json) => { this.loginResolve(json) })
		//		.catch((resp) => { this.loginReject(resp) })
		//})

		//
		//this.htmlReference.twofa.addEventListener("click", () => {
		//	postRequest("/auth/login", {
		//		username: this.htmlReference.username.value,
		//		password: this.htmlReference.password.value,
		//		token: this.htmlReference.twofaToken.value
		//	})
		//		.then((json) => { this.loginResolve(json) })
		//		.catch((resp) => { this.loginReject(resp) })
		//})

		//this.htmlReference.register.addEventListener("click", () => {
		//	Router.nav("/register");
		//})

		//App3D.setVue('login');
		//const loginVue = App3D.getVue('login');
		//loginVue.windowAddEvent('register', 'click', () => {
		//	Router.nav("/register")
		//})
		//

		this.ref.login.id = App3D.addCSS3dObject({
			html: this.ref.login.html,
			enable: false,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 9, 30))
		})
		this.ref.login.html.addEventListener("mouseover", () => {
			App3D.onHoverEffect(1);
		})
		this.ref.login.html.addEventListener("mouseleave", () => {
			App3D.onHoverEffect(0);
		})
		this.ref.lpassword.addEventListener("keypress", (e) => {
			if (e.key != "Enter") { return; }
			this.login();
		})

		this.ref.lusername.addEventListener("keypress", (e) => {
			if (e.key != "Enter") { return; }
			this.login();
		})


		this.ref.switch.id = App3D.addCSS3dObject({
			html: this.ref.switch.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI * 0.9).multiply(Matrix.Translation(-5, 6, 30)),
			enable: false
		})
		this.ref.swRegister.toggleAttribute("of", true)
		this.ref.swLogin.addEventListener("click", () => {
			App3D.setVue("login");
			this.ref.swLogin.toggleAttribute("of", false);
			this.ref.swRegister.toggleAttribute("of", true);
		})
		this.ref.swRegister.addEventListener("click", () => {
			App3D.setVue("register");
			this.ref.swLogin.toggleAttribute("of", true);
			this.ref.swRegister.toggleAttribute("of", false);
		})


		this.ref.register.id = App3D.addCSS3dObject({
			html: this.ref.register.html,
			enable: false,
			width: 1.2,
			height: 1.2,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 2, 33))
		})
		this.ref.register.html.addEventListener("mouseover", () => {
			App3D.onHoverEffect(2);
		})
		this.ref.register.html.addEventListener("mouseleave", () => {
			App3D.onHoverEffect(0);
		})
		this.ref.rusername.addEventListener("keypress", (e) => {
			if (e.key !== "Enter") { return; }
			this.register();
		})
		this.ref.rpassword.addEventListener("keypress", (e) => {
			if (e.key !== "Enter") { return; }
			this.register();
		})

		this.ref.submit.id = App3D.addCSS3dObject({
			html: this.ref.submit.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 4, 30)),
			enable: false
		})
		this.ref.enter.addEventListener("click", () => {
			if (this.ref.swLogin.hasAttribute("of")) {
				this.register();
			} else if (this.ref.swRegister.hasAttribute("of")) {
				this.login();
			}
		})

		this.css = div.querySelector("link") as HTMLElement;


	}

	public load(params: URLSearchParams) {
		document.body.appendChild(this.css);
		App3D.setCSS3dObjectEnable(this.ref.login.id, true);
		App3D.setCSS3dObjectEnable(this.ref.switch.id, true);
		App3D.setCSS3dObjectEnable(this.ref.register.id, true);
		App3D.setCSS3dObjectEnable(this.ref.submit.id, true);
		//this.htmlReference.twofa.setAttribute("disabled", "true");
		//this.htmlReference.username.value = "";
		//this.htmlReference.password.value = "";
		//this.htmlReference.twofaToken.value = "";
		//console.log("loading auth")

		//document.querySelector("#main-container")?.appendChild(this.div);
		document.querySelector("#main-container")?.remove();
	};

	public async unload() {
		this.div.remove();
		this.css.remove();
		App3D.setCSS3dObjectEnable(this.ref.login.id, false);
		App3D.setCSS3dObjectEnable(this.ref.switch.id, false);
		App3D.setCSS3dObjectEnable(this.ref.register.id, false);
		App3D.setCSS3dObjectEnable(this.ref.submit.id, false);

	}

	private login() {
		postRequest("auth/login", {
			username: this.ref.lusername.value,
			password: this.ref.lpassword.value
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}

	private register() {
		postRequest("register", {
			username: this.ref.rusername.value,
			password: this.ref.rpassword.value
		})
			.then((json) => { this.registerResolve(json) })
			.catch((resp) => { this.requestReject(resp) });
	}

	private loginResolve(json: any) {
		App3D.onHoverEffect(0);
		Router.nav("/home", true);
	}

	private requestReject(resp: Response) {
		try {
			resp.json();
		} catch (err) {
			console.log(err);
		}
	}

	private registerResolve(json: any) {
		postRequest("auth/login", {
			username: this.ref.rusername.value,
			password: this.ref.rpassword.value
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}
}

export default Login;


