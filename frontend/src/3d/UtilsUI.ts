import { Color3, Vector2, Vector3, Vector4 } from "@babylonImport";

interface iUIOption {
	step?: number;
	min?: number;
	max?: number;
	div?: Element | null;
}

interface iUIOptionSet {
	step: number;
	min: number;
	max: number;
	div: Element | null;
}

const defaultUIOption: iUIOption = {
	step: 1,
	min: -100,
	max: 100,
	div: null
}

let detailI = 0.;

export function UIaddDetails(name: string, parent?: Element | null, id?: string,): HTMLElement {
	const d = document.createElement("details");
	const s = document.createElement("summary");
	if (id)
		d.id = id;
	s.innerText = name;
	d.appendChild(s);
	d.className = "utils-details " + (detailI % 2 == 0 ? "details-dark" : "details-light");
	detailI += 1;
	if (parent != null && parent != undefined) {
		parent.appendChild(d);
	} else {
		document.querySelector("#utils-details")?.appendChild(d);
	}
	return d;
}

export function UIaddVec3(name: string, vec: Vector3, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	x.step = option.step.toString();
	x.max = option.max.toString();
	x.min = option.min.toString();

	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	y.step = option.step.toString();
	y.max = option.max.toString();
	y.min = option.min.toString();
	const z = document.createElement("input");
	z.type = "number";
	z.value = vec.z.toString();
	z.step = option.step.toString();
	z.max = option.max.toString();
	z.min = option.min.toString();

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
	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}
	div.setAttribute("name", name);
	return div;
}

export function UIaddVec4(name: string, vec: Vector4, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	x.step = option.step.toString();
	x.max = option.max.toString();
	x.min = option.min.toString();
	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	y.step = option.step.toString();
	y.max = option.max.toString();
	y.min = option.min.toString();

	const z = document.createElement("input");
	z.type = "number";
	z.value = vec.z.toString();
	z.step = option.step.toString();
	z.max = option.max.toString();
	z.min = option.min.toString();

	const w = document.createElement("input");
	w.type = "number";
	w.value = vec.w.toString();
	w.step = option.step.toString();
	w.max = option.max.toString();
	w.min = option.min.toString();


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
	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}

	div.setAttribute("name", name);
	return div;
}

export function UIaddVec2(name: string, vec: Vector2, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement('div');
	div.className = "vector";
	const x = document.createElement("input");
	x.type = "number";
	x.value = vec.x.toString();
	x.step = option.step.toString();
	x.max = option.max.toString();
	x.min = option.min.toString();


	const y = document.createElement("input");
	y.type = "number";
	y.value = vec.y.toString();
	y.step = option.step.toString();
	y.max = option.max.toString();
	y.min = option.min.toString();

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
	div.setAttribute("name", name);
	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}

	return div;
}

export function UIaddColor(name: string, col: Color3, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
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
	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}

	return div;
}

export function UIaddNumber(name: string, value: number, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement('div');
	div.className = "float";
	const f = document.createElement("input");
	f.type = "number";
	f.step = option.step.toString();
	f.max = option.max.toString();
	f.min = option.min.toString();
	f.value = value.toString();
	f.addEventListener("input", () => { eventListener(Number(f.value)) });
	div.appendChild(f);
	div.setAttribute("name", name);

	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}
	return div;
}

export function UIaddToggle(name: string, value: boolean, Xoption: iUIOption, eventListener?: any): HTMLElement {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement('div');
	div.className = "toogle";
	const t = document.createElement("input");
	t.type = "checkbox";
	t.checked = value;
	t.addEventListener("change", () => { eventListener(t.checked) });
	div.appendChild(t);
	div.setAttribute("name", name);
	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}

	return div;
}

export function UIaddSlider(name: string, value: number, Xoption: iUIOption, eventListener?: any) {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement("div");
	div.className = "toggle";
	const r = document.createElement("input");
	const n = document.createElement("input");
	r.type = "range";
	r.value = value.toString();
	r.addEventListener("input", () => {
		n.value = r.value;
		if (eventListener !== undefined) {
			eventListener(Number(r.value));
		}
	});
	r.step = option.step.toString();
	r.max = option.max.toString();
	r.min = option.min.toString();

	n.type = "number";
	n.value = value.toString();
	n.addEventListener("input", () => {
		r.value = n.value;
		if (eventListener !== undefined) {

			eventListener(Number(n.value))
		}
	});
	n.step = option.step.toString();
	n.max = option.max.toString();
	n.min = option.min.toString();

	div.appendChild(r);
	div.appendChild(n);
	div.setAttribute("name", name);

	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}
	return div;
}


export function UIaddSliderVec3(name: string, vec: Vector3, Xoption: iUIOption, eventListener?: any) {
	const option = { ...defaultUIOption, ...Xoption } as iUIOptionSet;
	const div = document.createElement("div");
	div.setAttribute("name", name);

	if (option.div == null) {
		document.querySelector("#utils-details")?.appendChild(div);
	} else {
		option.div!.appendChild(div)
	}
	UIaddSlider("  -x", vec.x, option, (n: number) => {
		vec.x = n;
		if (eventListener !== undefined) { eventListener() }
	});
	UIaddSlider("  -y", vec.y, option, (n: number) => {
		vec.y = n;
		if (eventListener !== undefined) { eventListener() }
	});
	UIaddSlider("  -z", vec.z, option, (n: number) => {
		vec.z = n;
		if (eventListener !== undefined) { eventListener() }
	});
}
