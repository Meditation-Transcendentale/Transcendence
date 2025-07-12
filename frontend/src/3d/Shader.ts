import { CustomMaterial, Effect, Scene } from "@babylonImport"


Effect.IncludesShadersStore["noises"] = `
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

//Curl Noise implementation based on Emil Dziewanowski article
//https://emildziewanowski.com/curl-noise/
vec2	curlSimplex(vec2 v, float delta) {
	float dX = simplexNoise(v.x + delta, v.y) - simplexNoise(v.x - delta, v.y);
	float dY = simplexNoise(v.x, v.y + delta) - simplexNoise(v.x, v.y - delta);
	return vec2(dY, -dX) * (1. / (2. * delta));
}
`;


Effect.IncludesShadersStore["rotation"] = `

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
}`



export class GrassShader extends CustomMaterial {
	constructor(name: string, scene?: Scene) {
		super(name, scene);
		this.AddUniform('time', 'float', 0.0);
		this.AddUniform('oldTime', 'float', 0.0);
		this.AddUniform("origins[20]", 'vec3', null);

		this.Vertex_Begin(
			`
			// #define VERTEXCOLOR 1
			#define UV1 1
			#define MAINUV1 1
			#define M_PI 3.1415926535897932384626433832795

			varying vec3 vPositionM;
			`
		)

		this.Vertex_Definitions(
			`
			attribute vec4 baseColor;
			// attribute float stiffness;
			// attribute vec2 uv;

			const vec3 endColor = vec3(0.46, 0.77, 0.06);

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
				// return vec3(d, trunc_fallof(L, 10.) * 0.2 * trunc_fallof(t, 2.));
				// float	wave = sin(freq) / freq;
				// return d * trunc_fallof(L, 10.) * 0.2 * trunc_fallof(t, 2.);
				float dist_fall = trunc_fallof(min(2., L), 2.);
				// dist_fall *= 2.;
				return	vec3(d,  trunc_fallof(min(l, t), l) * dist_fall);//float(L * 0.05 - 0.02 < 0.2 * t));
			}

			vec3 rotationAxis(vec3 axis, float angle, vec3 v) {
			    float c = cos(angle);
			    float s = sin(angle);
			    float t = 1.0 - c;

			    return mat3(
				t*axis.x*axis.x + c,        t*axis.x*axis.y - s*axis.z,  t*axis.x*axis.z + s*axis.y,
				t*axis.x*axis.y + s*axis.z, t*axis.y*axis.y + c,         t*axis.y*axis.z - s*axis.x,
				t*axis.x*axis.z - s*axis.y, t*axis.y*axis.z + s*axis.x,  t*axis.z*axis.z + c
			    ) * v;
			} 

			vec2	curlNoise(vec2 pos, float delta) {
				float dX = 
			}
			


		`
		);

		//this.Vertex_MainBegin(
		//	`
		//	//vec3 endColor = baseColor.rgb * (1.0 / baseColor.g);
		//`
		//)





		this.Vertex_Before_NormalUpdated(
			`
				// normalUpdated = normal;
				// // normalUpdated.y = 0.;
				// normalUpdated = rotationY(normalUpdated, M_PI * 0.05 * (uv.x * 2. - 1.)); //Rounded Normal
				// //normalUpdated = rotationX(normalUpdated, strengh);
				// normalUpdated = rotationX(normalUpdated, strengh * windDir.x);
				// normalUpdated = rotationZ(normalUpdated, strengh * windDir.y);
				//
				// // normalUpdated.y = abs(normalUpdated.y);
				// // normalUpdated.z *= -1.;
				// // normalUpdated.x *= -1.;
				// normalUpdated.y = abs(normalUpdated.y);

			

		`
		)

		this.Vertex_Before_PositionUpdated(
			`
				vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
			
				float c1 = fbm(pos * 0.05 - time * 0.5) * 0.5 + 0.5;
				float c2 = fbm(pos * 0.05 - oldTime * 0.5) * 0.5 + 0.5;

				float s1 = (c1 - 0.5) * 1.6 * M_PI * 0.5 * baseColor.a;
				float s2 = (c2 - 0.5) * 1.6 * M_PI * 0.5 * baseColor.a;
				float strengh = mix(s2, s1, uv.y) * (uv.y);
	
				float	windAngle =   fbm(pos - time * 0.5) * M_PI;
				vec2	windDir = vec2(cos(windAngle), sin(windAngle));
				


				// vec2 viewDir = normalize(pos - vEyePosition.xz);
				// vec2 grassView = normalize(pos - vEyePosition.xz);
				// vec2 viewDir = normalize(view[2].xz);
				//
				// float viewDot = dot(grassView, viewDir);
				// float viewDet = grassView.y * viewDir.x - grassView.x * viewDir.y;
				// // float viewDot = dot(normal.xz, viewDir);
				// // float viewDet = normal.x * viewDir.y - normal.z * viewDir.x;
				// float viewCorrection = 0.;//atan(viewDet, viewDot);

				vec3 totalWave = vec3(0.);
				for (int i = 0; i < 1; i++) {
					vec3 wave = computeWave(origins[i], pos);
					// positionUpdated.y *= max(1. - wave.z * 0.2, 0.);
					// positionUpdated.xz += vec2(-wave.x, wave.y) * wave.z * uv.y * 0.25;
					// if (totalWave.z < wave.z) {
					// 	totalWave = wave;
					// }
					totalWave = mix(totalWave, wave, step(totalWave.z, wave.z));
					// positionUpdated = rotationAxis(vec3(-wave.y, 0., -wave.x), wave.z * M_PI * 0.05, positionUpdated);
				}
				// wave = max(min(vec2(1.), wave), vec2(-1.));
				
				positionUpdated = rotationY(positionUpdated, baseColor.r);

				// positionUpdated = rotationY(position, -viewCorrection);
				// positionUpdated.y *= max(1. - totalWave.z, 0.);
				// positionUpdated.xz += vec2(-totalWave.x, totalWave.y) * totalWave.z * uv.y;
				positionUpdated = rotationAxis(vec3(-totalWave.y, 0., -totalWave.x), totalWave.z * M_PI* 0.5 , positionUpdated);
				positionUpdated = rotationAxis(vec3(windDir.y, 0., windDir.x), strengh, positionUpdated);

				vPositionM = normalize(positionUpdated);

		`);

		this.Vertex_After_WorldPosComputed(`
				// vec3 wave = vec3(0.);
				// for (int i = 0; i < 10; i++) {
				// 	wave = computeWave(origins[i], pos);
				// 	worldPos.y *= max(1. - wave.z * 0.2, 0.);
				// 	worldPos.xz += vec2(wave.x, wave.y) * wave.z * uv.y * 0.05;
				// }
			

		`)

		this.Fragment_Definitions(`
			vec3 rotationY(vec3 v, float angle) {
			  float s = sin(angle);
			  float c = cos(angle);

			  return mat3(
			    c, 0.0, -s,
			    0.0, 1.0, 0.0,
			    s, 0.0, c
			  ) * v;
			}

			vec3 rotationAxis(vec3 axis, float angle, vec3 v) {
			    float c = cos(angle);
			    float s = sin(angle);
			    float t = 1.0 - c;

			    return mat3(
				t*axis.x*axis.x + c,        t*axis.x*axis.y - s*axis.z,  t*axis.x*axis.z + s*axis.y,
				t*axis.x*axis.y + s*axis.z, t*axis.y*axis.y + c,         t*axis.y*axis.z - s*axis.x,
				t*axis.x*axis.z - s*axis.y, t*axis.y*axis.z + s*axis.x,  t*axis.z*axis.z + c
			    ) * v;
			} 
		`)

		//NORMAL IN FRAGMENT
		this.Fragment_Before_Lights(`
			normalW = normalize(cross(dFdx(vPositionW), dFdy(vPositionW)));
			normalW.y = abs(normalW.y);
			// vec3 nor = rotationY(normalW, M_PI * 0.5 * (vMainUV1.x * 2. - 1.)); //Rounded Normal
			// normalW = rotationAxis(vPositionM,M_PI * 0.1 * (vMainUV1.x * 2. - 1.), normalW );
			// float ddt = dot(nor, normalW);
		`)



		this.Vertex_MainEnd(
			`
			// vColor.rgb = mix(color.rgb, color, worldPos.y) * smoothstep(-0.4, 1.0, uv.y);
			// //vColor.rgb = vec3(0.0, 1.0, 0.0) * worldPos.y;
			// //vColor.rgb = vec3(normalUpdated.y * 0.5 + 0.5);
			// //vColor.rgb = normalUpdated.xzy * 0.5 + 0.5;
			// //vColor.rgb = vec3(viewCorrection * 0.5 + 0.5);
			// vColor.a = 1.0;
		`
		)
		this.AddAttribute('baseColor');
		this.AddAttribute('uv');
		// this.AddAttribute('stiffness');

		this.Fragment_Begin(`
			// #define VERTEXCOLOR 1
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
			gl_FragColor.rgb *= vPositionW.y * 1.5 * baseColor.g;
			// gl_FragColor.rgb = vec3(floor(gl_FragColor.r * 4. + 0.5) * (1. / 4.));
			// gl_FragColor.rgb = vec3(vMainUV1, 0.);
			// gl_FragColor.rgb = vec3(normalW * 0.5 + 0.5);
			// gl_FragColor.rgb = vec3(ddt);
		`)

		//console.log(this.FragmentShader);

		//this.twoSidedLighting = true;
		// this.specularPower = 1000;
		this.backFaceCulling = false;
		this.twoSidedLighting = false;


	}

	setFloat(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
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

		this.AddAttribute('uv');

		this.Vertex_Begin(`
	#define MAINUV1 1
	#define UV1 1

`)

		this.Fragment_Begin(`
	#define MAINUV1 1
`)

		this.Fragment_Definitions(`
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
}`)

		this.Fragment_MainEnd(`
		// float f = noise(vMainUV1 * 1000.) * 0.5 + 0.5;
		vec3 dith = min(vec3(1., 1., 1.),   gl_FragColor.rgb);
		// dith = floor(dith * 8. + 0.5) * (1. / 8.);
		gl_FragColor.rgb = (dith - 0.5) * 1.6 + 0.5; //Apply contrast
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
