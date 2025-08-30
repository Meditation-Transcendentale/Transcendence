import { Effect } from "@babylonImport";


Effect.ShadersStore["waterSurfaceFragmentShader"] = `
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

Effect.ShadersStore["waterSurfaceNormalFragmentShader"] = `
precision highp	float;

uniform sampler2D	surface;
uniform float	delta;

varying vec2	vUV;

void main(void) {
	vec4 center = texture2D(surface, vUV);
	
	vec3 dx = vec3(delta, texture(surface, vUV + vec2(delta, 0.)).r - center.r, 0.0);
	vec3 dy = vec3(0.0, texture(surface, vUV + vec2(0., delta)).r - center.r, delta);

	center.bga = normalize(cross(dy, dx)) * 0.5 + 0.5;

	gl_FragColor = center;
}
`;

Effect.ShadersStore["waterSurfaceCausticFragmentShader"] = `
precision highp	float;

uniform sampler2D	surface;
uniform float	delta;

varying vec2	vUV;

const mat3 Sx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 );
const mat3 Sy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 );

void main() {
	vec2 dx = vec2(delta, 0.);
	vec2 dy = vec2(0., delta);

	float center = texture(surface, vUV).r;
	
	float c00 = texture(surface, vUV -dx + dy).r;
	float c01 = texture(surface, vUV -dx).r;
	float c02 = texture(surface, vUV -dx - dy).r;

	float c10 = texture(surface, vUV  - dy).r;
	float c11 = center;
	float c12 = texture(surface, vUV  + dy).r;

	float c20 = texture(surface, vUV + dx - dy).r;
	float c21 = texture(surface, vUV + dx).r;
	float c22 = texture(surface, vUV + dx + dy).r;

	float xSobel = Sx[0][0] * c00 + Sx[1][0] * c01 + Sx[2][0] * c02 + \
				Sx[0][1] * c10 + Sx[1][1] * c11 + Sx[2][1] * c12 + \
				Sx[0][2] * c20 + Sx[1][2] * c21 + Sx[2][2] * c22;
	
	float ySobel = Sy[0][0] * c00 + Sy[1][0] * c01 + Sy[2][0] * c02 + \
                      Sy[0][1] * c10 + Sy[1][1] * c11 + Sy[2][1] * c12 + \
                      Sy[0][2] * c20 + Sy[1][2] * c21 + Sy[2][2] * c22;

	float edge = sqrt(pow(xSobel, 2.) + pow(ySobel, 2.));
	gl_FragColor.rgb = vec3(edge);
	gl_FragColor.a = 1.;
}
`
