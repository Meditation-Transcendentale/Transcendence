export async function registerRequest(username: string, password: string): Promise<JSON | string> {
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

	if (response.ok) {
		return data;
	}
	throw (data.message);
}

export async function loginRequest(username: string, password: string): Promise<JSON | string> {
	const response = await fetch("https://localhost:3000/auth/login", {
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

	if (response.ok) {
		return data;
	}
	throw (data.message);
}

