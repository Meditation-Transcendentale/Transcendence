import { Ray, Scene, Texture, Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { MonolithMaterial } from "./Shader/MonolithMaterial";
import { Matrix, PointerEventTypes } from "@babylonjs/core";

interface TextZone {
	id: string;
	text: string;
	position: Vector3;
	size: number;
	bounds: { min: Vector3, max: Vector3 };
	isHovering: boolean;
	glow: number;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	texture: Texture | null;
	face: Vector3;
}

export class TextRenderer {
	private monolith: Monolith;
	private scene: Scene;
	private textZones: TextZone[] = [];
	private currentActiveZone: string | null = null;

	constructor(monolith: Monolith, scene: Scene) {
		this.monolith = monolith;
		this.scene = scene;
		this.setupHoverDetection();
	}

	addTextZone(id: string, text: string, x: number, y: number, z: number, size: number = 1.5) {
		console.log(`🎨 Adding text zone "${id}": "${text}"`);

		// Create canvas for this zone
		const canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 128;
		const ctx = canvas.getContext('2d')!;

		// Draw text on canvas
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 256, 128);
		ctx.fillStyle = '#ffffff';
		ctx.font = 'bold 32px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, 128, 64);

		// Create texture
		const texture = Texture.CreateFromBase64String(
			canvas.toDataURL(),
			`text_${id}`,
			this.monolith.scene
		);

		// Calculate bounds
		const bounds = {
			min: new Vector3(x - size / 2, y - size / 2, z - 1),
			max: new Vector3(x + size / 2, y + size / 2, z + 1)
		};

		// Create text zone
		const zone: TextZone = {
			id,
			text,
			position: new Vector3(x, y, z),
			size,
			bounds,
			isHovering: false,
			glow: 0,
			canvas,
			ctx,
			texture,
			face: new Vector3(0, 0, 1)
		};

		this.textZones.push(zone);

		if (!this.currentActiveZone) {
			this.setActiveZone(id);
		}
	}

	removeTextZone(id: string) {
		const zoneIndex = this.textZones.findIndex(zone => zone.id === id);
		if (zoneIndex !== -1) {
			const zone = this.textZones[zoneIndex];
			if (zone.texture) {
				zone.texture.dispose();
			}
			this.textZones.splice(zoneIndex, 1);

			if (this.currentActiveZone === id) {
				this.currentActiveZone = this.textZones.length > 0 ? this.textZones[0].id : null;
				this.updateShaderUniforms();
			}

			console.log(`🗑️ Removed text zone "${id}"`);
		}
	}

	updateTextZone(id: string, newText: string) {
		const zone = this.textZones.find(zone => zone.id === id);
		if (!zone) return;

		zone.text = newText;

		zone.ctx.fillStyle = '#000000';
		zone.ctx.fillRect(0, 0, 256, 128);
		zone.ctx.fillStyle = '#ffffff';
		zone.ctx.font = 'bold 32px Arial';
		zone.ctx.textAlign = 'center';
		zone.ctx.textBaseline = 'middle';
		zone.ctx.fillText(newText, 128, 64);

		if (zone.texture) {
			zone.texture.dispose();
		}
		zone.texture = Texture.CreateFromBase64String(
			zone.canvas.toDataURL(),
			`text_${id}`,
			this.monolith.scene
		);

		if (this.currentActiveZone === id) {
			this.updateShaderUniforms();
		}
	}

	setActiveZone(id: string) {
		const zoneExists = this.textZones.some(zone => zone.id === id);
		if (zoneExists) {
			this.currentActiveZone = id;
			this.updateShaderUniforms();
			console.log(`🎯 Active text zone: "${id}"`);
		}
	}

	private updateShaderUniforms() {
		const material = this.monolith.material as MonolithMaterial;
		if (!material) return;

		//this.scene.registerBeforeRender(() => {
		material.setFloat('textCount', this.textZones.length);

		this.textZones.forEach((zone, index) => {
			material.setTexture(`textTexture${index}`, zone.texture);
			material.setVec3(`textPosition${index}`, zone.position);
			material.setFloat(`textSize${index}`, 5.0);
			material.setFloat(`textGlow${index}`, zone.glow);
			material.setVec3(`textFace${index}`, zone.face);
		});
		//});
	}

	private setupHoverDetection() {
		window.addEventListener("mousemove", (event) => {
			this.checkAllZonesHover(event);
		});
	}

	public update() {
		for (const zone of this.textZones) {
			if (zone.isHovering) {
				zone.glow += 0.01;
				if (zone.glow > 2.0)
					zone.glow = 2.0;

			}
			else {
				zone.glow -= 0.02;
				if (zone.glow < 0)
					zone.glow = 0;

			}
		}
		this.updateShaderUniforms();

	}

	private checkAllZonesHover(event: MouseEvent) {
		let anyHoverChanged = false;
		let newActiveZone = null;

		for (const zone of this.textZones) {
			const wasHovering = zone.isHovering;
			zone.isHovering = this.checkZoneHover(zone, event);

			if (zone.isHovering) {
				newActiveZone = zone.id;
				zone.glow += 0.01;
				if (zone.glow > 2.0)
					zone.glow = 2.0;

			}
			else {
				zone.glow -= 0.01;
				if (zone.glow < 0)
					zone.glow = 0;

			}

			if (wasHovering !== zone.isHovering) {
				anyHoverChanged = true;

				if (zone.isHovering) {
					console.log(`✨ Text hover detected on zone "${zone.id}"`);
				}
			}
		}

		if (newActiveZone && newActiveZone !== this.currentActiveZone) {
			this.setActiveZone(newActiveZone);
		} else if (!newActiveZone && anyHoverChanged) {
			this.updateShaderUniforms();
		}
	}

	private checkZoneHover(zone: TextZone, event: MouseEvent): boolean {
		const ray = this.monolith.scene.createPickingRay(
			event.clientX,
			event.clientY,
			null,
			this.monolith.scene.activeCamera,
			false
		);

		return this.rayIntersectsBox(ray, zone.bounds);
	}

	private rayIntersectsBox(ray: Ray, bounds: { min: Vector3, max: Vector3 }): boolean {
		const dirfrac = new Vector3(
			1.0 / ray.direction.x,
			1.0 / ray.direction.y,
			1.0 / ray.direction.z
		);

		const t1 = (bounds.min.x - ray.origin.x) * dirfrac.x;
		const t2 = (bounds.max.x - ray.origin.x) * dirfrac.x;
		const t3 = (bounds.min.y - ray.origin.y) * dirfrac.y;
		const t4 = (bounds.max.y - ray.origin.y) * dirfrac.y;
		const t5 = (bounds.min.z - ray.origin.z) * dirfrac.z;
		const t6 = (bounds.max.z - ray.origin.z) * dirfrac.z;

		const tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
		const tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

		return tmax >= 0 && tmin <= tmax;
	}

	public setGlow(id: string, intensity: number) {
		const zone = this.textZones.find(zone => zone.id === id);
		if (zone) {
			const material = this.monolith.getMesh()?.material as MonolithMaterial;
			if (material && this.currentActiveZone === id) {
				//material.setFloat('textGlow', intensity);
			}
		}
	}

	public hideAllText() {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setFloat('showText', 0.0);
		}
		this.currentActiveZone = null;
	}

	public showZone(id: string) {
		this.setActiveZone(id);
	}
	public setTextFace(id: string, face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom') {
		const zoneIndex = this.getZoneIndex(id);
		console.log(`Setting face for zone ${id} (index ${zoneIndex}) to ${face}`);
		if (zoneIndex === -1) return;
		const zone = this.textZones[zoneIndex];
		if (!zone) return;
		console.log('Before:', this.textZones.map(z => `${z.id}: ${z.face?.toString()}`));
		let faceVector: Vector3;

		switch (face) {
			case 'front':
				faceVector = new Vector3(0, 0, 1);
				break;
			case 'back':
				faceVector = new Vector3(0, 0, -1);
				break;
			case 'right':
				faceVector = new Vector3(1, 0, 0);
				break;
			case 'left':
				faceVector = new Vector3(-1, 0, 0);
				break;
			case 'top':
				faceVector = new Vector3(0, 1, 0);
				break;
			case 'bottom':
				faceVector = new Vector3(0, -1, 0);
				break;
			default:
				faceVector = new Vector3(0, 0, 1);
		}
		zone.face = faceVector.clone();
		console.log('After:', this.textZones.map(z => `${z.id}: ${z.face?.toString()}`));
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setVec3(`textFace${zoneIndex}`, zone.face);
		}
	}

	private getZoneIndex(id: string): number {
		return this.textZones.findIndex(zone => zone.id === id);
	}

	public getZones(): string[] {
		return this.textZones.map(zone => zone.id);
	}
}
