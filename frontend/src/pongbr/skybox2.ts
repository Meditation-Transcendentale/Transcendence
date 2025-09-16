import { Effect, MeshBuilder, Scene, ShaderMaterial, Vector3, Vector2 } from "@babylonImport";

// Vertex shader
Effect.ShadersStore["spaceVertexShader"] = `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 worldViewProjection;
    varying vec3 vPosition;
    varying vec2 vUV;
    
    void main(void) {
        gl_Position = worldViewProjection * vec4(position, 1.0);
        vPosition = position;
        vUV = uv;
    }
`;

// Fragment shader template
const createSpaceFragmentShader = (settings: any) => `
    #define iterations ${settings.iterations}
    #define formuparam ${settings.formuparam.toFixed(3)}
    #define volsteps ${settings.volsteps}
    #define stepsize ${settings.stepsize.toFixed(3)}
    #define zoom ${settings.zoom.toFixed(3)}
    #define tile ${settings.tile.toFixed(3)}
    #define speed ${settings.speed.toFixed(6)}
    #define brightness ${settings.brightness.toFixed(6)}
    #define darkmatter ${settings.darkmatter.toFixed(3)}
    #define distfading ${settings.distfading.toFixed(3)}
    #define saturation ${settings.saturation.toFixed(3)}

    precision highp float;
    varying vec3 vPosition;
    varying vec2 vUV;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec2 iMouse;
    
    void main(void) {
        // Convert sphere position to screen-like coordinates
        vec3 viewDir = normalize(vPosition);
		float u1 = 0.5 + atan(viewDir.z, viewDir.x) / (2.0 * 3.14159265);
        float v1 = 0.5 - asin(viewDir.y) / 3.14159265;  // Use asin instead of acos
        
        // Avoid pole pinching by clamping v
        v1 = clamp(v1, 0.02, 0.98);
        
        vec2 fragCoord = vec2(u1, v1) * iResolution;

        // vec2 fragCoord = vec2(
        //     atan(viewDir.x, viewDir.z) / (2.0 * 3.14159265) + 0.5,
        //     acos(viewDir.y) / 3.14159265
        // ) * iResolution;
        
        // Get coords and direction
        vec2 uv = fragCoord.xy / iResolution.xy - 0.5;
        uv.y *= iResolution.y / iResolution.x;
        vec3 dir = vec3(uv * zoom, 1.0);
        float time = iTime * speed + 0.25;
        
        // Mouse rotation (automated)
        float a1 = 0.5 + iMouse.x / iResolution.x * 2.0;
        float a2 = 0.8 + iMouse.y / iResolution.y * 2.0;
        mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
        mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
        dir.xz *= rot1;
        dir.xy *= rot2;
        
        vec3 from = vec3(1.0, 0.5, 0.5);
        from += vec3(time * 2.0, time, -2.0);
        from.xz *= rot1;
        from.xy *= rot2;
        
        // Volumetric rendering
        float s = 0.1, fade = 1.0;
        vec3 v = vec3(0.0);
        
        for (int r = 0; r < volsteps; r++) {
            vec3 p = from + s * dir * 0.5;
            p = abs(vec3(tile) - mod(p, vec3(tile * 2.0))); // tiling fold
            float pa, a = pa = 0.0;
            
            for (int i = 0; i < iterations; i++) { 
                p = abs(p) / dot(p, p) - formuparam; // the magic formula
                a += abs(length(p) - pa); // absolute sum of average change
                pa = length(p);
            }
            
            float dm = max(0.0, darkmatter - a * a * 0.001); // dark matter
            a *= a * a; // add contrast
            if (r > 6) fade *= 1.0 - dm; // dark matter, don't render near
            
            v += fade;
            v += vec3(s, s * s, s * s * s * s) * a * brightness * fade; // coloring based on distance
            fade *= distfading; // distance fading
            s += stepsize;
        }
        
        v = mix(vec3(length(v)), v, saturation); // color adjust
        gl_FragColor = vec4(v * 0.01, 1.0);
    }
`;

export interface SpaceSkyboxOptions {
	// Fractal parameters
	iterations?: number;        // Detail level (8-25, default: 17)
	formuparam?: number;       // Fractal shape (0.1-1.0, default: 0.53)

	// Volume rendering
	volsteps?: number;         // Rendering steps (10-30, default: 20)
	stepsize?: number;         // Step size (0.05-0.2, default: 0.1)

	// Visual parameters
	zoom?: number;             // Zoom level (0.3-2.0, default: 0.800)
	tile?: number;             // Tiling factor (0.5-2.0, default: 0.850)
	brightness?: number;       // Overall brightness (0.0005-0.01, default: 0.0015)
	darkmatter?: number;       // Dark matter amount (0.0-0.8, default: 0.300)
	distfading?: number;       // Distance fading (0.3-0.9, default: 0.730)
	saturation?: number;       // Color saturation (0.0-1.5, default: 0.850)

	// Animation parameters
	speed?: number;            // Animation speed (0.001-0.05, default: 0.010)
	autoRotate?: boolean;      // Enable auto rotation (default: true)
	rotationSpeed?: number;    // Rotation speed (0.1-2.0, default: 0.3)

	// Technical parameters
	sphereSegments?: number;   // Sphere tessellation (16-64, default: 32)
	skyboxSize?: number;       // Skybox diameter (5000-20000, default: 10000)
	resolution?: Vector2;      // Shader resolution (default: 1024x1024)
}

export function createCustomizableSpaceSkybox(scene: Scene, options: SpaceSkyboxOptions = {}) {
	// Default settings
	const settings = {
		iterations: 17,
		formuparam: 0.53,
		volsteps: 20,
		stepsize: 0.1,
		zoom: 0.800,
		tile: 0.850,
		speed: 0.010,
		brightness: 0.0015,
		darkmatter: 0.300,
		distfading: 0.730,
		saturation: 0.850,
		autoRotate: true,
		rotationSpeed: 0.05,
		sphereSegments: 32,
		skyboxSize: 10000,
		resolution: new Vector2(1024, 1024),
		...options
	};

	// Validate parameters
	settings.iterations = Math.max(8, Math.min(25, settings.iterations));
	settings.volsteps = Math.max(10, Math.min(30, settings.volsteps));
	settings.formuparam = Math.max(0.1, Math.min(1.0, settings.formuparam));
	settings.stepsize = Math.max(0.05, Math.min(0.2, settings.stepsize));
	settings.zoom = Math.max(0.3, Math.min(2.0, settings.zoom));
	settings.tile = Math.max(0.5, Math.min(2.0, settings.tile));
	settings.brightness = Math.max(0.0005, Math.min(0.01, settings.brightness));
	settings.darkmatter = Math.max(0.0, Math.min(0.8, settings.darkmatter));
	settings.distfading = Math.max(0.3, Math.min(0.9, settings.distfading));
	settings.saturation = Math.max(0.0, Math.min(1.5, settings.saturation));
	settings.speed = Math.max(0.0001, Math.min(0.01, settings.speed));  // Range: 0.0001-0.01
	settings.rotationSpeed = Math.max(0.000001, Math.min(0.5, settings.rotationSpeed));

	// Generate initial fragment shader
	Effect.ShadersStore["customSpaceFragmentShader"] = createSpaceFragmentShader(settings);

	// Create skybox geometry
	const skybox = MeshBuilder.CreateSphere("spaceSkybox", {
		diameter: settings.skyboxSize,
		segments: settings.sphereSegments
	}, scene);

	// Create shader material
	let spaceMaterial = new ShaderMaterial("spaceMaterial", scene, {
		vertex: "space",
		fragment: "customSpace"
	}, {
		attributes: ["position", "uv"],
		uniforms: ["worldViewProjection", "iTime", "iResolution", "iMouse"]
	});

	// Set initial uniforms
	spaceMaterial.setFloat("iTime", 0);
	spaceMaterial.setVector2("iResolution", settings.resolution);
	spaceMaterial.setVector2("iMouse", new Vector2(
		settings.resolution.x * 0.5,
		settings.resolution.y * 0.5
	));
	spaceMaterial.backFaceCulling = false;

	skybox.material = spaceMaterial;
	skybox.infiniteDistance = true;

	// Animation variables
	let rotationTime = 0;

	// Animation loop
	const animationHandle = scene.registerBeforeRender(() => {
		const time = performance.now() * 0.001;
		spaceMaterial.setFloat("iTime", time);

		if (settings.autoRotate) {
			rotationTime += scene.getEngine().getDeltaTime() * 0.001 * settings.rotationSpeed;

			// Scale the mouse movement based on rotationSpeed
			const maxMovement = Math.min(50, settings.rotationSpeed * 1000); // Much smaller movement

			spaceMaterial.setVector2("iMouse", new Vector2(
				settings.resolution.x * 0.5 + Math.sin(rotationTime) * maxMovement,
				settings.resolution.y * 0.5 + Math.cos(rotationTime * 0.7) * maxMovement * 0.7
			));
		}
	});
	// Helper function to recreate the material with new shader
	const recreateMaterial = () => {
		const oldMaterial = spaceMaterial;

		// Update the fragment shader in the store
		Effect.ShadersStore["customSpaceFragmentShader"] = createSpaceFragmentShader(settings);

		// Create new material
		spaceMaterial = new ShaderMaterial("spaceMaterial", scene, {
			vertex: "space",
			fragment: "customSpace"
		}, {
			attributes: ["position", "uv"],
			uniforms: ["worldViewProjection", "iTime", "iResolution", "iMouse"]
		});

		// Restore uniform values
		spaceMaterial.setFloat("iTime", oldMaterial.getFloats()["iTime"] || 0);
		spaceMaterial.setVector2("iResolution", settings.resolution);
		spaceMaterial.setVector2("iMouse", oldMaterial.getVector2s()["iMouse"] || new Vector2(512, 512));
		spaceMaterial.backFaceCulling = false;

		// Update skybox material
		skybox.material = spaceMaterial;

		// Dispose old material
		oldMaterial.dispose();
	};

	// Return skybox with control methods
	return {
		skybox,
		get material() { return spaceMaterial; },
		settings,

		// Update methods that recreate the material
		updateBrightness: (value: number) => {
			settings.brightness = Math.max(0.0005, Math.min(0.01, value));
			recreateMaterial();
		},

		updateSpeed: (value: number) => {
			settings.speed = Math.max(0.001, Math.min(0.05, value));
			recreateMaterial();
		},

		updateRotationSpeed: (value: number) => {
			settings.rotationSpeed = Math.max(0.1, Math.min(2.0, value));
			// No need to recreate material for rotation speed
		},

		toggleAutoRotation: () => {
			settings.autoRotate = !settings.autoRotate;
			// No need to recreate material for rotation toggle
		},

		updateSettings: (newSettings: Partial<SpaceSkyboxOptions>) => {
			const oldAutoRotate = settings.autoRotate;
			const oldRotationSpeed = settings.rotationSpeed;

			Object.assign(settings, newSettings);

			// Only recreate material if shader parameters changed
			const shaderParamsChanged = Object.keys(newSettings).some(key =>
				key !== 'autoRotate' && key !== 'rotationSpeed'
			);

			if (shaderParamsChanged) {
				recreateMaterial();
			}
		},

	};
}

// Preset configurations
export const SpaceSkyboxPresets = {
	// Fast and bright
	Bright: {
		brightness: 0.003,
		speed: 0.015,
		darkmatter: 0.200,
		saturation: 1.2,
		rotationSpeed: 0.5
	},

	// Slow and mysterious
	Dark: {
		brightness: 0.001,
		speed: 0.005,
		darkmatter: 0.500,
		saturation: 0.6,
		distfading: 0.8,
		rotationSpeed: 0.2
	},

	// High detail
	Detailed: {
		iterations: 22,
		volsteps: 25,
		stepsize: 0.08,
		brightness: 0.002,
		sphereSegments: 48
	},

	// Performance optimized
	Fast: {
		iterations: 12,
		volsteps: 15,
		stepsize: 0.15,
		sphereSegments: 24,
		resolution: new Vector2(512, 512)
	},

	// Cosmic horror theme
	Lovecraftian: {
		brightness: 0.0008,
		darkmatter: 0.600,
		saturation: 0.4,
		speed: 0.003,
		distfading: 0.9,
		rotationSpeed: 0.1,
		formuparam: 0.6
	}
};

// Usage function for presets
export function createPresetSpaceSkybox(scene: Scene, preset: keyof typeof SpaceSkyboxPresets) {
	return createCustomizableSpaceSkybox(scene, SpaceSkyboxPresets[preset]);
}
