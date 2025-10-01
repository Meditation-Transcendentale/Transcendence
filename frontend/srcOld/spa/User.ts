class UserC {
	public username: string | null;
	public uuid: string | null;
	public twofa: number | null;
	public avatar: string | null;
	public status: any;

	constructor() {
		this.username = null;
		this.uuid = null;
		this.twofa = null;
		this.avatar = null;
		this.status = null;
	}
}

export const User = new UserC();
