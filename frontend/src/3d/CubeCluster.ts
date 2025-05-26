import {
	Color3,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRSpecularGlossinessMaterial,
	Scene,
	Vector3
} from "@babylonjs/core";
import perlinNoise3d from 'perlin-noise-3d'

export class CubeCluster {
	private cluster: Mesh;

	constructor(scene: Scene) {
		this.cluster = MeshBuilder.CreateBox("cube", { size: 1 }, scene);
		//const pbr = new PBRMetallicRoughnessMaterial("pbr", scene);
		//pbr.roughness = 0.1;
		//pbr.metallic = 1.0;
		//pbr.baseColor = Color3.Black();
		//pbr._metallicReflectanceColor = Color3.White();
		const pbr = new PBRSpecularGlossinessMaterial("pbr", scene);
		pbr.diffuseColor = Color3.Black();
		pbr.specularColor = Color3.White();
		pbr.glossiness = 0.9;
		this.cluster.useVertexColors = true;
		this.cluster.material = pbr;

	}

	public async init() {
		const size = 10;
		const cubesize = size * size * size;
		const rd = new Float32Array(cubesize * 3);
		for (let i = 0; i < cubesize; i++) {
			rd[i * 3] = (i % size) * 2 + Math.random() - 0.5;
			rd[i * 3 + 1] = Math.floor(i / (size * size)) * 2 + Math.random() - 0.5;
			rd[i * 3 + 2] = Math.floor((i % (size * size)) / size) * 2 + Math.random() - 0.5;
			console.log(rd[i * 3], rd[i * 3 + 1], rd[i * 3 + 2])
		}
		//for (let i = 0; i < cubesize; i++) {
		//	rd[i * 3] = (i % size);
		//	rd[i * 3 + 1] = Math.floor(i / (size * size));
		//	rd[i * 3 + 2] = Math.floor((i % (size * size)) / size);
		//	//console.log(rd[i * 3], rd[i * 3 + 1], rd[i * 3 + 2])
		//}

		const bufferMatrix = new Float32Array(16 * cubesize);
		const colorbuf = new Float32Array(3 * cubesize);

		console.log("MATRIX");

		const noise = new perlinNoise3d();

		for (let i = 0; i < cubesize; i++) {
			const sx = getMx(i, rd, size);
			const sy = getMy(i, rd, size);
			const sz = getMz(i, rd, size);

			const px = rd[i * 3] - sz * 0.5;
			const py = rd[i * 3 + 1] + sy * 0.5;
			const pz = rd[i * 3 + 2] + sz * 0.5;

			const n = noise.get(px, py, pz);
			const matS = Matrix.Scaling(
				sx * n,
				sy * n,
				sz * n

			)
			////console.log(i,
			//getMx(i, rd, size),
			//	getMy(i, rd, size),
			//	getMz(i, rd, size)
			////)
			//
			//const matS = Matrix.Scaling(
			//	0.5, 0.5, 0.5)

			const matT = Matrix.Translation(
				rd[i * 3] - sz * 0.5,
				rd[i * 3 + 1] + sy * 0.5,
				rd[i * 3 + 2] + sz * 0.5
			)

			const matrix = matS.multiply(matT);
			matrix.copyToArray(bufferMatrix, i * 16);
			new Color3(i % size / size, (i / (size * size)) / size, ((i % (size * size)) / size * size)).toArray(colorbuf, i * 3);
		}

		this.cluster.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		this.cluster.thinInstanceSetBuffer('color', colorbuf, 3, true);


	}
}


const mdefault = 2;
function getMx(i: number, rd: Float32Array, size: number): number {
	const px: number = ((i + 1) % size ? Math.abs(rd[i * 3] - rd[i * 3 + 1]) : mdefault);
	const mx: number = (i % size ? Math.abs(rd[i * 3] - rd[i * 3 - 1]) : mdefault);

	//return Math.max((px + mx) / 2, 0.1);
	return Math.min(px, mx);
}

function getMy(i: number, rd: Float32Array, size: number): number {
	const py: number = (i < ((size * size * size) - (size * size)) ? Math.abs(rd[i * 3 + 1] - rd[i * 3 + 1 + 3 * size * size]) : mdefault);
	const my: number = (i >= size * size ? Math.abs(rd[i * 3 + 1] - rd[i * 3 + 1 - 3 * size * size]) : mdefault);

	//return Math.max((py + my) / 2, 0.1);
	return Math.min(py, my);
}

function getMz(i: number, rd: Float32Array, size: number): number {
	const pz: number = (i % (size * size) < (size * size) - size ? Math.abs(rd[i * 3 + 2] - rd[i * 3 + 2 + (3 * size)]) : mdefault);
	const mz: number = (i % (size * size) >= size ? Math.abs(rd[i * 3 + 2] - rd[i * 3 + 2 - (3 * size)]) : mdefault);

	//return Math.max((pz + mz) / 2, 0.1);
	return Math.min(pz, mz);
}


//uvec2 _pcg3d16(uvec3 p)
//{
//	uvec3 v = p * 1664525u + 1013904223u;
//	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
//	v.x += v.y * v.z; v.y += v.z * v.x;
//	return v.xy;
//}
//
//
//// Get random gradient from hash value.
//function _gradient3d(hash: number): Vector3 {
//	const g = new Vector3(hash & 0x80000, hash & 0x40000, hash & 0x20000);// vec3(uvec3(hash) & uvec3(0x80000, 0x40000, 0x20000));
//	return g.divide(new Vector3(0x40000, 0x20000, 0x10000)).add(new Vector3(-1));
//}
//
//
//// Optimized 3D Bitangent Noise. Approximately 113 instruction slots used.
//// Assume p is in the range [-32768, 32767].
//vec3 BitangentNoise3D(vec3 p)
//{
//	const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
//	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
//
//	// First corner
//	vec3 i = floor(p + dot(p, C.yyy));
//	vec3 x0 = p - i + dot(i, C.xxx);
//
//	// Other corners
//	vec3 g = step(x0.yzx, x0.xyz);
//	vec3 l = 1.0 - g;
//	vec3 i1 = min(g.xyz, l.zxy);
//	vec3 i2 = max(g.xyz, l.zxy);
//
//	// x0 = x0 - 0.0 + 0.0 * C.xxx;
//	// x1 = x0 - i1  + 1.0 * C.xxx;
//	// x2 = x0 - i2  + 2.0 * C.xxx;
//	// x3 = x0 - 1.0 + 3.0 * C.xxx;
//	vec3 x1 = x0 - i1 + C.xxx;
//	vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//	vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
//
//	i = i + 32768.5;
//	uvec2 hash0 = _pcg3d16(uvec3(i));
//	uvec2 hash1 = _pcg3d16(uvec3(i + i1));
//	uvec2 hash2 = _pcg3d16(uvec3(i + i2));
//	uvec2 hash3 = _pcg3d16(uvec3(i + 1.0));
//
//	vec3 p00 = _gradient3d(hash0.x); vec3 p01 = _gradient3d(hash0.y);
//	vec3 p10 = _gradient3d(hash1.x); vec3 p11 = _gradient3d(hash1.y);
//	vec3 p20 = _gradient3d(hash2.x); vec3 p21 = _gradient3d(hash2.y);
//	vec3 p30 = _gradient3d(hash3.x); vec3 p31 = _gradient3d(hash3.y);
//
//	// Calculate noise gradients.
//	vec4 m = clamp(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0, 1.0);
//	vec4 mt = m * m;
//	vec4 m4 = mt * mt;
//
//	mt = mt * m;
//	vec4 pdotx = vec4(dot(p00, x0), dot(p10, x1), dot(p20, x2), dot(p30, x3));
//	vec4 temp = mt * pdotx;
//	vec3 gradient0 = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
//	gradient0 += m4.x * p00 + m4.y * p10 + m4.z * p20 + m4.w * p30;
//
//	pdotx = vec4(dot(p01, x0), dot(p11, x1), dot(p21, x2), dot(p31, x3));
//	temp = mt * pdotx;
//	vec3 gradient1 = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
//	gradient1 += m4.x * p01 + m4.y * p11 + m4.z * p21 + m4.w * p31;
//
//	// The cross products of two gradients is divergence free.
//	return cross(gradient0, gradient1) * 3918.76;
//}

//const bufferMatrix = new Float32Array(16 * NUM_X * NUM_Z);
//
////const c = Color3.Random();
//
//
//for (let i = 0; i < NUM_X * NUM_Z; i++) {
//	const matR = Matrix.RotationY(rotation);
//	const matS = Matrix.Scaling(
//		size * options.scale.x,
//		size * options.scale.y,
//		size * options.scale.z
//	);
//	const matT = Matrix.Translation(
//		posX,
//		0,
//		posZ
//	);
//	const matrix = matR.multiply(matS.multiply(matT));
//	matrix.copyToArray(bufferMatrix, i * 16);
//}
//
//mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
//mesh.thinInstanceSetBuffer('color', bufferColor, 4, true);
