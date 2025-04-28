// export async function meRequest(cache: string = "default") {
// 	const response = await fetch("https://localhost:3000/info/me", {
// 		method: 'GET',
// 		cache: cache,
// 		headers: {
// 			'Accept': 'application/json',
// 		},
// 		credentials: 'include',
// 	});
//
// 	const data = await response.json();
// 	// console.log(response);
// 	if (!response.ok) {
// 		throw new Error("me");
// 	}
//
// 	const final = {
// 		message: data,
// 		status: response.status,
// 		ok: response.ok
// 	};
// 	return final;
// };

export async function meRequest(cache: string = "default") {
	const response = await fetch("https://localhost:3000/info/me", {
		method: 'GET',
		cache: cache,
		headers: {
			'Accept': 'application/json',
		},
		credentials: 'include',
	})
	if (!response.ok) {
		return Promise.reject(response);
	}

	return response.json();
}

export async function meReject() {
	document.getElementById("status")?.dispatchEvent(
		new CustomEvent("status", { detail: { ok: false, json: "Not Logged In" } }))
	setTimeout(() => { window.location.reload() }, 500);
}
