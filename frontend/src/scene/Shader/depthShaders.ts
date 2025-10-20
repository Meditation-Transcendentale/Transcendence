import { Effect } from "../../babylon";

Effect.ShadersStore["grassDepthVertexShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

attribute vec3	position;
attribute vec4	world0;
attribute vec4	world1;
attribute vec4	world2;
attribute vec4	world3;
attribute vec4	baseColor;

uniform sampler2D   textureSampler;

uniform mat4	world;
uniform mat4	viewProjection;
uniform vec2	depthValues;
uniform float	time;
uniform vec3	origin;

varying	float	vDepthMetric;

#include<noises>
#include<rotations>

float trunc_fallof( float x, float m )
{
	x /= m;
	return (x-2.0)*x+1.0;
}

vec3 computeWave (vec3 origin, vec2 pos) {
	vec2	v = pos - origin.xy;
	vec2	d = normalize(v);
	float	L = length(v);
	float	t = time - origin.z;
	float	l = 1.5;

	float	freq = 250. * (L - 0.2 * t);
	float dist_fall = trunc_fallof(min(3., L), 3.);
	return	vec3(d,  trunc_fallof(min(l, t), l) * dist_fall);
}

float simplexOctave(vec2 v) {
	return (simplexNoise(v) + 0.5 * simplexNoise(v * 2.) + 0.25 * simplexNoise(v * 4.)) * (1. / 1.75);
}

vec3	sampleWave(vec2 pos) {
	vec2 uv = (pos / 60.) + 0.5;
	vec3 wave = texture(textureSampler, uv).rgb;
	wave.xy = wave.xy * 2. - 1.;
	wave.z *= (uv.x < 1. && uv.x > 0. && uv.y > 0. && uv.y < 1. ? 1. : 0.);
	return wave;
}



void	main(void) {
	vec3 positionUpdated = position;
	mat4 finalWorld = mat4(world0, world1, world2, world3);
	finalWorld = world * finalWorld;

	vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
	vec2 windDir = vec2(-1., 0.);

	// vec4 noiseB = texture2D(tNoise, pos * 0.04);


	float strengh = simplexOctave(pos * 0.05 - time * windDir * 0.3);
	strengh *= position.y;
	

	strengh *= baseColor.a; //apply blade stiffness
	
	vec3 totalWave = sampleWave(pos);
	strengh *= max(1. - totalWave.z * 1.5, 1.);


	positionUpdated = rotationY(positionUpdated, baseColor.r);

	positionUpdated = rotationAxis(positionUpdated,  totalWave.z  * M_PI* 0.3 , vec3(-totalWave.y, 0., -totalWave.x));
	positionUpdated = (position.y > 0.1 ? rotationAxis(positionUpdated, strengh, vec3(windDir.y, 0., windDir.x)) : positionUpdated);

	vec4 worldPos = finalWorld * vec4(positionUpdated, 1.);
	gl_Position = viewProjection * worldPos;
	vDepthMetric = ((gl_Position.z + depthValues.x)/depthValues.y);
}
`;

Effect.ShadersStore["grassDepthFragmentShader"] = `
precision highp float;

varying float vDepthMetric;

void main(void) {
    glFragColor = vec4(vDepthMetric, 0.0, 0.0, 1.0);
}
`;


Effect.ShadersStore["monolithDepthVertexShader"] = `
precision highp float;

attribute vec3	position;
attribute vec4	world0;
attribute vec4	world1;
attribute vec4	world2;
attribute vec4	world3;
attribute float instanceID;

uniform mat4	world;
uniform mat4	viewProjection;
uniform vec2	depthValues;

uniform float time;
uniform float animationSpeed;
uniform float animationIntensity;
uniform float baseWaveIntensity;
uniform float mouseInfluenceRadius;
uniform vec3 origin;
uniform vec3 oldOrigin;
uniform float textGlow;
uniform vec3 trail0;
uniform vec3 trail1;
uniform vec3 trail2;
uniform vec3 trail3;
uniform vec3 trail4;
uniform vec3 trail5;
uniform vec3 trail6;
uniform vec3 trail7;
uniform float mouseSpeed;
uniform vec3 cameraPos;

varying	float	vDepthMetric;

float hash(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    return fract(p * (p + p));
}
vec3 hash3(float p) {
    vec3 q = vec3(hash(p), hash(p + 1.0), hash(p + 2.0));
    return q * 2.0 - 1.0;
}

void main(void) {
	vec3 positionUpdated = position;

	mat4 finalWorld = mat4(world0, world1, world2, world3);
	finalWorld = world*finalWorld;
	vec4 worldPos = finalWorld*vec4(positionUpdated, 1.0);

	vec3 worldPos2 = finalWorld[3].xyz;

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

	vec3 originalWorldPos = worldPos.xyz;

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

	float vTrailGlow = (trailInf0 + trailInf1 * 0.9 + trailInf2 * 0.8 + trailInf3 * 0.7 +
	                    trailInf4 * 0.6 + trailInf5 * 0.5 + trailInf6 * 0.4 + trailInf7 * 0.3) * speedMultiplier;
	float scalePulse = vTrailGlow * 0.05;
	vec3 toCenter = worldPos.xyz - worldPos2;
	worldPos.xyz += toCenter * scalePulse;

	gl_Position = viewProjection*worldPos;

	vDepthMetric = ((gl_Position.z + depthValues.x)/depthValues.y);
}
`;

Effect.ShadersStore["monolithDepthFragmentShader"] = `
precision highp float;

varying float vDepthMetric;

void main(void) {
    glFragColor = vec4(vDepthMetric, 0.0, 0.0, 1.0);
}
`;

Effect.ShadersStore["cubeDepthVertexShader"] = `
precision highp float;

attribute vec3	position;
attribute vec4	world0;
attribute vec4	world1;
attribute vec4	world2;
attribute vec4	world3;
attribute float instanceID;

uniform mat4	world;
uniform mat4	viewProjection;
uniform vec2	depthValues;

uniform float time;
uniform float animationSpeed;
uniform float animationIntensity;
uniform float baseWaveIntensity;
uniform float mouseInfluenceRadius;
uniform vec3 origin;
uniform vec3 oldOrigin;
uniform float textGlow;
uniform vec3 floatingOffset;

varying	float	vDepthMetric;

float hash(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    return fract(p * (p + p));
}
vec3 hash3(float p) {
    vec3 q = vec3(hash(p), hash(p + 1.0), hash(p + 2.0));
    return q * 2.0 - 1.0;
}

void main(void) {
	vec3 positionUpdated = position;

	mat4 finalWorld = mat4(world0, world1, world2, world3);
	finalWorld = world*finalWorld;
	vec4 worldPos = finalWorld*vec4(positionUpdated, 1.0);
	worldPos.xyz += floatingOffset;

	vec3 worldPos2 = finalWorld[3].xyz;
	worldPos2 += floatingOffset;

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

	// Calculate mouse movement direction (needed for trail calculations)
	vec3 mouseMovement = origin - oldOrigin;
	float mouseSpeed = length(mouseMovement);

	// Removed all mouse displacement animations - only keeping influence for glow
	vec3 mouseAnimation = vec3(0.0);

	vec3 originalWorldPos = worldPos.xyz;

if(textGlow > 0.0) {
            float phaseOffset = hash(instanceID) * 6.28;
            float phaseAmount = sin(time * 1.5 + phaseOffset) * 0.5 + 0.5;
            
            vec3 dimensionOffset = vec3(
                sin(instanceID * 0.1) * 0.1,
                cos(instanceID * 0.13) * 0.15,
                sin(instanceID * 0.17) * 0.18
            );
            
            worldPos.xyz += dimensionOffset * phaseAmount;
}

	// === COMBINE ANIMATIONS ===
	vec3 totalDisplacement = (baseWave + (mouseAnimation * mouseInfluence)) ;
	worldPos.xyz += totalDisplacement;


	gl_Position = viewProjection*worldPos;

	vDepthMetric = ((gl_Position.z + depthValues.x)/depthValues.y);
}
`;


Effect.ShadersStore["cubeDepthFragmentShader"] = `
precision highp float;

varying float vDepthMetric;

void main(void) {
    glFragColor = vec4(vDepthMetric, 0.0, 0.0, 1.0);
}
`;


Effect.ShadersStore["defaultDepthVertexShader"] = `
precision highp float;

attribute vec3	position;
uniform mat4	world;
uniform mat4	viewProjection;
uniform vec2	depthValues;

varying float vDepthMetric;
void main() {
	gl_Position = viewProjection * world * vec4(position, 1.);
	vDepthMetric = ((gl_Position.z + depthValues.x)/depthValues.y);
}
`;

Effect.ShadersStore["defaultDepthFragmentShader"] = `
precision highp float;

varying float vDepthMetric;

void main(void) {
    glFragColor = vec4(vDepthMetric, 0.0, 0.0, 1.0);
}
`;
