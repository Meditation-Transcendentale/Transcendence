import { CustomMaterial, Effect, Scene, Texture } from "@babylonImport"




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
	float t = (noise(time * 100. * p.yx) * 0.5 + 0.5) * 0.1;
	float f = 0.0;

   	f = noise_sum_abs( 15.0*uv );

	f = 0.5 + 0.5*f;
	//f = floor(f * 1.2);
	if (f < CEIL + t) {discard;}
	vec3 col  = vec3(min(1., (1. - f) * 2.));
	gl_FragColor = vec4(col * col, AA);
}`


Effect.ShadersStore['grassVertexShader'] = `
			precision highp	float;	

			#define M_PI 3.1415926535897932384626433832795
			#define LIGHT_DIR		vec3(0.333, 0.333, 0.333)

			attribute vec3	position;
			attribute vec2	uv;
			attribute vec4	color;
			attribute vec3	normal;
			//const vec3	normal = vec3(0.0, 0.0, -1.);

			uniform mat4		viewProjection;
			uniform mat4		view;
			uniform mat4		projection;
			//uniform mat4		world;
			uniform vec3		vEyePosition;
			//uniform sampler2D	noise;
			uniform float		time;
			uniform float		oldTime;

			#include<instancesDeclaration>

			varying vec3	vColor;
			varying vec2	vUV;
			varying vec3	vNormalW;
			varying vec3	vPositionW;

			const vec3 endColor = vec3(0.9, 0.9, 0.9);

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


			void main() {
				vUV = uv;
			
				#include<instancesVertex>

				
				vec3	normal = LIGHT_DIR;
				normal.y = 0.;
				vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
				//vec2 ndcPos = pos * 0.01333 * 0.5 + 0.5;

				//float curve = 1.;//texture2D(noise, ndcPos + mod(time * 0.1, 1.0)).r;
				//float strengh = (curve - 0.5) * 1.6 * M_PI * 0.5 * color.a;
				
				//float c1 = texture2D(noise, ndcPos + mod(time * .03, 1.0)).r;
				//float c2 = texture2D(noise, ndcPos + mod(oldTime * .03, 1.0)).r;

				float c1 = noise12(pos * 0.25 + time) * 0.5 + 0.5;
				float c2 = noise12(pos * 0.25 + oldTime) * 0.5 + 0.5;

				//float c1 = .8;
				//float c2 = 0.8;
				
				float s1 = (c1 - 0.5) * 1.6 * M_PI * 0.5 * color.a;
				float s2 = (c2 - 0.5) * 1.6 * M_PI * 0.5 * color.a;
				float strengh = mix(s2, s1, position.y);
				//float strengh = s1 * smoothstep(0.4, 1.4, uv.y);
	
				float	windAngle = noise12(pos * 0.04 + time * 0.5) * M_PI;
				vec2	windDir = vec2(cos(windAngle), sin(windAngle));

				vec2 viewDir = normalize(pos - vEyePosition.xz);
				float viewDot = dot(normal.xz, viewDir);
				float viewDet = normal.x * viewDir.y - normal.z * viewDir.x;
				float viewCorrection = atan(viewDet, viewDot);


				vec3	positionUpdated = rotationY(position, -viewCorrection);
				positionUpdated = rotationX(positionUpdated, strengh * windDir.x);
				positionUpdated = rotationZ(positionUpdated, strengh * windDir.y);
				
				vec3 normalUpdated = normal;
				//normalUpdated = rotationY(normalUpdated, -viewCorrection);
				normalUpdated = rotationY(normalUpdated, M_PI * 0.05 * (uv.x * 2. - 1.)); //Rounded Normal
				normalUpdated = rotationX(normalUpdated, strengh);
				normalUpdated.y = abs(normalUpdated.y);


				//FROM BABYLON DEFAULT VERTEX SHADER
				vec4 worldPos = finalWorld * vec4(positionUpdated, 1.0);
				mat3 normalWorld = mat3(finalWorld);
				//vNormalW = normalUpdated / vec3(dot(normalWorld[0], normalWorld[0]), dot(normalWorld[1], normalWorld[1]), dot(normalWorld[2], normalWorld[2]));
				//vNormalW = normalize(normalWorld * vNormalW);
				vNormalW = normalUpdated;

				vColor.rgb = mix(instanceColor.rgb, endColor, worldPos.y) * smoothstep(-0.4, 1.0, position.y);
				//vColor.rgb = instanceColor.rgb;

				vPositionW = worldPos.xyz;
				gl_Position = viewProjection * worldPos;
			}`;

Effect.ShadersStore['grassFragmentShader'] = `
			precision highp float;

			#define LIGHT_DIR		vec3(0.333, 0.333, 0.333)
			#define LIGHT_COLOR		vec3(0.5, 0.5, 0.5)
			#define AMBIENT			vec3(0.3, 0.3, 0.3)
			#define SPECULAR_POWER	64.0
			#define SPECULAR_COLOR	vec3(0.4)

			uniform vec3 vEyePosition;		

			varying vec3	vColor;
			varying vec3	vPositionW;
			varying vec3	vNormalW;
			varying vec2	vUV;

			float lambertian(vec3 N, vec3 L) {
				return dot(N, L);
			}

			float subsurfaceScaterring(float dotNL) {
				return max(-dotNL * abs(vUV.x * 0.5 - 0.5), 0.0);
			}

			vec3 blinnPhong(vec3 N, vec3 V, vec3 L, vec3 color) {
				vec3	H = normalize(L + V);
				float specular = pow(max(dot(H, N), 0.), SPECULAR_POWER);

				float lamber = abs(lambertian(N, L));

				return color * lamber + SPECULAR_COLOR * specular * smoothstep(0.8, 1.0, vUV.y);
				
			}

			vec3	bsdf(vec3 N, vec3 V, vec3 L, vec3 albedo) {
				float NLDot = dot(N, L);
				float NVDot = dot(-N, V);
				float lamb = max(NLDot * NVDot, 0.3); //lambertian coef
				float sss = smoothstep(0., 1., abs(vUV.x * 2. -1.)) * 0.6 + 0.4; //subsurface scattering
				sss = max(mix(0., sss, pow(vUV.y, 4.)) * -NVDot, 0.);
				sss = min(pow(sss, 1.), 1.);
				

				vec3	H = normalize(L + V);
				float specular = pow(max(dot(H, N), 0.), SPECULAR_POWER);
				specular *= vUV.y;

				sss *= vUV.y;

				//return  vec3(1., 0., 0.) * lamb + vec3(0., 1., 0.) * sss ;//+ SPECULAR_COLOR * specular;
				return albedo * (AMBIENT + sss * vec3(1., 0.5, 0.) + lamb * LIGHT_COLOR * 2.) + LIGHT_COLOR * 0.3 * specular;

			}


			void main() {
				//vec3 normal = normalize(vec3(vEyePosition.x, 0., vEyePosition.z));
				//normal.y = vNormalW.y;
				//normal = normalize(normal);

				gl_FragColor.rgb = bsdf(normalize(vNormalW), normalize(vPositionW - vEyePosition), LIGHT_DIR, vColor);

				//gl_FragColor.rgb = blinnPhong(vNormalW, normalize(-vPositionW), LIGHT_DIR, vColor);

				//gl_FragColor.rgb = vec3(1.) * max((lambertian(-vNormalW, LIGHT_DIR)), 0.);
		
				//gl_FragColor.rgb = vColor.rgb * lambertian(vNormalW, normalize(vec3(-1., 1., 1.)));// + vNormalW.y * vec3(1.) * smoothstep(0.7, 1., vUV.y);
				//gl_FragColor.rgb = vec3(lambertian(vNormalW, vec3(0., 0., 1.)));
				//gl_FragColor.rgb = vNormalW * 0.5 + 0.5;
				//gl_FragColor.rgb = vColor;
				gl_FragColor.a = 1.0;
				// gl_FragColor.rgb = vec3(1., 1., 0.);
				// gl_FragColor.rgb = vec3(vUV, 0.);

			}`;


export class GrassShader extends CustomMaterial {
	constructor(name: string, scene?: Scene) {
		super(name, scene);
		this.AddUniform('time', 'float', 0.0);
		this.AddUniform('oldTime', 'float', 0.0);

		this.Vertex_Begin(
			`
			// #define VERTEXCOLOR 1
			#define UV1 1
			#define MAINUV1 1
			#define M_PI 3.1415926535897932384626433832795
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
		`
		);

		//this.Vertex_MainBegin(
		//	`
		//	//vec3 endColor = baseColor.rgb * (1.0 / baseColor.g);
		//`
		//)





		this.Vertex_Before_NormalUpdated(
			`
				normalUpdated = normal;
				normalUpdated.y = 0.;
				normalUpdated = rotationY(normalUpdated, M_PI * 0.05 * (uv.x * 2. - 1.)); //Rounded Normal
				normalUpdated = rotationX(normalUpdated, strengh);
				normalUpdated.y = abs(normalUpdated.y);
			

		`
		)

		this.Vertex_Before_PositionUpdated(
			`
				vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
			
				float c1 = noise12(pos * 0.25 + time) * 0.5 + 0.5;
				float c2 = noise12(pos * 0.25 + oldTime) * 0.5 + 0.5;

				float s1 = (c1 - 0.5) * 1.6 * M_PI * 0.5 * baseColor.a;
				float s2 = (c2 - 0.5) * 1.6 * M_PI * 0.5 * baseColor.a;
				float strengh = mix(s2, s1, position.y);
	
				float	windAngle = noise12(pos * 0.04 + time * 0.5) * M_PI;
				vec2	windDir = vec2(cos(windAngle), sin(windAngle));

				// vec2 viewDir = normalize(pos - vEyePosition.xz);
				vec2 grassView = normalize(pos - vEyePosition.xz);
				vec2 viewDir = normalize(view[2].xz);
				
				float viewDot = dot(grassView, viewDir);
				float viewDet = grassView.y * viewDir.x - grassView.x * viewDir.y;
				// float viewDot = dot(normal.xz, viewDir);
				// float viewDet = normal.x * viewDir.y - normal.z * viewDir.x;
				float viewCorrection = 0.;//atan(viewDet, viewDot);


				positionUpdated = rotationY(position, -viewCorrection);
				positionUpdated = rotationX(positionUpdated, strengh * windDir.x);
				positionUpdated = rotationZ(positionUpdated, strengh * windDir.y);
		`);


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
			gl_FragColor.rgb *= vMainUV1.y;
		`)

		//console.log(this.FragmentShader);

		//this.twoSidedLighting = true;
		// this.specularPower = 1000;
		this.backFaceCulling = false;
		this.twoSidedLighting = true;


	}

	setFloat(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
			//console.log(this.getEffect().defines);
		});
	}

}

export class PuddleMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene, origins: number[]) {
		super(name, scene);

		this.AddUniform("origins[40]", 'vec3', origins);
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
				for (int i = 0; i < 40; i++) {
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
