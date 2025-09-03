import { Vector3, Quaternion, Vector2 } from "@babylonImport";

// SDF Operation types
export type SDFOperationType =
	| 'union'
	| 'subtract'
	| 'intersect'
	| 'smoothUnion'
	| 'smoothSubtract'
	| 'smoothIntersect';

// Base SDF shape types
export type SDFShapeType =
	| 'box'
	| 'sphere'
	| 'cylinder'
	| 'pyramid'
	| 'cone'
	| 'torus'
	| 'capsule'
	| 'plane';

// Transform parameters for positioning/rotating/scaling SDFs
export interface SDFTransform {
	position?: Vector3;
	rotation?: Vector3; // Euler angles in radians
	scale?: Vector3;
}

// Base SDF shape configuration
export interface SDFShape {
	type: SDFShapeType;
	params: any; // Shape-specific parameters
	transform?: SDFTransform;
	id?: string;
}

// SDF operation node - can contain shapes or other operations
export interface SDFNode {
	type: 'shape' | 'operation';
	shape?: SDFShape;
	operation?: {
		type: SDFOperationType;
		smoothness?: number; // For smooth operations
		children: SDFNode[];
	};
	id?: string;
}

// Main SDF system class
export class SDFSystem {
	private evaluationCount: number = 0;

	constructor() { }

	// Main evaluation function - evaluates the entire SDF tree
	public evaluate(pos: Vector3, rootNode: SDFNode): number {
		this.evaluationCount++;
		return this.evaluateNode(pos, rootNode);
	}

	private evaluateNode(pos: Vector3, node: SDFNode): number {
		if (node.type === 'shape' && node.shape) {
			return this.evaluateShape(pos, node.shape);
		} else if (node.type === 'operation' && node.operation) {
			return this.evaluateOperation(pos, node.operation);
		}
		return 1000; // Large positive value (outside)
	}

	private evaluateOperation(pos: Vector3, op: SDFNode['operation']): number {
		if (!op || op.children.length === 0) return 1000;

		// Evaluate all children
		const childDistances = op.children.map(child => this.evaluateNode(pos, child));

		switch (op.type) {
			case 'union':
				return this.sdfUnion(childDistances);

			case 'subtract':
				if (childDistances.length < 2) return childDistances[0] || 1000;
				return this.sdfSubtract(childDistances[0], childDistances[1]);

			case 'intersect':
				return this.sdfIntersect(childDistances);

			case 'smoothUnion':
				return this.sdfSmoothUnion(childDistances, op.smoothness || 0.1);

			case 'smoothSubtract':
				if (childDistances.length < 2) return childDistances[0] || 1000;
				return this.sdfSmoothSubtract(childDistances[0], childDistances[1], op.smoothness || 0.1);

			case 'smoothIntersect':
				return this.sdfSmoothIntersect(childDistances, op.smoothness || 0.1);

			default:
				return this.sdfUnion(childDistances);
		}
	}

	private evaluateShape(pos: Vector3, shape: SDFShape): number {
		// Apply transform if present
		let transformedPos = pos.clone();
		if (shape.transform) {
			transformedPos = this.applyTransform(pos, shape.transform);
		}

		switch (shape.type) {
			case 'box':
				return this.boxSDF(transformedPos, shape.params.size);

			case 'sphere':
				return this.sphereSDF(transformedPos, shape.params.radius);

			case 'cylinder':
				return this.cylinderSDF(transformedPos, shape.params.radius, shape.params.height);

			case 'pyramid':
				return this.pyramidSDF(transformedPos, shape.params.height);

			case 'cone':
				return this.coneSDF(transformedPos, shape.params.radius, shape.params.height);

			case 'torus':
				return this.torusSDF(transformedPos, shape.params.majorRadius, shape.params.minorRadius);

			case 'capsule':
				return this.capsuleSDF(transformedPos, shape.params.height, shape.params.radius);

			case 'plane':
				return this.planeSDF(transformedPos, shape.params.normal, shape.params.distance);

			default:
				return 1000;
		}
	}

	// Transform utilities
	private applyTransform(pos: Vector3, transform: SDFTransform): Vector3 {
		let result = pos.clone();

		// Apply inverse translation
		if (transform.position) {
			result = result.subtract(transform.position);
		}

		// Apply inverse rotation
		if (transform.rotation) {
			result = this.rotatePoint(result, transform.rotation, true);
		}

		// Apply inverse scale
		if (transform.scale) {
			result = new Vector3(
				result.x / transform.scale.x,
				result.y / transform.scale.y,
				result.z / transform.scale.z
			);
		}

		return result;
	}

	private rotatePoint(point: Vector3, rotation: Vector3, inverse: boolean = false): Vector3 {
		const factor = inverse ? -1 : 1;

		// Apply rotations in order: Y, X, Z (or reverse if inverse)
		const rotX = Quaternion.RotationAxis(Vector3.Right(), rotation.x * factor);
		const rotY = Quaternion.RotationAxis(Vector3.Up(), rotation.y * factor);
		const rotZ = Quaternion.RotationAxis(Vector3.Forward(), rotation.z * factor);

		const finalRot = inverse ?
			rotZ.multiply(rotX).multiply(rotY) :
			rotY.multiply(rotX).multiply(rotZ);

		return this.rotateVector3WithQuaternion(point, finalRot);
	}

	private rotateVector3WithQuaternion(vec: Vector3, quat: Quaternion): Vector3 {
		const vecQuat = new Quaternion(vec.x, vec.y, vec.z, 0);
		const result = quat.multiply(vecQuat).multiply(quat.conjugate());
		return new Vector3(result.x, result.y, result.z);
	}

	// SDF Operations
	private sdfUnion(distances: number[]): number {
		return Math.min(...distances);
	}

	private sdfSubtract(d1: number, d2: number): number {
		return Math.max(d1, -d2);
	}

	private sdfIntersect(distances: number[]): number {
		return Math.max(...distances);
	}

	private sdfSmoothUnion(distances: number[], k: number): number {
		if (distances.length === 0) return 1000;
		if (distances.length === 1) return distances[0];

		let result = distances[0];
		for (let i = 1; i < distances.length; i++) {
			result = this.smoothMin(result, distances[i], k);
		}
		return result;
	}

	private sdfSmoothSubtract(d1: number, d2: number, k: number): number {
		return this.smoothMax(d1, -d2, k);
	}

	private sdfSmoothIntersect(distances: number[], k: number): number {
		if (distances.length === 0) return 1000;
		if (distances.length === 1) return distances[0];

		let result = distances[0];
		for (let i = 1; i < distances.length; i++) {
			result = this.smoothMax(result, distances[i], k);
		}
		return result;
	}

	// Smooth operation helpers
	private smoothMin(a: number, b: number, k: number): number {
		const h = Math.max(k - Math.abs(a - b), 0.0) / k;
		return Math.min(a, b) - h * h * h * k * (1.0 / 6.0);
	}

	private smoothMax(a: number, b: number, k: number): number {
		return -this.smoothMin(-a, -b, k);
	}

	// Basic SDF shapes
	private boxSDF(pos: Vector3, size: Vector3): number {
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

	private sphereSDF(pos: Vector3, radius: number): number {
		return pos.length() - radius;
	}

	private cylinderSDF(pos: Vector3, radius: number, height: number): number {
		const d = new Vector2(
			Math.sqrt(pos.x * pos.x + pos.z * pos.z) - radius,
			Math.abs(pos.y) - height * 0.5
		);

		return Math.min(Math.max(d.x, d.y), 0.0) +
			Math.sqrt(Math.max(d.x, 0) * Math.max(d.x, 0) + Math.max(d.y, 0) * Math.max(d.y, 0));
	}

	private pyramidSDF(pos: Vector3, h: number): number {
		let p = { x: Math.abs(pos.x), y: pos.y, z: Math.abs(pos.z) };

		if (p.z > p.x) {
			const temp = p.x;
			p.x = p.z;
			p.z = temp;
		}

		p.x -= 0.5;
		p.z -= 0.5;

		const m2 = h * h + 0.25;
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

	private coneSDF(pos: Vector3, radius: number, height: number): number {
		const q = new Vector2(Math.sqrt(pos.x * pos.x + pos.z * pos.z), pos.y);
		const c = new Vector2(radius, height);

		const a = new Vector2(q.x - Math.min(q.x, (q.y < 0.0) ? c.x : c.x * (c.y - q.y) / c.y), Math.abs(q.y) - c.y);
		const l = Math.sqrt(a.x * a.x + a.y * a.y);
		const s = Math.max(-a.y, 0.0);

		return Math.max(l * (a.x < 0.0 ? -1.0 : 1.0), s);
	}

	private torusSDF(pos: Vector3, majorRadius: number, minorRadius: number): number {
		const q = new Vector2(Math.sqrt(pos.x * pos.x + pos.z * pos.z) - majorRadius, pos.y);
		return q.length() - minorRadius;
	}

	private capsuleSDF(pos: Vector3, height: number, radius: number): number {
		const h = Math.max(0, Math.abs(pos.y) - height * 0.5);
		const r = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
		return Math.sqrt(h * h + r * r) - radius;
	}

	private planeSDF(pos: Vector3, normal: Vector3, distance: number): number {
		return Vector3.Dot(pos, normal.normalize()) - distance;
	}

	// Utility functions
	public getEvaluationCount(): number {
		return this.evaluationCount;
	}

	public resetEvaluationCount(): void {
		this.evaluationCount = 0;
	}
}

// Helper functions for building SDF trees
export class SDFBuilder {
	static shape(type: SDFShapeType, params: any, transform?: SDFTransform, id?: string): SDFNode {
		return {
			type: 'shape',
			shape: {
				type,
				params,
				transform,
				id
			},
			id
		};
	}

	static operation(type: SDFOperationType, children: SDFNode[], smoothness?: number, id?: string): SDFNode {
		return {
			type: 'operation',
			operation: {
				type,
				children,
				smoothness
			},
			id
		};
	}

	// Convenience methods
	static union(...children: SDFNode[]): SDFNode {
		return SDFBuilder.operation('union', children);
	}

	static subtract(base: SDFNode, ...toSubtract: SDFNode[]): SDFNode {
		return SDFBuilder.operation('subtract', [base, ...toSubtract]);
	}

	static intersect(...children: SDFNode[]): SDFNode {
		return SDFBuilder.operation('intersect', children);
	}

	static smoothUnion(smoothness: number, ...children: SDFNode[]): SDFNode {
		return SDFBuilder.operation('smoothUnion', children, smoothness);
	}

	static smoothSubtract(base: SDFNode, toSubtract: SDFNode, smoothness: number): SDFNode {
		return SDFBuilder.operation('smoothSubtract', [base, toSubtract], smoothness);
	}

	static smoothIntersect(smoothness: number, ...children: SDFNode[]): SDFNode {
		return SDFBuilder.operation('smoothIntersect', children, smoothness);
	}

	// Shape builders with common defaults
	static box(size: Vector3, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('box', { size }, transform);
	}

	static sphere(radius: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('sphere', { radius }, transform);
	}

	static cylinder(radius: number, height: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('cylinder', { radius, height }, transform);
	}

	static pyramid(height: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('pyramid', { height }, transform);
	}

	static cone(radius: number, height: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('cone', { radius, height }, transform);
	}

	static torus(majorRadius: number, minorRadius: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('torus', { majorRadius, minorRadius }, transform);
	}

	static capsule(height: number, radius: number, transform?: SDFTransform): SDFNode {
		return SDFBuilder.shape('capsule', { height, radius }, transform);
	}
}
