import { Ray, Scene, Texture, Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { MonolithMaterial } from "./Shader/MonolithMaterial";
import { PointerEventTypes } from "@babylonjs/core";

export class SimpleTextRenderer {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private texture: Texture | null = null;
	private monolith: Monolith;
	private scene: Scene;
	private isHovering: boolean = false;
	private textBounds: { min: Vector3, max: Vector3 } | null = null;

	constructor(monolith: Monolith, scene: Scene) {
		this.monolith = monolith;
		this.scene = scene;
		this.canvas = document.createElement('canvas');
		this.canvas.width = 256;
		this.canvas.height = 128;
		this.ctx = this.canvas.getContext('2d')!;
		this.setupHoverDetection();
	}
	showText(text: string, x: number, y: number, z: number, size: number = 1.5) {
		console.log(`🎨 Drawing text: "${text}"`);

		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, 256, 128);

		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = 'bold 32px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(text, 128, 64);

		if (this.texture) {
			this.texture.dispose();
		}

		this.texture = Texture.CreateFromBase64String(
			this.canvas.toDataURL(),
			'simple_text',
			this.monolith.scene
		);

		this.textBounds = {
			min: new Vector3(x - size / 2, y - size / 2, z - 1),
			max: new Vector3(x + size / 2, y + size / 2, z + 1)
		};

		const material = this.monolith.material as MonolithMaterial;

		if (material) {
			this.scene.registerBeforeRender(() => {
				material.setTexture('textTexture', this.texture);
				material.setVec3('textPosition', new Vector3(x, y, z));
				material.setFloat('textSize', 5.0);
				material.setFloat('showText', 1.0);
			});
		}
	}


	private setupHoverDetection() {
		window.addEventListener("mousemove", (info) => {
			//this.monolith.scene.onPointerObservable.add((info) => {
			//if (info.type === PointerEventTypes.POINTERMOVE) {
			this.checkHover(info);
			//}
		});
	}

	private checkHover(info: any) {
		if (!this.textBounds) return;

		// Create picking ray
		const ray = this.monolith.scene.createPickingRay(
			info.clientX,
			info.clientY,
			null,
			this.monolith.scene.activeCamera,
			false
		);
		//console.log("hoverrrrr")
		// Check if ray intersects text bounds (simplified)
		const wasHovering = this.isHovering;
		this.isHovering = this.rayIntersectsBox(ray, this.textBounds);

		// Update glow if hover state changed
		if (wasHovering !== this.isHovering) {
			this.updateGlow();
		}
	}

	private rayIntersectsBox(ray: Ray, bounds: { min: Vector3, max: Vector3 }): boolean {
		// Simple ray-box intersection
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

	private updateGlow() {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setFloat('textGlow', this.isHovering ? 4. : 0.0);

			if (this.isHovering) {
				console.log('✨ Text hover detected');
			}
		}
	}

	public setGlow(intensity: number) {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setFloat('textGlow', intensity);
		}
	}

	hideText() {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setInt('showText', 0);
		}
	}
}
