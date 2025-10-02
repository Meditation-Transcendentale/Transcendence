import { Effect } from "../../babylon";

Effect.ShadersStore["heightFragmentShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795

uniform float		time;
uniform float		worldSize;

varying vec2	vUV;

uniform float	initialSpeed;
uniform float	speedRamp;

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
	float speed = initialSpeed;
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
		speed *= speedRamp;
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

Effect.ShadersStore["surfaceFragmentShader"] = `
precision highp	float;

uniform sampler2D	heightTexture;
uniform float		delta;
uniform float		time;

varying vec2	vUV;

const mat3 Sx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 );
const mat3 Sy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 );

void main() {
	vec2 dx = vec2(delta, 0.);
	vec2 dy = vec2(0., delta);

	float center = texture(heightTexture, vUV).r;
	
	float c00 = texture(heightTexture, vUV -dx + dy).r;
	float c01 = texture(heightTexture, vUV -dx).r;
	float c02 = texture(heightTexture, vUV -dx - dy).r;

	float c10 = texture(heightTexture, vUV  - dy).r;
	float c11 = center;
	float c12 = texture(heightTexture, vUV  + dy).r;

	float c20 = texture(heightTexture, vUV + dx - dy).r;
	float c21 = texture(heightTexture, vUV + dx).r;
	float c22 = texture(heightTexture, vUV + dx + dy).r;

	float xSobel = Sx[0][0] * c00 + Sx[1][0] * c01 + Sx[2][0] * c02 + \
				Sx[0][1] * c10 + Sx[1][1] * c11 + Sx[2][1] * c12 + \
				Sx[0][2] * c20 + Sx[1][2] * c21 + Sx[2][2] * c22;
	
	float ySobel = Sy[0][0] * c00 + Sy[1][0] * c01 + Sy[2][0] * c02 + \
                      Sy[0][1] * c10 + Sy[1][1] * c11 + Sy[2][1] * c12 + \
                      Sy[0][2] * c20 + Sy[1][2] * c21 + Sy[2][2] * c22;

	float edge = sqrt(pow(xSobel, 2.) + pow(ySobel, 2.));
	gl_FragColor.r = center;
	gl_FragColor.g = edge;
}
`;

Effect.ShadersStore["surfaceFragmentShader"] = `
vec4 permute_3d(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt3d(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

uniform sampler2D	heightTexture;
uniform float		delta;
uniform float		time;

varying vec2	vUV;

float simplexNoise3d(vec3 v)
{
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute_3d( permute_3d( permute_3d( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt3d(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

float fbm3d(vec3 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);

    
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * simplexNoise3d(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

vec3 rotateZ(vec3 v, float angle) {
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    return vec3(
        v.x * cosAngle - v.y * sinAngle,
        v.x * sinAngle + v.y * cosAngle,
        v.z
    );
}

float facture(vec3 vector) {
    vec3 normalizedVector = normalize(vector);

    return max(max(normalizedVector.x, normalizedVector.y), normalizedVector.z);
}

vec3 emission(vec3 color, float strength) {
    return color * strength;
}

void main(void)
{
    // Normalized pixel coordinates (from 0 to 1) and (from -1 to 1)
    // vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
	vec2 uv = vUV * 2. - 1.;
    

    vec3 color = vec3(uv.xy, 0.0);
    color.z += 0.5;
    
    color = normalize(color);
    color -= 0.2 * vec3(0.0, 0.0, time * 0.2);
    
    float angle = -log2(length(uv)); // log base 0.5
    
    color = rotateZ( color, angle );
    
    float frequency = 1.4;
    float distortion = 0.01;
    color.x = fbm3d(color * frequency + 0.0, 5) + distortion;
    color.y = fbm3d(color * frequency + 1.0, 5) + distortion;
    color.z = fbm3d(color * frequency + 2.0, 5) + distortion;
    vec3 noiseColor = color; // save
    
    noiseColor *= 2.0;
    noiseColor -= 0.1;
    noiseColor *= 0.188;
    noiseColor += vec3(uv.xy, 0.0);
    
    float noiseColorLength = length(noiseColor);
    noiseColorLength = 0.770 - noiseColorLength;
    noiseColorLength *= 4.2;
    noiseColorLength = pow(noiseColorLength, 1.0);
    
    
    vec3 emissionColor = emission(vec3(0.961,0.592,0.078), noiseColorLength * 0.4);
    
    
    float fac = length(uv) - facture(color + 0.32);
    fac += 0.1;
    fac *= 3.0;
    
   color = mix(emissionColor, vec3(fac), fac + 1.2);
    
    color = mix(color, vec3(0), fac); // black style
	float ff = color.b;//clamp(color.r * 2., 0., 1.);
	//ff = pow(ff, 4.);
	ff = clamp(ff, 0., 1.);
	// ff *= 0.5;


    // Output to screen
    gl_FragColor = vec4(color, 1.0);
    gl_FragColor.rgb = vec3(ff);
}
`
