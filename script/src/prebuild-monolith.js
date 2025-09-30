// scripts/prebuild-monolith.js
const fs = require('fs');
const path = require('path');
const { Vector3, Vector2, Quaternion } = require('./vector3');

// SDF System
class SDFSystem {
	evaluate(pos, node) {
		if (node.type === 'shape' && node.shape) {
			return this.evaluateShape(pos, node.shape);
		} else if (node.type === 'operation' && node.operation) {
			return this.evaluateOperation(pos, node.operation);
		}
		return 1000;
	}


	evaluateOperation(pos, op) {
		if (!op || op.children.length === 0) return 1000;

		const childDistances = op.children.map(child => this.evaluate(pos, child));

		switch (op.type) {
			case 'union':
				return Math.min(...childDistances);
			case 'subtract':
				if (childDistances.length < 2) return childDistances[0] || 1000;
				return Math.max(childDistances[0], -childDistances[1]);
			case 'intersect':
				return Math.max(...childDistances);
			case 'smoothUnion':
				return this.sdfSmoothUnion(childDistances, op.smoothness || 0.1);
			default:
				return Math.min(...childDistances);
		}
	}

	evaluateShape(pos, shape) {
		let transformedPos = pos.clone();
		if (shape.transform) {
			transformedPos = this.applyTransform(pos, shape.transform);
		}

		switch (shape.type) {
			case 'pyramid':
				return this.pyramidSDF(transformedPos, shape.params.height);
			case 'cylinder':
				return this.cylinderSDF(transformedPos, shape.params.radius, shape.params.height);
			case 'sphere':
				return this.sphereSDF(transformedPos, shape.params.radius);
			case 'box':
				return this.boxSDF(transformedPos, shape.params.size);
			default:
				return 1000;
		}
	}

	applyTransform(pos, transform) {
		let result = pos.clone();

		if (transform.position) {
			result = result.subtract(transform.position);
		}

		if (transform.rotation) {
			result = this.rotatePoint(result, transform.rotation, true);
		}

		if (transform.scale) {
			result = new Vector3(
				result.x / transform.scale.x,
				result.y / transform.scale.y,
				result.z / transform.scale.z
			);
		}

		return result;
	}

	rotatePoint(point, rotation, inverse = false) {
		const factor = inverse ? -1 : 1;
		const rotX = Quaternion.RotationAxis(Vector3.Right(), rotation.x * factor);
		const rotY = Quaternion.RotationAxis(Vector3.Up(), rotation.y * factor);
		const rotZ = Quaternion.RotationAxis(Vector3.Forward(), rotation.z * factor);
		const finalRot = inverse ? rotZ.multiply(rotX).multiply(rotY) : rotY.multiply(rotX).multiply(rotZ);
		return this.rotateVector3WithQuaternion(point, finalRot);
	}

	rotateVector3WithQuaternion(vec, quat) {
		const vecQuat = new Quaternion(vec.x, vec.y, vec.z, 0);
		const result = quat.multiply(vecQuat).multiply(quat.conjugate());
		return new Vector3(result.x, result.y, result.z);
	}

	pyramidSDF(pos, h) {
		let p = { x: Math.abs(pos.x), y: pos.y, z: Math.abs(pos.z) };
		if (p.z > p.x) { const temp = p.x; p.x = p.z; p.z = temp; }
		p.x -= 0.5; p.z -= 0.5;
		const m2 = h * h + 0.25;
		const q = { x: p.z, y: h * p.y - 0.5 * p.x, z: h * p.x + 0.5 * p.y };
		const s = Math.max(-q.x, 0.0);
		const t = Math.max(0.0, Math.min(1.0, (q.y - 0.5 * p.z) / (m2 + 0.25)));
		const a = m2 * (q.x + s) * (q.x + s) + q.y * q.y;
		const b = m2 * (q.x + 0.5 * t) * (q.x + 0.5 * t) + (q.y - m2 * t) * (q.y - m2 * t);
		const d2 = (Math.min(q.y, -q.x * m2 - q.y * 0.5) > 0.0) ? 0.0 : Math.min(a, b);
		return Math.sqrt((d2 + q.z * q.z) / m2) * Math.sign(Math.max(q.z, -p.y));
	}

	cylinderSDF(pos, radius, height) {
		const d = new Vector2(
			Math.sqrt(pos.x * pos.x + pos.z * pos.z) - radius,
			Math.abs(pos.y) - height * 0.5
		);
		return Math.min(Math.max(d.x, d.y), 0.0) +
			Math.sqrt(Math.max(d.x, 0) * Math.max(d.x, 0) + Math.max(d.y, 0) * Math.max(d.y, 0));
	}

	sphereSDF(pos, radius) {
		return pos.length() - radius;
	}

	boxSDF(pos, size) {
		const d = new Vector3(
			Math.abs(pos.x) - size.x * 0.5,
			Math.abs(pos.y) - size.y * 0.5,
			Math.abs(pos.z) - size.z * 0.5
		);
		return Math.min(Math.max(d.x, Math.max(d.y, d.z)), 0.0) +
			Math.sqrt(Math.max(d.x, 0) * Math.max(d.x, 0) +
				Math.max(d.y, 0) * Math.max(d.y, 0) +
				Math.max(d.z, 0) * Math.max(d.z, 0));
	}

	sdfSmoothUnion(distances, k) {
		if (distances.length === 0) return 1000;
		if (distances.length === 1) return distances[0];
		let result = distances[0];
		for (let i = 1; i < distances.length; i++) {
			result = this.smoothMin(result, distances[i], k);
		}
		return result;
	}

	smoothMin(a, b, k) {
		const h = Math.max(k - Math.abs(a - b), 0.0) / k;
		return Math.min(a, b) - h * h * h * k * (1.0 / 6.0);
	}
}

// SDF Builder
class SDFBuilder {
	static shape(type, params, transform) {
		return { type: 'shape', shape: { type, params, transform } };
	}

	static operation(type, children, smoothness) {
		return { type: 'operation', operation: { type, children, smoothness } };
	}

	static union(...children) {
		return SDFBuilder.operation('union', children);
	}

	static subtract(base, ...toSubtract) {
		return SDFBuilder.operation('subtract', [base, ...toSubtract]);
	}

	static pyramid(height, transform) {
		return SDFBuilder.shape('pyramid', { height }, transform);
	}

	static cylinder(radius, height, transform) {
		return SDFBuilder.shape('cylinder', { radius, height }, transform);
	}
}

// Temple builder
function createTempleSDFTree(size) {
	const mainPyramid = SDFBuilder.pyramid(1.0, {
		position: new Vector3(0, size * 0.3, 0),
		scale: new Vector3(size * 0.4, size * 0.9, size * 0.3)
	});

	const floatingPyramid = SDFBuilder.pyramid(1.0, {
		position: new Vector3(0, size * 0.295, 0),
		scale: new Vector3(size * 0.4, -size * 0.2, size * 0.3)
	});

	const mainEntrance = SDFBuilder.cylinder(1.0, 1.0, {
		position: new Vector3(0, size * 0.3, size * 0.12),
		rotation: new Vector3(Math.PI * 0.5, 0, 0),
		scale: new Vector3(size * 0.08, size * 0.9, size * 0.08)
	});

	const temple = SDFBuilder.union(
		SDFBuilder.subtract(
			SDFBuilder.union(mainPyramid, floatingPyramid),
			mainEntrance
		)
	);

	const bounds = {
		min: new Vector3(-size * 0.6, -size * 0.1, -size * 0.5),
		max: new Vector3(size * 0.6, size * 1.0, size * 0.5)
	};

	return { sdfTree: temple, bounds };
}

class MonolithPrebuild {
	constructor() {
		this.sdfSystem = new SDFSystem();
	}

	async generateVoxelData(config, sdfTree, customBounds) {
		console.log('Starting monolith prebuild...');
		console.log(`   Quality: ${config.qualityMode}`);
		console.log(`   Surface only: ${config.surfaceOnly}`);
		const startTime = Date.now();

		const qualitySettings = {
			low: { voxelSize: config.voxelSize * 4, maxVoxelCount: 2500 },
			medium: { voxelSize: config.voxelSize * 1.5, maxVoxelCount: 50000 },
			high: { voxelSize: config.voxelSize, maxVoxelCount: 100000 },
			ultra: { voxelSize: config.voxelSize * 0.8, maxVoxelCount: 200000 }
		};

		const settings = qualitySettings[config.qualityMode];
		config.voxelSize = settings.voxelSize;

		// Build voxel grid first
		const grid = await this.fillVoxelGrid(customBounds, config, sdfTree);

		// Extract surface or all voxels
		const positions = config.surfaceOnly
			? this.extractSurfaceVoxels(grid, config, sdfTree)
			: this.extractAllVoxels(grid);

		// Limit voxel count
		const finalPositions = this.limitVoxelCount(positions, settings.maxVoxelCount);

		const endTime = Date.now();
		console.log(`Generated ${finalPositions.length} voxels in ${(endTime - startTime) / 1000}s`);

		return finalPositions;
	}

	async fillVoxelGrid(bounds, config, sdfTree) {
		const size = {
			x: bounds.max.x - bounds.min.x,
			y: bounds.max.y - bounds.min.y,
			z: bounds.max.z - bounds.min.z
		};

		const width = Math.ceil(size.x / config.voxelSize);
		const height = Math.ceil(size.y / config.voxelSize);
		const depth = Math.ceil(size.z / config.voxelSize);

		console.log(`   Grid: ${width}x${height}x${depth} = ${width * height * depth} voxels to test`);

		// Create grid data structure
		const grid = {
			origin: bounds.min,
			voxelSize: config.voxelSize,
			width,
			height,
			depth,
			data: new Uint8Array(width * height * depth)
		};

		let processed = 0;
		const total = width * height * depth;
		let lastPercent = 0;
		let filledCount = 0;

		for (let z = 0; z < depth; z++) {
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const worldPos = new Vector3(
						bounds.min.x + x * config.voxelSize,
						bounds.min.y + y * config.voxelSize,
						bounds.min.z + z * config.voxelSize
					);

					const distance = this.sdfSystem.evaluate(worldPos, sdfTree);

					if (distance < config.sdfThreshold) {
						const index = x + y * width + z * width * height;
						grid.data[index] = 1;
						filledCount++;
					}

					processed++;
					const percent = Math.floor((processed / total) * 100);
					if (percent > lastPercent && percent % 10 === 0) {
						console.log(`   Progress: ${percent}% (${filledCount} voxels)`);
						lastPercent = percent;
					}
				}
			}
		}

		console.log(`   Grid filled: ${filledCount} voxels`);
		return grid;
	}

	extractAllVoxels(grid) {
		const positions = [];
		const total = grid.width * grid.height * grid.depth;

		for (let i = 0; i < total; i++) {
			if (grid.data[i] === 1) {
				const z = Math.floor(i / (grid.width * grid.height));
				const remainder = i % (grid.width * grid.height);
				const y = Math.floor(remainder / grid.width);
				const x = remainder % grid.width;

				positions.push(new Vector3(
					grid.origin.x + x * grid.voxelSize,
					grid.origin.y + y * grid.voxelSize,
					grid.origin.z + z * grid.voxelSize
				));
			}
		}

		return positions;
	}

	extractSurfaceVoxels(grid, config, sdfTree) {
		console.log('   Extracting surface voxels...');
		const positions = [];
		const total = grid.width * grid.height * grid.depth;

		const neighbors = [
			[-1, 0, 0], [1, 0, 0],
			[0, -1, 0], [0, 1, 0],
			[0, 0, -1], [0, 0, 1]
		];

		let surfaceCount = 0;

		for (let i = 0; i < total; i++) {
			if (grid.data[i] !== 1) continue;

			const z = Math.floor(i / (grid.width * grid.height));
			const remainder = i % (grid.width * grid.height);
			const y = Math.floor(remainder / grid.width);
			const x = remainder % grid.width;

			// Check if this voxel is on the surface
			let isSurface = false;

			for (const [dx, dy, dz] of neighbors) {
				const nx = x + dx;
				const ny = y + dy;
				const nz = z + dz;

				// Check if neighbor is out of bounds or empty
				if (nx < 0 || nx >= grid.width ||
					ny < 0 || ny >= grid.height ||
					nz < 0 || nz >= grid.depth) {
					isSurface = true;
					break;
				}

				const neighborIndex = nx + ny * grid.width + nz * grid.width * grid.height;

				if (grid.data[neighborIndex] === 0) {
					// Neighbor is empty, verify it's actually outside with SDF
					const neighborPos = new Vector3(
						grid.origin.x + nx * grid.voxelSize,
						grid.origin.y + ny * grid.voxelSize,
						grid.origin.z + nz * grid.voxelSize
					);

					const distance = this.sdfSystem.evaluate(neighborPos, sdfTree);
					if (distance >= config.sdfThreshold) {
						isSurface = true;
						break;
					}
				}
			}

			if (isSurface) {
				positions.push(new Vector3(
					grid.origin.x + x * grid.voxelSize,
					grid.origin.y + y * grid.voxelSize,
					grid.origin.z + z * grid.voxelSize
				));
				surfaceCount++;
			}
		}

		console.log(`   Surface voxels: ${surfaceCount}`);
		return positions;
	}

	limitVoxelCount(positions, maxVoxels) {
		if (positions.length <= maxVoxels) {
			return positions;
		}

		console.log(`   Sampling down from ${positions.length} to ${maxVoxels}`);
		const step = positions.length / maxVoxels;
		const sampled = [];
		for (let i = 0; i < maxVoxels; i++) {
			sampled.push(positions[Math.floor(i * step)]);
		}
		return sampled;
	}

	async saveAsTypeScript(positions, config, outputPath) {
		const dir = path.dirname(outputPath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const posData = positions.map(p =>
			`[${p.x.toFixed(4)},${p.y.toFixed(4)},${p.z.toFixed(4)}]`
		).join(',');

		const tsContent = `export const voxelData = {
  voxelCount: ${positions.length},
  voxelSize: ${config.voxelSize},
  positions: [${posData}]
};`;

		fs.writeFileSync(outputPath, tsContent);
		console.log(`Saved TS: ${outputPath}`);
	}

	serializeToBinary(positions, config) {
		const HEADER_SIZE = 24;
		const VOXEL_SIZE = 12;
		const buffer = Buffer.alloc(HEADER_SIZE + positions.length * VOXEL_SIZE);

		buffer.write('MVOX', 0, 'ascii');
		buffer.writeUInt32LE(1, 4);
		buffer.writeUInt32LE(positions.length, 8);
		buffer.writeFloatLE(config.voxelSize, 12);

		let offset = HEADER_SIZE;
		for (const pos of positions) {
			buffer.writeFloatLE(pos.x, offset);
			buffer.writeFloatLE(pos.y, offset + 4);
			buffer.writeFloatLE(pos.z, offset + 8);
			offset += VOXEL_SIZE;
		}

		return buffer;
	}

	async saveToFile(positions, config, outputPath) {
		const dir = path.dirname(outputPath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const buffer = this.serializeToBinary(positions, config);
		fs.writeFileSync(outputPath, buffer);

		const metadata = {
			version: '1.0.0',
			timestamp: Date.now(),
			voxelCount: positions.length,
			config
		};

		const metadataPath = outputPath.replace('.bin', '.meta.json');
		fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

		console.log(`Saved binary: ${outputPath} (${(buffer.length / 1024).toFixed(2)} KB)`);
	}
}

// Main
async function main() {
	const prebuild = new MonolithPrebuild();

	const baseConfig = {
		height: 15,
		width: 1.2,
		depth: 6,
		voxelSize: 0.06,
		sdfThreshold: 0.02,
		surfaceOnly: true  // ADDED - default to surface only
	};

	const qualities = ['low', 'medium', 'high'];

	console.log('Building prebuilt temple monolith files...\n');

	const { sdfTree, bounds } = createTempleSDFTree(baseConfig.height);

	for (const quality of qualities) {
		console.log(`\n━━━ Building ${quality} quality ━━━`);

		const config = { ...baseConfig, qualityMode: quality };
		const positions = await prebuild.generateVoxelData(config, sdfTree, bounds);
		const filename = `temple-${quality}.bin`;
		await prebuild.saveToFile(positions, config, `../frontend/public/assets/${filename}`);
		await prebuild.saveAsTypeScript(positions, config, `../frontend/src/3d/temple-${quality}.ts`);
	}

	console.log('\n✅ All prebuilds complete!');
}

main().catch(console.error);
