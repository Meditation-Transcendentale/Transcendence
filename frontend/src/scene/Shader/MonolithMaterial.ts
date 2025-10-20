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
		this.AddUniform('trail0', 'vec3', Vector3.Zero());
		this.AddUniform('trail1', 'vec3', Vector3.Zero());
		this.AddUniform('trail2', 'vec3', Vector3.Zero());
		this.AddUniform('trail3', 'vec3', Vector3.Zero());
		this.AddUniform('trail4', 'vec3', Vector3.Zero());
		this.AddUniform('trail5', 'vec3', Vector3.Zero());
		this.AddUniform('trail6', 'vec3', Vector3.Zero());
		this.AddUniform('trail7', 'vec3', Vector3.Zero());
		this.AddUniform('mouseSpeed', 'float', 0.0);
		this.AddUniform('cameraPos', 'vec3', Vector3.Zero());


		this.Vertex_Begin(`
			precision highp float;
			#define M_PI 3.1415926535897932384626433832795

			varying vec3 vOriginalWorldPos;
			varying float oclusion;
			varying float vTrailGlow;
			varying float vDistToCamera;
			varying vec3 vTrailColor;
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
			float distanceToMouse = length(worldPos2 - origin);
			float mouseInfluence = smoothstep(mouseInfluenceRadius, 0.0, distanceToMouse);

			vec3 mouseMovement = origin - oldOrigin;
			float mouseSpeed = length(mouseMovement);

			vec3 mouseAnimation = vec3(0.0);

			vec3 trailDisplacement = vec3(0.0);
			float speedMultiplier = 1.0 + (mouseSpeed * 0.3);

			float trailDist0 = length(worldPos2 - trail0);
			float trailInf0 = smoothstep(mouseInfluenceRadius * 0.7, 0.0, trailDist0);
			vec3 trailPush0 = normalize(worldPos2 - trail0 + vec3(0.001));
			float spring0 = sin(t * 6.0 - trailDist0 * 4.0) * exp(-trailDist0 * 1.0);
			trailDisplacement += trailPush0 * trailInf0 * 0.15 * speedMultiplier * (1.0 + spring0 * 0.25);

			float trailDist1 = length(worldPos2 - trail1);
			float trailInf1 = smoothstep(mouseInfluenceRadius * 0.6, 0.0, trailDist1);
			vec3 trailPush1 = normalize(worldPos2 - trail1 + vec3(0.001));
			float spring1 = sin(t * 5.5 - trailDist1 * 3.5) * exp(-trailDist1 * 1.2);
			trailDisplacement += trailPush1 * trailInf1 * 0.12 * speedMultiplier * (1.0 + spring1 * 0.2);

			float trailDist2 = length(worldPos2 - trail2);
			float trailInf2 = smoothstep(mouseInfluenceRadius * 0.5, 0.0, trailDist2);
			vec3 trailPush2 = normalize(worldPos2 - trail2 + vec3(0.001));
			float spring2 = sin(t * 5.0 - trailDist2 * 3.0) * exp(-trailDist2 * 1.4);
			trailDisplacement += trailPush2 * trailInf2 * 0.09 * speedMultiplier * (1.0 + spring2 * 0.15);

			float trailDist3 = length(worldPos2 - trail3);
			float trailInf3 = smoothstep(mouseInfluenceRadius * 0.4, 0.0, trailDist3);
			vec3 trailPush3 = normalize(worldPos2 - trail3 + vec3(0.001));
			float spring3 = sin(t * 4.5 - trailDist3 * 2.5) * exp(-trailDist3 * 1.6);
			trailDisplacement += trailPush3 * trailInf3 * 0.06 * speedMultiplier * (1.0 + spring3 * 0.1);

			float trailDist4 = length(worldPos2 - trail4);
			float trailInf4 = smoothstep(mouseInfluenceRadius * 0.3, 0.0, trailDist4);
			vec3 trailPush4 = normalize(worldPos2 - trail4 + vec3(0.001));
			float spring4 = sin(t * 4.0 - trailDist4 * 2.0) * exp(-trailDist4 * 1.8);
			trailDisplacement += trailPush4 * trailInf4 * 0.03 * speedMultiplier * (1.0 + spring4 * 0.05);

			float trailDist5 = length(worldPos2 - trail5);
			float trailInf5 = smoothstep(mouseInfluenceRadius * 0.25, 0.0, trailDist5);
			vec3 trailPush5 = normalize(worldPos2 - trail5 + vec3(0.001));
			float spring5 = sin(t * 3.5 - trailDist5 * 1.5) * exp(-trailDist5 * 2.0);
			trailDisplacement += trailPush5 * trailInf5 * 0.02 * speedMultiplier * (1.0 + spring5 * 0.03);

			float trailDist6 = length(worldPos2 - trail6);
			float trailInf6 = smoothstep(mouseInfluenceRadius * 0.2, 0.0, trailDist6);
			vec3 trailPush6 = normalize(worldPos2 - trail6 + vec3(0.001));
			float spring6 = sin(t * 3.0 - trailDist6 * 1.0) * exp(-trailDist6 * 2.2);
			trailDisplacement += trailPush6 * trailInf6 * 0.015 * speedMultiplier * (1.0 + spring6 * 0.02);

			float trailDist7 = length(worldPos2 - trail7);
			float trailInf7 = smoothstep(mouseInfluenceRadius * 0.15, 0.0, trailDist7);
			vec3 trailPush7 = normalize(worldPos2 - trail7 + vec3(0.001));
			float spring7 = sin(t * 2.5 - trailDist7 * 0.5) * exp(-trailDist7 * 2.4);
			trailDisplacement += trailPush7 * trailInf7 * 0.01 * speedMultiplier * (1.0 + spring7 * 0.01);

			mouseAnimation += trailDisplacement;

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

			vec3 totalDisplacement = (mouseAnimation * mouseInfluence) + trailDisplacement;
			totalDisplacement *= 0.4;
			float edgeFalloff = smoothstep(mouseInfluenceRadius * 0.8, mouseInfluenceRadius * 0.3, distanceToMouse);
			totalDisplacement *= edgeFalloff;
			worldPos.xyz += totalDisplacement;
			float displacement = length(worldPos.xyz - originalWorldPos.xyz);
			float maxDisplacement = 1.0;
			oclusion = 1.0 - smoothstep(0.0, maxDisplacement, displacement);
		`)

		this.Vertex_MainEnd(`
			vOriginalWorldPos = originalWorldPos;
			vTrailGlow = (trailInf0 + trailInf1 * 0.9 + trailInf2 * 0.8 + trailInf3 * 0.7 +
			              trailInf4 * 0.6 + trailInf5 * 0.5 + trailInf6 * 0.4 + trailInf7 * 0.3) * speedMultiplier;

			vec3 color0 = vec3(1.5, 0.3, 1.5);
			vec3 color1 = vec3(1.3, 0.35, 1.45);
			vec3 color2 = vec3(1.1, 0.4, 1.4);
			vec3 color3 = vec3(0.9, 0.5, 1.3);
			vec3 color4 = vec3(0.7, 0.55, 1.2);
			vec3 color5 = vec3(0.5, 0.6, 1.1);
			vec3 color6 = vec3(0.4, 0.65, 1.0);
			vec3 color7 = vec3(0.3, 0.7, 0.9);

			vTrailColor = color0 * trailInf0 +
			              color1 * trailInf1 * 0.9 +
			              color2 * trailInf2 * 0.8 +
			              color3 * trailInf3 * 0.7 +
			              color4 * trailInf4 * 0.6 +
			              color5 * trailInf5 * 0.5 +
			              color6 * trailInf6 * 0.4 +
			              color7 * trailInf7 * 0.3;

			float totalInf = trailInf0 + trailInf1 * 0.9 + trailInf2 * 0.8 + trailInf3 * 0.7 +
			                 trailInf4 * 0.6 + trailInf5 * 0.5 + trailInf6 * 0.4 + trailInf7 * 0.3;
			if (totalInf > 0.01) {
				vTrailColor = vTrailColor / totalInf;
			} else {
				vTrailColor = color0;
			}

			float scalePulse = vTrailGlow * 0.05;
			vec3 toCenter = worldPos.xyz - worldPos2;
			worldPos.xyz += toCenter * scalePulse;

			vDistToCamera = length(worldPos.xyz - cameraPos);
		`)


		this.Fragment_Begin(`
			varying vec3 vOriginalWorldPos;
			varying float oclusion;
			varying float vTrailGlow;
			varying float vDistToCamera;
			varying vec3 vTrailColor;
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

			float glowPulse1 = sin(time * 3.0) * 0.5 + 0.5;
			float glowPulse2 = sin(time * 1.5 + 1.57) * 0.3 + 0.7;
			float dynamicPulse = glowPulse1 * glowPulse2;

			if (vTrailGlow > 0.01) {
				float distanceBoost = 1.0 + (vDistToCamera * 0.3);
				float intensityBoost = 1.2 + (vTrailGlow * 0.5);
				vec3 trailGlow = vTrailColor * vTrailGlow * 30.0 * distanceBoost * dynamicPulse * intensityBoost;
				gl_FragColor.rgb += trailGlow;
			}
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
