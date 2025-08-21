import { Camera, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Color3, Matrix, Material } from "@babylonImport";

type _thinInstancesOptions = {
	density: number; //number of blade for 1x1 square
	stiffness: number; //how much wind is effectiv 0.0: not 1.0: full
	rotation: number; //blade rotation percent of M_PI * 0.5
	size: number; //min size a blade can get
	scale: Vector3; //scaling of the blade x y z
};

type MonolithOptions = {
	height: number; // Monolith height
	width: number; // Monolith width
	depth: number; // Monolith depth
	voxelSize: number; // Size of individual voxels
	voxelResolution: number; // Grid resolution
	portalSize: number; // Portal opening size
	portalShape: 'arch' | 'circle' | 'square' | 'pyramid'; // Portal shape type
	sdfThreshold: number; // SDF surface threshold
	materialType: 'stone' | 'crystal' | 'metal'; // Material appearance
};

export class Monolith {
	public scene: Scene;
	private voxelMesh: Mesh | null = null;
	private baseMaterial: StandardMaterial;
	private portalMaterial: StandardMaterial;
	private options: MonolithOptions;
	private sdfEvaluations: number = 0;

	constructor(scene: Scene, size: number, cursor: Vector3, options?: Partial<MonolithOptions>) {
		this.scene = scene;

		// Default options
		this.options = {
			height: size,
			width: size * 0.8,  // Pyramid base width
			depth: size * 0.8,  // Pyramid base depth (square base)
			voxelSize: 0.08,
			voxelResolution: Math.max(40, Math.floor(size * 5)), // Higher resolution for pyramid detail
			portalSize: Math.max(2, Math.floor(size * 0.25)),
			portalShape: 'arch',
			sdfThreshold: 0.0,
			materialType: 'stone',
			...options
		};

		this.createMaterials();
	}

	public async init() {
		await this.loadAssests(this.scene);
		this.generateMonolithVoxels();
	}

	public update(time: number, camera: Camera) {
		// Optional: Add subtle animation effects
		if (this.voxelMesh && this.options.materialType === 'crystal') {
			// Pulse effect for crystal monoliths
			const pulse = 0.5 + 0.5 * Math.sin(time * 0.002);
			(this.baseMaterial.emissiveColor as Color3).scaleInPlace(pulse);
		}
	}

	public getMesh(): Mesh | null {
		return this.voxelMesh;
	}

	private createMaterials() {
		// Base monolith material
		this.baseMaterial = new StandardMaterial(`monolith_${this.options.materialType}`, this.scene);

		switch (this.options.materialType) {
			case 'stone':
				this.baseMaterial.diffuseColor = new Color3(0.4, 0.4, 0.45);
				this.baseMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
				break;
			case 'crystal':
				this.baseMaterial.diffuseColor = new Color3(0.3, 0.5, 0.8);
				this.baseMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
				this.baseMaterial.emissiveColor = new Color3(0.1, 0.15, 0.3);
				break;
			case 'metal':
				this.baseMaterial.diffuseColor = new Color3(0.6, 0.6, 0.65);
				this.baseMaterial.specularColor = new Color3(0.8, 0.8, 0.8);
				break;
		}

		// Portal material
		this.portalMaterial = new StandardMaterial('monolith_portal', this.scene);
		this.portalMaterial.diffuseColor = new Color3(0.2, 0.3, 0.6);
		this.portalMaterial.emissiveColor = new Color3(0.1, 0.2, 0.4);
	}

	private generateMonolithVoxels() {
		this.sdfEvaluations = 0;

		// Clear existing mesh
		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		const voxelPositions: Vector3[] = [];
		const portalPositions: Vector3[] = [];
		const halfRes = Math.floor(this.options.voxelResolution / 2);

		// Pre-calculate bounds to skip empty regions
		const bounds = this.calculatePyramidBounds();

		// Generate voxels based on SDF with optimizations
		for (let x = 0; x < this.options.voxelResolution; x++) {
			for (let y = 0; y < this.options.voxelResolution; y++) {
				for (let z = 0; z < this.options.voxelResolution; z++) {
					// Convert grid to world coordinates
					const worldPos = new Vector3(
						(x - halfRes) * this.options.voxelSize,
						y * this.options.voxelSize,
						(z - halfRes) * this.options.voxelSize
					);

					// OPTIMIZATION 1: Skip if outside pyramid bounds
					if (!this.isWithinPyramidBounds(worldPos, bounds)) {
						continue;
					}

					// Test if point is inside monolith
					const monolithDistance = this.monolithSDF(worldPos);

					// OPTIMIZATION 2: Early rejection - if too far outside, skip
					if (monolithDistance > this.options.voxelSize * 2) {
						continue;
					}

					const portalDistance = this.portalSDF(worldPos);

					// Combine monolith and portal (subtract portal from monolith)
					const finalDistance = Math.max(monolithDistance, -portalDistance);

					if (finalDistance < this.options.sdfThreshold) {
						// OPTIMIZATION 3: Check if voxel would be interior (hidden)
						if (this.isInteriorVoxel(worldPos, x, y, z)) {
							continue; // Skip interior voxels
						}

						// Check if it's part of portal frame
						const isPortalFrame = this.isPortalFrame(worldPos);

						if (isPortalFrame) {
							portalPositions.push(worldPos);
						} else {
							voxelPositions.push(worldPos);
						}
					}
				}
			}
		}

		// Create main monolith voxels
		if (voxelPositions.length > 0) {
			this.voxelMesh = this.createThinInstanceMesh(
				'monolith_main',
				voxelPositions,
				this.baseMaterial
			);
		}

		// Create portal frame voxels
		if (portalPositions.length > 0) {
			const portalMesh = this.createThinInstanceMesh(
				'monolith_portal',
				portalPositions,
				this.portalMaterial
			);

			// If we have a main mesh, merge or parent them
			if (this.voxelMesh && portalMesh) {
				portalMesh.setParent(this.voxelMesh);
			} else if (!this.voxelMesh) {
				this.voxelMesh = portalMesh;
			}
		}
	}

	// OPTIMIZATION 1: Calculate pyramid bounds for early rejection
	private calculatePyramidBounds() {
		const maxHeight = this.options.height;
		const maxWidth = Math.max(this.options.width, this.options.depth);

		return {
			minX: -maxWidth * 0.6,
			maxX: maxWidth * 0.6,
			minY: -this.options.voxelSize,
			maxY: maxHeight + this.options.voxelSize,
			minZ: -maxWidth * 0.6,
			maxZ: maxWidth * 0.6
		};
	}

	private isWithinPyramidBounds(pos: Vector3, bounds: any): boolean {
		return pos.x >= bounds.minX && pos.x <= bounds.maxX &&
			pos.y >= bounds.minY && pos.y <= bounds.maxY &&
			pos.z >= bounds.minZ && pos.z <= bounds.maxZ;
	}

	// OPTIMIZATION 3: Check if voxel is completely interior (hidden by neighbors)
	private isInteriorVoxel(worldPos: Vector3, x: number, y: number, z: number): boolean {
		// Only check interior for non-surface voxels (skip if near edges)
		if (x <= 1 || x >= this.options.voxelResolution - 2 ||
			y <= 1 || y >= this.options.voxelResolution - 2 ||
			z <= 1 || z >= this.options.voxelResolution - 2) {
			return false; // Keep edge voxels
		}

		// Check if all 6 neighboring positions are also solid
		const neighbors = [
			new Vector3(worldPos.x + this.options.voxelSize, worldPos.y, worldPos.z), // +X
			new Vector3(worldPos.x - this.options.voxelSize, worldPos.y, worldPos.z), // -X
			new Vector3(worldPos.x, worldPos.y + this.options.voxelSize, worldPos.z), // +Y
			new Vector3(worldPos.x, worldPos.y - this.options.voxelSize, worldPos.z), // -Y
			new Vector3(worldPos.x, worldPos.y, worldPos.z + this.options.voxelSize), // +Z
			new Vector3(worldPos.x, worldPos.y, worldPos.z - this.options.voxelSize)  // -Z
		];

		// If all neighbors are solid, this voxel is interior and can be skipped
		for (const neighbor of neighbors) {
			const monolithDist = this.monolithSDF(neighbor);
			const portalDist = this.portalSDF(neighbor);
			const finalDist = Math.max(monolithDist, -portalDist);

			if (finalDist >= this.options.sdfThreshold) {
				return false; // At least one neighbor is empty, keep this voxel
			}
		}

		return true; // All neighbors are solid, this is interior
	}

	private createThinInstanceMesh(name: string, positions: Vector3[], material: Material): Mesh {
		const baseCube = MeshBuilder.CreateBox(name, {
			size: this.options.voxelSize
		}, this.scene);
		baseCube.material = material;

		const matrices: Matrix[] = [];
		for (const pos of positions) {
			const matrix = Matrix.Translation(pos.x, pos.y, pos.z);
			matrices.push(matrix);
		}

		const matrixBuffer = new Float32Array(matrices.length * 16);
		for (let i = 0; i < matrices.length; i++) {
			matrices[i].copyToArray(matrixBuffer, i * 16);
		}

		baseCube.thinInstanceSetBuffer('matrix', matrixBuffer);
		baseCube.thinInstanceCount = matrices.length;

		return baseCube;
	}

	private monolithSDF(pos: Vector3): number {
		this.sdfEvaluations++;

		const scaledPos = new Vector3(
			pos.x / (this.options.width * 0.5),
			pos.y / this.options.height,
			pos.z / (this.options.depth * 0.5)
		);

		return this.pyramidSDF(scaledPos, 1.0) * Math.min(this.options.width, this.options.depth) * 0.5;
	}

	private portalSDF(pos: Vector3): number {
		if (pos.y > this.options.portalSize * 1.5) {
			return 1000; // Far outside
		}

		const baseScale = this.getPyramidBaseScale(pos.y);

		switch (this.options.portalShape) {
			case 'arch':
				return this.archSDF(pos) / baseScale;
			case 'circle':
				return this.circleSDF(pos) / baseScale;
			case 'square':
				return this.squareSDF(pos) / baseScale;
			case 'pyramid':
				// Smaller pyramid cutout
				return this.pyramidSDF(pos, this.options.portalSize * 0.5);
			default:
				return this.archSDF(pos) / baseScale;
		}
	}

	private getPyramidBaseScale(y: number): number {
		if (y <= 0) return 1.0; // Full scale at base
		const heightRatio = y / this.options.height;
		return Math.max(0.1, 1.0 - heightRatio * 0.8); // Pyramid tapers to 20% at top
	}

	private archSDF(pos: Vector3): number {
		const radius = this.options.portalSize * 0.5;
		const archCenter = new Vector3(0, radius, 0);
		const distToCenter = Vector3.Distance(
			new Vector3(pos.x, pos.y, 0),
			archCenter
		);

		if (pos.y <= radius) {
			return Math.max(Math.abs(pos.x) - radius, Math.abs(pos.z) - 1);
		} else {
			const circleDistance = distToCenter - radius;
			return Math.max(circleDistance, Math.abs(pos.z) - 1);
		}
	}

	private circleSDF(pos: Vector3): number {
		const radius = this.options.portalSize * 0.5;
		const center = new Vector3(0, radius, 0);
		const distToCenter = Vector3.Distance(
			new Vector3(pos.x, pos.y, 0),
			center
		);

		return Math.max(distToCenter - radius, Math.abs(pos.z) - 1);
	}

	private squareSDF(pos: Vector3): number {
		const halfSize = this.options.portalSize * 0.5;
		return Math.max(
			Math.max(Math.abs(pos.x) - halfSize, Math.abs(pos.y) - halfSize),
			Math.abs(pos.z) - 1
		);
	}

	private pyramidSDF(pos: Vector3, h: number): number {
		let p = { x: pos.x, y: pos.y, z: pos.z };

		const m2 = h * h + 0.25;

		p.x = Math.abs(p.x);
		p.z = Math.abs(p.z);

		if (p.z > p.x) {
			const temp = p.x;
			p.x = p.z;
			p.z = temp;
		}

		p.x -= 0.5;
		p.z -= 0.5;

		const q = {
			x: p.z,
			y: h * p.y - 0.5 * p.x,
			z: h * p.x + 0.5 * p.y
		};

		const s = Math.max(-q.x, 0.0);
		const t = Math.max(0.0, Math.min(1.0, (q.y - 0.5 * p.z) / (m2 + 0.25)));

		const a = m2 * (q.x + s) * (q.x + s) + q.y * q.y;
		const b = m2 * (q.x + 0.5 * t) * (q.x + 0.5 * t) + (q.y - m2 * t) * (q.y - m2 * t);

		const d2 = (Math.min(q.y, -q.x * m2 - q.y * 0.5) > 0.0) ? 0.0 : Math.min(a, b);

		return Math.sqrt((d2 + q.z * q.z) / m2) * Math.sign(Math.max(q.z, -p.y));
	}

	private isPortalFrame(pos: Vector3): boolean {
		const portalDist = this.portalSDF(pos);

		if (pos.y > this.options.portalSize * 1.5) {
			return false;
		}

		const baseScale = this.getPyramidBaseScale(pos.y);
		const frameThickness = 0.8 * baseScale;
		const frameDist = this.portalSDF(pos) + frameThickness;

		return portalDist > 0 && frameDist < 0 && pos.y <= this.options.portalSize * 2;
	}

	private async loadAssests(scene: Scene) {
	}

	public dispose() {
		if (this.voxelMesh) {
			this.voxelMesh.dispose();
			this.voxelMesh = null;
		}

		this.baseMaterial?.dispose();
		this.portalMaterial?.dispose();
	}

	public updatePortalShape(shape: 'arch' | 'circle' | 'square' | 'pyramid') {
		this.options.portalShape = shape;
		this.generateMonolithVoxels();
	}

	public updateSize(height: number, width?: number, depth?: number) {
		this.options.height = height;
		if (width) this.options.width = width;
		if (depth) this.options.depth = depth;
		this.generateMonolithVoxels();
	}

	public getStats() {
		return {
			voxelCount: this.voxelMesh?.thinInstanceCount || 0,
			sdfEvaluations: this.sdfEvaluations,
			options: { ...this.options }
		};
	}
}
