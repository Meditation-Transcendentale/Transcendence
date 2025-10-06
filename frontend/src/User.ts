import { getRequest } from "./networking/request";

class UserC {
	public username!: string;
	public uuid!: string;
	public status!: string;
	public avatar!: string;

	constructor() {
		console.log("%c USER", "color: white; background-color: red");

	}

	public check(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			getRequest("info/me", "no-cache")
				.then((json: any) => {
					this.username = json.userInfo.username;
					this.uuid = json.userInfo.uuid;
					// this.twofa = json.userInfo.two_fa_enabled;
					this.avatar = json.userInfo.avatar_path;
					resolve(true);
				})
				.catch((err) => {
					reject(new Error("not authentifiated"));
				})

		})


	}
}

export const User = new UserC();
