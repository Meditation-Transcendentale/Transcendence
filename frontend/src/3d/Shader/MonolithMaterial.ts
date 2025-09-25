
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
		this.AddUniform('floatingOffset', 'vec3', Vector3.Zero());
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

		this.AddUniform('textTexture0', 'sampler2D', 0);
		this.AddUniform('textTexture1', 'sampler2D', 0);
		this.AddUniform('textTexture2', 'sampler2D', 0);
		this.AddUniform('textTexture3', 'sampler2D', 0);

		this.AddUniform('textPosition0', 'vec3', Vector3.Zero());
		this.AddUniform('textPosition1', 'vec3', Vector3.Zero());
		this.AddUniform('textPosition2', 'vec3', Vector3.Zero());
		this.AddUniform('textPosition3', 'vec3', Vector3.Zero());

		this.AddUniform('textSize0', 'float', 0.0);
		this.AddUniform('textSize1', 'float', 0.0);
		this.AddUniform('textSize2', 'float', 0.0);
		this.AddUniform('textSize3', 'float', 0.0);

		this.AddUniform('textGlow0', 'float', 0.0);
		this.AddUniform('textGlow1', 'float', 0.0);
		this.AddUniform('textGlow2', 'float', 0.0);
		this.AddUniform('textGlow3', 'float', 0.0);
		this.AddUniform('textFace0', 'vec3', Vector3.Zero());
		this.AddUniform('textFace1', 'vec3', Vector3.Zero());
		this.AddUniform('textFace2', 'vec3', Vector3.Zero());
		this.AddUniform('textFace3', 'vec3', Vector3.Zero());

		this.AddUniform('textCount', 'float', 0.0);

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1
			#define M_PI 3.1415926535897932384626433832795

			
			attribute float instanceID;
			varying vec3 vOriginalWorldPos;
			varying float oclusion;

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
bool isInTextRegion(vec3 worldPos) {
    if(textSize0 > 0.0) {
        vec3 textOffset0 = worldPos - textPosition0;
        vec3 face0 = textFace0;
        vec2 textUV0;
		float size = textSize0 * 0.2;
        
        if(abs(face0.z) > 0.5) { 
            textUV0 = vec2(
                (-textOffset0.x / size) + 0.5,
                (textOffset0.y / size) + 0.5
            );
        } else if(abs(face0.x) > 0.5) {
            textUV0 = vec2(
                (-textOffset0.z / size) + 0.5,
                (textOffset0.y / size) + 0.5
            );
        } else if(abs(face0.y) > 0.5) { 
            textUV0 = vec2(
                (textOffset0.x / size) + 0.5,
                (textOffset0.z / size) + 0.5
            );
        }
        
        if(textUV0.x >= 0.0 && textUV0.x <= 1.0 && textUV0.y >= 0.0 && textUV0.y <= 1.0) {
            return true;
        }
    }
    
    return false;
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
vec3 originalWorldPos = worldPos.xyz;
worldPos2 += floatingOffset;
worldPos.xyz += floatingOffset;
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

bool inTextRegion = isInTextRegion(worldPos2);
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
if(inTextRegion) {
    mouseInfluence = 0.0;
}

mouseAnimation += mouseDirection * radialPulse * animationIntensity;
mouseAnimation+= pushDirection * 0.05 * mouseInfluence;
// In vertex shader


if(textGlow0 > 0.0) {
    vec3 textOffset = worldPos2 - textPosition0;
    float distance = length(textOffset);
    
    float edgeDistance = textSize0 * 0.2; 
    if(distance > edgeDistance) {
        float edgePhasing = smoothstep(textSize0 * 1.8, edgeDistance, distance) * textGlow0;
        
        if(edgePhasing > 0.0) {
            float phaseOffset = hash(instanceID) * 6.28;
            float phaseAmount = sin(time * 1.5 + phaseOffset) * 0.5 + 0.5;
            phaseAmount *= edgePhasing ; 
            
            vec3 dimensionOffset = vec3(
                sin(instanceID * 0.1) * 0.1,
                cos(instanceID * 0.13) * 0.15,
                sin(instanceID * 0.17) * 0.18
            );
            
            worldPos.xyz += dimensionOffset * phaseAmount;
        }
    }
}

// === COMBINE ANIMATIONS ===
vec3 totalDisplacement = (baseWave + (mouseAnimation * mouseInfluence)) * deadZoneMask;
worldPos.xyz += totalDisplacement;
//oclusion = min(length(worldPos.xz) / (length(originalWorldPos.xz) * 2.), 1.);
//oclusion = dot(normalize(originalWorldPos.xyz), normalize(worldPos.xyz));
//float amount = length(originalWorldPos.xyz - worldPos.xyz) * float(length(originalWorldPos.xz) < length(worldPos.xz));
////oclusion = min(oclusion, 1.) * 0.2 + 0.8;
//oclusion = min(exp(-amount * 10.), 1.);
float displacement = length(worldPos.xyz - originalWorldPos.xyz);

float maxDisplacement = 1.0;
oclusion = 1.0 - smoothstep(0.0, maxDisplacement, displacement);


`)

		this.Vertex_MainEnd(`
			//vFly = vec3(0., vec2(1. - clamp(direction.z, 0.0, 1.)));
    vOriginalWorldPos = originalWorldPos;

		`)


		this.Fragment_Begin(`
			#define MAINUV1 1
    varying vec3 vOriginalWorldPos;
			varying float oclusion;
		`)

		this.Fragment_Definitions(`
			varying vec3 vFly;
		`)

		this.Fragment_MainEnd(`
    vec3 originalPos = vOriginalWorldPos; 
    vec3 baseColor2 = vec3(0.3, 0.25, 0.2);
	 vec3 faceNormal = normalize(vNormalW);
	//vec3 textFace0 = vec3(0., 0., 1.);
	//vec3 textFace1 = vec3(0., 0., 1.);
	//vec3 textFace2 = vec3(0., 0., 1.);
	//vec3 textFace3 = vec3(0., 0., 1.);

	 if(textCount > 0.0) {
        // Zone 0
        if(textSize0 > 0.0) {
            vec3 textOffset0 = originalPos - textPosition0;
			vec3 face = textFace0;
			vec2 textUV0;
			
			// Front/Back faces 
			if(abs(face.z) > 0.5) {
				textUV0 = vec2(
					(-textOffset0.x / textSize0) + 0.5,
					(textOffset0.y / textSize0) + 0.5
				);
			}

			// Left/Right faces   
			else if(abs(face.x) > 0.5) {
				textUV0 = vec2(
					(-textOffset0.z / textSize0) + 0.5,
					(textOffset0.y / textSize0) + 0.5
				);
			}

			// Top/Bottom faces 
			else if(abs(face.y) > 0.5) {
				textUV0 = vec2(
					(textOffset0.x / textSize0) + 0.5,
					(textOffset0.z / textSize0) + 0.5
				);
			}
			bool isCorrectFace = dot(faceNormal, textFace0) > 0.5;
            
            if(isCorrectFace && textUV0.x >= 0.0 && textUV0.x <= 1.0 && textUV0.y >= 0.0 && textUV0.y <= 1.0) {
                vec4 textColor0 = texture2D(textTexture0, textUV0);
                if(textColor0.r > 0.5) {
                    baseColor2 = mix(baseColor2, baseColor2 * 0.2, textColor0.a);

                    if(textGlow0 > 0.0) {
                        vec3 glowColor = vec3(0.0, 1.0, 0.5);
                        float pulse = sin(time * 4.0) * 0.5 + 0.5;
                        baseColor2 += glowColor * textGlow0 * textColor0.a * (0.7 + pulse * 0.3);
                    }
                }
            }
        }
        
        // Zone 1
        if(textSize1 > 0.0) {
            vec3 textOffset1 = originalPos - textPosition1;
           			vec3 face = textFace1;
			vec2 textUV1;
			
			// Front/Back faces 
			if(abs(face.z) > 0.5) {
				textUV1 = vec2(
					(-textOffset1.x / textSize1) + 0.5,
					(textOffset1.y / textSize1) + 0.5
				);
			}

			// Left/Right faces   
			else if(abs(face.x) > 0.5) {
				textUV1 = vec2(
					(-textOffset1.z / textSize1) + 0.5,
					(textOffset1.y / textSize1) + 0.5
				);
			}

			// Top/Bottom faces 
			else if(abs(face.y) > 0.5) {
				textUV1 = vec2(
					(textOffset1.x / textSize1) + 0.5,
					(textOffset1.z / textSize1) + 0.5
				);
			}
 
 bool isCorrectFace = dot(faceNormal, textFace1) > 0.7;

            if(isCorrectFace && textUV1.x >= 0.0 && textUV1.x <= 1.0 && textUV1.y >= 0.0 && textUV1.y <= 1.0) {
                vec4 textColor1 = texture2D(textTexture1, textUV1);
                if(textColor1.r > 0.5) {
                    baseColor2 = mix(baseColor2, baseColor2 * 0.2, textColor1.a);
                    if(textGlow1 > 0.0) {
                        vec3 glowColor = vec3(1.0, 0.5, 0.0); // Different color per zone
                        float pulse = sin(time * 4.0) * 0.5 + 0.5;
                        baseColor2 += glowColor * textGlow1 * textColor1.a * (0.7 + pulse * 0.3);
                    }
                }
            }
        }
        if(textSize2 > 0.0) {
            vec3 textOffset2 = originalPos - textPosition2;
			vec3 face = textFace2;
			vec2 textUV2;
			
			// Front/Back faces 
			if(abs(face.z) > 0.5) {
				textUV2 = vec2(
					(-textOffset2.x / textSize2) + 0.5,
					(textOffset2.y / textSize2) + 0.5
				);
			}

			// Left/Right faces   
			else if(abs(face.x) > 0.5) {
				textUV2 = vec2(
					(-textOffset2.z / textSize2) + 0.5,
					(textOffset2.y / textSize2) + 0.5
				);
			}

			// Top/Bottom faces 
			else if(abs(face.y) > 0.5) {
				textUV2 = vec2(
					(textOffset2.x / textSize2) + 0.5,
					(textOffset2.z / textSize2) + 0.5
				);
			}

             bool isCorrectFace = dot(faceNormal, textFace2) > 0.7;

            if(isCorrectFace && textUV2.x >= 0.0 && textUV2.x <= 1.0 && textUV2.y >= 0.0 && textUV2.y <= 1.0) {
                vec4 textColor2 = texture2D(textTexture2, textUV2);
                if(textColor2.r > 0.5) {
                    baseColor2 = mix(baseColor2, baseColor2 * 0.2, textColor2.a);
                    if(textGlow2 > 0.0) {
                        vec3 glowColor = vec3(1.0, 0.5, 0.0); // Different color per zone
                        float pulse = sin(time * 4.0) * 0.5 + 0.5;
                        baseColor2 += glowColor * textGlow2 * textColor2.a * (0.7 + pulse * 0.3);
                    }
                }
            }
        }
        
    }
    
	gl_FragColor.rgb *= oclusion;
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
