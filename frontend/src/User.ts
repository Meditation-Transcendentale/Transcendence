import { getRequest } from "./networking/request";

class UserC {
	public username: string | null;
	public uuid: string | null;
	public status: string | null;
	public avatar: string | null;

	constructor() {
		console.log("%c USER", "color: white; background-color: red");
		this.username = null;
		this.uuid = null;
		this.status = null;
		this.avatar = null;
	}

	public check(): Promise<boolean> {
		// let json: any;
		// try {
		// 	json = await getRequest("info/me", "no-cache")
		// } catch (err) {
		// 	Promise.reject(false);
		// 	return;
		// }
		//
		// this.username = json.userInfo.username;
		// this.uuid = json.userInfo.uuid;
		// // this.twofa = json.userInfo.two_fa_enabled;
		// this.avatar = json.userInfo.avatar_path;
		// let json: any = await getRequest("info/me", "no-cache");
		// return new Promise((resolve) => {
		// 	this.username = json.userInfo.username;
		// 	this.uuid = json.userInfo.uuid;
		// 	// this.twofa = json.userInfo.two_fa_enabled;
		// 	this.avatar = json.userInfo.avatar_path;
		// 	return;
		// })
		// getRequest("info/me", "no-cache")
		// 	.then((json: any) => {
		// 		this.username = json.userInfo.username;
		// 		this.uuid = json.userInfo.uuid;
		// 		// this.twofa = json.userInfo.two_fa_enabled;
		// 		this.avatar = json.userInfo.avatar_path;
		// 	})
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

// let g_User: User | null = null;
//
// export function createUser(): User {
// 	if (g_User === undefined || g_User === null) {
// 		g_User = new User();
// 		//Object.freeze(g_User) // Not sure if necessary or working
// 	}
// 	return g_User;
// }

export const User = new UserC();
