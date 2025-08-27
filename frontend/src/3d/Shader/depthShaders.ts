import { Effect } from "@babylonImport";

Effect.ShadersStore["grassDepthVertexShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

attribute vec3	position;
attribute vec4	world0;
attribute vec4	world1;
attribute vec4	world2;
attribute vec4	world3;
attribute vec4	baseColor;

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
	
	vec3 totalWave = vec3(0.);
	vec3 wave = computeWave(origin, pos);
	totalWave = mix(totalWave, wave, step(totalWave.z, wave.z));


	positionUpdated = rotationY(positionUpdated, baseColor.r);

	positionUpdated = rotationAxis(positionUpdated,  totalWave.z * baseColor.a * M_PI* 0.5 , vec3(-totalWave.y, 0., -totalWave.x));
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
uniform float	time;
uniform float	animationSpeed;
uniform float	animationIntensity;
uniform float	baseWaveIntensity;
uniform float	mouseInfluenceRadius;
uniform vec3	worldCenter;
uniform vec3	origin;


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

void	main(void) {
	vec3 positionUpdated = position;
	mat4 finalWorld = mat4(world0, world1, world2, world3);
	finalWorld = world * finalWorld;

	vec3 worldPos2 = finalWorld[3].xyz;
	
	// Random per-voxel offset
	vec3 animOffset = hash3(instanceID);
	float t = time * animationSpeed;
	
	// === BASE WAVE ANIMATION (Always Active) ===
	// Subtle wave that moves through the entire structure
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
	
	// Enhanced mouse animation
	vec3 mouseDirection = normalize(worldPos2 - origin + vec3(0.001)); // Avoid zero division
	vec3 mouseAnimation = vec3(
		sin(t * 3.0 + animOffset.x * 6.28) * animOffset.x,
		sin(t * 2.5 + animOffset.y * 6.28) * animOffset.y,
		cos(t * 2.8 + animOffset.z * 6.28) * animOffset.z
	) * animationIntensity;
	
	// Add radial push/pull effect
	float radialPulse = sin(t * 4.0 - distanceToMouse * 2.0) * 0.3;
	mouseAnimation += mouseDirection * radialPulse * animationIntensity;
	
	// === COMBINE ANIMATIONS ===
	vec3 totalDisplacement = baseWave + (mouseAnimation * mouseInfluence);
	

	vec4 worldPos = finalWorld * vec4(positionUpdated, 1.);
	worldPos.xyz += totalDisplacement;
	gl_Position = viewProjection * worldPos;
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
