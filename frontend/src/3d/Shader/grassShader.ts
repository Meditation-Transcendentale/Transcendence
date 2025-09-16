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
void main(void) {
    vec3 viewDirectionW = normalize(vEyePosition.xyz-vPositionW);
    vec4 baseColor = vec4(1., 1., 1., 1.);
    vec3 diffuseColor = vDiffuseColor.rgb;
    float alpha = vDiffuseColor.a;
    vec3 normalW = normalize(vNormalW);
    vec2 uvOffset = vec2(0.0, 0.0);
    vec3 baseAmbientColor = vec3(1., 1., 1.);
    
    float glossiness = vSpecularColor.a;
    vec3 specularColor = vSpecularColor.rgb;
    vec3 diffuseBase = vec3(0., 0., 0.);
    lightingInfo info;
    vec3 specularBase = vec3(0., 0., 0.);
    float shadow = 1.;
    float aggShadow = 0.;
    float numLights = 0.;
    vec4 diffuse0 = light0.vLightDiffuse;
    #define CUSTOM_LIGHT0_COLOR 
    info = computeHemisphericLighting(viewDirectionW, normalW, light0.vLightData, diffuse0.rgb, light0.vLightSpecular.rgb, light0.vLightGround, glossiness);
    shadow = 1.;
    aggShadow += shadow;
    numLights += 1.0;
    diffuseBase += info.diffuse*shadow;
    specularBase += info.specular*shadow;
    aggShadow = aggShadow/numLights;
    vec4 refractionColor = vec4(0., 0., 0., 1.);
    vec4 reflectionColor = vec4(0., 0., 0., 1.);
    vec3 emissiveColor = vEmissiveColor;
    vec3 finalDiffuse = clamp(diffuseBase*diffuseColor+emissiveColor+vAmbientColor, 0.0, 1.0)*baseColor.rgb;
    vec3 finalSpecular = specularBase*specularColor;
    vec4 color = vec4(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+refractionColor.rgb, alpha);
    color.rgb *= vPositionM.y * 1. * baseColor.g;

    color.rgb = max(color.rgb, 0.);
    color.a *= visibility;

    glFragColor = color;
    
    float distToCamera = length(vPositionW.xyz - vEyePosition.xyz);
    float distToSurface = max(-vPositionW.y, 0.);
    glFragColor.rgb = clamp(glFragColor.rgb, 0., 1.);
}
`
