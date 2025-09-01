import { Scene, Texture, Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { MonolithMaterial } from "./Shader/MonolithMaterial";

export class SimpleTextRenderer {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private texture: Texture | null = null;
	private monolith: Monolith;
	private scene: Scene;

	constructor(monolith: Monolith, scene: Scene) {
		this.monolith = monolith;
		this.scene = scene;
		this.canvas = document.createElement('canvas');
		this.canvas.width = 256;
		this.canvas.height = 128;
		this.ctx = this.canvas.getContext('2d')!;
	}
	showText(text: string, x: number, y: number, z: number) {
		console.log(`🎨 Drawing text: "${text}"`);

		// Clear canvas to black
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, 256, 128);

		// Draw white text
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = 'bold 32px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(text, 128, 64);

		// DEBUG: Show what we drew
		const debugImg = document.createElement('img');
		debugImg.src = this.canvas.toDataURL();
		debugImg.style.cssText = 'position:fixed; top:10px; left:10px; z-index:9999; border:2px solid red;';
		document.body.appendChild(debugImg);
		setTimeout(() => debugImg.remove(), 3000);

		// Create texture
		if (this.texture) {
			this.texture.dispose();
		}

		this.texture = Texture.CreateFromBase64String(
			this.canvas.toDataURL(),
			'simple_text',
			this.monolith.scene
		);

		console.log('🖼️ Created texture:', this.texture);

		// Update material
		const material = this.monolith.material as MonolithMaterial;
		console.log('🎭 Material found:', !!material);

		if (material) {
			this.scene.registerBeforeRender(() => {
				material.setTexture('textTexture', this.texture);
				material.setVec3('textPosition', new Vector3(x, y, z));
				material.setFloat('textSize', 5.0);
				material.setFloat('showText', 1.0);
			});
		}
	}


	//showText(text: string, x: number, y: number, z: number) {
	//	// Clear canvas to black
	//	this.ctx.fillStyle = '#000000';
	//	this.ctx.fillRect(0, 0, 256, 128);
	//
	//	// Draw white text
	//	this.ctx.fillStyle = '#ffffff';
	//	this.ctx.font = 'bold 32px Arial';
	//	this.ctx.textAlign = 'center';
	//	this.ctx.textBaseline = 'middle';
	//	this.ctx.fillText(text, 128, 64);
	//
	//	// Create/update texture
	//	if (this.texture) {
	//		this.texture.dispose();
	//	}
	//
	//	this.texture = Texture.CreateFromBase64String(
	//		this.canvas.toDataURL(),
	//		'simple_text',
	//		this.monolith.scene
	//	);
	//
	//	// Update materialprivate simpleText: SimpleTextRenderer | null = null;
	//	const material = this.monolith.getMesh()?.material as MonolithMaterial;
	//	if (material) {
	//		material.setTexture('textTexture', this.texture);
	//		material.setVec3('textPosition', new Vector3(x, y, z));
	//		material.setFloat('textSize', 2.0);
	//		material.setInt('showText', 1);
	//	}
	//
	//	console.log(`📝 Showing text: "${text}" at (${x}, ${y}, ${z})`);
	//}

	hideText() {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setInt('showText', 0);
		}
	}
}
