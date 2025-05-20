class UserC {
	public username: string | null;
	public uuid: string | null;
	public twofa: boolean | null;
	public avatar: string | null;

	constructor() {
		this.username = null;
		this.uuid = null;
		this.twofa = null;
		this.avatar = null;
	}
}

export const User = new UserC();
