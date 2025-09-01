
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
		this.AddUniform('deadZoneCenter', 'vec3', Vector3.Zero());
		this.AddUniform('deadZoneWidth', 'float', 1.0);
		this.AddUniform('deadZoneHeight', 'float', 1.0);
		this.AddUniform('deadZoneDepth', 'float', 1.0);
		this.AddUniform('textSize', 'float', 1.0);
		this.AddUniform('showText', 'float', 1.0);
		this.AddUniform('textPosition', 'vec3', Vector3.Zero());
		this.AddUniform('textTexture', 'sampler2D', 0);
		this.AddUniform('textGlow', 'float', 0.0);

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1
			#define M_PI 3.1415926535897932384626433832795

			
			attribute float instanceID;
			    varying vec3 vOriginalWorldPos;

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
// === RECTANGULAR DEAD ZONE CALCULATION ===
vec3 offsetFromDeadZone = abs(worldPos2 - deadZoneCenter);
vec3 deadZoneSize = vec3(deadZoneWidth, deadZoneHeight, deadZoneDepth);
vec3 normalizedOffset = offsetFromDeadZone / deadZoneSize;
float maxNormalizedOffset = max(max(normalizedOffset.x, normalizedOffset.y), normalizedOffset.z);
float deadZoneMask = step(1.0, maxNormalizedOffset); 

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
) * animationIntensity;
float radialPulse = sin(t * 4.0 - distanceToMouse * 2.0) * 0.3;
mouseAnimation += mouseDirection * radialPulse * animationIntensity;
mouseAnimation+= pushDirection * pushStrength * 0.05 * mouseInfluence;
// === COMBINE ANIMATIONS ===
vec3 totalDisplacement = (baseWave + (mouseAnimation * mouseInfluence)) * deadZoneMask;
vec3 originalWorldPos = worldPos.xyz;
worldPos.xyz += totalDisplacement;

		`)

		this.Vertex_MainEnd(`
			//vFly = vec3(0., vec2(1. - clamp(direction.z, 0.0, 1.)));
    vOriginalWorldPos = originalWorldPos;
		`)


		this.Fragment_Begin(`
			#define MAINUV1 1
    //  uniform sampler2D textTexture;
    //uniform vec3 textPosition;
    //uniform float textSize;
    //uniform float showText;
    varying vec3 vOriginalWorldPos;
		`)

		this.Fragment_Definitions(`
			varying vec3 vFly;
		`)

		this.Fragment_MainEnd(`
    vec3 originalPos = vOriginalWorldPos; // Use original position for stable text
    vec3 baseColor2 = vec3(0.3, 0.25, 0.2);
    
    if(showText > 0.5) {
        vec3 textOffset = originalPos - textPosition;
        vec2 textUV = vec2(
            (-textOffset.x / textSize) + 0.5,
            (textOffset.y / textSize) + 0.5
        );
        
        if(textUV.x >= 0.0 && textUV.x <= 1.0 && textUV.y >= 0.0 && textUV.y <= 1.0) {
            vec4 textColor = texture2D(textTexture, textUV);
            
            if(textColor.r > 0.5) {
                // Carved text effect (darker stone)
                baseColor2 = mix(baseColor2, baseColor2 * 0.2, textColor.a);
                
                // Add mystical glow effect
                if(textGlow > 0.0) {
                    vec3 glowColor = vec3(0.0, 1.0, 0.5); // Cyan/green mystical glow
                    
                    // Pulsing animation
                    float pulse = sin(time * 4.0) * 0.5 + 0.5;
                    
                    // Add glow to the text areas
                    baseColor2 += glowColor * textGlow * textColor.a * (0.7 + pulse * 0.3);
                    
                    // Optional: Add outer glow (spreads beyond text)
                    float outerGlow = smoothstep(1.0, 0.0, length(textUV - vec2(0.5, 0.5)) * 2.0);
                    baseColor2 += glowColor * textGlow * outerGlow * 0.2;
                }
            }
        }
    } 
    gl_FragColor.rgb += baseColor2;

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
