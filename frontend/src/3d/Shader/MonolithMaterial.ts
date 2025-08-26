
import { Color3, CustomMaterial, Effect, Scene, Texture, Vector3 } from "@babylonImport"

export class MonolithMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1.0);

		this.AddAttribute('uv');
		this.AddAttribute('move');
		this.AddAttribute('direction');
		this.AddAttribute('instanceID');
		this.AddUniform('animationSpeed', 'float', 1.0);
		this.AddUniform('animationIntensity', 'float', 1.0);
		this.AddUniform('baseWaveIntensity', 'float', 1.0);
		this.AddUniform('mouseInfluenceRadius', 'float', 1.0);
		this.AddUniform('worldCenter', 'vec3', Vector3.Zero());
		this.AddUniform('origin', 'vec3', Vector3.Zero());
		this.AddUniform('oldOrigin', 'vec3', Vector3.Zero());

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1
			#define M_PI 3.1415926535897932384626433832795

			
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
		`)

		this.Vertex_MainBegin(`
			//mat4 finalWorld = mat4(world0, world1, world2, world3);
			
		`)

		this.Vertex_Before_PositionUpdated(`
		`)

		this.Vertex_Before_NormalUpdated(`
		`)

		this.Vertex_After_WorldPosComputed(`

vec3 worldPos2 = finalWorld[3].xyz;
// Random per-voxel offset
vec3 animOffset = hash3(instanceID);
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
// Push voxels away from mouse direction
vec3 pushDirection = normalize(worldPos2 - origin + vec3(0.001)); // Direction from mouse to voxel
float pushStrength = mouseSpeed * 2.0; // Scale with mouse speed
vec3 mouseAnimation = vec3(
    sin(t * 3.0 + animOffset.x * 6.28) * animOffset.x,
    sin(t * 2.5 + animOffset.y * 6.28) * animOffset.y,
    cos(t * 2.8 + animOffset.z * 6.28) * animOffset.z
) * animationIntensity;
float radialPulse = sin(t * 4.0 - distanceToMouse * 2.0) * 0.3;
mouseAnimation += mouseDirection * radialPulse * animationIntensity;
mouseAnimation+= pushDirection * pushStrength * 0.05 * mouseInfluence;
// === COMBINE ANIMATIONS ===
vec3 totalDisplacement = baseWave + (mouseAnimation * mouseInfluence);
worldPos.xyz += totalDisplacement;

		`)

		this.Vertex_MainEnd(`
			//vFly = vec3(0., vec2(1. - clamp(direction.z, 0.0, 1.)));
		`)


		this.Fragment_Begin(`
			#define MAINUV1 1
		`)

		this.Fragment_Definitions(`
			varying vec3 vFly;
		`)

		this.Fragment_MainEnd(`
			// gl_FragColor.rgb *= (vPositionW.y < 0.6 ? vec3(1., 0.1, 0.1) : vec3(1.));
			gl_FragColor.a = 1.;
		`)

		// this.emissiveColor = new Color3(0.1, 0.1, 0.1);
		// this.diffuseColor = new Color3(0., 0., 1.);
		//
		this.specularPower = 5;
		// this.ambientColor = Color3.FromHexString("#c1121f")
		this.diffuseColor = Color3.FromHexString("#ffffff");
		this.diffuseColor = Color3.FromHexString("#000000");
		//this.specularColor = Color3.FromHexString("#c1121f");
		this.specularColor = Color3.FromHexString("#ffffff");
		this.backFaceCulling = false;
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
}
