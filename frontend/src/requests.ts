export type AuthResponse = {
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
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
	});

	const data = await response.json();

	const final: AuthResponse = {
		message: data.message,
		status: response.status,
		ok: response.ok
	};
	return final;
}
