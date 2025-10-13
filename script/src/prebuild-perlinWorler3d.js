/*
 *	Translated from https://www.shadertoy.com/view/3dVXDc by piyushslayer
 * */


const fs = require('fs');
const path = require('path');

const UI0 = 1597334673;
const UI1 = 3812015801;
const UIA = 2798796415;
const UIF = 1. / 0xffffffff;

const UI3 = new Uint32Array(3);
UI3[0] = UI0;
UI3[1] = UI1;
UI3[2] = UIA;

const Avec3 = new Float32Array(3);
const Bvec3 = new Float32Array(3);
const Cvec3 = new Float32Array(3);

const fvec3 = new Float32Array(3);
const fvec3b = new Float32Array(3);
const uvec3 = new Uint32Array(3);
const ivec3 = new Int32Array(3);

const uint = new Uint32Array(1);
const int = new Int32Array(1);

const worleyH = new Float32Array(3);

const ga = new Float32Array(3);
const gb = new Float32Array(3);
const gc = new Float32Array(3);
const gd = new Float32Array(3);
const ge = new Float32Array(3);
const gf = new Float32Array(3);
const gg = new Float32Array(3);
const gh = new Float32Array(3);


function dot(u, v) {
	return (u[0] * v[0]) + (u[1] * v[1]) + (u[2] * v[2]);
}


function hash33(vec3, final) {
	ivec3[0] = vec3[0];
	ivec3[1] = vec3[1];
	ivec3[2] = vec3[2];
	uvec3[0] = ivec3[0] * UI3[0];
	uvec3[1] = ivec3[1] * UI3[1];
	uvec3[2] = ivec3[2] * UI3[2];
	uint[0] = uvec3[0] ^ uvec3[1] ^ uvec3[2];
	uvec3[0] = uint[0] * UI3[0];
	uvec3[1] = uint[0] * UI3[1];
	uvec3[2] = uint[0] * UI3[2];

	final[0] = -1. + 2. * uvec3[0] * UIF;
	final[1] = -1. + 2. * uvec3[1] * UIF;
	final[2] = -1. + 2. * uvec3[2] * UIF;

	return final;
}

function remap(x, a, b, c, d) {
	return (((x - a) / (b - a)) * (d - c)) + c;
}

//same mod as GLSL definition
function mod(x, y) {
	return x - y * Math.floor(x / y);
}

function gradientNoise(x, freq) {
	const p = new Float32Array([Math.floor(x[0]), Math.floor(x[1]), Math.floor(x[2])]);
	const w = new Float32Array([x[0] - Math.floor(x[0]), x[1] - Math.floor(x[1]), x[2] - Math.floor(x[2])]);

	const u = new Float32Array([
		w[0] * w[0] * w[0] * (w[0] * (w[0] * 6. - 15.) + 10.),
		w[1] * w[1] * w[1] * (w[1] * (w[1] * 6. - 15.) + 10.),
		w[2] * w[2] * w[2] * (w[2] * (w[2] * 6. - 15.) + 10.),
	])

	fvec3[0] = mod(p[0] + 0, freq);
	fvec3[1] = mod(p[1] + 0, freq);
	fvec3[2] = mod(p[2] + 0, freq);
	hash33(fvec3, ga);
	fvec3[0] = mod(p[0] + 1, freq);
	fvec3[1] = mod(p[1] + 0, freq);
	fvec3[2] = mod(p[2] + 0, freq);
	hash33(fvec3, gb);
	fvec3[0] = mod(p[0] + 0, freq);
	fvec3[1] = mod(p[1] + 1, freq);
	fvec3[2] = mod(p[2] + 0, freq);
	hash33(fvec3, gc);
	fvec3[0] = mod(p[0] + 1, freq);
	fvec3[1] = mod(p[1] + 1, freq);
	fvec3[2] = mod(p[2] + 0, freq);
	hash33(fvec3, gd);
	fvec3[0] = mod(p[0] + 0, freq);
	fvec3[1] = mod(p[1] + 0, freq);
	fvec3[2] = mod(p[2] + 1, freq);
	hash33(fvec3, ge);
	fvec3[0] = mod(p[0] + 1, freq);
	fvec3[1] = mod(p[1] + 0, freq);
	fvec3[2] = mod(p[2] + 1, freq);
	hash33(fvec3, gf);
	fvec3[0] = mod(p[0] + 0, freq);
	fvec3[1] = mod(p[1] + 1, freq);
	fvec3[2] = mod(p[2] + 1, freq);
	hash33(fvec3, gg);
	fvec3[0] = mod(p[0] + 1, freq);
	fvec3[1] = mod(p[1] + 1, freq);
	fvec3[2] = mod(p[2] + 1, freq);
	hash33(fvec3, gh);

	fvec3[0] = w[0] - 0;
	fvec3[1] = w[1] - 0;
	fvec3[2] = w[2] - 0;
	const va = dot(ga, fvec3);
	fvec3[0] = w[0] - 1;
	fvec3[1] = w[1] - 0;
	fvec3[2] = w[2] - 0;
	const vb = dot(gb, fvec3);
	fvec3[0] = w[0] - 0;
	fvec3[1] = w[1] - 1;
	fvec3[2] = w[2] - 0;
	const vc = dot(gc, fvec3);
	fvec3[0] = w[0] - 1;
	fvec3[1] = w[1] - 1;
	fvec3[2] = w[2] - 0;
	const vd = dot(gd, fvec3);
	fvec3[0] = w[0] - 0;
	fvec3[1] = w[1] - 0;
	fvec3[2] = w[2] - 1;
	const ve = dot(ge, fvec3);
	fvec3[0] = w[0] - 1;
	fvec3[1] = w[1] - 0;
	fvec3[2] = w[2] - 1;
	const vf = dot(gf, fvec3);
	fvec3[0] = w[0] - 0;
	fvec3[1] = w[1] - 1;
	fvec3[2] = w[2] - 1;
	const vg = dot(gg, fvec3);
	fvec3[0] = w[0] - 1;
	fvec3[1] = w[1] - 1;
	fvec3[2] = w[2] - 1;
	const vh = dot(gh, fvec3);

	return va +
		u[0] * (vb - va) +
		u[1] * (vc - va) +
		u[2] * (ve - va) +
		u[0] * u[1] * (va - vb - vc + vd) +
		u[1] * u[2] * (va - vc - ve + vg) +
		u[2] * u[0] * (va - vb - ve + vf) +
		u[0] * u[1] * u[2] * (-va + vb + vc - vd + ve - vf - vg + vh);
}

// Tileable 3D worley noise
function worleyNoise(uv, freq) {
	const id = new Float32Array([Math.floor(uv[0]), Math.floor(uv[1]), Math.floor(uv[2])]);
	const p = new Float32Array([uv[0] - Math.floor(uv[0]), uv[1] - Math.floor(uv[1]), uv[2] - Math.floor(uv[2])]);

	let minDist = 10000.;
	for (let x = -1; x <= 1.; ++x) {
		for (let y = -1; y <= 1.; ++y) {
			for (let z = -1; z <= 1; ++z) {
				fvec3[0] = x; //offset
				fvec3[1] = y;
				fvec3[2] = z;
				fvec3b[0] = mod(id[0] + fvec3[0], freq);
				fvec3b[1] = mod(id[1] + fvec3[1], freq);
				fvec3b[2] = mod(id[2] + fvec3[2], freq);
				hash33(fvec3b, worleyH);
				worleyH[0] = (worleyH[0] * 0.5 + 0.5) + fvec3[0];
				worleyH[1] = (worleyH[1] * 0.5 + 0.5) + fvec3[1];
				worleyH[2] = (worleyH[2] * 0.5 + 0.5) + fvec3[2];
				fvec3[0] = p[0] - worleyH[0];
				fvec3[1] = p[1] - worleyH[1];
				fvec3[2] = p[2] - worleyH[2];
				minDist = Math.min(minDist, dot(fvec3, fvec3));
			}
		}
	}

	// inverted worley noise
	return 1. - minDist;
}

function perlinFbm(p, freq, octaves) {
	const G = 0.554784736034;//Math.pow(2, -0.85);
	let amp = 1.;
	let noise = 0.;

	const tfvec3 = new Float32Array(3);
	for (let i = 0; i < octaves; ++i) {
		tfvec3[0] = p[0] * freq;
		tfvec3[1] = p[1] * freq;
		tfvec3[2] = p[2] * freq;
		noise += amp * gradientNoise(tfvec3, freq);
		freq *= 2.;
		amp *= G;
	}

	return noise;
}

// Tileable Worley fbm inspired by Andrew Schneider's Real-Time Volumetric Cloudscapes
// chapter in GPU Pro 7.
function worleyFbm(p, freq) {

	const tfvec3 = new Float32Array(3);
	tfvec3[0] = p[0] * freq;
	tfvec3[1] = p[1] * freq;
	tfvec3[2] = p[2] * freq;
	let noise = worleyNoise(tfvec3, freq) * 0.625;
	tfvec3[0] = p[0] * freq * 2.;
	tfvec3[1] = p[1] * freq * 2.;
	tfvec3[2] = p[2] * freq * 2.;
	noise += worleyNoise(tfvec3, freq * 2.) * 0.25;
	tfvec3[0] = p[0] * freq * 4.;
	tfvec3[1] = p[1] * freq * 4.;
	tfvec3[2] = p[2] * freq * 4.;
	noise += worleyNoise(tfvec3, freq * 4.) * 0.125;
	return noise;
}

function perlinWorley(uvw, freq, octave) {
	let pfbm = perlinFbm(uvw, freq, octave) * 0.5 + 0.5;
	pfbm = Math.abs(pfbm * 2. - 1.); // billowy perlin noise

	let wfbm = worleyFbm(uvw, freq);
	return remap(pfbm, 0., 1., wfbm, 1.);// perlin-worley
}


function perlinWorley3D(size, freq = 4., octave = 7.) {
	const final = new Float32Array(size * size * size);

	const tfvec3 = new Float32Array(3);
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			for (let z = 0; z < size; z++) {
				tfvec3[0] = x / 63;
				tfvec3[1] = y / 63;
				tfvec3[2] = z / 63;
				final[x + y * size + z * size * size] = perlinWorley(tfvec3, freq, octave);
			}
		}
	}
	return final;
}
async function saveAsTypeScript(noise, outputPath) {
	const dir = path.dirname(outputPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	// const noiseData = "[" + noise.map(p =>
	// 	`[${p.x.toFixed(4)},${p.y.toFixed(4)},${p.z.toFixed(4)}]`
	// ).join(',');
	let noiseData = "[";
	let c = 0;
	noise.forEach(element => {
		if (c)
			noiseData += ",";
		noiseData += `${element}`;
		c = 1;
	});
	noiseData += "]";

	const tsContent = `export const prebuildPerlinWorley3d = ${noiseData};`;

	fs.writeFileSync(outputPath, tsContent);
	console.log(`Saved TS: ${outputPath}`);
}

async function main() {
	const noise = perlinWorley3D(64);

	await saveAsTypeScript(noise, `../frontend/src/scene/prebuild-perlinWorley3d.ts`)
}

main().catch((err) => console.log(err));
