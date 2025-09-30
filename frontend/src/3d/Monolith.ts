import { Camera, Mesh, MeshBuilder, Scene, Vector3, LoadAssetContainerAsync, StandardMaterial, Color3, Matrix, Material, ShaderMaterial, Effect, VertexBuffer, GPUPicker, Ray, HemisphericLight, PointLight } from "@babylonImport";
import { SDFSystem, SDFNode, SDFBuilder } from "./Sdf";
import { MonolithMaterial } from "./Shader/MonolithMaterial";
import { CubeMaterial } from "./Shader/CubeMaterial";
import { voxelData as templeMedium } from './temple-medium';

type MonolithOptions = {
	height: number;
	width: number;
	depth: number;
	voxelSize: number;
	sdfThreshold: number;
	maxVoxelCount: number;
	enableShaderAnimation: boolean;
	animationSpeed: number;
	animationIntensity: number;
	qualityMode: 'low' | 'medium' | 'high' | 'ultra';
	surfaceOnly: boolean;
	mergeTolerance: number;
};

interface VoxelGrid {
	origin: Vector3;
	dimensions: Vector3;
	voxelSize: number;
	data: Uint8Array;
	width: number;
	height: number;
	depth: number;
}

interface BoundingBox {
	min: Vector3;
	max: Vector3;
}


export class Monolith {
	public scene: Scene;

	private voxelMesh: Mesh | null = null;
	private cube!: Mesh;
	public material!: MonolithMaterial;
	public cubeMaterial!: CubeMaterial | StandardMaterial;
	public options: MonolithOptions;
	private defaultCursorPosition!: Vector3;
	private sdfSystem: SDFSystem;
	private cursor: Vector3;
	private oldcursor: Vector3;
	private sdfTree: SDFNode | null = null;
	private voxelGrid: VoxelGrid | null = null;
	private gpuPicker: GPUPicker | null = null;
	private isPickingEnabled: boolean = true;
	private voxelPositions: Vector3[] = [];
	private lastPickTime = 0;
	private pickThrottleMs = 16;
	private matrixBuffer: Float32Array | null = null;
	private lastVoxelCount = 0;
	private lastCursorPosition: Vector3 | null = null;
	private lastOldCursorPosition: Vector3 | null = null;
	private customBounds: BoundingBox | null = null;

	private vector3Pool: Vector3[] = [];
	private pooledVectors: Set<Vector3> = new Set();
	private readonly POOL_INITIAL_SIZE = 1000;

	private surfaceCache = new Map<number, boolean>();
	private distanceCache = new Map<string, number>();

	private static readonly _tempVector = new Vector3();
	private static readonly _tempVector2 = new Vector3();
	private static readonly _tempVector3 = new Vector3();
	private static readonly _tempMatrix = Matrix.Identity();

	public depthMaterial: ShaderMaterial;
	public depthMaterialCube: ShaderMaterial;

	constructor(scene: Scene, size: number, cursor: Vector3, options?: Partial<MonolithOptions>) {
		this.scene = scene;
		this.sdfSystem = new SDFSystem();
		this.cursor = cursor;
		this.oldcursor = new Vector3(0.);

		this.options = {
			height: size,
			width: size * 0.12,
			depth: size * 0.6,
			voxelSize: 0.06,
			sdfThreshold: 0.02,
			maxVoxelCount: 100000,
			enableShaderAnimation: false,
			animationSpeed: 1.0,
			animationIntensity: 0.1,
			qualityMode: 'medium',
			surfaceOnly: true,
			mergeTolerance: 0.001,
			...options
		};

		this.depthMaterial = new ShaderMaterial("monolithDepth", this.scene, "monolithDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "instanceID"],
			uniforms: ["world", "viewProjection", "depthValues", "time", "animationSpeed", "animationIntensity", "baseWaveIntensity", "mouseInfluenceRadius", "origin",
				"oldOrigin", "deadZoneCenter", "deadZoneWidth", "deadZoneHeight", "deadZoneDepth", "textPosition0", "textSize0", "textGlow0", "floatingOffset"]
		});

		this.depthMaterialCube = new ShaderMaterial("cubeDepth", this.scene, "cubeDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "instanceID"],
			uniforms: ["world", "viewProjection", "depthValues", "time", "animationSpeed", "animationIntensity", "baseWaveIntensity", "mouseInfluenceRadius", "origin",
				"oldOrigin", "deadZoneCenter", "deadZoneWidth", "deadZoneHeight", "deadZoneDepth", "textPosition0", "textSize0", "textGlow0", "floatingOffset"]
		});

		this.cube = MeshBuilder.CreateBox("thecube", {
			size: 1,
			updatable: false,

		},
			this.scene);
		// this.cube.position.z += 0.01;
		// this.cube.scaling = new Vector3(0.05, 0.05, 0.05);
		// this.cube.createNormals(true);
		// this.cube.convertToFlatShadedMesh();
		// this.cube.disableEdgesRendering();

		this.cube.position = new Vector3(0, 4.5, 0);

		this.initializeVector3Pool();

		// this.applyQualitySettings();

		// this.buildDefaultSDF();
	}
	public async loadPrebuiltVoxels(): Promise<boolean> {
		const positions = templeMedium.positions.map(([x, y, z]) =>
			new Vector3(x, y, z)
		);
		this.options.voxelSize = templeMedium.voxelSize;

		if (positions.length > 0) {
			this.voxelMesh = await this.createOptimizedVoxelMesh(positions);
		}
		this.setupGPUPicking();
		return true;
	}

	private initializeVector3Pool(): void {
		for (let i = 0; i < this.POOL_INITIAL_SIZE; i++) {
			this.vector3Pool.push(new Vector3());
		}
	}

	private getPooledVector3(x: number = 0, y: number = 0, z: number = 0): Vector3 {
		let vector = this.vector3Pool.pop();
		if (!vector) {
			vector = new Vector3();
		}
		vector.set(x, y, z);
		this.pooledVectors.add(vector);
		return vector;
	}

	public setCustomBounds(min: Vector3, max: Vector3) {
		this.customBounds = { min, max };
	}

	private releaseVector3(vector: Vector3): void {
		if (this.pooledVectors.has(vector)) {
			this.pooledVectors.delete(vector);
			this.vector3Pool.push(vector);
		}
	}

	private releaseAllPooledVectors(): void {
		for (const vector of this.pooledVectors) {
			this.vector3Pool.push(vector);
		}
		this.pooledVectors.clear();
	}

	private getVoxelIndex(x: number, y: number, z: number, grid: VoxelGrid): number {
		if (x < 0 || x >= grid.width || y < 0 || y >= grid.height || z < 0 || z >= grid.depth) {
			return -1;
		}
		return x + y * grid.width + z * grid.width * grid.height;
	}

	private setVoxel(x: number, y: number, z: number, grid: VoxelGrid, value: boolean): void {
		const index = this.getVoxelIndex(x, y, z, grid);
		if (index >= 0) {
			grid.data[index] = value ? 1 : 0;
		}
	}

	private getVoxel(x: number, y: number, z: number, grid: VoxelGrid): boolean {
		const index = this.getVoxelIndex(x, y, z, grid);
		return index >= 0 ? grid.data[index] === 1 : false;
	}

	private indexToCoords(index: number, grid: VoxelGrid): [number, number, number] {
		const z = Math.floor(index / (grid.width * grid.height));
		const remainder = index % (grid.width * grid.height);
		const y = Math.floor(remainder / grid.width);
		const x = remainder % grid.width;
		return [x, y, z];
	}

	private applyQualitySettings() {
		const qualitySettings = {
			low: {
				voxelSize: this.options.voxelSize * 4,
				maxVoxelCount: 2500,
				surfaceOnly: true
			},
			medium: {
				voxelSize: this.options.voxelSize * 1.5,
				maxVoxelCount: 50000,
				surfaceOnly: true
			},
			high: {
				voxelSize: this.options.voxelSize,
				maxVoxelCount: 100000,
				surfaceOnly: true
			},
			ultra: {
				voxelSize: this.options.voxelSize * 0.8,
				maxVoxelCount: 200000,
				surfaceOnly: true
			}
		};

		const settings = qualitySettings[this.options.qualityMode];
		this.options.voxelSize = settings.voxelSize;
		this.options.maxVoxelCount = settings.maxVoxelCount;
		this.options.surfaceOnly = settings.surfaceOnly;

	}

	public async init() {
		const loaded = await this.loadPrebuiltVoxels("medium");

		if (!loaded) {
			console.log('⚙️ Generating voxels client-side (fallback)');
			await this.generateVoxelSystem();
		}
	}

	private createMaterial(): MonolithMaterial {
		const shaderMaterial = new MonolithMaterial("monolithMaterial", this.scene);

		shaderMaterial.setFloat("time", 0);
		shaderMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		shaderMaterial.setFloat("animationIntensity", this.options.animationIntensity);
		shaderMaterial.setVec3("worldCenter", Vector3.Zero());

		shaderMaterial.setFloat("baseWaveIntensity", 0.02);
		shaderMaterial.setFloat("mouseInfluenceRadius", 1.);
		this.material = shaderMaterial;

		this.depthMaterial.setFloat("time", 0);
		this.depthMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		this.depthMaterial.setFloat("animationIntensity", this.options.animationIntensity);

		this.depthMaterial.setFloat("baseWaveIntensity", 0.02);
		this.depthMaterial.setFloat("mouseInfluenceRadius", 1.);

		// const cubeMaterial = new StandardMaterial("cubeMaterial", this.scene);
		// cubeMaterial.diffuseColor = Color3.White()
		const cubeMaterial = new CubeMaterial("cubeMaterial", this.scene);

		// cubeMaterial.setFloat("time", 0);
		// cubeMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		// cubeMaterial.setFloat("animationIntensity", this.options.animationIntensity);
		// cubeMaterial.setVec3("worldCenter", Vector3.Zero());
		//
		// cubeMaterial.setFloat("baseWaveIntensity", 0.02);
		// cubeMaterial.setFloat("mouseInfluenceRadius", 1.);
		// //
		// this.depthMaterialCube.setFloat("time", 0);
		// this.depthMaterialCube.setFloat("animationSpeed", this.options.animationSpeed);
		// this.depthMaterialCube.setFloat("animationIntensity", this.options.animationIntensity);
		//
		// this.depthMaterialCube.setFloat("baseWaveIntensity", 0.02);
		// this.depthMaterialCube.setFloat("mouseInfluenceRadius", 1.);
		this.cubeMaterial = cubeMaterial;

		return shaderMaterial;
	}

	public setupGPUPicking() {
		if (!this.voxelMesh) {
			console.warn("❌ Cannot setup GPU picking: no voxel mesh");
			return;
		}

		this.defaultCursorPosition = new Vector3(0, -10, 0);

		this.gpuPicker = new GPUPicker();
		this.gpuPicker.setPickingList([this.voxelMesh]);

		window.addEventListener("mousemove", (event) => {
			if (!this.isPickingEnabled || !this.gpuPicker) return;

			const now = performance.now();
			if (now - this.lastPickTime < this.pickThrottleMs) return;
			this.lastPickTime = now;

			if (this.gpuPicker.pickingInProgress) return;

			this.gpuPicker.pickAsync(event.clientX, event.clientY, false).then((pickInfo) => {
				if (pickInfo && pickInfo.thinInstanceIndex != null) {
					this.options.animationIntensity = 0.05;
					if (this.voxelPositions && pickInfo.thinInstanceIndex < this.voxelPositions.length) {
						const voxelPosition = this.voxelPositions[pickInfo.thinInstanceIndex];

						this.oldcursor.copyFrom(this.cursor);
						this.cursor.copyFrom(voxelPosition);
					}
				} else {
					this.options.animationIntensity = 0;
					this.oldcursor.copyFrom(this.cursor);
					this.cursor.copyFrom(this.defaultCursorPosition);
				}
			});
		});
	}

	private buildDefaultSDF() {
		const basePyramid = SDFBuilder.pyramid(1.0, {
			scale: new Vector3(
				this.options.width * 0.5,
				this.options.height,
				this.options.depth * 0.5
			)
		});
		this.sdfTree = basePyramid;
	}

	public setSDFTree(sdfTree: SDFNode) {
		this.sdfTree = sdfTree;
	}

	private calculateOptimalBounds(): BoundingBox {
		if (!this.sdfTree) {
			return {
				min: Vector3.Zero(),
				max: Vector3.One()
			};
		}
		if (this.customBounds) {
			console.log("Using custom bounds:", this.customBounds);
			return this.customBounds;
		}

		const testPoints = 20;
		let minBounds = Monolith._tempVector.set(Infinity, Infinity, Infinity);
		let maxBounds = Monolith._tempVector2.set(-Infinity, -Infinity, -Infinity);

		const maxDim = Math.max(this.options.width, this.options.height, this.options.depth);
		const searchRadius = maxDim * 1.2;
		const tempTestPos = Monolith._tempVector3;

		let sdfEvaluations = 0;

		for (let i = 0; i < testPoints; i++) {
			for (let j = 0; j < testPoints; j++) {
				for (let k = 0; k < testPoints; k++) {
					tempTestPos.set(
						(i / (testPoints - 1) - 0.5) * searchRadius * 2,
						(j / (testPoints - 1)) * searchRadius,
						(k / (testPoints - 1) - 0.5) * searchRadius * 2
					);

					const distance = this.sdfSystem.evaluate(tempTestPos, this.sdfTree);
					sdfEvaluations++;

					if (distance < this.options.sdfThreshold * 2) {
						if (tempTestPos.x < minBounds.x) minBounds.x = tempTestPos.x;
						if (tempTestPos.y < minBounds.y) minBounds.y = tempTestPos.y;
						if (tempTestPos.z < minBounds.z) minBounds.z = tempTestPos.z;

						if (tempTestPos.x > maxBounds.x) maxBounds.x = tempTestPos.x;
						if (tempTestPos.y > maxBounds.y) maxBounds.y = tempTestPos.y;
						if (tempTestPos.z > maxBounds.z) maxBounds.z = tempTestPos.z;
					}
				}
			}
		}


		const padding = this.options.voxelSize * 2;

		return {
			min: new Vector3(minBounds.x - padding, minBounds.y - padding, minBounds.z - padding),
			max: new Vector3(maxBounds.x + padding, maxBounds.y + padding, maxBounds.z + padding)
		};
	}

	private createVoxelGrid(bounds: BoundingBox): VoxelGrid {
		const alignedMin = new Vector3(
			Math.floor(bounds.min.x / this.options.voxelSize) * this.options.voxelSize,
			Math.floor(bounds.min.y / this.options.voxelSize) * this.options.voxelSize,
			Math.floor(bounds.min.z / this.options.voxelSize) * this.options.voxelSize
		);

		const alignedMax = new Vector3(
			Math.ceil(bounds.max.x / this.options.voxelSize) * this.options.voxelSize,
			Math.ceil(bounds.max.y / this.options.voxelSize) * this.options.voxelSize,
			Math.ceil(bounds.max.z / this.options.voxelSize) * this.options.voxelSize
		);

		const size = alignedMax.subtract(alignedMin);
		const width = Math.ceil(size.x / this.options.voxelSize);
		const height = Math.ceil(size.y / this.options.voxelSize);
		const depth = Math.ceil(size.z / this.options.voxelSize);

		const totalVoxels = width * height * depth;


		return {
			origin: alignedMin,
			dimensions: new Vector3(width, height, depth),
			voxelSize: this.options.voxelSize,
			data: new Uint8Array(totalVoxels),
			width,
			height,
			depth
		};
	}

	private isSurfaceVoxel(x: number, y: number, z: number, grid: VoxelGrid): boolean {
		if (!this.options.surfaceOnly) return true;

		const index = this.getVoxelIndex(x, y, z, grid);
		if (index < 0) return false;

		if (this.surfaceCache.has(index)) {
			return this.surfaceCache.get(index)!;
		}


		const neighbors = [
			[-1, 0, 0], [1, 0, 0],
			[0, -1, 0], [0, 1, 0],
			[0, 0, -1], [0, 0, 1]
		];

		let isSurface = false;
		let sdfEvaluations = 0;

		for (const [dx, dy, dz] of neighbors) {
			const neighborX = x + dx;
			const neighborY = y + dy;
			const neighborZ = z + dz;

			if (!this.getVoxel(neighborX, neighborY, neighborZ, grid)) {
				const neighborPos = this.getPooledVector3(
					grid.origin.x + neighborX * grid.voxelSize,
					grid.origin.y + neighborY * grid.voxelSize,
					grid.origin.z + neighborZ * grid.voxelSize
				);

				if (this.sdfTree) {
					const distance = this.sdfSystem.evaluate(neighborPos, this.sdfTree);
					sdfEvaluations++;
					if (distance >= this.options.sdfThreshold) {
						isSurface = true;
					}
				}

				this.releaseVector3(neighborPos);

				if (isSurface) break;
			}
		}

		this.surfaceCache.set(index, isSurface);
		return isSurface;
	}

	private evaluateSDFBatch(positions: Vector3[], batchSize: number = 100): number[] {
		const results: number[] = [];
		let totalEvaluations = 0;

		for (let i = 0; i < positions.length; i += batchSize) {
			const batch = positions.slice(i, Math.min(i + batchSize, positions.length));

			for (const pos of batch) {
				if (this.sdfTree) {
					results.push(this.sdfSystem.evaluate(pos, this.sdfTree));
					totalEvaluations++;
				} else {
					results.push(Infinity);
				}
			}
		}

		return results;
	}

	private async generateVoxelSystem() {
		if (!this.sdfTree) return;

		this.sdfSystem.resetEvaluationCount();

		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		this.surfaceCache.clear();
		this.distanceCache.clear();

		const bounds = this.calculateOptimalBounds();
		this.voxelGrid = this.createVoxelGrid(bounds);

		await this.fillVoxelGridDirect(this.voxelGrid);

		const surfaceVoxels = this.extractVoxels(this.voxelGrid);

		const finalVoxels = this.limitVoxelCount(surfaceVoxels);

		if (finalVoxels.length > 0) {
			this.voxelMesh = await this.createOptimizedVoxelMesh(finalVoxels);
		}

		this.setupGPUPicking();
	}

	private async fillVoxelGridDirect(grid: VoxelGrid) {
		const totalVoxels = grid.width * grid.height * grid.depth;

		let processed = 0;
		let generated = 0;

		for (let z = 0; z < grid.depth; z++) {
			for (let y = 0; y < grid.height; y++) {
				const positions: Vector3[] = [];
				const coordinates: [number, number, number][] = [];

				for (let x = 0; x < grid.width; x++) {
					const worldPos = new Vector3(
						grid.origin.x + x * grid.voxelSize,
						grid.origin.y + y * grid.voxelSize,
						grid.origin.z + z * grid.voxelSize
					);

					const distFromOrigin = Math.sqrt(worldPos.x * worldPos.x + worldPos.z * worldPos.z);
					const maxRadius = Math.max(this.options.width, this.options.depth) * 1.1;

					if (worldPos.y > this.options.height * 1.2 ||
						worldPos.y < -this.options.height * 0.1 ||
						distFromOrigin > maxRadius) {
						processed++;
						continue;
					}

					positions.push(worldPos);
					coordinates.push([x, y, z]);
					processed++;
				}

				if (positions.length > 0) {
					const distances = this.evaluateSDFBatch(positions);

					for (let j = 0; j < distances.length; j++) {
						if (distances[j] < this.options.sdfThreshold) {
							const [x, y, z] = coordinates[j];
							this.setVoxel(x, y, z, grid, true);
							generated++;
						}
					}
				}

				if ((y * grid.depth + z) % 1000 === 0) {
					await new Promise(resolve => setTimeout(resolve, 1));
				}
			}
		}
	}

	private extractVoxels(grid: VoxelGrid): Vector3[] {
		const voxels: Vector3[] = [];
		const totalVoxels = grid.data.length;

		this.surfaceCache.clear();

		for (let i = 0; i < totalVoxels; i++) {
			if (grid.data[i] === 1) {
				const [x, y, z] = this.indexToCoords(i, grid);

				if (this.isSurfaceVoxel(x, y, z, grid)) {
					const worldPos = this.getPooledVector3(
						grid.origin.x + x * grid.voxelSize,
						grid.origin.y + y * grid.voxelSize,
						grid.origin.z + z * grid.voxelSize
					);

					voxels.push(new Vector3(worldPos.x, worldPos.y, worldPos.z));
					this.releaseVector3(worldPos);
				}
			}
		}
		return voxels;
	}
	private limitVoxelCount(voxels: Vector3[]): Vector3[] {
		if (voxels.length <= this.options.maxVoxelCount) {
			return voxels;
		}

		const step = voxels.length / this.options.maxVoxelCount;
		const sampled: Vector3[] = [];

		for (let i = 0; i < this.options.maxVoxelCount; i++) {
			const index = Math.floor(i * step);
			sampled.push(voxels[index]);
		}

		return sampled;
	}

	private async createOptimizedVoxelMesh(positions: Vector3[]): Promise<Mesh> {
		if (!this.matrixBuffer || positions.length !== this.lastVoxelCount) {
			this.matrixBuffer = new Float32Array(positions.length * 16);
			this.lastVoxelCount = positions.length;
		}

		const baseCube = MeshBuilder.CreateBox('voxel_base', {
			size: this.options.voxelSize,
			updatable: false
		}, this.scene);




		this.voxelPositions = [...positions];
		const totalMatrices = positions.length;
		const matrixBuffer = this.matrixBuffer;
		const instanceIDBuffer = new Float32Array(totalMatrices);


		const center = Monolith._tempVector.set(0, 0, 0);
		for (const pos of positions) {
			center.addInPlace(pos);
		}
		center.scaleInPlace(1.0 / positions.length);

		const batchSize = 10000;
		const totalBatches = Math.ceil(totalMatrices / batchSize);

		for (let i = 0; i < totalMatrices; i += batchSize) {
			const endIdx = Math.min(i + batchSize, totalMatrices);

			for (let j = i; j < endIdx; j++) {
				const pos = positions[j];
				Matrix.TranslationToRef(pos.x, pos.y, pos.z, Monolith._tempMatrix);
				Monolith._tempMatrix.copyToArray(matrixBuffer, j * 16);
				instanceIDBuffer[j] = j;
			}

			if (i % batchSize === 0) {
				await new Promise(resolve => setTimeout(resolve, 1));
			}
		}

		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer, 16);
		baseCube.thinInstanceCount = totalMatrices;

		if (this.options.enableShaderAnimation) {
			baseCube.setVerticesBuffer(new VertexBuffer(
				this.scene.getEngine(),
				instanceIDBuffer,
				"instanceID",
				false,
				false,
				1,
				true
			));

			if (this.material instanceof ShaderMaterial) {
				this.material.setVector3("worldCenter", center);
			}
		}

		baseCube.material = this.material;
		this.cube.material = this.cubeMaterial;

		if (baseCube.freezeWorldMatrix) {
			baseCube.freezeWorldMatrix();
		}

		return baseCube;
	}

	public setRectangularDeadZone(center: Vector3, width: number, height: number, depth: number) {
		this.material.setVec3("deadZoneCenter", center);
		this.material.setFloat("deadZoneWidth", width);
		this.material.setFloat("deadZoneHeight", height);
		this.material.setFloat("deadZoneDepth", depth);

		this.depthMaterial.setVector3("deadZoneCenter", center);
		this.depthMaterial.setFloat("deadZoneWidth", width);
		this.depthMaterial.setFloat("deadZoneHeight", height);
		this.depthMaterial.setFloat("deadZoneDepth", depth);
	}

	public enableShaderAnimation(enabled: boolean) {
		if (this.options.enableShaderAnimation !== enabled) {
			this.options.enableShaderAnimation = enabled;
			this.createMaterial();

			if (this.voxelMesh && this.voxelGrid) {
				const voxels = this.extractVoxels(this.voxelGrid);
				const finalVoxels = this.limitVoxelCount(voxels);
				this.voxelMesh.dispose();
				this.createOptimizedVoxelMesh(finalVoxels).then(mesh => {
					this.voxelMesh = mesh;
				});
			}
		}
	}

	public setAnimationSpeed(speed: number) {
		this.options.animationSpeed = speed;
		if (this.material instanceof ShaderMaterial) {
			this.material.setFloat("animationSpeed", speed);
			this.depthMaterial.setFloat("animationSpeed", speed);
		}
	}

	public setAnimationIntensity(intensity: number) {
		this.options.animationIntensity = intensity;
		if (this.material instanceof ShaderMaterial) {
			this.material.setFloat("animationIntensity", intensity);
			this.depthMaterial.setFloat("animationIntensity", intensity);
		}
	}

	public setAnimationStyle(style: 'gentle' | 'active' | 'chaotic' | 'none') {
		const styles = {
			gentle: { speed: 0.5, intensity: 0.05, enabled: true },
			active: { speed: 2.0, intensity: 0.15, enabled: true },
			chaotic: { speed: 4.0, intensity: 0.3, enabled: true },
			none: { speed: 1.0, intensity: 0.1, enabled: false }
		};

		const config = styles[style];
		this.setAnimationSpeed(config.speed);
		this.setAnimationIntensity(config.intensity);
		this.enableShaderAnimation(config.enabled);
	}

	public setQualityMode(mode: 'low' | 'medium' | 'high' | 'ultra') {
		this.options.qualityMode = mode;
		this.applyQualitySettings();
		this.generateVoxelSystem();
	}

	private lastUpdateValues = {
		time: -1,
		animationSpeed: -1,
		animationIntensity: -1,
		cursorChanged: false,
		oldCursorChanged: false
	};

	public update(time: number, camera: Camera) {
		this.material.setFloat("time", time);
		this.depthMaterial.setFloat("time", time);
		// this.cubeMaterial.setFloat("time", time);
		this.depthMaterialCube.setFloat("time", time);
		this.lastUpdateValues.time = time;
		const floatAmplitude = this.options.height * 0.01;
		const floatY = Math.sin(time * 0.8) * floatAmplitude;
		const floatX = Math.sin(time * 0.6) * floatAmplitude * 0.25;
		const floatZ = Math.cos(time * 0.4) * floatAmplitude * 0.2;
		if (this.voxelMesh) {

			this.material.setVec3("floatingOffset", new Vector3(floatX, floatY, floatZ));
			// this.cubeMaterial.setVec3("floatingOffset", new Vector3(floatX, floatY, floatZ));
			this.depthMaterial.setVector3("floatingOffset", new Vector3(floatX, floatY, floatZ));
			// this.depthMaterialCube.setVector3("floatingOffset", new Vector3(floatX, floatY, floatZ));

			// this.voxelMesh.position.set(floatX, floatY + 4.5, floatZ);
		}
		this.cube.position.set(floatX, floatY + 4.5, floatZ);
		// this.cube.rotation.y += floatY / 2;
		const cursorChanged = !this.cursor.equals(this.lastCursorPosition || Vector3.Zero());
		const oldCursorChanged = !this.oldcursor.equals(this.lastOldCursorPosition || Vector3.Zero());
		this.material.setVec3("origin", this.cursor);
		this.depthMaterial.setVector3("origin", this.cursor);
		// this.cubeMaterial.setVec3("origin", this.cursor);
		this.depthMaterialCube.setVector3("origin", this.cursor);
		this.lastUpdateValues.cursorChanged = cursorChanged;

		this.material.setVec3("oldOrigin", this.oldcursor);
		this.depthMaterial.setVector3("oldOrigin", this.oldcursor);
		this.lastUpdateValues.oldCursorChanged = oldCursorChanged;

		this.material.setFloat("animationSpeed", this.options.animationSpeed);
		this.depthMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		// this.cubeMaterial.setFloat("animationSpeed", 0);
		this.depthMaterialCube.setFloat("animationSpeed", 0);
		this.lastUpdateValues.animationSpeed = this.options.animationSpeed;

		this.material.setFloat("animationIntensity", this.options.animationIntensity);
		this.depthMaterial.setFloat("animationIntensity", this.options.animationIntensity);
		this.lastUpdateValues.animationIntensity = this.options.animationIntensity;

		this.material.setVec3("cameraPosition", camera.globalPosition);
		this.material.setVec3("worldCenter", Vector3.Zero());
		this.material.setFloat("baseWaveIntensity", 0.02);
		this.material.setFloat("mouseInfluenceRadius", 0.8);

		this.depthMaterial.setFloat("baseWaveIntensity", 0.02);
		this.depthMaterial.setFloat("mouseInfluenceRadius", 0.8);
		this.material.setFloat("textureScale", 0.1);
	}

	public getMesh(): Mesh | null {
		return this.voxelMesh;
	}

	public getMeshCube(): Mesh | null {
		return this.cube;
	}

	public dispose() {
		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		this.surfaceCache.clear();
		this.distanceCache.clear();
		this.releaseAllPooledVectors();

		this.voxelGrid = null;

		if (this.gpuPicker) {
			this.gpuPicker = null;
		}

	}

	public setPicking(value: boolean) {
		this.isPickingEnabled = value;
	}

	public clearCaches() {
		this.surfaceCache.clear();
		this.distanceCache.clear();
	}
}

