export interface ISearchRequestResponce {
	username: string;
	uuid: string,
	status: string,
	avatar_path: string
}


export async function getRequest(path: string, cache: string = "default"): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/api/${encodeURI(path)}`, {
		method: 'GET',
		cache: cache as RequestCache,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
	});

	if (!response.ok) {
		return Promise.reject(response);
	}
	return response.json();
}

export async function postRequest(path: string, body: {}): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/api/${encodeURI(path)}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(body)

	});

	if (!response.ok) {
		return Promise.reject(response);
	}

	return response.json();
}

export async function patchRequest(path: string, body: {}, stringify = true): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/api/${encodeURI(path)}`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: stringify ? JSON.stringify(body) : body
	});

	if (!response.ok) {
		return Promise.reject(response);
	}

	return response.json();
}

export async function avatarRequest(path: string, body: FormData): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/api/${encodeURI(path)}`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
		body: body
	});

	if (!response.ok) {
		return Promise.reject(response);
	}

	return response.json();
}


export async function deleteRequest(path: string, body: {}): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/api/${encodeURI(path)}`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(body)
	});
	if (!response.ok) {
		return Promise.reject(response);
	}

	return response.json();
}

