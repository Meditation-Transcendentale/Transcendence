import { Color3, CustomMaterial, Effect, Scene, Texture, Vector3 } from "@babylonImport"


Effect.IncludesShadersStore["noises"] = `
uint murmurHash12(uvec2 src) {
  const uint M = 0x5bd1e995u;
  uint h = 1190494759u;
  src *= M; src ^= src>>24u; src *= M;
  h *= M; h ^= src.x; h *= M; h ^= src.y;
  h ^= h>>13u; h *= M; h ^= h>>15u;
  return h;
}

// 1 output, 2 inputs
float hash12(vec2 src) {
  uint h = murmurHash12(floatBitsToUint(src));
  return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;
}

float noise12(vec2 p) {
  vec2 i = floor(p);

  vec2 f = fract(p);
  vec2 u = smoothstep(vec2(0.0), vec2(1.0), f);

  float val = mix( mix( hash12( i + vec2(0.0, 0.0) ), 
				hash12( i + vec2(1.0, 0.0) ), u.x),
		   mix( hash12( i + vec2(0.0, 1.0) ), 
				hash12( i + vec2(1.0, 1.0) ), u.x), u.y);
  return val * 2.0 - 1.0;
}

// Simplex 2D noise from patriciogonzalezvivo
// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float simplexNoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

//	Simplex 3D Noise 
//	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float simplexNoise3D(vec3 v){ 
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
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

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

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

//Curl Noise implementation based on Emil Dziewanowski article
//https://emildziewanowski.com/curl-noise/
vec2	curlSimplex(vec2 v, float delta) {
	float dX = simplexNoise(vec2(v.x + delta, v.y)) - simplexNoise(vec2(v.x - delta, v.y));
	float dY = simplexNoise(vec2(v.x, v.y + delta)) - simplexNoise(vec2(v.x, v.y - delta));
	return vec2(dY, -dX) * (1. / (2. * delta));
}

vec2	curlSimplex3D(vec3 v, float delta) {
	float dX = simplexNoise3D(vec3(v.x + delta, v.y, v.z)) - simplexNoise3D(vec3(v.x - delta, v.y, v.z));
	float dY = simplexNoise3D(vec3(v.x, v.y + delta, v.z)) - simplexNoise3D(vec3(v.x, v.y - delta, v.z));
	return vec2(dY, -dX) * (1. / (2. * delta));
}


// hash based 3d value noise
// function taken from https://www.shadertoy.com/view/XslGRr
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// ported from GLSL to HLSL

float hashPerlin( float n )
{
    return fract(sin(n)*43758.5453);
}

float perlinNoise( vec3 x )
{
    // The noise function returns a value in the range -1.0f -> 1.0f

    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;

    return mix(mix(mix( hashPerlin(n+0.0), hashPerlin(n+1.0),f.x),
                   mix( hashPerlin(n+57.0), hashPerlin(n+58.0),f.x),f.y),
               mix(mix( hashPerlin(n+113.0), hashPerlin(n+114.0),f.x),
                   mix( hashPerlin(n+170.0), hashPerlin(n+171.0),f.x),f.y),f.z);
}

// Hash by David_Hoskins
#define UI0 1597334673U
#define UI1 3812015801U
#define UI2 uvec2(UI0, UI1)
#define UI3 uvec3(UI0, UI1, 2798796415U)
#define UIF (1.0 / float(0xffffffffU))

vec3 hash33(vec3 p)
{
	uvec3 q = uvec3(ivec3(p)) * UI3;
	q = (q.x ^ q.y ^ q.z)*UI3;
	return -1. + 2. * vec3(q) * UIF;
}

float remap(float x, float a, float b, float c, float d)
{
    return (((x - a) / (b - a)) * (d - c)) + c;
}

// Gradient noise by iq (modified to be tileable)
float gradientNoise(vec3 x, float freq)
{
    // grid
    vec3 p = floor(x);
    vec3 w = fract(x);
    
    // quintic interpolant
    vec3 u = w * w * w * (w * (w * 6. - 15.) + 10.);

    
    // gradients
    vec3 ga = hash33(mod(p + vec3(0., 0., 0.), freq));
    vec3 gb = hash33(mod(p + vec3(1., 0., 0.), freq));
    vec3 gc = hash33(mod(p + vec3(0., 1., 0.), freq));
    vec3 gd = hash33(mod(p + vec3(1., 1., 0.), freq));
    vec3 ge = hash33(mod(p + vec3(0., 0., 1.), freq));
    vec3 gf = hash33(mod(p + vec3(1., 0., 1.), freq));
    vec3 gg = hash33(mod(p + vec3(0., 1., 1.), freq));
    vec3 gh = hash33(mod(p + vec3(1., 1., 1.), freq));
    
    // projections
    float va = dot(ga, w - vec3(0., 0., 0.));
    float vb = dot(gb, w - vec3(1., 0., 0.));
    float vc = dot(gc, w - vec3(0., 1., 0.));
    float vd = dot(gd, w - vec3(1., 1., 0.));
    float ve = dot(ge, w - vec3(0., 0., 1.));
    float vf = dot(gf, w - vec3(1., 0., 1.));
    float vg = dot(gg, w - vec3(0., 1., 1.));
    float vh = dot(gh, w - vec3(1., 1., 1.));
	
    // interpolation
    return va + 
           u.x * (vb - va) + 
           u.y * (vc - va) + 
           u.z * (ve - va) + 
           u.x * u.y * (va - vb - vc + vd) + 
           u.y * u.z * (va - vc - ve + vg) + 
           u.z * u.x * (va - vb - ve + vf) + 
           u.x * u.y * u.z * (-va + vb + vc - vd + ve - vf - vg + vh);
}
`;


Effect.IncludesShadersStore["rotations"] = `
vec3 rotationX(vec3 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  ) * v;
}

vec3 rotationY(vec3 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  ) * v;
}

vec3 rotationZ(vec3 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
	c, s, 0.0,
	-s, c, 0.0,
	0.0, 0.0, 1.0
  ) * v;
}

vec3 rotationAxis(vec3 v, float angle, vec3 axis) {
    float c = cos(angle);
    float s = sin(angle);
    float t = 1.0 - c;

    return mat3(
	t*axis.x*axis.x + c,        t*axis.x*axis.y - s*axis.z,  t*axis.x*axis.z + s*axis.y,
	t*axis.x*axis.y + s*axis.z, t*axis.y*axis.y + c,         t*axis.y*axis.z - s*axis.x,
	t*axis.x*axis.z - s*axis.y, t*axis.y*axis.z + s*axis.x,  t*axis.z*axis.z + c
    ) * v;
} 
`;



Effect.ShadersStore["shellVertexShader"] = `
	precision highp float;

	attribute vec3	position;
	attribute vec2	uv;
	attribute vec3	normal;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;


	varying vec2	vUV;

	void main() {
		vUV = uv;
		vec4 p = vec4(position, 1.);
		p = world * p;
		vec3 normalW = normalize(mat3(world) * normal);
		gl_Position = projection * view * p;
	}
`;

Effect.ShadersStore["shellFragmentShader"] = `
precision highp    float;

#define M_PI 3.1415926535897932384626433832795
#define AA 1.

uniform float       time;
uniform float	    rand;

uniform mat4        world;
uniform mat4        view;
uniform mat4        projection;

varying vec2    vUV;

float hash(ivec2 p )  // this hash is not production ready, please
{                         // replace this by something better

    // 2D -> 1D
    int n = p.x*3 + p.y*113;

    // 1D hash by Hugo Elias
	n = (n << 13) ^ n;
    n = n * (n * n * 15731 + 789221) + 1376312589;
    return -1.0+2.0*float( n & 0x0fffffff)/float(0x0fffffff);
}

float noise(vec2 p )
{
    ivec2 i = ivec2(floor( p ));
    vec2 f = fract( p );
	
    // cubic interpolant
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( hash( i + ivec2(0,0) ), 
                     hash( i + ivec2(1,0) ), u.x),
                mix( hash( i + ivec2(0,1) ), 
                     hash( i + ivec2(1,1) ), u.x), u.y);
}

float noise_sum(vec2 p)
{
    float f = 0.0;
    p = p * 4.0;
    f += 1.0000 * noise(p); p = 2.0 * p;
    f += 0.5000 * noise(p); p = 2.0 * p;
	f += 0.2500 * noise(p); p = 2.0 * p;
	f += 0.1250 * noise(p); p = 2.0 * p;
	f += 0.0625 * noise(p); p = 2.0 * p;
    
    return f;
}

float noise_sum_abs(vec2 p)
{
    float f = 0.0;
    p = p * 3.0;
    f += 1.0000 * abs(noise(p)); p = 2.0 * p;
    f += 0.5000 * abs(noise(p)); p = 2.0 * p;
	f += 0.2500 * abs(noise(p)); p = 2.0 * p;
	f += 0.1250 * abs(noise(p)); p = 2.0 * p;
	f += 0.0625 * abs(noise(p)); p = 2.0 * p;
    
    return f;
}

float noise_sum_abs_sin(vec2 p)
{
    float f = noise_sum_abs(p);
    f = sin(f * 2.5 + p.x * 5.0 - 1.5);
    
    return f ;
}

void main() {
	vec2 p = vUV * SIZE * 0.01;

	vec2 uv = p*vec2(5.) + (time * DIR) * (1. / SIZE);
	float t = (noise(time * 10. * p.yx) * 0.5 + 0.5) * 0.1;
	float f = 0.0;

   	f = noise_sum_abs( 15.0*uv );

	f = 0.5 + 0.5*f;
	//f = floor(f * 1.2);
	if (f < CEIL + t) {discard;}
	vec3 col  = vec3(min(1., (1. - f) * 2.));
	// float alpha = f * 0.5;
	gl_FragColor = vec4(col *col, 1.);
}`;


Effect.ShadersStore['WindHeightPixelShader'] = `
precision highp float;

#include<noises>

float height(vec3 v) {
	return (gradientNoise(v * 4., 4.) + 0.25 * gradientNoise(v * 8., 8.) + 0.5 * gradientNoise(v * 16., 16.)) * (1. / 1.75);
}

float wind(vec3 v) {
	return (gradientNoise(v * 4., 4.) + 0.5 * gradientNoise(v * 8., 8.) + 0.25 * gradientNoise(v * 16., 16.)) * (1. / 1.75);
}

varying vec2 vUV;
void main(void) {
	vec3 uv = vec3(vUV.x, 0, vUV.y);
	gl_FragColor = vec4(wind(uv) * 0.5 +0.5, height(uv + vec3(173437.,0., 3348.)) * 0.5 + 0.5, 0.0, 1.);
	//gl_FragColor = vec4(height(uv) * 0.5 +0.5, height(uv) * 0.5 + 0.5, 0.0, 1.);
}
`



export class GrassShader extends CustomMaterial {
	constructor(name: string, scene: Scene, texture: Texture) {
		super(name, scene);
		this.AddUniform('time', 'float', 0.0);
		this.AddUniform('oldTime', 'float', 0.0);
		this.AddUniform("origin", 'vec3', null);
		this.AddUniform('tNoise', 'sampler2D', texture);

		this.AddAttribute('baseColor');
		this.AddAttribute('uv');


		this.Vertex_Begin(
			`
			#define UV1 1
			#define MAINUV1 1
			#define NORMAL
			#define M_PI 3.1415926535897932384626433832795

			varying vec3 vPositionM;
			`
		)

		this.Vertex_Definitions(
			`
			attribute vec4 baseColor;
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
				float dist_fall = trunc_fallof(min(2., L), 2.);
				// dist_fall *= 2.;
				return	vec3(d,  trunc_fallof(min(l, t), l) * dist_fall);
			}

			float gain( float x, float k ) 
			{
			    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
			    return (x<0.5)?a:1.0-a;
			}

			float tone( float x, float k )
			{
			    return (k+1.0)/(1.0+k*x);
			}

			float simplexOctave(vec2 v) {
				return (simplexNoise(v) + 0.5 * simplexNoise(v * 2.) + 0.25 * simplexNoise(v * 4.)) * (1. / 1.75);
			}
		`
		);

		this.Vertex_Before_PositionUpdated(
			`
				vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
				vec2 windDir = vec2(1., 0.);

				vec4 noiseA = texture2D(tNoise, pos * 0.02 - time * windDir * 0.3);
				vec4 noiseB = texture2D(tNoise, pos * 0.04);
			
				// vec2 curl = curlSimplex(pos * 0.1 - vec2(time * 0.2, 0.), 1.);
				// float strengh = length(curl);
				// vec2 windDir = curl / strengh;

				float strengh = simplexOctave(pos * 0.05 - time * windDir * 0.3);
				// float strengh = noiseA.r * 2. - 1.;
				// strengh *= uv.y;// * uv.y ;
				// strengh *= gain(uv.y, 3.);
				strengh *= position.y;
				

				// strengh *= abs(dot(rotationY(normal, baseColor.r).xz, windDir)) * 0.5 + 0.5; // grass parallel to wind are less bend
				strengh *= baseColor.a; //apply blade stiffness
				// strengh *= M_PI * 0.5;
				
				vec3 totalWave = vec3(0.);
				//for (int i = 0; i < 1; i++) {
					vec3 wave = computeWave(origin, pos);
					totalWave = mix(totalWave, wave, step(totalWave.z, wave.z));
				//}

				positionUpdated = rotationY(positionUpdated, baseColor.r);

				// float waveHeightFactor = ((1. - uv.y) * 0.5 + 0.5) * float(uv.y > 0.01);
				// positionUpdated.y *= max(1. - totalWave.z, 0.) * baseColor.a;
				// positionUpdated.xz += vec2(-totalWave.x, totalWave.y) * totalWave.z * uv.y * baseColor.a;
				positionUpdated = rotationAxis(positionUpdated,  totalWave.z * baseColor.a * M_PI* 0.5 , vec3(-totalWave.y, 0., -totalWave.x));
				positionUpdated = (position.y > 0.1 ? rotationAxis(positionUpdated, strengh, vec3(windDir.y, 0., windDir.x)) : positionUpdated);



				vPositionM = position;

		`);

		this.Vertex_After_WorldPosComputed(`
				worldPos.y += noiseB.g * 1.5;
		`)

		this.Vertex_Before_NormalUpdated(
			`
				vec3 viewDir = vEyePosition.xyz - vec3(pos.x, 0., pos.y) ;
				normalUpdated = normalize(vec3(viewDir.x, 0., viewDir.z));
				// normalUpdated = rotationY(normalUpdated, M_PI * 0.05 * (uv.x * 2. - 1.)); //Rounded Normal
				// normalUpdated = rotationAxis(normalUpdated, totalWave.z * M_PI* 0.5 , vec3(-totalWave.y, 0., -totalWave.x));
				// normalUpdated = rotationAxis(normalUpdated, totalWave.z * baseColor.a * M_PI* 0.5 , vec3(-totalWave.y, 0., -totalWave.x));
				normalUpdated = rotationAxis(normalUpdated, strengh, vec3(windDir.y, 0., windDir.x));
				normalUpdated.y = abs(normalUpdated.y);
		`
		)


		//NORMAL IN FRAGMENT
		this.Fragment_Before_Lights(`
			// normalW = normalize(cross(dFdx(vPositionW), dFdy(vPositionW)));
			// normalW.y = abs(normalW.y);
			// vec3 nor = rotationY(normalW, M_PI * 0.5 * (vMainUV1.x * 2. - 1.)); //Rounded Normal
			// normalW = rotationAxis(vPositionM,M_PI * 0.1 * (vMainUV1.x * 2. - 1.), normalW );
			// float ddt = dot(nor, normalW);
		`)

		this.name = "grass";
		this.Fragment_Begin(`
			#define NORMAL
			#define MAINUV1 1
			#define M_PI 3.1415926535897932384626433832795

			varying vec3 vPositionM;
		`
		);

		this.VertexShader = `
			#define CUSTOM_VERTEX_EXTENSION
			#include<__decl__defaultVertex>
			#define CUSTOM_VERTEX_BEGIN
			attribute vec3 position;
			#ifdef NORMAL
			attribute vec3 normal;
			#endif
			#ifdef TANGENT
			attribute vec4 tangent;
			#endif
			#ifdef UV1
			attribute vec2 uv;
			#endif
			#include<uvAttributeDeclaration>[2..7]
			#ifdef VERTEXCOLOR
			attribute vec4 color;
			#endif
			#include<helperFunctions>
			#include<bonesDeclaration>
			#include<bakedVertexAnimationDeclaration>
			#include<instancesDeclaration>
			#include<prePassVertexDeclaration>
			#include<mainUVVaryingDeclaration>[1..7]
			#include<samplerVertexDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse)
			#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
			#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
			#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
			#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
			#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
			#if defined(SPECULARTERM)
			#include<samplerVertexDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular)
			#endif
			#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
			#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)
			varying vec3 vPositionW;
			#ifdef NORMAL
			varying vec3 vNormalW;
			#endif
			#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
			varying vec4 vColor;
			#endif
			#include<bumpVertexDeclaration>
			#include<clipPlaneVertexDeclaration>
			#include<fogVertexDeclaration>
			#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
			#include<morphTargetsVertexGlobalDeclaration>
			#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
			#ifdef REFLECTIONMAP_SKYBOX
			varying vec3 vPositionUVW;
			#endif
			#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
			varying vec3 vDirectionW;
			#endif
			#include<logDepthDeclaration>
			#define CUSTOM_VERTEX_DEFINITIONS
			void main(void) {
			    #define CUSTOM_VERTEX_MAIN_BEGIN
			    vec3 positionUpdated = position;
			    #ifdef NORMAL
			    vec3 normalUpdated = normal;
			    #endif
			    #ifdef TANGENT
			    vec4 tangentUpdated = tangent;
			    #endif
			    #ifdef UV1
			    vec2 uvUpdated = uv;
			    #endif
			    #ifdef UV2
			    vec2 uv2Updated = uv2;
			    #endif
			    #include<morphTargetsVertexGlobal>
			    #include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
			    #ifdef REFLECTIONMAP_SKYBOX
			    vPositionUVW = positionUpdated;
			    #endif
			    #include<instancesVertex>
			    #define CUSTOM_VERTEX_UPDATE_POSITION
			    #define CUSTOM_VERTEX_UPDATE_NORMAL
			    #if defined(PREPASS) && ((defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)) && !defined(BONES_VELOCITY_ENABLED)
			    vCurrentPosition = viewProjection * finalWorld * vec4(positionUpdated, 1.0);
			    vPreviousPosition = previousViewProjection * finalPreviousWorld * vec4(positionUpdated, 1.0);
			    #endif
			    #include<bonesVertex>
			    #include<bakedVertexAnimation>
			    vec4 worldPos = finalWorld * vec4(positionUpdated, 1.0);
			    #ifdef NORMAL
			    mat3 normalWorld = mat3(finalWorld);
			    #if defined(INSTANCES) && defined(THIN_INSTANCES)
			    vNormalW = normalUpdated / vec3(dot(normalWorld[0], normalWorld[0]), dot(normalWorld[1], normalWorld[1]), dot(normalWorld[2], normalWorld[2]));
			    vNormalW = normalize(normalWorld * vNormalW);
			    #else
			    #ifdef NONUNIFORMSCALING
			    normalWorld = transposeMat3(inverseMat3(normalWorld));
			    #endif
			    vNormalW = normalize(normalWorld * normalUpdated);
			    #endif
			    #endif
			    #define CUSTOM_VERTEX_UPDATE_WORLDPOS
			    #ifdef MULTIVIEW
			    if (gl_ViewID_OVR == 0u) {
				gl_Position = viewProjection * worldPos;
			    } else {
				gl_Position = viewProjectionR * worldPos;
			    }
			    #else
				gl_Position = viewProjection * worldPos;
				//gl_Position = view * worldPos; //CHANGED------------------------------------------------------------------
				//gl_Position.x += viewCorrection * (uv.x * 2. - 1.) * (1. - uv.y) * 0.01;
				//gl_Position = projection * gl_Position;
			    #endif
			    vPositionW = vec3(worldPos);
			    #ifdef PREPASS
			    #include<prePassVertex>
			    #endif
			    #if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
			    vDirectionW = normalize(vec3(finalWorld * vec4(positionUpdated, 0.0)));
			    #endif
			    #ifndef UV1
			    vec2 uvUpdated = vec2(0., 0.);
			    #endif
			    #ifndef UV2
			    vec2 uv2Updated = vec2(0., 0.);
			    #endif
			    #ifdef MAINUV1
			    vMainUV1 = uvUpdated;
			    #endif
			    #ifdef MAINUV2
			    vMainUV2 = uv2Updated;
			    #endif
			    #include<uvVariableDeclaration>[3..7]
			    #include<samplerVertexImplementation>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_MATRIXNAME_,diffuse,_INFONAME_,DiffuseInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
			    #if defined(SPECULARTERM)
			    #include<samplerVertexImplementation>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_MATRIXNAME_,specular,_INFONAME_,SpecularInfos.x)
			    #endif
			    #include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
			    #include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)
			    #include<bumpVertex>
			    #include<clipPlaneVertex>
			    #include<fogVertex>
			    #include<shadowsVertex>[0..maxSimultaneousLights]
			    #include<vertexColorMixing>
			    #include<pointCloudVertex>
			    #include<logDepthVertex>
			    #define CUSTOM_VERTEX_MAIN_END
			}
		`;

		this.Fragment_MainEnd(`
			// gl_FragColor.rgb *= vPositionM.y * 1.5 * baseColor.g;
			// gl_FragColor.rgb = vec3(floor(gl_FragColor.r * 4. + 0.5) * (1. / 4.));
			// gl_FragColor.rgb = vec3(vMainUV1, 0.);
			// gl_FragColor.rgb = vec3(normalW * 0.5 + 0.5);
			// gl_FragColor.rgb = vec3(ddt);
			// gl_FragColor.rgb = vec3(vPositionM.rg, 0.);
		`)

		this.Fragment_Before_Fog(`
			color.rgb *= vPositionM.y * 1. * baseColor.g;
		`)

		//console.log(this.FragmentShader);

		//this.twoSidedLighting = true;
		// this.specularPower = 1000;
		this.backFaceCulling = false;
		this.twoSidedLighting = false;

		// this.emissiveColor = new Color3(0.3, 0.3, 0.3);

		this.specularPower = 16;
		// this.specularColor = new Color3(2., 2., 2.);

	}

	setFloat(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
		});
	}

	setVec3(name: string, value: Vector3) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setVector3(name, value);
			//console.log(this.getEffect().defines);
		});
	}


	setFloatArray3(name: string, values: number[]) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloatArray3(name, values);
		});
	}


}

export class PuddleMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene, origins: number[]) {
		super(name, scene);

		this.AddUniform("origins[20]", 'vec3', origins);
		this.AddUniform('time', 'float', 1.0);


		this.Vertex_Definitions(
			`
			float trunc_fallof( float x, float m )
			{
				x /= m;
				return (x-2.0)*x+1.0;
			}

			float computeWave (vec3 origin) {
				vec2	v = position.xz - origin.xy;
				float	L = length(v) * 0.05;
				float	t = time - origin.z;
				float	l = 1.;
			
			 	float	freq = 250. * (L - 0.2 * t);
				float	wave = sin(freq) / freq;
				return wave * trunc_fallof(min(l, t), l) * float(L - 0.02 < 0.2 * t);
			}

		`);

		this.Vertex_Before_PositionUpdated(`

				float	totalWave = 0.;
				for (int i = 0; i < 20; i++) {
					totalWave += computeWave(origins[i]);
				}

				positionUpdated.y = totalWave * 0.05;
				positionUpdated.y = clamp(positionUpdated.y, -0.3, 0.3);// * 0.2;
		`);

		this.Fragment_Before_Lights(`
			normalW = normalize(cross(dFdy(vPositionW), dFdx(vPositionW)));
		`)
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
}


export class DitherMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1.0);
		this.AddUniform('on', 'float', 0.);

		this.AddAttribute('uv');

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1

		`)

		this.Fragment_Begin(`
			#define MAINUV1 1
		`)

		this.Fragment_Definitions(`
			#include<noises>

			`)

		this.Fragment_MainEnd(`
		// float f = noise(vMainUV1 * 1000.) * 0.5 + 0.5;
		gl_FragColor.rgb = (on > 0. ? vec3(0.,0.,gradientNoise(vPositionW.xyz + time * 1000., 4.) * 0.5 +0.5) : gl_FragColor.rgb);
		//vec3 dith = min(vec3(1., 1., 1.),   gl_FragColor.rgb);
		// dith = floor(dith * 8. + 0.5) * (1. / 8.);
		//gl_FragColor.rgb = (dith - 0.5) * 1.6 + 0.5; //Apply contrast
		// gl_FragColor.rgb = vec3(vMainUV1, 0.);
		
			// gl_FragColor.rgb = vec3(vNormalW * 0.5 + 0.5);
		`)

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
}


export class ButterflyMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1.0);

		this.AddAttribute('uv');
		this.AddAttribute('move');
		this.AddAttribute('direction');

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1
			#define M_PI 3.1415926535897932384626433832795

			attribute vec3	move;
			attribute vec2	direction;
		`)

		this.Vertex_Definitions(`
			#include<rotations>
			#include<noises>
		`)

		this.Vertex_Before_PositionUpdated(`
			float flap = sin((time + hash12(vec2(float(gl_InstanceID)))) * 15. + position.x * 2.);
			positionUpdated.xyz = rotationX(positionUpdated.xyz, flap * sign(position.z) * M_PI * 0.5);
			float alpha = atan(direction.x, dot(direction, vec2(.0, 1.)));
			positionUpdated = rotationY(positionUpdated, alpha + M_PI * 0.5);
		`)

		this.Vertex_After_WorldPosComputed(`
			worldPos.xyz += move;
		`)


		this.Fragment_Begin(`
			#define MAINUV1 1
		`)

		this.Fragment_MainEnd(`
			gl_FragColor.rgb *= (vPositionW.y < 0.6 ? vec3(1., 0.1, 0.1) : vec3(1.));
		`)

		this.emissiveColor = new Color3(0.5, 0.1, 0.1);
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
}


