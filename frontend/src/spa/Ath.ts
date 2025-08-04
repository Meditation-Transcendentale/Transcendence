import { Popup } from "./Popup";
import { cdnRequest, meRequest, patchRequest, postRequest } from "./requests";
import { User } from "./User";

interface athHtmlReference {
	menu: HTMLDivElement,
	setting: HTMLInputElement,
	quit: HTMLInputElement,
}



class Ath {
	private div: HTMLDivElement;
	private ref: athHtmlReference;
	private css: HTMLElement;

	private quit: AthQuit;
	private setting: AthSetting;

	private loaded = false;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			menu: div.querySelector("#menu") as HTMLDivElement,
			setting: div.querySelector("#setting-btn") as HTMLInputElement,
			quit: div.querySelector("#quit-btn") as HTMLInputElement,
		}
		this.css = div.querySelector("link") as HTMLElement;

		this.quit = new AthQuit(div);
		this.setting = new AthSetting(div);

		this.ref.setting.addEventListener('click', () => {
			this.setting.load();
		})


		this.ref.quit.addEventListener("click", () => {
			this.quit.load();
		})



		// this.ref.settingEdit.addEventListener("click", () => { //FOR Username
		// })


		console.log("USER", User);
	}

	public load(params: URLSearchParams) {
		if (this.loaded) { return; }
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.menu);
		this.loaded = true;
	}

	public async unload() {
		this.ref.menu.remove();
		this.loaded = false;
	}

	// private settingUpdate() {
	// 	if (this.avatarChange) {
	// 		const body = new FormData();
	// 		body.append('avatar', this.ref.avatarChange.files[0]);
	// 		patchRequest("update-info/avatar", body, false)
	// 			.then(() => {
	// 				this.ref.settingEdit.toggleAttribute("off", true);
	// 				this.avatarChange = false;
	// 				meRequest()
	// 					.then(() => { console.log(User) })
	// 					.catch((err) => { console.log(err) })
	// 				cdnRequest(User.avatar as string)
	// 					.then((json) => { console.log(json) })
	// 					.catch((err) => { console.log(err) })
	// 			})
	// 			.catch(() => {
	// 				console.error("Error changing avatar");
	// 			})
	// 	}
	// }
}

interface quitHtmlReference {
	quitY: HTMLInputElement,
	quitN: HTMLInputElement,
}

class AthQuit {
	private div: HTMLDivElement;
	private ref: quitHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#quit-window") as HTMLDivElement;

		this.ref = {
			quitY: div.querySelector("#quit-yes") as HTMLInputElement,
			quitN: div.querySelector("#quit-no") as HTMLInputElement,
		}

		this.ref.quitY.addEventListener("click", () => {
			postRequest("auth/logout", {})
				.then(() => { window.location.reload() })
				.catch(() => { window.location.reload() })
		})

		this.ref.quitN.addEventListener("click", () => {
			this.unload();
		})
	}

	public load() {
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}
}


interface settingHtmlReference {
	username: HTMLInputElement,
	twofa: HTMLInputElement,
	editUsername: HTMLInputElement,
	editAvatar: HTMLInputElement,
	avatarImg: HTMLImageElement,
	avatarChange: HTMLInputElement,
	verifyWindow: HTMLDivElement,
	verifyContent: HTMLDivElement,
	verifySumbit: HTMLInputElement,
	verifyA: HTMLInputElement,
	verifyB: HTMLInputElement,
	verifyC: HTMLInputElement,
}

enum verifyState {
	username,
	password,
	twofa
}

class AthSetting {
	private div: HTMLDivElement;
	private ref: settingHtmlReference;

	private state!: verifyState;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#setting-window") as HTMLDivElement;

		this.ref = {
			username: div.querySelector("#username-change") as HTMLInputElement,
			twofa: div.querySelector("#twofa-change") as HTMLInputElement,
			editUsername: div.querySelector("#username-edit") as HTMLInputElement,
			editAvatar: div.querySelector("#avatar-edit") as HTMLInputElement,
			avatarImg: div.querySelector("#avatar-img") as HTMLImageElement,
			avatarChange: div.querySelector("#avatar-change") as HTMLInputElement,
			verifyWindow: div.querySelector("#verify-window") as HTMLDivElement,
			verifyContent: div.querySelector("#verify-content") as HTMLDivElement,
			verifySumbit: div.querySelector("#verify-submit") as HTMLInputElement,
			verifyA: div.querySelector("#verify-a") as HTMLInputElement,
			verifyB: div.querySelector("#verify-b") as HTMLInputElement,
			verifyC: div.querySelector("#verify-c") as HTMLInputElement
		}

		this.ref.verifyA.remove();
		this.ref.verifyB.remove();
		this.ref.verifyC.remove();

		this.ref.avatarChange.addEventListener('change', () => {
			this.ref.avatarImg.src = URL.createObjectURL(this.ref.avatarChange.files[0]);
			this.ref.editAvatar.removeAttribute('off');
		})

		this.ref.editAvatar.addEventListener("click", () => {
			alert("fix cdn");
		})

		this.ref.username.addEventListener("keydown", () => {
			this.ref.editUsername.removeAttribute("off");
		})

		this.ref.editUsername.addEventListener("click", () => {
			this.state = verifyState.username;
			this.setPopup();
		})

	}

	public load() {
		this.ref.username.value = User.username as string;
		this.ref.twofa.value = (User.twofa as number > 0 ? "2FA Enabled" : "2FA Disabled");
		this.ref.editUsername.toggleAttribute("off", true);
		this.ref.editAvatar.toggleAttribute("off", true);
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}

	private setPopup() {
		this.ref.verifyA.remove();
		this.ref.verifyB.remove();
		this.ref.verifyC.remove();
		this.ref.verifyA.value = "";
		this.ref.verifyB.value = "";
		this.ref.verifyC.value = "";
		switch (this.state) {
			case verifyState.username: {
				this.ref.verifyA.placeholder = "password";
				this.ref.verifyB.placeholder = "2fa token";
				this.ref.verifyA.type = "password";
				this.ref.verifyB.type = "text";
				this.ref.verifyContent.appendChild(this.ref.verifyA);
				if (User.twofa as number > 0) {
					this.ref.verifyContent.appendChild(this.ref.verifyB);
				}
				Popup.addPopup(this.ref.verifyWindow);
				break;
			}
			case verifyState.password: {
				this.ref.verifyA.placeholder = "old password";
				this.ref.verifyB.placeholder = "new password";
				this.ref.verifyC.placeholder = "two token";
				this.ref.verifyA.type = "password";
				this.ref.verifyB.type = "password";
				this.ref.verifyC.type = "text";
				this.ref.verifyContent.appendChild(this.ref.verifyA);
				this.ref.verifyContent.appendChild(this.ref.verifyB);
				if (User.twofa as number > 0) {
					this.ref.verifyContent.appendChild(this.ref.verifyC);
				}
				Popup.addPopup(this.ref.verifyWindow);
			}
		}
	}
}

export default Ath;
