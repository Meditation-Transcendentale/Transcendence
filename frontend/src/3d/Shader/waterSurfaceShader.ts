import { Effect } from "@babylonImport";

Effect.ShadersStore["waterSurfacePixelShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

uniform sampler2D	surface;

uniform float		time;
uniform float		deltaTime;
uniform vec3		cursor;
uniform float		delta;
uniform int		start;

varying vec2	vUV;

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

void main(void) {
	vec4 info  = texture2D(surface, vUV);
	info.rg -= 0.5;
	
	vec2 dx = vec2(delta, 0.);
	vec2 dy = vec2(0., delta);

	vec2 ddx = vec2(delta * 40., 0.);
	vec2 ddy = vec2(0., delta * 40.);

	vec2 uv = vUV * 40. - 20.;
	float drop = (max(0., 1. - length(cursor.xy - uv))) / max((time - cursor.z) * 100., 1.);
	// drop = 0.5 - cos(drop * 5. * M_PI) * 0.5;
	drop *= 0.1;

	// float drop = computeWave(cursor, vUV * 40. - 20.).z;
	
	// float ncursor = (max(0., 1. - length(cursor.xy - uv - ddx)) + max(0., 1. - length(cursor.xy - uv + ddx)) + max(0., 1. - length(cursor.xy - uv + ddy))+ max(0., 1. - length(cursor.xy - uv - ddy))) / max((time - cursor.z) * 100., 1.);

	float average = (texture2D(surface, vUV - dx).r + texture2D(surface, vUV + dx).r + texture2D(surface, vUV - dy).r + texture2D(surface, vUV + dy).r) - 2.;
	// average += ncursor * 0.01;
	
	// const float waveS2 = 0.01;
	// const float k = 0.5;
	// float f = (waveS2 * (average - 4. * info.r)) / (delta * delta);
	// // float f = (waveS2 * (average - 4. * info.r)) / (delta * delta * 4.);
	// float damp = -k * f;
	// info.g += (f) * deltaTime;
	// info.g *= 0.995;
	// info.r += info.g * deltaTime;

	info.g += (average * 0.25 + drop - info.r);
	// info.g = min(info.g, 1.);
	info.g *= 0.995;
	info.r += info.g;

	info.rg += 0.5;
	// info.r += drop;
	// info.rg = - info.rg;

	// info.rg = time < 10. ? vec2(0., 0.) : info.rg;
	gl_FragColor = clamp(info, 0., 1.);
	// gl_FragColor = info;
	gl_FragColor.a = 1.;
}
`;
