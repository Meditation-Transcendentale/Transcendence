export async function registerRequest(username: string, password: string): Promise<string> {
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

	document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { msg: data.message, ok: response.ok } }));
	if (response.ok) {
		return data.message;
	}
	throw (data.message);
}

export async function loginRequest(username: string, password: string): Promise<string> {
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

	document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { msg: data.message, ok: response.ok } }));
	if (response.ok) {
		return data.message;
	}
	throw (data.message);
}


export async function logoutRequest(): Promise<String> {
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

	document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { msg: data.message, ok: response.ok } }));
	if (response.ok) {
		return data.message;
	}
	throw (data.message);

}
