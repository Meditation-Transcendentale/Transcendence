import { Effect, MeshBuilder, Scene, ShaderMaterial, Vector3, Vector2, Mesh } from "@babylonImport";

export interface SpaceSkyboxOptions {
	iterations?: number;
	formuparam?: number;

	volsteps?: number;
	stepsize?: number;

	zoom?: number;
	tile?: number;
	brightness?: number;
	darkmatter?: number;
	distfading?: number;
	saturation?: number;

	colorTint?: Vector3;
	nebulaColor?: Vector3;
	colorMix?: number;
	contrast?: number;
	gamma?: number;

	speed?: number;
	autoRotate?: boolean;
	rotationSpeed?: number;

	sphereSegments?: number;
	skyboxSize?: number;
	resolution?: Vector2;
}

export class SpaceSkybox {
	private scene: Scene;
	private skybox!: Mesh;
	private spaceMaterial!: ShaderMaterial;
	private _enabled: boolean = true;
	private rotationTime: number = 0;
	private animationHandle: any;

	public settings: Required<SpaceSkyboxOptions>;

	constructor(scene: Scene, options: SpaceSkyboxOptions = {}) {
		this.scene = scene;

		this.settings = {
			iterations: 25,
			formuparam: 0.53,
			volsteps: 20,
			stepsize: 0.1,
			zoom: 0.200,
			tile: 0.850,
			speed: 0.010,
			brightness: 0.0015,
			darkmatter: 0.6,
			distfading: 0.6,
			saturation: 0.850,
			colorTint: new Vector3(1.0, 1.0, 1.0),
			nebulaColor: new Vector3(0.2, 0.4, 0.8),
			colorMix: 0.3,
			contrast: 1.0,
			gamma: 1.0,
			autoRotate: true,
			rotationSpeed: 0.05,
			sphereSegments: 128,
			skyboxSize: 10000,
			resolution: new Vector2(2048, 2048),
			...options
		};

		this.validateSettings();
		this.initializeShaders();
		this.createGeometry();
		this.createMaterial();
		this.setupAnimation();
	}

	private validateSettings(): void {
		this.settings.iterations = Math.max(8, Math.min(25, this.settings.iterations));
		this.settings.volsteps = Math.max(10, Math.min(30, this.settings.volsteps));
		this.settings.formuparam = Math.max(0.1, Math.min(1.0, this.settings.formuparam));
		this.settings.stepsize = Math.max(0.05, Math.min(0.2, this.settings.stepsize));
		this.settings.zoom = Math.max(0.3, Math.min(2.0, this.settings.zoom));
		this.settings.tile = Math.max(0.5, Math.min(2.0, this.settings.tile));
		this.settings.brightness = Math.max(0.0005, Math.min(0.01, this.settings.brightness));
		this.settings.darkmatter = Math.max(0.0, Math.min(0.8, this.settings.darkmatter));
		this.settings.distfading = Math.max(0.3, Math.min(0.9, this.settings.distfading));
		this.settings.saturation = Math.max(0.0, Math.min(1.5, this.settings.saturation));
		this.settings.speed = Math.max(0.000001, Math.min(0.01, this.settings.speed));
		this.settings.rotationSpeed = Math.max(0.000001, Math.min(0.5, this.settings.rotationSpeed));
		this.settings.colorMix = Math.max(0.0, Math.min(1.0, this.settings.colorMix));
		this.settings.contrast = Math.max(0.1, Math.min(3.0, this.settings.contrast));
		this.settings.gamma = Math.max(0.2, Math.min(3.0, this.settings.gamma));
	}

	private initializeShaders(): void {
		Effect.ShadersStore["spaceVertexShader"] = `
            precision highp float;
            attribute vec3 position;
            attribute vec2 uv;
            uniform mat4 worldViewProjection;
            uniform mat4 world;
            varying vec3 vPosition;
            varying vec3 vWorldPosition;
            varying vec2 vUV;
            
            void main(void) {
                gl_Position = worldViewProjection * vec4(position, 1.0);
                vPosition = position;
                vWorldPosition = (world * vec4(position, 1.0)).xyz;
                vUV = uv;
            }
        `;

		Effect.ShadersStore["customSpaceFragmentShader"] = this.createFragmentShader();
	}

	private createFragmentShader(): string {
		return `
            #ifdef GL_FRAGMENT_PRECISION_HIGH
                precision highp float;
            #else
                precision mediump float;
            #endif

            #define iterations ${this.settings.iterations}
            #define formuparam ${this.settings.formuparam.toFixed(3)}
            #define volsteps ${this.settings.volsteps}
            #define stepsize ${this.settings.stepsize.toFixed(3)}
            #define zoom ${this.settings.zoom.toFixed(3)}
            #define tile ${this.settings.tile.toFixed(3)}
            #define speed ${this.settings.speed.toFixed(6)}
            #define brightness ${this.settings.brightness.toFixed(6)}
            #define darkmatter ${this.settings.darkmatter.toFixed(3)}
            #define distfading ${this.settings.distfading.toFixed(3)}
            #define saturation ${this.settings.saturation.toFixed(3)}

            varying vec3 vPosition;
            varying vec2 vUV;
            uniform float iTime;
            uniform vec2 iResolution;
            uniform vec2 iMouse;
            uniform vec3 colorTint;
            uniform vec3 nebulaColor;
            uniform float colorMix;
            uniform float contrast;
            uniform float gamma;
            
            void main(void) {
                vec3 viewDir = normalize(vPosition);
                float quantize = 700.0;
                viewDir = normalize(round(viewDir * quantize) / quantize);
                
                float phi = atan(viewDir.z, viewDir.x);
                float theta = acos(clamp(viewDir.y, -1.0, 1.0));
                
                float u1 = 0.5 + phi / (2.0 * 3.14159265);
                float v1 = theta / 3.14159265;
                
                float poleBlend = smoothstep(0.98, 1.0, abs(viewDir.y));
                if (poleBlend > 0.0) {
                    u1 = 0.5;
                }
                
                vec2 fragCoord = vec2(u1, v1) * iResolution;
                vec2 uv = fragCoord.xy / iResolution.xy - 0.5;
                uv.x *= iResolution.x / iResolution.y;
                
                vec3 dir = viewDir * zoom;
                float time = iTime * speed + 0.25;
                
                float a1 = 0.5 + iMouse.x / iResolution.x * 2.0;
                float a2 = 0.8 + iMouse.y / iResolution.y * 2.0;
                mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
                mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
                dir.xz *= rot1;
                dir.xy *= rot2;
                
                vec3 from = vec3(1.0, 0.5, 0.5);
                from += vec3(time * 0.1, iTime * 0.001, 2.0);
                from.xz *= rot1;
                from.xy *= rot2;
                
                float s = 0.1, fade = 1.0;
                vec3 v = vec3(0.0);
                
                for (int r = 0; r < volsteps; r++) {
                    vec3 p = from + s * dir * 0.5;
                    p = abs(vec3(tile) - mod(p, vec3(tile * 2.0)));
                    float pa = 0.1, a = 0.0;
                    
                    for (int i = 0; i < iterations; i++) { 
                        p = abs(p) / dot(p, p) - formuparam;
                        
                        float change = abs(length(p) - pa);
                        change = smoothstep(0.001, 0.002, change) * change;
                        
                        a += change;
                        pa = length(p);
                    }
                    
                    float dm = max(0.0, darkmatter - a * a * 0.001);
                    a *= a * a;
                    if (r > 6) fade *= 1.0 - dm;
                    
                    v += fade;
                    
                    vec3 depthColor = vec3(s, s * s, s * s * s * s);
                    float density = a * brightness;
                    vec3 starColor = depthColor * density;
                    vec3 nebulaBlend = mix(starColor, nebulaColor * density, colorMix);
                    
                    v += nebulaBlend * fade;
                    fade *= distfading;
                    s += stepsize;
                }
                
                v = mix(vec3(length(v)), v, saturation);
                v *= colorTint;
                v = pow(max(v, 0.0), vec3(gamma));
                v = (v - 0.5) * contrast + 0.5;
                
                gl_FragColor = vec4(v * 0.01, 1.0);
            }
        `;
	}

	private createGeometry(): void {
		this.skybox = MeshBuilder.CreateSphere("spaceSkybox", {
			diameter: this.settings.skyboxSize,
			segments: this.settings.sphereSegments
		}, this.scene);

		this.skybox.infiniteDistance = true;
	}

	private createMaterial(): void {
		this.spaceMaterial = new ShaderMaterial("spaceMaterial", this.scene, {
			vertex: "space",
			fragment: "customSpace"
		}, {
			attributes: ["position", "uv"],
			uniforms: ["worldViewProjection", "world", "iTime", "iResolution", "iMouse",
				"colorTint", "nebulaColor", "colorMix", "contrast", "gamma"]
		});

		this.updateUniforms();
		this.spaceMaterial.backFaceCulling = false;
		this.skybox.material = this.spaceMaterial;
	}

	private updateUniforms(): void {
		this.spaceMaterial.setFloat("iTime", 0);
		this.spaceMaterial.setVector2("iResolution", this.settings.resolution);
		// this.spaceMaterial.setVector2("iMouse", new Vector2(512, 512));
		this.spaceMaterial.setVector3("colorTint", this.settings.colorTint);
		this.spaceMaterial.setVector3("nebulaColor", this.settings.nebulaColor);
		this.spaceMaterial.setFloat("colorMix", this.settings.colorMix);
		this.spaceMaterial.setFloat("contrast", this.settings.contrast);
		this.spaceMaterial.setFloat("gamma", this.settings.gamma);
	}

	private setupAnimation(): void {
		this.animationHandle = this.scene.registerBeforeRender(() => {
			const time = performance.now() * 0.001;
			this.spaceMaterial.setFloat("iTime", time);
		});
	}

	private recreateMaterial(): void {
		const oldMaterial = this.spaceMaterial;
		Effect.ShadersStore["customSpaceFragmentShader"] = this.createFragmentShader();

		this.createMaterial();
		oldMaterial.dispose();
	}

	private updateColorUniforms(): void {
		this.spaceMaterial.setVector3("colorTint", this.settings.colorTint);
		this.spaceMaterial.setVector3("nebulaColor", this.settings.nebulaColor);
		this.spaceMaterial.setFloat("colorMix", this.settings.colorMix);
		this.spaceMaterial.setFloat("contrast", this.settings.contrast);
		this.spaceMaterial.setFloat("gamma", this.settings.gamma);
	}

	public setColorTint(r: number, g: number, b: number): void {
		this.settings.colorTint = new Vector3(r, g, b);
		this.updateColorUniforms();
	}

	public setNebulaColor(r: number, g: number, b: number): void {
		this.settings.nebulaColor = new Vector3(r, g, b);
		this.updateColorUniforms();
	}

	public updateColorMix(value: number): void {
		this.settings.colorMix = Math.max(0.0, Math.min(1.0, value));
		this.updateColorUniforms();
	}

	public updateContrast(value: number): void {
		this.settings.contrast = Math.max(0.1, Math.min(3.0, value));
		this.updateColorUniforms();
	}

	public updateGamma(value: number): void {
		this.settings.gamma = Math.max(0.2, Math.min(3.0, value));
		this.updateColorUniforms();
	}

	public updateBrightness(value: number): void {
		this.settings.brightness = Math.max(0.0005, Math.min(0.01, value));
		this.recreateMaterial();
	}

	public updateSpeed(value: number): void {
		this.settings.speed = Math.max(0.001, Math.min(0.05, value));
		this.recreateMaterial();
	}

	public updateRotationSpeed(value: number): void {
		this.settings.rotationSpeed = Math.max(0.1, Math.min(2.0, value));
	}

	public toggleAutoRotation(): void {
		this.settings.autoRotate = !this.settings.autoRotate;
	}

	public updateSettings(newSettings: Partial<SpaceSkyboxOptions>): void {
		Object.assign(this.settings, newSettings);
		this.validateSettings();

		const colorOnlyParams = ['colorTint', 'nebulaColor', 'colorMix', 'contrast', 'gamma'];
		const colorOnlyChange = Object.keys(newSettings).every(key =>
			colorOnlyParams.includes(key) || key === 'autoRotate' || key === 'rotationSpeed'
		);

		if (colorOnlyChange) {
			this.updateColorUniforms();
		} else {
			this.recreateMaterial();
		}
	}

	public get mesh(): Mesh {
		return this.skybox;
	}

	public get material(): ShaderMaterial {
		return this.spaceMaterial;
	}

	public applyPreset(preset: SpaceSkyboxPreset): void {
		this.updateSettings(SpaceSkyboxPresets[preset]);
	}

	public dispose(): void {
		if (this.animationHandle) {
			this.scene.unregisterBeforeRender(this.animationHandle);
		}
		this.spaceMaterial.dispose();
		this.skybox.dispose();
	}

	public get enabled(): boolean {
		return this._enabled;
	}

	public set enabled(value: boolean) {

		if (this._enabled === value) return;

		this._enabled = value;

		if (value) {
			this.enable();
		} else {
			this.disable();
		}
	}

	private enable(): void {
		this.skybox.setEnabled(true);
		this.skybox.isVisible = true;

		if (!this.animationHandle) {
			this.setupAnimation();
		}

		console.log("SpaceSkybox enabled");
	}

	private disable(): void {
		this.skybox.setEnabled(false);
		this.skybox.isVisible = false;

		if (this.animationHandle) {
			this.scene.unregisterBeforeRender(this.animationHandle);
			this.animationHandle = null;
		}

		console.log("SpaceSkybox disabled");
	}

	public onGameLoad(): void {

		if (this._enabled) {
			this.enable();
		}

		console.log("SpaceSkybox: Game loaded");
	}

	public onGameUnload(): void {

		this.skybox.setEnabled(false);

		console.log("SpaceSkybox: Game unloaded");
	}
}

export type SpaceSkyboxPreset = 'Classic' | 'Warm' | 'Purple' | 'Alien' | 'Monochrome' | 'Horror';

export const SpaceSkyboxPresets: Record<SpaceSkyboxPreset, Partial<SpaceSkyboxOptions>> = {
	Classic: {
		colorTint: new Vector3(0.8, 0.9, 1.2),
		nebulaColor: new Vector3(0.2, 0.4, 0.8),
		colorMix: 0.3,
		brightness: 0.0015,
		saturation: 0.85,
		speed: 0.000003,
		rotationSpeed: 0.00001
	},

	Warm: {
		colorTint: new Vector3(1.3, 0.8, 0.6),
		nebulaColor: new Vector3(0.8, 0.3, 0.1),
		colorMix: 0.4,
		brightness: 0.002,
		gamma: 1.2,
		speed: 0.000003,
		rotationSpeed: 0.00001
	},

	Purple: {
		colorTint: new Vector3(1.1, 0.7, 1.3),
		nebulaColor: new Vector3(0.6, 0.2, 0.8),
		colorMix: 0.5,
		brightness: 0.0018,
		saturation: 1.1,
		speed: 0.000003,
		rotationSpeed: 0.00001
	},

	Alien: {
		colorTint: new Vector3(0.6, 1.4, 0.8),
		nebulaColor: new Vector3(0.2, 0.8, 0.3),
		colorMix: 0.6,
		brightness: 0.0012,
		contrast: 1.3,
		speed: 0.000003,
		rotationSpeed: 0.00001
	},

	Monochrome: {
		colorTint: new Vector3(1.0, 1.0, 1.0),
		nebulaColor: new Vector3(0.5, 0.5, 0.5),
		colorMix: 0.1,
		saturation: 0.03,
		contrast: 0.3,
		brightness: 0.003,
		speed: 0.001,
		rotationSpeed: 0.01
	},

	Horror: {
		colorTint: new Vector3(1.2, 0.3, 0.3),
		nebulaColor: new Vector3(0.8, 0.1, 0.1),
		colorMix: 0.7,
		brightness: 0.002,
		darkmatter: 0.6,
		gamma: 0.6,
		speed: 0.003,
		rotationSpeed: 0.00001
	}
};
