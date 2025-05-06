import { Friend } from "./Friendlist"

export type AuthResponse = {
	message: string,
	status: number,
	ok: boolean,
}

export type statsResponse = {
	json: {},
	status: number,
	ok: boolean
}

export type twoFAResponse = {
	message: {},
	status: number,
	ok: boolean
}

export type friendlist_RequestResponse = {
	json: {
		friendlist: Friend[];
	},
	status: number,
	ok: boolean
}

export type friend_RequestResponse = {
	message: string,
	status: number,
	ok: boolean,
}


export async function registerRequest(username: string, password: string): Promise<AuthResponse> {
	const response = await fetch("https://localhost:3000/register", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	});
	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function loginRequest(username: string, password: string): Promise<AuthResponse> {
	console.log(".");
	const response = await fetch("https://localhost:3000/auth/login", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			username: username,
			password: password
		})
	});
	
	console.log("f");
	
	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}


export async function logoutRequest(): Promise<AuthResponse> {
	const response = await fetch("https://localhost:3000/auth/logout", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function updateInfoRequest(username: string, avatar: string): Promise<AuthResponse> {
	const response = await fetch("https://localhost:3000/update-info", {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			username: username,
			avatar: avatar
		})
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function updatePasswordRequest(password: string, newPassword: string): Promise<AuthResponse> {
	const response = await fetch("https://localhost:3000/update-info/password", {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			password: password,
			newPassword: newPassword,
			token: ""
		})
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function statsRequest(username: string): Promise<statsResponse> {
	const response = await fetch("https://localhost:3000/stats/player/:" + username, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: statsResponse = {
		json: data,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function enable2FARequest(): Promise<twoFAResponse> {
	const response = await fetch("https://localhost:3000/update-info/enable-2fa", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data,
		status: response.status,
		ok: response.ok
	};
	return final;
}

export async function verify2FARequest(): Promise<twoFAResponse> {
	const response = await fetch("https://localhost:3000/update-info/verify-2fa", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data,
		status: response.status,
		ok: response.ok
	};
	console.log(final);
	return final;
}

export async function friendlist_Request(): Promise<friendlist_RequestResponse> {
	const response = await fetch("https://localhost:3000/friends/get/friendlist", {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: friendlist_RequestResponse = {
		json: data,
		status: response.status,
		ok: response.ok
	};
	console.log (final);
	return final;
}

export async function addFriend_Request(addedUsername: string): Promise<friend_RequestResponse> 
{
	const response = await fetch("https://localhost:3000/friends/add", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			inputUsername: addedUsername,
		})
	});
	
	
	const data = await response.json();
	
	const final: friend_RequestResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}



