import { Camera, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Color3, Matrix, Material, ShaderMaterial, Effect, VertexBuffer, GPUPicker, Ray, HemisphericLight, PointLight } from "@babylonImport";
import { SDFSystem, SDFNode, SDFBuilder } from "./Sdf";
import { MonolithMaterial } from "./Shader/MonolithMaterial";

import { TextRenderer } from "./SimpleTextRenderer";

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
	data: Map<string, boolean>;
}

interface BoundingBox {
	min: Vector3;
	max: Vector3;
}

export class Monolith {
	public scene: Scene;

	private voxelMesh: Mesh | null = null;
	public material!: MonolithMaterial;
	private options: MonolithOptions;
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
	private pickThrottleMs = 30;
	private matrixBuffer: Float32Array | null = null;
	private lastVoxelCount = 0;
	private trailPositions: Vector3[] = [];
	private maxTrailLength = 10;
	private text: TextRenderer | null = null;

	public depthMaterial: ShaderMaterial;

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
			qualityMode: 'low',
			surfaceOnly: true,
			mergeTolerance: 0.001,
			...options
		};


		console.log(`🔧 Monolith Configuration:
   Size: ${size}
   Voxel Size: ${this.options.voxelSize}
   Quality: ${this.options.qualityMode}
   Surface Only: ${this.options.surfaceOnly}
   Max Voxels: ${this.options.maxVoxelCount}`);

		this.applyQualitySettings();
		this.buildDefaultSDF();

		this.text = new TextRenderer(this, this.scene);
		//this.voxelMesh!.thinInstanceEnablePicking = true;
		//

		this.depthMaterial = new ShaderMaterial("monolithDepth", this.scene, "monolithDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "instanceID"],
			uniforms: ["world", "viewProjection", "depthValues", "time", "animationSpeed", "animationIntensity", "baseWaveIntensity", "mouseInfluenceRadius", "worldCenter", "origin"]
		})
	}

	private applyQualitySettings() {
		const qualitySettings = {
			low: {
				voxelSize: this.options.voxelSize * 2,
				maxVoxelCount: 25000,
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

		console.log(`📊 Applied ${this.options.qualityMode} quality:
   Voxel Size: ${this.options.voxelSize}
   Max Voxels: ${this.options.maxVoxelCount}
   Surface Only: ${this.options.surfaceOnly}`);
	}

	public async init() {
		await this.generateVoxelSystem();
	}

	private createMaterial(): MonolithMaterial {

		//const light = new PointLight("monolithLight", new Vector3(0, 5., 0), this.scene);
		const shaderMaterial = new MonolithMaterial("monolithMaterial", this.scene);

		shaderMaterial.setFloat("time", 0);
		shaderMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		shaderMaterial.setFloat("animationIntensity", this.options.animationIntensity);
		shaderMaterial.setVec3("worldCenter", Vector3.Zero());

		shaderMaterial.setFloat("baseWaveIntensity", 0.02); // Subtle base animation
		shaderMaterial.setFloat("mouseInfluenceRadius", 1.)
		this.material = shaderMaterial;
		//shaderMaterial.diffuseColor = new Color3(0);

		return shaderMaterial;
	}

	public setupGPUPicking() {
		if (!this.voxelMesh) {
			console.warn("❌ Cannot setup GPU picking: no voxel mesh");
			return;
		}

		this.defaultCursorPosition = new Vector3(0, -10, 0);

		try {
			this.gpuPicker = new GPUPicker();
			this.gpuPicker.setPickingList([this.voxelMesh]);


			//this.scene.onPointerObservable.add((pointerInfo) => {
			window.addEventListener("mousemove", (event) => {
				if (!this.isPickingEnabled || !this.gpuPicker) return;
				//if (.type !== PointerEventTypes.POINTERDOWN) return;

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
						} else {
							console.warn("❌ Invalid instance index or missing voxel positions");
						}
					} else {
						this.options.animationIntensity = 0;
						this.oldcursor.copyFrom(this.cursor);
						this.cursor.copyFrom(this.defaultCursorPosition);
					}
				}).catch((error) => {
					console.warn("GPU picking failed:", error);
				});
			});

		} catch (error) {
			console.error("❌ Failed to initialize GPU Picker:", error);
			this.gpuPicker = null;
		}
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
		this.generateVoxelSystem();
	}

	private calculateOptimalBounds(): BoundingBox {
		if (!this.sdfTree) {
			const result = {
				min: Vector3.Zero(),
				max: Vector3.One()
			};
			return result;
		}

		const testPoints = 20;
		let minBounds = new Vector3(Infinity, Infinity, Infinity);
		let maxBounds = new Vector3(-Infinity, -Infinity, -Infinity);
		let sdfEvaluations = 0;

		const maxDim = Math.max(this.options.width, this.options.height, this.options.depth);
		const searchRadius = maxDim * 1.2;

		for (let i = 0; i < testPoints; i++) {
			for (let j = 0; j < testPoints; j++) {
				for (let k = 0; k < testPoints; k++) {
					const testPos = new Vector3(
						(i / (testPoints - 1) - 0.5) * searchRadius * 2,
						(j / (testPoints - 1)) * searchRadius,
						(k / (testPoints - 1) - 0.5) * searchRadius * 2
					);

					const distance = this.sdfSystem.evaluate(testPos, this.sdfTree);
					sdfEvaluations++;

					if (distance < this.options.sdfThreshold * 2) {
						minBounds = Vector3.Minimize(minBounds, testPos);
						maxBounds = Vector3.Maximize(maxBounds, testPos);
					}
				}
			}
		}

		const padding = this.options.voxelSize * 2;
		const paddingVec = new Vector3(padding, padding, padding);
		minBounds = minBounds.subtract(paddingVec);
		maxBounds = maxBounds.add(paddingVec);

		return { min: minBounds, max: maxBounds };
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
		const dimensions = new Vector3(
			size.x / this.options.voxelSize,
			size.y / this.options.voxelSize,
			size.z / this.options.voxelSize
		);
		return {
			origin: alignedMin,
			dimensions,
			voxelSize: this.options.voxelSize,
			data: new Map<string, boolean>()
		};
	}

	private voxelKey(x: number, y: number, z: number): string {
		return `${x},${y},${z}`;
	}

	private keyToPosition(key: string, grid: VoxelGrid): Vector3 {
		const [x, y, z] = key.split(',').map(Number);
		return new Vector3(
			grid.origin.x + x * grid.voxelSize,
			grid.origin.y + y * grid.voxelSize,
			grid.origin.z + z * grid.voxelSize
		);
	}

	private isSurfaceVoxel(x: number, y: number, z: number, grid: VoxelGrid): boolean {
		if (!this.options.surfaceOnly) return true;

		const neighbors = [
			[-1, 0, 0], [1, 0, 0],
			[0, -1, 0], [0, 1, 0],
			[0, 0, -1], [0, 0, 1]
		];

		let sdfEvaluations = 0;
		for (const [dx, dy, dz] of neighbors) {
			const neighborKey = this.voxelKey(x + dx, y + dy, z + dz);
			if (!grid.data.has(neighborKey)) {
				// Check if neighbor would be inside SDF
				const neighborPos = new Vector3(
					grid.origin.x + (x + dx) * grid.voxelSize,
					grid.origin.y + (y + dy) * grid.voxelSize,
					grid.origin.z + (z + dz) * grid.voxelSize
				);

				if (!this.sdfTree) return true;
				const distance = this.sdfSystem.evaluate(neighborPos, this.sdfTree);
				sdfEvaluations++;

				if (distance >= this.options.sdfThreshold) {
					return true; // surface voxel
				}
			}
		}
		return false;
	}

	private async generateVoxelSystem() {
		if (!this.sdfTree) return;
		this.sdfSystem.resetEvaluationCount();

		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		const bounds = this.calculateOptimalBounds();

		this.voxelGrid = this.createVoxelGrid(bounds);

		await this.fillVoxelGridWithOctree(this.voxelGrid);

		const surfaceVoxels = this.extractVoxels(this.voxelGrid);

		const finalVoxels = this.limitVoxelCount(surfaceVoxels);

		if (finalVoxels.length > 0) {
			this.voxelMesh = await this.createOptimizedVoxelMesh(finalVoxels);
		}
		this.setupGPUPicking();

	}

	private extractVoxels(grid: VoxelGrid): Vector3[] {
		const voxels: Vector3[] = [];
		let surfaceCount = 0;
		for (const [key] of grid.data) {
			const [x, y, z] = key.split(',').map(Number);

			if (this.isSurfaceVoxel(x, y, z, grid)) {
				const worldPos = this.keyToPosition(key, grid);
				voxels.push(worldPos);
				surfaceCount++;
			}
		}

		return voxels;
	}

	private limitVoxelCount(voxels: Vector3[]): Vector3[] {
		if (voxels.length <= this.options.maxVoxelCount) {
			console.log(`✅ No voxel limiting needed: ${voxels.length} <= ${this.options.maxVoxelCount}`);
			return voxels;
		}

		const step = voxels.length / this.options.maxVoxelCount;
		const sampled: Vector3[] = [];

		for (let i = 0; i < this.options.maxVoxelCount; i++) {
			const index = Math.floor(i * step);
			sampled.push(voxels[index]);
		}

		const reductionRate = ((voxels.length - sampled.length) / voxels.length) * 100;

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
		//baseCube.thinInstanceEnablePicking = true;
		this.voxelPositions = [...positions];
		const totalMatrices = positions.length;
		const matrixBuffer = this.matrixBuffer;
		const instanceIDBuffer = new Float32Array(totalMatrices);

		console.log(`📊 Calculating center and building instance data...`);
		let center = Vector3.Zero();
		for (const pos of positions) {
			center = center.add(pos);
		}
		center = center.scale(1.0 / positions.length);

		// Build instance data in batches
		const batchSize = 10000;
		const totalBatches = Math.ceil(totalMatrices / batchSize);
		console.log(`🔄 Processing ${totalBatches} batches of instance data...`);

		for (let i = 0; i < totalMatrices; i += batchSize) {
			const endIdx = Math.min(i + batchSize, totalMatrices);
			const currentBatch = Math.floor(i / batchSize) + 1;

			for (let j = i; j < endIdx; j++) {
				const pos = positions[j];
				const matrix = Matrix.Translation(pos.x, pos.y, pos.z);
				matrix.copyToArray(matrixBuffer, j * 16);
				instanceIDBuffer[j] = j;
			}

			if (currentBatch % 5 === 0 || currentBatch === totalBatches) {
				console.log(`   📦 Batch ${currentBatch}/${totalBatches} (${((currentBatch / totalBatches) * 100).toFixed(1)}%)`);
			}

			// Yield control
			if (i % batchSize === 0) {
				await new Promise(resolve => setTimeout(resolve, 1));
			}
		}

		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer, 16);
		baseCube.thinInstanceCount = totalMatrices;

		if (this.options.enableShaderAnimation) {
			console.log(`🎬 Adding animation buffers...`);
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

		try {
			if (baseCube.freezeWorldMatrix) {
				baseCube.freezeWorldMatrix(); // Optimize for static geometry
				console.log(`🔒 World matrix frozen for optimization`);
			}
		} catch (e) {
			console.log("❌ freezeWorldMatrix not available, skipping optimization");
		}

		return baseCube;
	}

	private async fillVoxelGridWithOctree(grid: VoxelGrid) {
		const rootBounds = {
			min: grid.origin,
			max: new Vector3(
				grid.origin.x + grid.dimensions.x * grid.voxelSize,
				grid.origin.y + grid.dimensions.y * grid.voxelSize,
				grid.origin.z + grid.dimensions.z * grid.voxelSize
			)
		};

		let processed = 0;
		let generated = 0;

		await this.subdivideAndFill(rootBounds, grid, 0, 6, (p, g) => { processed = p; generated = g; });
	}

	private async subdivideAndFill(bounds: BoundingBox, grid: VoxelGrid, level: number, maxLevel: number,
		progressCallback: (processed: number, generated: number) => void) {

		if (await this.isRegionEmpty(bounds)) {
			return;
		}

		const size = bounds.max.subtract(bounds.min);
		const minVoxelSize = this.options.voxelSize * 2;

		if (level >= maxLevel || size.x <= minVoxelSize || size.y <= minVoxelSize || size.z <= minVoxelSize) {
			await this.fillRegionDirectly(bounds, grid, progressCallback);
			return;
		}

		const center = new Vector3(
			(bounds.min.x + bounds.max.x) * 0.5,
			(bounds.min.y + bounds.max.y) * 0.5,
			(bounds.min.z + bounds.max.z) * 0.5
		);

		const octants = [
			{ min: bounds.min, max: center },
			{ min: new Vector3(center.x, bounds.min.y, bounds.min.z), max: new Vector3(bounds.max.x, center.y, center.z) },
			{ min: new Vector3(bounds.min.x, center.y, bounds.min.z), max: new Vector3(center.x, bounds.max.y, center.z) },
			{ min: new Vector3(center.x, center.y, bounds.min.z), max: new Vector3(bounds.max.x, bounds.max.y, center.z) },
			{ min: new Vector3(bounds.min.x, bounds.min.y, center.z), max: new Vector3(center.x, center.y, bounds.max.z) },
			{ min: new Vector3(center.x, bounds.min.y, center.z), max: new Vector3(bounds.max.x, center.y, bounds.max.z) },
			{ min: new Vector3(bounds.min.x, center.y, center.z), max: new Vector3(center.x, bounds.max.y, bounds.max.z) },
			{ min: center, max: bounds.max }
		];

		for (const octant of octants) {
			await this.subdivideAndFill(octant, grid, level + 1, maxLevel, progressCallback);
		}
	}

	private async isRegionEmpty(bounds: BoundingBox): Promise<boolean> {
		if (!this.sdfTree) return true;

		const testPoints = [
			bounds.min,
			bounds.max,
			new Vector3(bounds.max.x, bounds.min.y, bounds.min.z),
			new Vector3(bounds.min.x, bounds.max.y, bounds.min.z),
			new Vector3(bounds.min.x, bounds.min.y, bounds.max.z),
			new Vector3(bounds.max.x, bounds.max.y, bounds.min.z),
			new Vector3(bounds.max.x, bounds.min.y, bounds.max.z),
			new Vector3(bounds.min.x, bounds.max.y, bounds.max.z),
			new Vector3( // center
				(bounds.min.x + bounds.max.x) * 0.5,
				(bounds.min.y + bounds.max.y) * 0.5,
				(bounds.min.z + bounds.max.z) * 0.5
			)
		];

		for (const point of testPoints) {
			const distance = this.sdfSystem.evaluate(point, this.sdfTree);
			if (distance < this.options.sdfThreshold * 2) { // Use larger threshold for region testing
				return false; // Found something, region not empty
			}
		}

		return true;
	}

	private async fillRegionDirectly(bounds: BoundingBox, grid: VoxelGrid,
		progressCallback: (processed: number, generated: number) => void) {

		const voxelSize = grid.voxelSize;
		let localProcessed = 0;
		let localGenerated = 0;

		const startX = Math.max(0, Math.floor((bounds.min.x - grid.origin.x) / voxelSize));
		const endX = Math.min(grid.dimensions.x, Math.ceil((bounds.max.x - grid.origin.x) / voxelSize));
		const startY = Math.max(0, Math.floor((bounds.min.y - grid.origin.y) / voxelSize));
		const endY = Math.min(grid.dimensions.y, Math.ceil((bounds.max.y - grid.origin.y) / voxelSize));
		const startZ = Math.max(0, Math.floor((bounds.min.z - grid.origin.z) / voxelSize));
		const endZ = Math.min(grid.dimensions.z, Math.ceil((bounds.max.z - grid.origin.z) / voxelSize));

		for (let x = startX; x < endX; x++) {
			for (let y = startY; y < endY; y++) {
				for (let z = startZ; z < endZ; z++) {
					const worldPos = new Vector3(
						grid.origin.x + x * voxelSize,
						grid.origin.y + y * voxelSize,
						grid.origin.z + z * voxelSize
					);

					const distance = this.sdfSystem.evaluate(worldPos, this.sdfTree!);

					if (distance < this.options.sdfThreshold) {
						const key = this.voxelKey(x, y, z);
						grid.data.set(key, true);
						localGenerated++;
					}

					localProcessed++;
				}
			}
		}

		progressCallback(localProcessed, localGenerated);
	}

	public setRectangularDeadZone(center: Vector3, width: number, height: number, depth: number) {
		this.material.setVec3("deadZoneCenter", center);
		this.material.setFloat("deadZoneWidth", width);
		this.material.setFloat("deadZoneHeight", height);
		this.material.setFloat("deadZoneDepth", depth);
	}

	public enableShaderAnimation(enabled: boolean) {
		if (this.options.enableShaderAnimation !== enabled) {
			console.log(`🎬 ${enabled ? 'Enabling' : 'Disabling'} shader animation...`);
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
		}
		console.log(`⚡ Animation speed: ${speed}`);
	}

	public setAnimationIntensity(intensity: number) {
		this.options.animationIntensity = intensity;
		if (this.material instanceof ShaderMaterial) {
			this.material.setFloat("animationIntensity", intensity);
		}
		console.log(`💪 Animation intensity: ${intensity}`);
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
		console.log(`🎭 Animation style: ${style}`);
	}

	public setQualityMode(mode: 'low' | 'medium' | 'high' | 'ultra') {
		console.log(`🔧 Changing quality mode from ${this.options.qualityMode} to ${mode}`);
		this.options.qualityMode = mode;
		this.applyQualitySettings();
		this.generateVoxelSystem();
	}

	public update(time: number, camera: Camera) {
		this.material.setVec3("cameraPosition", camera.globalPosition);
		this.material.setFloat("time", time);
		this.material.setVec3("origin", this.cursor);
		this.material.setVec3("oldOrigin", this.oldcursor);
		this.material.setFloat("animationSpeed", this.options.animationSpeed);
		this.material.setFloat("animationIntensity", this.options.animationIntensity);
		this.material.setVec3("worldCenter", Vector3.Zero());

		this.material.setFloat("baseWaveIntensity", 0.02); // Subtle base animation
		this.material.setFloat("mouseInfluenceRadius", 0.8)
		//this.setRectangularDeadZone(new Vector3(0, 7, 2), 1.5, 1.5, 1);


		this.depthMaterial.setFloat("time", time);
		this.depthMaterial.setVector3("origin", this.cursor);
		this.depthMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		this.depthMaterial.setFloat("animationIntensity", this.options.animationIntensity);
		this.depthMaterial.setVector3("worldCenter", Vector3.Zero());

		this.depthMaterial.setFloat("baseWaveIntensity", 0.02); // Subtle base animation
		this.depthMaterial.setFloat("mouseInfluenceRadius", 1.)
		if (this.text)
			this.text.update();


	}

	public getMesh(): Mesh | null {
		return this.voxelMesh;
	}

	public dispose() {
		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}
		this.voxelGrid = null;
		console.log(`🗑️ Monolith disposed`);
	}

	public addText(id: string, text: string, x: number = 0, y: number = 0, z: number = 3, size: number = 1.5) {
		if (this.text) {
			this.text.addTextZone(id, text, x, y, z, size);
		}
	}

	public updateText(id: string, newText: string) {
		if (this.text) {
			this.text.updateTextZone(id, newText);
		}
	}

	public removeText(id: string) {
		if (this.text) {
			this.text.removeTextZone(id);
		}
	}

	public showText(id: string) {
		if (this.text) {
			this.text.showZone(id);
		}
	}

	public setTextGlow(id: string, intensity: number) {
		if (this.text) {
			this.text.setGlow(id, intensity);
		}
	}

	public hideAllText() {
		if (this.text) {
			this.text.hideAllText();
		}
	}

	public setTextFace(id: string, face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom') {
		if (this.text) {
			this.text.setTextFace(id, face);
		}
	}
	public getTextZones(): string[] {
		return this.text?.getZones() || [];
	}
}


