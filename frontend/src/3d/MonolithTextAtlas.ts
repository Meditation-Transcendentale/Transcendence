interface TextBlock {
	id: string;
	region: { x: number, y: number, width: number, height: number };
	uvBounds: { uMin: number, vMin: number, uMax: number, vMax: number };
	position: Vector3;
	size: number;
	glowIntensity: number;
	text: string;
}

class MonolithTextAtlas {
	private monolith: Monolith;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private texture: Texture | null = null;
	private textBlocks: Map<string, TextBlock> = new Map();
	private atlasSize = 1024;
	private regionSize = 256; // Each text block is 256x256
	private maxBlocks = 16; // 4x4 grid = 16 blocks max

	constructor(monolith: Monolith) {
		this.monolith = monolith;
		this.setupCanvas();
		this.setupTextRegions();
	}

	private setupCanvas() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.atlasSize;
		this.canvas.height = this.atlasSize;
		this.ctx = this.canvas.getContext('2d')!;

		// Clear to black
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.atlasSize, this.atlasSize);

		// Optional: Add grid lines for debugging
		if (false) { // Set to true to see grid
			this.ctx.strokeStyle = '#333333';
			this.ctx.lineWidth = 1;
			for (let i = 0; i <= 4; i++) {
				const pos = i * this.regionSize;
				this.ctx.beginPath();
				this.ctx.moveTo(pos, 0);
				this.ctx.lineTo(pos, this.atlasSize);
				this.ctx.moveTo(0, pos);
				this.ctx.lineTo(this.atlasSize, pos);
				this.ctx.stroke();
			}
		}
	}

	private setupTextRegions() {
		// Create a 4x4 grid of text regions
		let blockIndex = 0;
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				const x = col * this.regionSize;
				const y = row * this.regionSize;

				const region = {
					x, y,
					width: this.regionSize,
					height: this.regionSize
				};

				const uvBounds = {
					uMin: x / this.atlasSize,
					vMin: y / this.atlasSize,
					uMax: (x + this.regionSize) / this.atlasSize,
					vMax: (y + this.regionSize) / this.atlasSize
				};

				const blockId = `block_${blockIndex}`;
				this.textBlocks.set(blockId, {
					id: blockId,
					region,
					uvBounds,
					position: Vector3.Zero(),
					size: 2.0,
					glowIntensity: 0.0,
					text: ''
				});

				blockIndex++;
				if (blockIndex >= this.maxBlocks) break;
			}
			if (blockIndex >= this.maxBlocks) break;
		}

		console.log(`📋 Created ${this.textBlocks.size} text regions in atlas`);
	}

	public setText(blockId: string, text: string, position: Vector3, size: number = 2.0) {
		const block = this.textBlocks.get(blockId);
		if (!block) {
			console.warn(`❌ Text block '${blockId}' not found`);
			return;
		}

		// Update block data
		block.text = text;
		block.position = position;
		block.size = size;

		// Draw text in the region
		this.drawTextInRegion(block);

		// Update the texture
		this.updateTexture();

		// Update shader uniforms
		this.updateShaderUniforms();

		console.log(`✏️ Updated text block '${blockId}': "${text}"`);
	}

	private drawTextInRegion(block: TextBlock) {
		const region = block.region;

		// Clear region
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(region.x, region.y, region.width, region.height);

		if (!block.text) return; // Don't draw empty text

		// Setup text style
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = 'bold 36px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';

		// Draw text centered in region
		const centerX = region.x + region.width / 2;
		const centerY = region.y + region.height / 2;

		// Handle multi-line text if needed
		const lines = block.text.split('\n');
		const lineHeight = 40;
		const startY = centerY - ((lines.length - 1) * lineHeight) / 2;

		lines.forEach((line, index) => {
			this.ctx.fillText(line, centerX, startY + (index * lineHeight));
		});

		// Optional: Add border for debugging
		if (false) { // Set to true to see region borders
			this.ctx.strokeStyle = '#ff0000';
			this.ctx.lineWidth = 2;
			this.ctx.strokeRect(region.x, region.y, region.width, region.height);
		}
	}

	public setGlow(blockId: string, intensity: number) {
		const block = this.textBlocks.get(blockId);
		if (block) {
			block.glowIntensity = intensity;
			this.updateShaderUniforms();
		}
	}

	public clearText(blockId: string) {
		const block = this.textBlocks.get(blockId);
		if (block) {
			block.text = '';
			this.drawTextInRegion(block); // This will clear the region
			this.updateTexture();
			this.updateShaderUniforms();
		}
	}

	private updateTexture() {
		if (this.texture) {
			this.texture.dispose();
		}

		this.texture = Texture.CreateFromBase64String(
			this.canvas.toDataURL(),
			'monolith_text_atlas',
			this.monolith.scene
		);

		// Set texture in material
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (material) {
			material.setTexture('textAtlas', this.texture);
			material.setFloat('hasTextAtlas', 1);
		}
	}

	private updateShaderUniforms() {
		const material = this.monolith.getMesh()?.material as MonolithMaterial;
		if (!material) return;

		// Get only blocks that have text
		const activeBlocks = Array.from(this.textBlocks.values()).filter(block => block.text);

		// Update count
		material.setFloat('textCount', activeBlocks.length);

		// Update arrays (BabylonJS limitation: need to update all at once)
		const regions: number[] = [];
		const positions: Vector3[] = [];
		const sizes: number[] = [];
		const glows: number[] = [];

		activeBlocks.forEach((block, index) => {
			// UV regions as vec4 [uMin, vMin, uMax, vMax]
			regions.push(block.uvBounds.uMin, block.uvBounds.vMin, block.uvBounds.uMax, block.uvBounds.vMax);
			positions.push(block.position);
			sizes.push(block.size);
			glows.push(block.glowIntensity);
		});

		// Update shader uniforms
		material.setFloatArray3('textRegions', regions);
		positions.forEach((pos, i) => {
			material.setVec3(`textPositions[${i}]`, pos);
		});
		sizes.forEach((size, i) => {
			material.setFloat(`textSizes[${i}]`, size);
		});
		glows.forEach((glow, i) => {
			material.setFloat(`textGlows[${i}]`, glow);
		});
	}

	// Utility method to get available block IDs
	public getAvailableBlocks(): string[] {
		return Array.from(this.textBlocks.keys());
	}

	// Debug method to visualize the atlas
	public debugAtlas() {
		const debugDiv = document.createElement('div');
		debugDiv.style.cssText = `
            position: fixed; top: 10px; right: 10px; 
            background: white; border: 2px solid black; 
            padding: 10px; z-index: 9999;
        `;

		const img = document.createElement('img');
		img.src = this.canvas.toDataURL();
		img.style.width = '256px';
		img.style.height = '256px';
		img.style.border = '1px solid black';

		debugDiv.appendChild(img);
		document.body.appendChild(debugDiv);

		setTimeout(() => debugDiv.remove(), 5000); // Remove after 5s
	}
}
