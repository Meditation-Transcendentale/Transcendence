import { Effect } from "@babylonImport";

Effect.ShadersStore["waterSurfaceInteractionPixelShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

uniform sampler2D	surface;
uniform float	time;
uniform vec3	origin;
uniform float	worldSize;
uniform float	strengh;

varying vec2	vUV;

void main(void) {
	vec4 info = texture(surface, vUV);
	// vec2 pos = (vUV - 0.5) * worldSize;
	vec2 pos = origin.xy * 0.025 + 0.5;
	

	// float drop = (max(0., 1. - length(origin.xy - pos))) / max((time - origin.z) * 100., 1.);
	// float drop = max(0.0, 1. - length(origin.xy - pos) / ) /  max((time - origin.z) * 100., 1.);
	float drop = max(0.0, 1. - length(pos - vUV) / 0.03 ) * float(abs(time - origin.z) < 0.00001);// max((time - origin.z) * 100., 1.);
	// drop *= 10.;
    drop = 0.5 - cos(drop * M_PI) * 0.5;
	drop *= strengh;

	// float i = info.r + drop;
	// info.g += i - info.r;
	// info.r = i;

	info.r += drop;
	gl_FragColor = info;
}
`;

Effect.ShadersStore["waterSurfacePixelShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

uniform float		time;
uniform float		worldSize;

varying vec2	vUV;

const float	_VertexFrequency = 0.34;
const float	_VertexAmplitude = 3.;
const float	_VertexInitialSpeed = 2.;
const float	_VertexSeed = 4.;
const float	_VertexSeedIter = 4.3;
const int _VertexWaveCount = 8;
const float _VertexMaxPeak = 1.;
const float _VertexPeakOffset = 1.14;
const float _VertexDrag = 0.5;
const float _VertexFrequencyMult = 1.3211;
const float	_VertexAmplitudeMult = 0.83;
const float _VertexSpeedRamp = 1.07;


vec4	fbm(vec3 v) {
	float f = _VertexFrequency;
	float a = _VertexAmplitude;
	float speed = _VertexInitialSpeed;
	float seed = _VertexSeed;
	vec3 p = v;
	float amplitudeSum = 0.0f;

	float h = 0.0f;
	vec2 n = vec2(0.0f);
	for (int wi = 0; wi < _VertexWaveCount; ++wi) {
		vec2 d = normalize(vec2(cos(seed), sin(seed)));

		float x = dot(d, p.xz) * f + time * speed;
		float wave = a * exp(_VertexMaxPeak * sin(x) - _VertexPeakOffset);
		float dx = _VertexMaxPeak * wave * cos(x);
		
		h += wave;
		n += f * d * dx;
		
		p.xz += d * -dx * a * _VertexDrag;

		amplitudeSum += a;
		f *= _VertexFrequencyMult;
		a *= _VertexAmplitudeMult;
		speed *= _VertexSpeedRamp;
		seed += _VertexSeedIter;
	}

	vec3 ff = vec3(h, n.x, n.y) / amplitudeSum;
	// ff.x *= _VertexHeight;
	ff.x = clamp(ff.x, -1., 1.) * 0.5 + 0.5;
	vec3 normal = normalize(vec3(-ff.y, 1., -ff.z)) * 0.5 + 0.5;
	return vec4(ff.x, normal);
}

void main(void) {
	vec2 uv = (vUV - 0.5) * worldSize;
	vec4 f = fbm(vec3(uv.x, 0., uv.y));

	gl_FragColor = f;
	// gl_FragColor.a = 1.;
}
`;
