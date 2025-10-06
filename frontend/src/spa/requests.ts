import { User } from "./User";

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


export async function meRequest(cache: string = "default") {
	const response = await fetch(`https://${window.location.hostname}:7000/api/info/me`, {
		method: 'GET',
		cache: cache as RequestCache,
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	})
	if (!response.ok) {
		return Promise.reject(response);
	}

	const json = await response.json();

	User.username = json.userInfo.username;
	User.uuid = json.userInfo.uuid;
	User.twofa = json.userInfo.two_fa_enabled;
	User.avatar = json.userInfo.avatar_path;

	return json;
}


export async function meReject() {
	document.getElementById("status")?.dispatchEvent(
		new CustomEvent("status", { detail: { ok: false, json: "Not Logged In" } }))
	setTimeout(() => { window.location.reload() }, 500);
}

export async function cdnRequest(path: string): Promise<JSON> {
	const response = await fetch(`https://${window.location.hostname}:7000/cdn${encodeURI(path)}`, {
		method: 'GET',
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
