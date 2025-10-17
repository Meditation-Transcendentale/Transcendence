import { Color3, CustomMaterial, Effect, FresnelParameters, Scene, Texture, Vector3 } from "../../babylon";

export class MonolithMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene, option: any) {
		super(name, scene);


		this.AddAttribute('instanceID');
		this.AddAttribute('uv');
		this.AddAttribute('move');

		this.AddUniform('animationSpeed', 'float', option.animationSpeed);
		this.AddUniform('animationIntensity', 'float', option.animationIntensity);
		this.AddUniform('baseWaveIntensity', 'float', option.baseWaveIntensity);
		this.AddUniform('mouseInfluenceRadius', 'float', option.mouseInfluenceRadius);

		this.AddUniform('time', 'float', 1.0);
		this.AddUniform('origin', 'vec3', Vector3.Zero());
		this.AddUniform('oldOrigin', 'vec3', Vector3.Zero());
		this.AddUniform('textGlow', 'float', 0.0);


		this.Vertex_Begin(`
			precision highp float;
			#define M_PI 3.1415926535897932384626433832795

			varying vec3 vOriginalWorldPos;
			varying float oclusion;
						attribute float instanceID;
		`)

		this.Vertex_Definitions(`
			float hash(float p) { 
				p = fract(p * 0.1031); 
				p *= p + 33.33; 
				return fract(p * (p + p)); 
			}

			vec3 hash3(float p) {
				vec3 q = vec3(hash(p), hash(p + 1.0), hash(p + 2.0));
				return q * 2.0 - 1.0;
			}
			vec3 rotateAroundAxis(vec3 pos, vec3 axis, float angle) {
				float cosA = cos(angle);
				float sinA = sin(angle);
				return pos * cosA + cross(axis, pos) * sinA + axis * dot(axis, pos) * (1.0 - cosA);
			}

		`)

		this.Vertex_After_WorldPosComputed(`
			vec3 worldPos2 = finalWorld[3].xyz;
			vec3 originalWorldPos = worldPos.xyz;
			// Random per-voxel offset
			vec3 animOffset = hash3(float(gl_InstanceID));
			float t = time * animationSpeed;

			// === BASE WAVE ANIMATION (Always Active) ===
			float wavePhase = t + dot(worldPos2, vec3(0.1, 0.05, 0.08));
			vec3 baseWave = vec3(
			   sin(wavePhase + animOffset.x * 3.14159) * 0.3,
			   sin(wavePhase * 0.7 + animOffset.y * 3.14159) * 0.2,
			   cos(wavePhase * 0.9 + animOffset.z * 3.14159) * 0.25
			) * baseWaveIntensity;
			// Add vertical wave that travels up the structure
			float verticalWave = sin(worldPos2.y * 0.3 - t * 2.0) * 0.1 * baseWaveIntensity;
			baseWave.x += verticalWave;
			baseWave.z += verticalWave * 0.5;
			// === MOUSE INFLUENCE ANIMATION ===
			float distanceToMouse = length(worldPos2 - origin);
			float mouseInfluence = smoothstep(mouseInfluenceRadius, 0.0, distanceToMouse);

			// Calculate mouse movement direction
			vec3 mouseMovement = origin - oldOrigin;
			float mouseSpeed = length(mouseMovement);
			vec3 mouseDirection = mouseMovement ; // Movement direction
			vec3 pushDirection = normalize(worldPos2 - origin + vec3(0.001)); // Direction from mouse to voxel
			float pushStrength = mouseSpeed * 2.0; // Scale with mouse speed
			vec3 mouseAnimation = vec3(
			   sin(t * 3.0 + animOffset.x * 6.28) * animOffset.x,
			   sin(t * 2.5 + animOffset.y * 6.28) * animOffset.y,
			   cos(t * 2.8 + animOffset.z * 6.28) * animOffset.z
			) * animationIntensity * 3.;
			float radialPulse = sin(t * 4.0 - distanceToMouse * 2.0) * 0.3;

			mouseAnimation += mouseDirection * radialPulse * animationIntensity;
			mouseAnimation+= pushDirection * 0.05 * mouseInfluence;

			if(textGlow > 0.0) {

			   float phaseOffset = hash(float(gl_InstanceID)) * 6.28;
			   float phaseAmount = sin(time * 1.5 + phaseOffset) * 0.5 + 0.5;

			   vec3 dimensionOffset = vec3(
				   sin(float(gl_InstanceID) * 0.1) * 0.1,
				   cos(float(gl_InstanceID) * 0.13) * 0.15,
				   sin(float(gl_InstanceID) * 0.17) * 0.18
			   );

			   worldPos.xyz += dimensionOffset * phaseAmount;
			}

			// === COMBINE ANIMATIONS ===
			vec3 totalDisplacement = (baseWave * (mouseAnimation * mouseInfluence)) ;
			worldPos.xyz += totalDisplacement;
			float displacement = length(worldPos.xyz - originalWorldPos.xyz);
			float maxDisplacement = 1.0;
			oclusion = 1.0 - smoothstep(0.0, maxDisplacement, displacement);
		`)

		this.Vertex_MainEnd(`
			vOriginalWorldPos = originalWorldPos;
		`)


		this.Fragment_Begin(`
			varying vec3 vOriginalWorldPos;
			varying float oclusion;
		`)

		this.Fragment_Definitions(`
			varying vec3 vFly;
		`)

		this.Fragment_MainEnd(`
			vec3 originalPos = vOriginalWorldPos; 
			vec3 baseColor2 = vec3(0., 0., 0.);

			vec3 faceNormal = normalize(vNormalW);

			gl_FragColor.rgb *= oclusion;
			gl_FragColor.rgb += baseColor2;

			// gl_FragColor.a = 1.;
		`)
		const normalTex = new Texture("/assets/chunk_normal.jpg", scene);
		this.bumpTexture = normalTex;

		this.diffuseColor = new Color3(0.0, 0.0, 0.0);
		// this.emissiveColor = Color3.Red();
		this.specularColor = Color3.White().scale(0.5);
		this.specularPower = 256;

		normalTex.uScale = normalTex.vScale = 1.;
	}

	setFloat(name: string, value: number) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
		});
	}


	setFloatArray3(name: string, values: number[]) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloatArray3(name, values);
		});
	}

	setVec3(name: string, value: Vector3) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setVector3(name, value);
		});

	}
	setTexture(name: string, texture: Texture | null) {
		this.onBindObservable.addOnce(() => {
			if (texture) {
				this.getEffect().setTexture(name, texture);
			}
		});
	}

	setInt(name: string, value: number) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setInt(name, value);
		});
	}

	debugUniforms() {
		const effect = this.getEffect();
		if (effect) {
			console.log('🔍 Available uniforms:', effect.getUniformBuffersNames());
			console.log('🔍 Uniform locations:', effect.getUniformNames());
		} else {
			console.log('❌ No effect available for uniform debugging');
		}
	}

}
