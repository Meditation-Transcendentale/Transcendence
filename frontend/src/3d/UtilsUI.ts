import { Color3, Vector2, Vector3, Vector4 } from "@babylonImport";


export function UIaddVec3(name: string, vec: Vector3, eventListener: any): HTMLElement {
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	const z = document.createElement("input");
	z.type = "number";
	z.value = vec.z.toString();
	div.appendChild(x);
	div.appendChild(y);
	div.appendChild(z);
	x.addEventListener("input", () => {
		vec.x = Number(x.value);
		eventListener();
	})
	y.addEventListener("input", () => {
		vec.y = Number(y.value);
		eventListener();
	})
	z.addEventListener("input", () => {
		vec.z = Number(z.value);
		eventListener();
	})
	document.querySelector("#utils-details")?.appendChild(div);
	div.setAttribute("name", name);
	return div;
}

export function UIaddVec4(name: string, vec: Vector4, eventListener: any): HTMLElement {
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	const z = document.createElement("input");
	z.type = "number";
	z.value = vec.z.toString();
	const w = document.createElement("input");
	w.type = "number";
	w.value = vec.w.toString();

	div.appendChild(x);
	div.appendChild(y);
	div.appendChild(z);
	div.appendChild(w);
	x.addEventListener("input", () => {
		vec.x = Number(x.value);
		eventListener();
	})
	y.addEventListener("input", () => {
		vec.y = Number(y.value);
		eventListener();
	})
	z.addEventListener("input", () => {
		vec.z = Number(z.value);
		eventListener();
	})
	w.addEventListener("input", () => {
		vec.w = Number(w.value);
		eventListener();
	})
	document.querySelector("#utils-details")?.appendChild(div);
	div.setAttribute("name", name);
	return div;
}

export function UIaddVec2(name: string, vec: Vector2, eventListener: any): HTMLElement {
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	div.appendChild(x);
	div.appendChild(y);
	x.addEventListener("input", () => {
		vec.x = Number(x.value);
		eventListener();
	})
	y.addEventListener("input", () => {
		vec.y = Number(y.value);
		eventListener();
	})
	document.querySelector("#utils-details")?.appendChild(div);
	div.setAttribute("name", name);
	return div;
}

export function UIaddColor(name: string, col: Color3, eventListener: any): HTMLElement {
	const div = document.createElement("div");
	div.className = "color-picker";
	const color = document.createElement("input");
	color.type = "color";
	color.value = col.toHexString();
	color.addEventListener("change", () => {
		col.fromHexString(color.value);
		eventListener();
	});
	div.appendChild(color);
	div.setAttribute("name", name);
	document.querySelector("#utils-details")?.appendChild(div);
	return div;
}

export function UIaddNumber(name: string, value: number, eventListener: any): HTMLElement {
	const div = document.createElement('div');
	div.className = "float";
	const f = document.createElement("input");
	f.type = "number";
	f.value = value.toString();
	f.addEventListener("input", () => { eventListener(Number(f.value)) });
	div.appendChild(f);
	div.setAttribute("name", name);
	document.querySelector("#utils-details")?.appendChild(div);
	return div;
}

export function UIaddToggle(name: string, value: boolean, eventListener: any): HTMLElement {
	const div = document.createElement('div');
	div.className = "toogle";
	const t = document.createElement("input");
	t.type = "checkbox";
	t.checked = value;
	t.addEventListener("change", () => { eventListener(t.checked) });
	div.appendChild(t);
	div.setAttribute("name", name);
	document.querySelector("#utils-details")?.appendChild(div);
	return div;
}

export function UIaddSlider(name: string, value: number, eventListener?: any, step = 1, min = -100, max = 100) {
	const div = document.createElement("div");
	div.className = "toggle";
	const r = document.createElement("input");
	const n = document.createElement("input");
	r.type = "range";
	r.value = value.toString();
	if (eventListener !== undefined) {
		r.addEventListener("input", () => {
			n.value = r.value;
			eventListener(Number(r.value));
		});
	}
	r.step = step.toString();
	r.max = max.toString();
	r.min = min.toString();

	n.type = "number";
	n.value = value.toString();
	if (eventListener !== undefined) {
		n.addEventListener("input", () => {
			r.value = n.value;
			eventListener(Number(n.value))
		});
	}
	n.step = step.toString();
	n.max = max.toString();
	n.min = min.toString();

	div.appendChild(r);
	div.appendChild(n);
	div.setAttribute("name", name);
	document.querySelector("#utils-details")?.appendChild(div);
	return div;
}

