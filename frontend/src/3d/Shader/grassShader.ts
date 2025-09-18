import { Effect } from "@babylonImport";

Effect.ShadersStore["grassVertexShader"] = `
precision highp float;

// const float PI = 3.1415926535897932384626433832795;
// const float TWO_PI = 6.283185307179586;
// const float HALF_PI = 1.5707963267948966;
// const float RECIPROCAL_PI = 0.3183098861837907;
// const float RECIPROCAL_PI2 = 0.15915494309189535;
// const float RECIPROCAL_PI4 = 0.07957747154594767;

#define M_PI 3.1415926535897932384626433832795
#define HALF_PI  1.5707963267948966

attribute vec3	position;
attribute vec3	normal;
attribute vec2	uv;
attribute vec4	world0;
attribute vec4	world1;
attribute vec4	world2;
attribute vec4	world3;
attribute vec4	baseColor;

uniform mat4	world;
uniform mat4	viewProjection;
uniform float	time;
uniform vec3	origin;

varying	vec2	vUV;
varying vec3	vPositionW;
varying vec3	vNormalW;

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


void main(void) {
    vec3 positionUpdated = position;
    vec3 normalUpdated = normal;
	
    mat4 finalWorld = mat4(world0, world1, world2, world3);
    finalWorld = world*finalWorld;

	vec2 pos = finalWorld[3].xz;
    // vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
    vec2 windDir = vec2(-1., 0.);
    
    float strengh = simplexOctave(pos * 0.05 - time * windDir * 0.3);
    
    strengh *= position.y;
    
    strengh *= baseColor.a;
    //apply blade stiffness
    
    vec3 totalWave = vec3(0.);
    
    vec3 wave = computeWave(origin, pos);
    totalWave = mix(totalWave, wave, step(totalWave.z, wave.z));
    
    positionUpdated = rotationY(positionUpdated, baseColor.r);
    
    positionUpdated = rotationAxis(positionUpdated, totalWave.z * baseColor.a * HALF_PI, vec3(-totalWave.y, 0., -totalWave.x));
    positionUpdated = (position.y > 0.1 ? rotationAxis(positionUpdated, strengh, vec3(windDir.y, 0., windDir.x)) : positionUpdated);
    vPositionM = position;
    vec3 viewDir = vEyePosition.xyz - vec3(pos.x, 0., pos.y) ;
    normalUpdated = normalize(vec3(viewDir.x, 0., viewDir.z));
    
    normalUpdated = rotationAxis(normalUpdated, strengh, vec3(windDir.y, 0., windDir.x));
    normalUpdated.y = abs(normalUpdated.y);
    vec4 worldPos = finalWorld * vec4(positionUpdated, 1.0);
    mat3 normalWorld = mat3(finalWorld);
    vNormalW = normalUpdated / vec3(dot(normalWorld[0], normalWorld[0]), dot(normalWorld[1], normalWorld[1]), dot(normalWorld[2], normalWorld[2]));
    vNormalW = normalize(normalWorld * vNormalW);
    
    gl_Position = viewProjection * worldPos;
    
    vPositionW = vec3(worldPos);
    vMainUV1 = uvUpdated;
	vUV = uv;
}`;

Effect.ShadersStore["grassFragmentShader"] = `

layout(std140) uniform data {
	float	noiseOffset;
	float	stepSize;
	float	maxDistance;
	float	worldSize;
	float	waterHeight;
	float	waveMaxDisplacement;
	float	density;
	float	lightScattering;
	float	ambientMultiplier;
	vec3	waterAbsorption;
};

struct lightingInfo {
    vec3 diffuse;
    vec3 specular;
};

lightingInfo	blinnPhong(vec3 normal, vec3 viewDir, vec3 lightIntensity, vec3 specularIntensity) {
    lightingInfo    info;

    float NdotL = clamp(dot(normal, lightDir), 0., 1.);
    info.diffuse = NdotL * lightDiffuseColor * lightIntensity;

    vec3 h = normalize(lightDir + viewDir);
    float NdotH = clamp(dot(normal, h), 0., 1.);
    info.specular = pow(NdotH, glossiness) * specularColor * specularIntensity;
}

float waterSdf(vec3 p, float h) {
	p.y -= waterHeight * 0.5;
	vec3 q = abs(p) - vec3(worldSize * 0.5, h * 0.5, worldSize * 0.5);
	return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

vec3 computeSunIntensity(vec3 position) {
    float h = texture(surfaceTexture, p.xz * (1. / worldSize) + 0.5).r  * waveMaxDisplacement + waterHeight;
    float s = waterSdf(p, p.y > 0. ? h : waterHeight);
    float d = density * float(s < 0.);

    uv = (p.xz + (h - p.y) * 0.2)* (1. / worldSize) + 0.5;

    vec3 sun = ambientMultiplier * texture(surfaceTexture, uv).r * exp(d * (h - p.y) * -waterAbsorption) * float(s < 0.) * \
		float(dot(step(uv, vec2(1.)),step(-uv, vec2(0.))) == 2.);

    return clamp(sun, vec3(0.), vec3(1.));
}

void main(void) {
    vec3 viewDirectionW = normalize(vEyePosition.xyz-vPositionW);
    vec3 normalW = normalize(vNormalW);

    vec3 sunIntensity = computeSunIntensity(vPositionW);
    lightInfo light = blinnPhong(normalW, viewDirectionW, sunIntensity, sunIntensity);

    vec3    color = diffuseColor * light.diffuse + specularColor * light.info;
    color.rgb *= vPositionM.y * 1. * baseColor.g;
    
    gl_FragColor.rgb = color;
    gl_FragColor.a = 1.;
    
}
`;
