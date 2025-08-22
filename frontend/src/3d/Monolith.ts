//import { Camera, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Color3, Matrix, Material } from "@babylonImport";
//import { SDFSystem, SDFNode, SDFBuilder } from "./Sdf";
//
//type MonolithOptions = {
//	height: number;
//	width: number;
//	depth: number;
//	voxelSize: number;
//	voxelResolution: number;
//	sdfThreshold: number;
//	materialType: 'stone' | 'crystal' | 'metal';
//	// New optimization options
//	useLOD: boolean;
//	maxVoxelCount: number;
//	useOctree: boolean;
//	batchSize: number;
//	useWorker: boolean;
//	adaptiveResolution: boolean;
//};
//
//interface VoxelBatch {
//	positions: Vector3[];
//	startIndex: number;
//	endIndex: number;
//}
//
//interface OctreeNode {
//	bounds: {
//		min: Vector3;
//		max: Vector3;
//	};
//	center: Vector3;
//	size: number;
//	isEmpty: boolean;
//	isFull: boolean;
//	children?: OctreeNode[];
//	voxels?: Vector3[];
//}
//
//export class Monolith {
//	public scene: Scene;
//	private voxelMesh: Mesh | null = null;
//	private baseMaterial!: StandardMaterial;
//	private portalMaterial!: StandardMaterial;
//	private options: MonolithOptions;
//	private sdfSystem: SDFSystem;
//	private sdfTree: SDFNode | null = null;
//	private octree: OctreeNode | null = null;
//	private worker: Worker | null = null;
//
//	constructor(scene: Scene, size: number, cursor: Vector3, options?: Partial<MonolithOptions>) {
//		this.scene = scene;
//		this.sdfSystem = new SDFSystem();
//
//		// Optimized default options
//		this.options = {
//			height: size,
//			width: size * 0.8,
//			depth: size * 0.4,
//			voxelSize: 0.06, // Smaller voxels for higher detail
//			voxelResolution: Math.max(500, Math.floor(size * 10)), // Higher resolution
//			sdfThreshold: 0.02,
//			materialType: 'stone',
//			useLOD: true,
//			maxVoxelCount: 250000, // 1M voxel limit
//			useOctree: true,
//			batchSize: 25000, // Process in batches
//			useWorker: true, // Web worker for heavy computation
//			adaptiveResolution: false,
//			...options
//		};
//
//		this.createMaterials();
//		this.buildDefaultSDF();
//	}
//
//	public async init() {
//		await this.loadAssests(this.scene);
//		await this.generateMonolithVoxelsOptimized();
//	}
//
//	// OPTIMIZATION 1: Octree-based spatial partitioning
//	private buildOctree(bounds: any, maxDepth: number = 8, currentDepth: number = 0): OctreeNode {
//		const center = new Vector3(
//			(bounds.min.x + bounds.max.x) * 0.5,
//			(bounds.min.y + bounds.max.y) * 0.5,
//			(bounds.min.z + bounds.max.z) * 0.5
//		);
//
//		const size = Math.max(
//			bounds.max.x - bounds.min.x,
//			bounds.max.y - bounds.min.y,
//			bounds.max.z - bounds.min.z
//		);
//
//		const node: OctreeNode = {
//			bounds,
//			center,
//			size,
//			isEmpty: false,
//			isFull: false,
//			voxels: []
//		};
//
//		// Early termination: check if this octree node is completely inside/outside SDF
//		const cornerDistances = this.sampleOctreeCorners(bounds);
//		const allInside = cornerDistances.every(d => d < -this.options.sdfThreshold);
//		const allOutside = cornerDistances.every(d => d > this.options.sdfThreshold);
//
//		if (allOutside) {
//			node.isEmpty = true;
//			return node;
//		}
//
//		if (allInside && currentDepth > 2) {
//			node.isEmpty = true;
//			//node.isFull = true;
//			//// Fill this node with voxels
//			//this.fillOctreeNode(node);
//			return node;
//		}
//
//		// If we're at max depth or the node is small enough, generate voxels
//		if (currentDepth >= maxDepth || size <= this.options.voxelSize * 4) {
//			this.generateVoxelsForOctreeNode(node);
//			return node;
//		}
//
//		// Subdivide into 8 children
//		node.children = [];
//		const halfSize = size * 0.5;
//
//		for (let x = 0; x < 2; x++) {
//			for (let y = 0; y < 2; y++) {
//				for (let z = 0; z < 2; z++) {
//					const childMin = new Vector3(
//						x === 0 ? bounds.min.x : center.x,
//						y === 0 ? bounds.min.y : center.y,
//						z === 0 ? bounds.min.z : center.z
//					);
//
//					const childMax = new Vector3(
//						x === 0 ? center.x : bounds.max.x,
//						y === 0 ? center.y : bounds.max.y,
//						z === 0 ? center.z : bounds.max.z
//					);
//
//					const childBounds = { min: childMin, max: childMax };
//					const childNode = this.buildOctree(childBounds, maxDepth, currentDepth + 1);
//
//					if (!childNode.isEmpty) {
//						node.children.push(childNode);
//					}
//				}
//			}
//		}
//
//		return node;
//	}
//
//	private sampleOctreeCorners(bounds: any): number[] {
//		if (!this.sdfTree) return [1000];
//
//		const corners = [
//			new Vector3(bounds.min.x, bounds.min.y, bounds.min.z),
//			new Vector3(bounds.max.x, bounds.min.y, bounds.min.z),
//			new Vector3(bounds.min.x, bounds.max.y, bounds.min.z),
//			new Vector3(bounds.max.x, bounds.max.y, bounds.min.z),
//			new Vector3(bounds.min.x, bounds.min.y, bounds.max.z),
//			new Vector3(bounds.max.x, bounds.min.y, bounds.max.z),
//			new Vector3(bounds.min.x, bounds.max.y, bounds.max.z),
//			new Vector3(bounds.max.x, bounds.max.y, bounds.max.z)
//		];
//
//		return corners.map(corner => this.sdfSystem.evaluate(corner, this.sdfTree!));
//	}
//
//	private fillOctreeNode(node: OctreeNode) {
//		// Fill completely interior nodes with a grid of voxels
//		const voxelsPerAxis = Math.max(1, Math.floor(node.size / this.options.voxelSize));
//		const step = node.size / voxelsPerAxis;
//
//		for (let x = 0; x < voxelsPerAxis; x++) {
//			for (let y = 0; y < voxelsPerAxis; y++) {
//				for (let z = 0; z < voxelsPerAxis; z++) {
//					const pos = new Vector3(
//						node.bounds.min.x + (x + 0.5) * step,
//						node.bounds.min.y + (y + 0.5) * step,
//						node.bounds.min.z + (z + 0.5) * step
//					);
//					node.voxels!.push(pos);
//				}
//			}
//		}
//	}
//
//	private generateVoxelsForOctreeNode(node: OctreeNode) {
//		if (!this.sdfTree) return;
//
//		const voxelsPerAxis = Math.max(1, Math.floor(node.size / this.options.voxelSize));
//		const step = node.size / voxelsPerAxis;
//
//		for (let x = 0; x < voxelsPerAxis; x++) {
//			for (let y = 0; y < voxelsPerAxis; y++) {
//				for (let z = 0; z < voxelsPerAxis; z++) {
//					const pos = new Vector3(
//						node.bounds.min.x + (x + 0.5) * step,
//						node.bounds.min.y + (y + 0.5) * step,
//						node.bounds.min.z + (z + 0.5) * step
//					);
//
//					const distance = this.sdfSystem.evaluate(pos, this.sdfTree);
//					if (distance < this.options.sdfThreshold) {
//						node.voxels!.push(pos);
//					}
//				}
//			}
//		}
//	}
//
//	// OPTIMIZATION 2: Adaptive resolution based on SDF gradient
//	private getAdaptiveVoxelSize(pos: Vector3): number {
//		if (!this.options.adaptiveResolution || !this.sdfTree) {
//			return this.options.voxelSize;
//		}
//
//		// Sample gradient to determine detail level
//		const epsilon = this.options.voxelSize * 0.1;
//		const centerDist = this.sdfSystem.evaluate(pos, this.sdfTree);
//
//		const gradX = this.sdfSystem.evaluate(new Vector3(pos.x + epsilon, pos.y, pos.z), this.sdfTree) - centerDist;
//		const gradY = this.sdfSystem.evaluate(new Vector3(pos.x, pos.y + epsilon, pos.z), this.sdfTree) - centerDist;
//		const gradZ = this.sdfSystem.evaluate(new Vector3(pos.x, pos.y, pos.z + epsilon), this.sdfTree) - centerDist;
//
//		const gradientMagnitude = Math.sqrt(gradX * gradX + gradY * gradY + gradZ * gradZ) / epsilon;
//
//		// Higher gradient = more detail needed = smaller voxels
//		const detailFactor = Math.max(0.5, Math.min(2.0, 1.0 / (gradientMagnitude + 0.1)));
//		return this.options.voxelSize * detailFactor;
//	}
//
//	// OPTIMIZATION 3: Batched processing
//	private async generateMonolithVoxelsOptimized() {
//		if (!this.sdfTree) return;
//
//		this.sdfSystem.resetEvaluationCount();
//		const startTime = performance.now();
//
//		// Clear existing mesh
//		if (this.voxelMesh) {
//			this.voxelMesh.dispose();
//			this.voxelMesh = null;
//		}
//
//		let allVoxelPositions: Vector3[] = [];
//
//		if (this.options.useOctree) {
//			// Use octree optimization
//			const bounds = this.calculateOptimalBounds();
//			console.log("Building octree...");
//			this.octree = this.buildOctree(bounds);
//			allVoxelPositions = this.collectVoxelsFromOctree(this.octree);
//		} else {
//			// Use traditional grid with batching
//			allVoxelPositions = await this.generateVoxelsBatched();
//		}
//
//		// Apply voxel count limit
//		if (allVoxelPositions.length > this.options.maxVoxelCount) {
//			console.warn(`Voxel count ${allVoxelPositions.length} exceeds limit ${this.options.maxVoxelCount}, sampling...`);
//			allVoxelPositions = this.sampleVoxels(allVoxelPositions, this.options.maxVoxelCount);
//		}
//
//		// Create mesh
//		if (allVoxelPositions.length > 0) {
//			this.voxelMesh = await this.createThinInstanceMeshBatched(
//				'monolith_voxels',
//				allVoxelPositions,
//				this.baseMaterial
//			);
//		}
//
//		const endTime = performance.now();
//		console.log(`Generated ${allVoxelPositions.length} voxels in ${(endTime - startTime).toFixed(2)}ms`);
//		console.log(`SDF evaluations: ${this.sdfSystem.getEvaluationCount()}`);
//	}
//
//	private collectVoxelsFromOctree(node: OctreeNode): Vector3[] {
//		let voxels: Vector3[] = [];
//
//		if (node.voxels) {
//			voxels = voxels.concat(node.voxels);
//		}
//
//		if (node.children) {
//			for (const child of node.children) {
//				voxels = voxels.concat(this.collectVoxelsFromOctree(child));
//			}
//		}
//
//		return voxels;
//	}
//
//	private async generateVoxelsBatched(): Promise<Vector3[]> {
//		const allVoxels: Vector3[] = [];
//		const bounds = this.calculateOptimalBounds();
//
//		const totalVoxels = this.options.voxelResolution ** 3;
//		const batches = Math.ceil(totalVoxels / this.options.batchSize);
//
//		console.log(`Processing ${totalVoxels} potential voxels in ${batches} batches...`);
//
//		for (let batch = 0; batch < batches; batch++) {
//			const batchVoxels = this.processBatch(batch, bounds);
//			allVoxels.push(...batchVoxels);
//
//			// Yield control to prevent blocking
//			if (batch % 10 === 0) {
//				await new Promise(resolve => setTimeout(resolve, 1));
//			}
//		}
//
//		return allVoxels;
//	}
//
//	private processBatch(batchIndex: number, bounds: any): Vector3[] {
//		const voxelPositions: Vector3[] = [];
//		const halfRes = Math.floor(this.options.voxelResolution / 2);
//
//		const startIdx = batchIndex * this.options.batchSize;
//		const endIdx = Math.min(startIdx + this.options.batchSize, this.options.voxelResolution ** 3);
//
//		for (let i = startIdx; i < endIdx; i++) {
//			// Convert linear index to 3D coordinates
//			const x = i % this.options.voxelResolution;
//			const y = Math.floor((i / this.options.voxelResolution) % this.options.voxelResolution);
//			const z = Math.floor(i / (this.options.voxelResolution ** 2));
//
//			const worldPos = new Vector3(
//				(x - halfRes) * this.options.voxelSize,
//				y * this.options.voxelSize,
//				(z - halfRes) * this.options.voxelSize
//			);
//
//			// Early bounds check
//			if (!this.isWithinBounds(worldPos, bounds)) {
//				continue;
//			}
//
//			// Adaptive voxel size
//			const adaptiveVoxelSize = this.getAdaptiveVoxelSize(worldPos);
//
//			// Skip if this position should use larger voxels (LOD)
//			if (this.options.useLOD && adaptiveVoxelSize > this.options.voxelSize * 1.5) {
//				if ((x + y + z) % 2 !== 0) continue; // Skip every other voxel for larger sizes
//			}
//
//			if (!this.sdfTree) continue;
//			const distance = this.sdfSystem.evaluate(worldPos, this.sdfTree);
//
//			if (distance < this.options.sdfThreshold) {
//				// Additional culling for interior voxels
//				if (!this.isInteriorVoxelFast(worldPos, distance)) {
//					voxelPositions.push(worldPos);
//				}
//			}
//		}
//
//		return voxelPositions;
//	}
//
//	// OPTIMIZATION 4: Fast interior voxel detection
//	private isInteriorVoxelFast(worldPos: Vector3, currentDistance: number): boolean {
//		if (!this.sdfTree) return false;
//
//		// Only check if we're significantly inside
//		if (currentDistance > -this.options.voxelSize) return false;
//
//		// Quick 6-directional check with larger steps
//		const stepSize = this.options.voxelSize * 2;
//		const directions = [
//			new Vector3(stepSize, 0, 0),
//			new Vector3(-stepSize, 0, 0),
//			new Vector3(0, stepSize, 0),
//			new Vector3(0, -stepSize, 0),
//			new Vector3(0, 0, stepSize),
//			new Vector3(0, 0, -stepSize)
//		];
//
//		for (const dir of directions) {
//			const neighborPos = worldPos.add(dir);
//			const neighborDist = this.sdfSystem.evaluate(neighborPos, this.sdfTree);
//			if (neighborDist >= this.options.sdfThreshold) {
//				return false; // Not interior
//			}
//		}
//
//		return true; // All neighbors are solid
//	}
//
//	// OPTIMIZATION 5: Efficient mesh creation with batching
//	private async createThinInstanceMeshBatched(name: string, positions: Vector3[], material: Material): Promise<Mesh> {
//		const baseCube = MeshBuilder.CreateBox(name, {
//			size: this.options.voxelSize
//		}, this.scene);
//		baseCube.material = material;
//
//		// Process matrices in batches to avoid memory spikes
//		const batchSize = 10000;
//		const totalMatrices = positions.length;
//		const matrixBuffer = new Float32Array(totalMatrices * 16);
//
//		for (let i = 0; i < totalMatrices; i += batchSize) {
//			const endIdx = Math.min(i + batchSize, totalMatrices);
//
//			for (let j = i; j < endIdx; j++) {
//				const pos = positions[j];
//				const matrix = Matrix.Translation(pos.x, pos.y, pos.z);
//				matrix.copyToArray(matrixBuffer, j * 16);
//			}
//
//			// Yield control periodically
//			if (i % (batchSize * 5) === 0) {
//				await new Promise(resolve => setTimeout(resolve, 1));
//			}
//		}
//
//		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer);
//		baseCube.thinInstanceCount = totalMatrices;
//
//		return baseCube;
//	}
//
//	// OPTIMIZATION 6: Smart voxel sampling for count limits
//	private sampleVoxels(voxels: Vector3[], maxCount: number): Vector3[] {
//		if (voxels.length <= maxCount) return voxels;
//
//		// Stratified sampling to maintain spatial distribution
//		const ratio = maxCount / voxels.length;
//		const sampled: Vector3[] = [];
//
//		// Sort by importance (distance from center, surface proximity, etc.)
//		const center = this.calculateCenterOfMass(voxels);
//		voxels.sort((a, b) => {
//			const distA = Vector3.Distance(a, center);
//			const distB = Vector3.Distance(b, center);
//			return distA - distB; // Prefer voxels closer to center
//		});
//
//		// Take evenly spaced samples
//		const step = 1 / ratio;
//		let currentIndex = 0;
//
//		while (sampled.length < maxCount && currentIndex < voxels.length) {
//			sampled.push(voxels[Math.floor(currentIndex)]);
//			currentIndex += step;
//		}
//
//		return sampled;
//	}
//
//	private calculateCenterOfMass(voxels: Vector3[]): Vector3 {
//		if (voxels.length === 0) return Vector3.Zero();
//
//		const sum = voxels.reduce((acc, voxel) => acc.add(voxel), Vector3.Zero());
//		return sum.scale(1 / voxels.length);
//	}
//
//	private calculateOptimalBounds() {
//		// Tighter bounds calculation based on SDF
//		const maxDim = Math.max(this.options.width, this.options.height, this.options.depth);
//		return {
//			min: new Vector3(-maxDim * 0.6, -this.options.voxelSize, -maxDim * 0.6),
//			max: new Vector3(maxDim * 0.6, this.options.height + this.options.voxelSize, maxDim * 0.6)
//		};
//	}
//
//	private isWithinBounds(pos: Vector3, bounds: any): boolean {
//		return pos.x >= bounds.min.x && pos.x <= bounds.max.x &&
//			pos.y >= bounds.min.y && pos.y <= bounds.max.y &&
//			pos.z >= bounds.min.z && pos.z <= bounds.max.z;
//	}
//
//	// Rest of the methods remain the same...
//	private createMaterials() {
//		this.baseMaterial = new StandardMaterial('monolith_mat', this.scene);
//		this.baseMaterial.diffuseColor = new Color3(0.8, 0.8, 0.8);
//		this.baseMaterial.emissiveColor = new Color3(0.1, 0.1, 0.1);
//
//		this.portalMaterial = new StandardMaterial('monolith_portal', this.scene);
//		this.portalMaterial.diffuseColor = new Color3(0.2, 0.3, 0.6);
//		this.portalMaterial.emissiveColor = new Color3(0.1, 0.2, 0.4);
//	}
//
//	private buildDefaultSDF() {
//		const basePyramid = SDFBuilder.pyramid(1.0, {
//			scale: new Vector3(
//				this.options.width * 0.5,
//				this.options.height,
//				this.options.depth * 0.5
//			)
//		});
//
//		const portal = SDFBuilder.cylinder(0.5, this.options.depth, {
//			position: new Vector3(0, this.options.height * 0.3, 0),
//			rotation: new Vector3(Math.PI * 0.5, 0, 0),
//			scale: new Vector3(
//				this.options.width * 0.25,
//				1,
//				this.options.width * 0.25
//			)
//		});
//
//		this.sdfTree = SDFBuilder.subtract(basePyramid, portal);
//	}
//
//	public setSDFTree(sdfTree: SDFNode) {
//		this.sdfTree = sdfTree;
//		this.generateMonolithVoxelsOptimized();
//	}
//
//	public update(time: number, camera: Camera) { }
//
//	public getMesh(): Mesh | null {
//		return this.voxelMesh;
//	}
//
//	private async loadAssests(scene: Scene) { }
//
//	public dispose() {
//		if (this.voxelMesh) {
//			this.voxelMesh.dispose();
//			this.voxelMesh = null;
//		}
//		this.baseMaterial?.dispose();
//		this.portalMaterial?.dispose();
//		if (this.worker) {
//			this.worker.terminate();
//		}
//	}
//
//	public getStats() {
//		return {
//			voxelCount: this.voxelMesh?.thinInstanceCount || 0,
//			sdfEvaluations: this.sdfSystem.getEvaluationCount(),
//			options: { ...this.options },
//			octreeNodes: this.octree ? this.countOctreeNodes(this.octree) : 0
//		};
//	}
//
//	private countOctreeNodes(node: OctreeNode): number {
//		let count = 1;
//		if (node.children) {
//			for (const child of node.children) {
//				count += this.countOctreeNodes(child);
//			}
//		}
//		return count;
//	}
//
//	// Configuration methods
//	public setMaxVoxelCount(count: number) {
//		this.options.maxVoxelCount = count;
//	}
//
//	public setVoxelSize(size: number) {
//		this.options.voxelSize = size;
//		this.options.voxelResolution = Math.floor(
//			Math.max(this.options.width, this.options.height, this.options.depth) / size
//		);
//	}
//
//	public enableLOD(enabled: boolean) {
//		this.options.useLOD = enabled;
//	}
//
//	public enableOctree(enabled: boolean) {
//		this.options.useOctree = enabled;
//	}
//
//	public setBatchSize(size: number) {
//		this.options.batchSize = size;
//	}
//}







//import { Camera, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Color3, Matrix, Material, ShaderMaterial, Effect } from "@babylonImport";
//import { SDFSystem, SDFNode, SDFBuilder } from "./Sdf";
//
//type MonolithOptions = {
//	height: number;
//	width: number;
//	depth: number;
//	voxelSize: number;
//	voxelResolution: number;
//	sdfThreshold: number;
//	maxVoxelCount: number;
//	useOctree: boolean;
//	batchSize: number;
//	enableShaderAnimation: boolean;
//	animationSpeed: number;
//	animationIntensity: number;
//};
//
//interface OctreeNode {
//	bounds: {
//		min: Vector3;
//		max: Vector3;
//	};
//	center: Vector3;
//	size: number;
//	isEmpty: boolean;
//	children?: OctreeNode[];
//	voxels?: Vector3[];
//}
//
//export class Monolith {
//	public scene: Scene;
//	private voxelMesh: Mesh | null = null;
//	private material!: StandardMaterial | ShaderMaterial;
//	private options: MonolithOptions;
//	private sdfSystem: SDFSystem;
//	private sdfTree: SDFNode | null = null;
//	private octree: OctreeNode | null = null;
//
//	constructor(scene: Scene, size: number, options?: Partial<MonolithOptions>) {
//		this.scene = scene;
//		this.sdfSystem = new SDFSystem();
//
//		this.options = {
//			height: size,
//			width: size * 0.8,
//			depth: size * 0.4,
//			voxelSize: 0.06,
//			voxelResolution: Math.max(300, Math.floor(size * 8)),
//			sdfThreshold: 0.02,
//			maxVoxelCount: 250000,
//			useOctree: true,
//			batchSize: 25000,
//			enableShaderAnimation: false,
//			animationSpeed: 1.0,
//			animationIntensity: 0.1,
//			...options
//		};
//
//		this.createMaterial();
//		this.buildDefaultSDF();
//	}
//
//	public async init() {
//		await this.generateVoxels();
//	}
//
//	private createMaterial() {
//		if (this.options.enableShaderAnimation) {
//			this.material = this.createShaderMaterial();
//		} else {
//			this.material = this.createStandardMaterial();
//		}
//	}
//
//	private createStandardMaterial(): StandardMaterial {
//		const material = new StandardMaterial('monolith_standard', this.scene);
//		material.diffuseColor = new Color3(0.8, 0.8, 0.8);
//		material.emissiveColor = new Color3(0.1, 0.1, 0.1);
//		return material;
//	}
//
//	private createShaderMaterial(): ShaderMaterial {
//		this.defineShaders();
//
//		const shaderMaterial = new ShaderMaterial("animatedVoxel", this.scene, {
//			vertex: "animatedVoxel",
//			fragment: "animatedVoxel",
//		}, {
//			attributes: ["position", "normal"],
//			uniforms: ["viewProjection", "time", "animationSpeed", "animationIntensity"],
//			defines: ["#define INSTANCES"],
//			needAlphaBlending: false,
//			needAlphaTesting: false
//		});
//
//		// Set default uniforms
//		shaderMaterial.setFloat("time", 0);
//		shaderMaterial.setFloat("animationSpeed", this.options.animationSpeed);
//		shaderMaterial.setFloat("animationIntensity", this.options.animationIntensity);
//
//		// Force shader to rebuild
//		shaderMaterial.markDirty();
//
//		console.log("Shader material created with INSTANCES support");
//		return shaderMaterial;
//	}
//
//	private defineShaders() {
//		Effect.ShadersStore["animatedVoxelVertexShader"] = `
//			precision highp float;
//
//			attribute vec3 position;
//			attribute vec3 normal;
//
//			// Thin instance matrix attributes (Babylon.js provides these automatically)
//			attribute vec4 world0;
//			attribute vec4 world1;
//			attribute vec4 world2;
//			attribute vec4 world3;
//
//			uniform mat4 viewProjection;
//			uniform float time;
//			uniform float animationSpeed;
//			uniform float animationIntensity;
//
//			varying vec3 vNormal;
//			varying vec3 vPosition;
//			varying float vInstanceId;
//
//			// Simple noise function
//			float noise(float x) {
//				return fract(sin(x * 12.9898) * 43758.5453);
//			}
//
//			void main() {
//				// Build world matrix from thin instance attributes
//				mat4 worldMatrix = mat4(world0, world1, world2, world3);
//
//				// Get instance position for unique randomness
//				vec3 instancePos = worldMatrix[3].xyz;
//				float instanceSeed = instancePos.x + instancePos.y * 100.0 + instancePos.z * 10000.0;
//				vInstanceId = instanceSeed; // Pass to fragment for debugging
//
//				// Generate random values for this instance
//				float randomSeed1 = noise(instanceSeed);
//				float randomSeed2 = noise(instanceSeed + 100.0);
//				float randomSeed3 = noise(instanceSeed + 200.0);
//
//				// Animation phase with random offset
//				float animationPhase = time * animationSpeed + randomSeed1 * 6.28318;
//
//				// Calculate movements
//				float primaryMovement = sin(animationPhase) * animationIntensity;
//				float xMovement = sin(animationPhase + randomSeed2 * 3.14159) * animationIntensity * 0.3;
//				float yMovement = cos(animationPhase + randomSeed3 * 3.14159) * animationIntensity * 0.2;
//
//				// Apply animation to local position
//				vec3 animatedPosition = position;
//				animatedPosition.x += xMovement;
//				animatedPosition.y += yMovement;
//				animatedPosition.z += primaryMovement;
//
//				// Transform to world space
//				vec4 worldPosition = worldMatrix * vec4(animatedPosition, 1.0);
//				gl_Position = viewProjection * worldPosition;
//
//				// Calculate normal
//				vNormal = normalize((worldMatrix * vec4(normal, 0.0)).xyz);
//				vPosition = worldPosition.xyz;
//			}
//		`;
//
//		// Fragment shader with debug coloring
//		Effect.ShadersStore["animatedVoxelFragmentShader"] = `
//			precision highp float;
//
//			varying vec3 vNormal;
//			varying vec3 vPosition;
//			varying float vInstanceId;
//
//			uniform float time;
//
//			void main() {
//				// Base lighting
//				vec3 lightDir = normalize(vec3(0.5, 1.0, 0.3));
//				float NdotL = max(dot(normalize(vNormal), lightDir), 0.0);
//				float lighting = 0.3 + NdotL * 0.7;
//
//				// Debug: Color varies with time and instance to show animation
//				float debugFactor = sin(time + vInstanceId * 0.01) * 0.1 + 0.9;
//
//				vec3 baseColor = vec3(0.8, 0.8, 0.8) * debugFactor;
//				vec3 finalColor = baseColor * lighting;
//
//				gl_FragColor = vec4(finalColor, 1.0);
//			}
//		`;
//
//	}
//
//	private buildDefaultSDF() {
//		const basePyramid = SDFBuilder.pyramid(1.0, {
//			scale: new Vector3(
//				this.options.width * 0.5,
//				this.options.height,
//				this.options.depth * 0.5
//			)
//		});
//
//		this.sdfTree = basePyramid;
//	}
//
//	public setSDFTree(sdfTree: SDFNode) {
//		this.sdfTree = sdfTree;
//		this.generateVoxels();
//	}
//
//	private buildOctree(bounds: any, maxDepth: number = 7, currentDepth: number = 0): OctreeNode {
//		const center = new Vector3(
//			(bounds.min.x + bounds.max.x) * 0.5,
//			(bounds.min.y + bounds.max.y) * 0.5,
//			(bounds.min.z + bounds.max.z) * 0.5
//		);
//
//		const size = Math.max(
//			bounds.max.x - bounds.min.x,
//			bounds.max.y - bounds.min.y,
//			bounds.max.z - bounds.min.z
//		);
//
//		const node: OctreeNode = {
//			bounds,
//			center,
//			size,
//			isEmpty: false,
//			voxels: []
//		};
//
//		const cornerDistances = this.sampleOctreeCorners(bounds);
//		const allOutside = cornerDistances.every(d => d > this.options.sdfThreshold);
//
//		if (allOutside) {
//			node.isEmpty = true;
//			return node;
//		}
//
//		if (currentDepth >= maxDepth || size <= this.options.voxelSize * 4) {
//			this.generateVoxelsForOctreeNode(node);
//			return node;
//		}
//
//		node.children = [];
//		for (let x = 0; x < 2; x++) {
//			for (let y = 0; y < 2; y++) {
//				for (let z = 0; z < 2; z++) {
//					const childMin = new Vector3(
//						x === 0 ? bounds.min.x : center.x,
//						y === 0 ? bounds.min.y : center.y,
//						z === 0 ? bounds.min.z : center.z
//					);
//
//					const childMax = new Vector3(
//						x === 0 ? center.x : bounds.max.x,
//						y === 0 ? center.y : bounds.max.y,
//						z === 0 ? center.z : bounds.max.z
//					);
//
//					const childBounds = { min: childMin, max: childMax };
//					const childNode = this.buildOctree(childBounds, maxDepth, currentDepth + 1);
//
//					if (!childNode.isEmpty) {
//						node.children.push(childNode);
//					}
//				}
//			}
//		}
//
//		return node;
//	}
//
//	private sampleOctreeCorners(bounds: any): number[] {
//		if (!this.sdfTree) return [1000];
//
//		const corners = [
//			new Vector3(bounds.min.x, bounds.min.y, bounds.min.z),
//			new Vector3(bounds.max.x, bounds.min.y, bounds.min.z),
//			new Vector3(bounds.min.x, bounds.max.y, bounds.min.z),
//			new Vector3(bounds.max.x, bounds.max.y, bounds.min.z),
//			new Vector3(bounds.min.x, bounds.min.y, bounds.max.z),
//			new Vector3(bounds.max.x, bounds.min.y, bounds.max.z),
//			new Vector3(bounds.min.x, bounds.max.y, bounds.max.z),
//			new Vector3(bounds.max.x, bounds.max.y, bounds.max.z)
//		];
//
//		return corners.map(corner => this.sdfSystem.evaluate(corner, this.sdfTree!));
//	}
//
//	private generateVoxelsForOctreeNode(node: OctreeNode) {
//		if (!this.sdfTree) return;
//
//		const voxelsPerAxis = Math.max(1, Math.floor(node.size / this.options.voxelSize));
//		const step = node.size / voxelsPerAxis;
//
//		for (let x = 0; x < voxelsPerAxis; x++) {
//			for (let y = 0; y < voxelsPerAxis; y++) {
//				for (let z = 0; z < voxelsPerAxis; z++) {
//					const pos = new Vector3(
//						node.bounds.min.x + (x + 0.5) * step,
//						node.bounds.min.y + (y + 0.5) * step,
//						node.bounds.min.z + (z + 0.5) * step
//					);
//
//					const distance = this.sdfSystem.evaluate(pos, this.sdfTree);
//					if (distance < this.options.sdfThreshold) {
//						node.voxels!.push(pos);
//					}
//				}
//			}
//		}
//	}
//
//	private collectVoxelsFromOctree(node: OctreeNode): Vector3[] {
//		let voxels: Vector3[] = [];
//
//		if (node.voxels) {
//			voxels = voxels.concat(node.voxels);
//		}
//
//		if (node.children) {
//			for (const child of node.children) {
//				voxels = voxels.concat(this.collectVoxelsFromOctree(child));
//			}
//		}
//
//		return voxels;
//	}
//
//	private async generateVoxels() {
//		if (!this.sdfTree) return;
//
//		this.sdfSystem.resetEvaluationCount();
//		const startTime = performance.now();
//
//		if (this.voxelMesh) {
//			this.voxelMesh.dispose();
//			this.voxelMesh = null;
//		}
//
//		let allVoxelPositions: Vector3[] = [];
//
//		if (this.options.useOctree) {
//			const bounds = this.calculateBounds();
//			console.log("Building octree...");
//			this.octree = this.buildOctree(bounds);
//			allVoxelPositions = this.collectVoxelsFromOctree(this.octree);
//		} else {
//			allVoxelPositions = await this.generateVoxelsBatched();
//		}
//
//		if (allVoxelPositions.length > this.options.maxVoxelCount) {
//			console.warn(`Voxel count ${allVoxelPositions.length} exceeds limit ${this.options.maxVoxelCount}, sampling...`);
//			allVoxelPositions = this.sampleVoxels(allVoxelPositions, this.options.maxVoxelCount);
//		}
//
//		if (allVoxelPositions.length > 0) {
//			this.voxelMesh = await this.createVoxelMesh(allVoxelPositions);
//		}
//
//		const endTime = performance.now();
//		console.log(`Generated ${allVoxelPositions.length} voxels in ${(endTime - startTime).toFixed(2)}ms`);
//		console.log(`SDF evaluations: ${this.sdfSystem.getEvaluationCount()}`);
//	}
//
//	private async generateVoxelsBatched(): Promise<Vector3[]> {
//		const allVoxels: Vector3[] = [];
//		const bounds = this.calculateBounds();
//		const halfRes = Math.floor(this.options.voxelResolution / 2);
//
//		const totalVoxels = this.options.voxelResolution ** 3;
//		const batches = Math.ceil(totalVoxels / this.options.batchSize);
//
//		for (let batch = 0; batch < batches; batch++) {
//			const startIdx = batch * this.options.batchSize;
//			const endIdx = Math.min(startIdx + this.options.batchSize, totalVoxels);
//
//			for (let i = startIdx; i < endIdx; i++) {
//				const x = i % this.options.voxelResolution;
//				const y = Math.floor((i / this.options.voxelResolution) % this.options.voxelResolution);
//				const z = Math.floor(i / (this.options.voxelResolution ** 2));
//
//				const worldPos = new Vector3(
//					(x - halfRes) * this.options.voxelSize,
//					y * this.options.voxelSize,
//					(z - halfRes) * this.options.voxelSize
//				);
//
//				if (!this.isWithinBounds(worldPos, bounds)) {
//					continue;
//				}
//
//				if (!this.sdfTree) continue;
//				const distance = this.sdfSystem.evaluate(worldPos, this.sdfTree);
//
//				if (distance < this.options.sdfThreshold) {
//					allVoxels.push(worldPos);
//				}
//			}
//
//			if (batch % 10 === 0) {
//				await new Promise(resolve => setTimeout(resolve, 1));
//			}
//		}
//
//		return allVoxels;
//	}
//
//	private async createVoxelMesh(positions: Vector3[]): Promise<Mesh> {
//		const baseCube = MeshBuilder.CreateBox('voxel_base', {
//			size: this.options.voxelSize
//		}, this.scene);
//		baseCube.material = this.material;
//
//		const totalMatrices = positions.length;
//		const matrixBuffer = new Float32Array(totalMatrices * 16);
//
//		const batchSize = 10000;
//		for (let i = 0; i < totalMatrices; i += batchSize) {
//			const endIdx = Math.min(i + batchSize, totalMatrices);
//
//			for (let j = i; j < endIdx; j++) {
//				const pos = positions[j];
//				const matrix = Matrix.Translation(pos.x, pos.y, pos.z);
//				matrix.copyToArray(matrixBuffer, j * 16);
//			}
//
//			if (i % (batchSize * 5) === 0) {
//				await new Promise(resolve => setTimeout(resolve, 1));
//			}
//		}
//
//		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer);
//		baseCube.thinInstanceCount = totalMatrices;
//
//		return baseCube;
//	}
//
//	private sampleVoxels(voxels: Vector3[], maxCount: number): Vector3[] {
//		if (voxels.length <= maxCount) return voxels;
//
//		const sampled: Vector3[] = [];
//		const step = voxels.length / maxCount;
//
//		for (let i = 0; i < maxCount; i++) {
//			const index = Math.floor(i * step);
//			sampled.push(voxels[index]);
//		}
//
//		return sampled;
//	}
//
//	private calculateBounds() {
//		const maxDim = Math.max(this.options.width, this.options.height, this.options.depth);
//		return {
//			min: new Vector3(-maxDim * 0.6, -this.options.voxelSize, -maxDim * 0.6),
//			max: new Vector3(maxDim * 0.6, this.options.height + this.options.voxelSize, maxDim * 0.6)
//		};
//	}
//
//	private isWithinBounds(pos: Vector3, bounds: any): boolean {
//		return pos.x >= bounds.min.x && pos.x <= bounds.max.x &&
//			pos.y >= bounds.min.y && pos.y <= bounds.max.y &&
//			pos.z >= bounds.min.z && pos.z <= bounds.max.z;
//	}
//
//	public enableShaderAnimation(enabled: boolean) {
//		if (this.options.enableShaderAnimation === enabled) return;
//
//		this.options.enableShaderAnimation = enabled;
//
//		this.material.dispose();
//		this.createMaterial();
//
//		if (this.voxelMesh) {
//			this.voxelMesh.material = this.material;
//		}
//
//		console.log(`Shader animation ${enabled ? 'enabled' : 'disabled'}`);
//	}
//
//	public setAnimationSpeed(speed: number) {
//		this.options.animationSpeed = speed;
//		if (this.material instanceof ShaderMaterial) {
//			this.material.setFloat("animationSpeed", speed);
//		}
//	}
//
//	public setAnimationIntensity(intensity: number) {
//		this.options.animationIntensity = intensity;
//		if (this.material instanceof ShaderMaterial) {
//			this.material.setFloat("animationIntensity", intensity);
//		}
//	}
//
//	// Update method with better debugging
//	public update(time: number, camera: Camera) {
//		if (this.options.enableShaderAnimation && this.material instanceof ShaderMaterial) {
//			const timeInSeconds = time * 0.001;
//			this.material.setFloat("time", timeInSeconds);
//
//			if (Math.floor(timeInSeconds) % 10 === 0 && Math.floor(timeInSeconds * 10) % 10 === 0) {
//				console.log(`Animation time: ${timeInSeconds.toFixed(1)}s, Speed: ${this.options.animationSpeed}, Intensity: ${this.options.animationIntensity}`);
//				console.log(`Shader material active:`, this.material);
//				console.log(`Voxel mesh instances:`, this.voxelMesh?.thinInstanceCount);
//
//				this.material.markDirty();
//			}
//		}
//	}
//
//	public getMesh(): Mesh | null {
//		return this.voxelMesh;
//	}
//
//	public getStats() {
//		return {
//			voxelCount: this.voxelMesh?.thinInstanceCount || 0,
//			sdfEvaluations: this.sdfSystem.getEvaluationCount(),
//			shaderAnimation: this.options.enableShaderAnimation,
//			animationSpeed: this.options.animationSpeed,
//			animationIntensity: this.options.animationIntensity,
//			useOctree: this.options.useOctree,
//			options: { ...this.options }
//		};
//	}
//
//	public dispose() {
//		if (this.voxelMesh) {
//			this.voxelMesh.dispose();
//			this.voxelMesh = null;
//		}
//		this.material?.dispose();
//	}
//
//	public setMaxVoxelCount(count: number) {
//		this.options.maxVoxelCount = count;
//	}
//
//	public setVoxelSize(size: number) {
//		this.options.voxelSize = size;
//		this.options.voxelResolution = Math.floor(
//			Math.max(this.options.width, this.options.height, this.options.depth) / size
//		);
//	}
//
//	public enableOctree(enabled: boolean) {
//		this.options.useOctree = enabled;
//	}
//}

import { Camera, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Color3, Matrix, Material, ShaderMaterial, Effect, VertexBuffer } from "@babylonImport";
import { SDFSystem, SDFNode, SDFBuilder } from "./Sdf";

type MonolithOptions = {
	height: number;
	width: number;
	depth: number;
	voxelSize: number;
	voxelResolution: number;
	sdfThreshold: number;
	maxVoxelCount: number;
	useOctree: boolean;
	batchSize: number;
	// Animation options
	enableShaderAnimation: boolean;
	animationSpeed: number;
	animationIntensity: number;
};

interface OctreeNode {
	bounds: {
		min: Vector3;
		max: Vector3;
	};
	center: Vector3;
	size: number;
	isEmpty: boolean;
	children?: OctreeNode[];
	voxels?: Vector3[];
}

export class Monolith {
	public scene: Scene;
	private voxelMesh: Mesh | null = null;
	private material!: StandardMaterial | ShaderMaterial;
	private options: MonolithOptions;
	private sdfSystem: SDFSystem;
	private sdfTree: SDFNode | null = null;
	private octree: OctreeNode | null = null;
	private voxelPositions: Vector3[] = [];

	constructor(scene: Scene, size: number, options?: Partial<MonolithOptions>) {
		this.scene = scene;
		this.sdfSystem = new SDFSystem();

		this.options = {
			height: size,
			width: size * 0.8,
			depth: size * 0.4,
			voxelSize: 0.06,
			voxelResolution: Math.max(300, Math.floor(size * 8)),
			sdfThreshold: 0.02,
			maxVoxelCount: 50000, // Reduced for testing
			useOctree: true,
			batchSize: 25000,
			enableShaderAnimation: false,
			animationSpeed: 1.0,
			animationIntensity: 0.1,
			...options
		};

		this.createMaterial();
		this.buildDefaultSDF();
	}

	public async init() {
		await this.generateVoxels();
	}

	private createMaterial() {
		if (this.options.enableShaderAnimation) {
			this.material = this.createWorkingShaderMaterial();
		} else {
			this.material = this.createStandardMaterial();
		}
	}

	private createStandardMaterial(): StandardMaterial {
		const material = new StandardMaterial('monolith_standard', this.scene);
		material.diffuseColor = new Color3(0.8, 0.8, 0.8);
		material.emissiveColor = new Color3(0.1, 0.1, 0.1);
		return material;
	}

	private createWorkingShaderMaterial(): ShaderMaterial {
		// Create shader with proper Babylon.js compatibility
		this.defineWorkingShaders();

		const shaderMaterial = new ShaderMaterial("workingAnimatedVoxel", this.scene, {
			vertex: "workingAnimatedVoxel",
			fragment: "workingAnimatedVoxel",
		}, {
			attributes: ["position", "normal", "world0", "world1", "world2", "world3", "instanceID"],
			uniforms: ["viewProjection", "time", "animationSpeed", "animationIntensity"],
			samplers: [],
			needAlphaBlending: false,
			needAlphaTesting: false
		});

		// Set uniforms
		shaderMaterial.setFloat("time", 0);
		shaderMaterial.setFloat("animationSpeed", this.options.animationSpeed);
		shaderMaterial.setFloat("animationIntensity", this.options.animationIntensity);

		console.log("Working shader material created");
		return shaderMaterial;
	}

	private defineWorkingShaders() {
		// Working vertex shader that properly handles Babylon.js thin instances
		Effect.ShadersStore["workingAnimatedVoxelVertexShader"] = `
			precision highp float;
			
			// Standard attributes
			attribute vec3 position;
			attribute vec3 normal;
			
			// Instance matrix attributes (Babylon.js thin instances)
			attribute vec4 world0;
			attribute vec4 world1;
			attribute vec4 world2;
			attribute vec4 world3;
			
			// Custom instance ID attribute (we'll add this)
			attribute float instanceID;
			
			// Uniforms
			uniform mat4 viewProjection;
			uniform float time;
			uniform float animationSpeed;
			uniform float animationIntensity;
			
			// Varyings
			varying vec3 vNormal;
			varying vec3 vPosition;
			varying vec3 vColor;
			
			// Noise function
			float noise(float x) {
				return fract(sin(x * 12.9898) * 43758.5453);
			}
			
			void main() {
				// Build world matrix from thin instance data
				mat4 finalWorld = mat4(world0, world1, world2, world3);
				
				// Get original world position
				vec3 originalWorldPos = finalWorld[3].xyz;
				
				// Create unique seed for this instance
				float seed = instanceID;
				float randomSeed1 = noise(seed);
				float randomSeed2 = noise(seed + 100.0);
				float randomSeed3 = noise(seed + 200.0);
				
				// Calculate animation
				float animationPhase = time * animationSpeed + randomSeed1 * 6.28318;
				
				// Calculate movements
				float primaryMovement = sin(animationPhase) * animationIntensity;
				float xMovement = sin(animationPhase + randomSeed2 * 3.14159) * animationIntensity * 0.3;
				float yMovement = cos(animationPhase + randomSeed3 * 3.14159) * animationIntensity * 0.2;
				
				// Apply animation to the world matrix translation
				finalWorld[3].x += xMovement;
				finalWorld[3].y += yMovement;
				finalWorld[3].z += primaryMovement;
				
				// Transform vertex position
				vec4 worldPosition = finalWorld * vec4(position, 1.0);
				gl_Position = viewProjection * worldPosition;
				
				// Calculate normal
				vNormal = normalize((finalWorld * vec4(normal, 0.0)).xyz);
				vPosition = worldPosition.xyz;
				
				// Debug color based on animation
				float colorVariation = sin(animationPhase) * 0.1 + 0.9;
				vColor = vec3(0.8, 0.8, 0.8) * colorVariation;
			}
		`;

		// Fragment shader
		Effect.ShadersStore["workingAnimatedVoxelFragmentShader"] = `
			precision highp float;
			
			varying vec3 vNormal;
			varying vec3 vPosition;
			varying vec3 vColor;
			
			void main() {
				// Simple lighting
				vec3 lightDir = normalize(vec3(0.5, 1.0, 0.3));
				float NdotL = max(dot(normalize(vNormal), lightDir), 0.0);
				float lighting = 0.4 + NdotL * 0.6;
				
				// Apply lighting to animated color
				vec3 finalColor = vColor * lighting;
				
				gl_FragColor = vec4(finalColor, 1.0);
			}
		`;

		console.log("Working shaders defined");
	}

	private async createVoxelMesh(positions: Vector3[]): Promise<Mesh> {
		const baseCube = MeshBuilder.CreateBox('voxel_base', {
			size: this.options.voxelSize
		}, this.scene);

		// Store positions for later use
		this.voxelPositions = positions;

		// Create matrices and instance IDs
		const totalMatrices = positions.length;
		const matrixBuffer = new Float32Array(totalMatrices * 16);
		const instanceIDBuffer = new Float32Array(totalMatrices);

		console.log(`Creating ${totalMatrices} voxel instances...`);

		const batchSize = 10000;
		for (let i = 0; i < totalMatrices; i += batchSize) {
			const endIdx = Math.min(i + batchSize, totalMatrices);

			for (let j = i; j < endIdx; j++) {
				const pos = positions[j];
				const matrix = Matrix.Translation(pos.x, pos.y, pos.z);
				matrix.copyToArray(matrixBuffer, j * 16);

				// Set instance ID for shader
				instanceIDBuffer[j] = j;
			}

			if (i % (batchSize * 5) === 0) {
				await new Promise(resolve => setTimeout(resolve, 1));
			}
		}

		// Set up thin instances
		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer, 16);
		baseCube.thinInstanceCount = totalMatrices;

		// Add custom instance ID buffer for shader
		if (this.options.enableShaderAnimation) {
			baseCube.setVerticesBuffer(new VertexBuffer(
				this.scene.getEngine(),
				instanceIDBuffer,
				"instanceID",
				false,
				false,
				1,
				true // instanced
			));
			console.log("Instance ID buffer added for animation");
		}

		// Apply material
		baseCube.material = this.material;

		return baseCube;
	}

	// Animation control methods
	public enableShaderAnimation(enabled: boolean) {
		const wasEnabled = this.options.enableShaderAnimation;
		this.options.enableShaderAnimation = enabled;

		if (wasEnabled !== enabled) {
			// Recreate material and mesh
			this.material.dispose();
			this.createMaterial();

			if (this.voxelMesh && this.voxelPositions.length > 0) {
				this.voxelMesh.dispose();
				this.createVoxelMesh(this.voxelPositions).then(mesh => {
					this.voxelMesh = mesh;
				});
			}
		}

		console.log(`Shader animation ${enabled ? 'enabled' : 'disabled'}`);
	}

	public setAnimationSpeed(speed: number) {
		this.options.animationSpeed = speed;
		if (this.material instanceof ShaderMaterial) {
			this.material.setFloat("animationSpeed", speed);
		}
		console.log(`Animation speed: ${speed}`);
	}

	public setAnimationIntensity(intensity: number) {
		this.options.animationIntensity = intensity;
		if (this.material instanceof ShaderMaterial) {
			this.material.setFloat("animationIntensity", intensity);
		}
		console.log(`Animation intensity: ${intensity}`);
	}

	// Simple animation style presets
	public setAnimationStyle(style: 'gentle' | 'active' | 'chaotic' | 'none') {
		switch (style) {
			case 'gentle':
				this.setAnimationSpeed(0.5);
				this.setAnimationIntensity(0.05);
				this.enableShaderAnimation(true);
				break;
			case 'active':
				this.setAnimationSpeed(2.0);
				this.setAnimationIntensity(0.15);
				this.enableShaderAnimation(true);
				break;
			case 'chaotic':
				this.setAnimationSpeed(4.0);
				this.setAnimationIntensity(0.3);
				this.enableShaderAnimation(true);
				break;
			case 'none':
				this.enableShaderAnimation(false);
				break;
		}
		console.log(`Animation style: ${style}`);
	}

	public update(time: number, camera: Camera) {
		if (this.options.enableShaderAnimation && this.material instanceof ShaderMaterial) {
			const timeInSeconds = time * 0.001;
			this.material.setFloat("time", timeInSeconds);

			// Debug less frequently
			if (Math.floor(timeInSeconds) % 15 === 0 && Math.floor(timeInSeconds * 4) % 4 === 0) {
				console.log(`🎬 Animation active - Time: ${timeInSeconds.toFixed(1)}s, Speed: ${this.options.animationSpeed}, Intensity: ${this.options.animationIntensity}`);
			}
		}
	}

	// All your existing SDF and octree methods stay the same...
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
		this.generateVoxels();
	}

	private buildOctree(bounds: any, maxDepth: number = 7, currentDepth: number = 0): OctreeNode {
		const center = new Vector3(
			(bounds.min.x + bounds.max.x) * 0.5,
			(bounds.min.y + bounds.max.y) * 0.5,
			(bounds.min.z + bounds.max.z) * 0.5
		);

		const size = Math.max(
			bounds.max.x - bounds.min.x,
			bounds.max.y - bounds.min.y,
			bounds.max.z - bounds.min.z
		);

		const node: OctreeNode = {
			bounds,
			center,
			size,
			isEmpty: false,
			voxels: []
		};

		const cornerDistances = this.sampleOctreeCorners(bounds);
		const allOutside = cornerDistances.every(d => d > this.options.sdfThreshold);

		if (allOutside) {
			node.isEmpty = true;
			return node;
		}

		if (currentDepth >= maxDepth || size <= this.options.voxelSize * 4) {
			this.generateVoxelsForOctreeNode(node);
			return node;
		}

		node.children = [];
		for (let x = 0; x < 2; x++) {
			for (let y = 0; y < 2; y++) {
				for (let z = 0; z < 2; z++) {
					const childMin = new Vector3(
						x === 0 ? bounds.min.x : center.x,
						y === 0 ? bounds.min.y : center.y,
						z === 0 ? bounds.min.z : center.z
					);

					const childMax = new Vector3(
						x === 0 ? center.x : bounds.max.x,
						y === 0 ? center.y : bounds.max.y,
						z === 0 ? center.z : bounds.max.z
					);

					const childBounds = { min: childMin, max: childMax };
					const childNode = this.buildOctree(childBounds, maxDepth, currentDepth + 1);

					if (!childNode.isEmpty) {
						node.children.push(childNode);
					}
				}
			}
		}

		return node;
	}

	private sampleOctreeCorners(bounds: any): number[] {
		if (!this.sdfTree) return [1000];

		const corners = [
			new Vector3(bounds.min.x, bounds.min.y, bounds.min.z),
			new Vector3(bounds.max.x, bounds.min.y, bounds.min.z),
			new Vector3(bounds.min.x, bounds.max.y, bounds.min.z),
			new Vector3(bounds.max.x, bounds.max.y, bounds.min.z),
			new Vector3(bounds.min.x, bounds.min.y, bounds.max.z),
			new Vector3(bounds.max.x, bounds.min.y, bounds.max.z),
			new Vector3(bounds.min.x, bounds.max.y, bounds.max.z),
			new Vector3(bounds.max.x, bounds.max.y, bounds.max.z)
		];

		return corners.map(corner => this.sdfSystem.evaluate(corner, this.sdfTree!));
	}

	private generateVoxelsForOctreeNode(node: OctreeNode) {
		if (!this.sdfTree) return;

		const voxelsPerAxis = Math.max(1, Math.floor(node.size / this.options.voxelSize));
		const step = node.size / voxelsPerAxis;

		for (let x = 0; x < voxelsPerAxis; x++) {
			for (let y = 0; y < voxelsPerAxis; y++) {
				for (let z = 0; z < voxelsPerAxis; z++) {
					const pos = new Vector3(
						node.bounds.min.x + (x + 0.5) * step,
						node.bounds.min.y + (y + 0.5) * step,
						node.bounds.min.z + (z + 0.5) * step
					);

					const distance = this.sdfSystem.evaluate(pos, this.sdfTree);
					if (distance < this.options.sdfThreshold) {
						node.voxels!.push(pos);
					}
				}
			}
		}
	}

	private collectVoxelsFromOctree(node: OctreeNode): Vector3[] {
		let voxels: Vector3[] = [];

		if (node.voxels) {
			voxels = voxels.concat(node.voxels);
		}

		if (node.children) {
			for (const child of node.children) {
				voxels = voxels.concat(this.collectVoxelsFromOctree(child));
			}
		}

		return voxels;
	}

	private async generateVoxels() {
		if (!this.sdfTree) return;

		this.sdfSystem.resetEvaluationCount();
		const startTime = performance.now();

		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		let allVoxelPositions: Vector3[] = [];

		if (this.options.useOctree) {
			const bounds = this.calculateBounds();
			console.log("Building octree...");
			this.octree = this.buildOctree(bounds);
			allVoxelPositions = this.collectVoxelsFromOctree(this.octree);
		} else {
			allVoxelPositions = await this.generateVoxelsBatched();
		}

		if (allVoxelPositions.length > this.options.maxVoxelCount) {
			console.warn(`Voxel count ${allVoxelPositions.length} exceeds limit ${this.options.maxVoxelCount}, sampling...`);
			allVoxelPositions = this.sampleVoxels(allVoxelPositions, this.options.maxVoxelCount);
		}

		if (allVoxelPositions.length > 0) {
			this.voxelMesh = await this.createVoxelMesh(allVoxelPositions);
		}

		const endTime = performance.now();
		console.log(`✅ Generated ${allVoxelPositions.length} voxels in ${(endTime - startTime).toFixed(2)}ms`);
		console.log(`SDF evaluations: ${this.sdfSystem.getEvaluationCount()}`);
	}

	private async generateVoxelsBatched(): Promise<Vector3[]> {
		const allVoxels: Vector3[] = [];
		const bounds = this.calculateBounds();
		const halfRes = Math.floor(this.options.voxelResolution / 2);

		const totalVoxels = this.options.voxelResolution ** 3;
		const batches = Math.ceil(totalVoxels / this.options.batchSize);

		for (let batch = 0; batch < batches; batch++) {
			const startIdx = batch * this.options.batchSize;
			const endIdx = Math.min(startIdx + this.options.batchSize, totalVoxels);

			for (let i = startIdx; i < endIdx; i++) {
				const x = i % this.options.voxelResolution;
				const y = Math.floor((i / this.options.voxelResolution) % this.options.voxelResolution);
				const z = Math.floor(i / (this.options.voxelResolution ** 2));

				const worldPos = new Vector3(
					(x - halfRes) * this.options.voxelSize,
					y * this.options.voxelSize,
					(z - halfRes) * this.options.voxelSize
				);

				if (!this.isWithinBounds(worldPos, bounds)) {
					continue;
				}

				if (!this.sdfTree) continue;
				const distance = this.sdfSystem.evaluate(worldPos, this.sdfTree);

				if (distance < this.options.sdfThreshold) {
					allVoxels.push(worldPos);
				}
			}

			if (batch % 10 === 0) {
				await new Promise(resolve => setTimeout(resolve, 1));
			}
		}

		return allVoxels;
	}

	private sampleVoxels(voxels: Vector3[], maxCount: number): Vector3[] {
		if (voxels.length <= maxCount) return voxels;

		const sampled: Vector3[] = [];
		const step = voxels.length / maxCount;

		for (let i = 0; i < maxCount; i++) {
			const index = Math.floor(i * step);
			sampled.push(voxels[index]);
		}

		return sampled;
	}

	private calculateBounds() {
		const maxDim = Math.max(this.options.width, this.options.height, this.options.depth);
		return {
			min: new Vector3(-maxDim * 0.6, -this.options.voxelSize, -maxDim * 0.6),
			max: new Vector3(maxDim * 0.6, this.options.height + this.options.voxelSize, maxDim * 0.6)
		};
	}

	private isWithinBounds(pos: Vector3, bounds: any): boolean {
		return pos.x >= bounds.min.x && pos.x <= bounds.max.x &&
			pos.y >= bounds.min.y && pos.y <= bounds.max.y &&
			pos.z >= bounds.min.z && pos.z <= bounds.max.z;
	}

	public getMesh(): Mesh | null {
		return this.voxelMesh;
	}

	public getStats() {
		return {
			voxelCount: this.voxelMesh?.thinInstanceCount || 0,
			sdfEvaluations: this.sdfSystem.getEvaluationCount(),
			shaderAnimation: this.options.enableShaderAnimation,
			animationSpeed: this.options.animationSpeed,
			animationIntensity: this.options.animationIntensity,
			options: { ...this.options }
		};
	}

	public dispose() {
		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}
		this.material?.dispose();
	}

	public setMaxVoxelCount(count: number) {
		this.options.maxVoxelCount = count;
	}

	public setVoxelSize(size: number) {
		this.options.voxelSize = size;
		this.options.voxelResolution = Math.floor(
			Math.max(this.options.width, this.options.height, this.options.depth) / size
		);
	}

	public enableOctree(enabled: boolean) {
		this.options.useOctree = enabled;
	}
}
