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

export type friendlistResponse = {
	json: {},
	status: number,
	ok: boolean
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

export async function friendlistRequest(username: string): Promise<friendlistResponse> {
	const response = await fetch("https://localhost:3000/friends/friendlist", {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	});

	const data = await response.json();

	const final: friendlistResponse = {
		json: data,
		status: response.status,
		ok: response.ok
	};
	return final;
}