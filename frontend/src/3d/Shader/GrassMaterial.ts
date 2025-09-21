import { Color3, CustomMaterial, RenderTargetTexture, Scene, Vector3 } from "@babylonImport";

export class GrassShader extends CustomMaterial {
	constructor(name: string, scene: Scene) {
		super(name, scene);
		this.AddUniform('time', 'float', 0.0);
		this.AddUniform('oldTime', 'float', 0.0);
		this.AddUniform("origin", 'vec3', null);
		this.AddUniform('textureSampler', 'sampler2D', null);
		this.AddUniform("ballPosition", "vec3", null);
		this.AddUniform("ballRadius", "float", 0.);

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
				float dist_fall = trunc_fallof(min(3., L), 3.);
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

			vec3	sampleWave(vec2 pos) {
				vec2 uv = (pos / 40.) + 0.5;
				vec3 wave = texture(textureSampler, uv).rgb;
				wave.xy = wave.xy * 2. - 1.;
				wave.z *= (uv.x < 1. && uv.x > 0. && uv.y > 0. && uv.y < 1. ? 1. : 0.);
				return wave;
			}
		`
		);

		this.Vertex_Before_PositionUpdated(
			`
				vec2 pos = (finalWorld * vec4(0., 0., 0., 1.0)).xz;
				vec2 windDir = vec2(-1., 0.);

				// vec4 noiseA = texture2D(tNoise, pos * 0.02 - time * windDir * 0.3);
				// vec4 noiseB = texture2D(tNoise, pos * 0.04);
			
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
				
				vec3 totalWave = sampleWave(pos);
			
				positionUpdated = rotationY(positionUpdated, baseColor.r);
				strengh *= max(1. - totalWave.z * 1.5, 1.);

				positionUpdated = rotationAxis(positionUpdated,  totalWave.z  * M_PI * 0.3 , vec3(-totalWave.y, 0., -totalWave.x));
				positionUpdated = (position.y > 0.1 ? rotationAxis(positionUpdated, strengh, vec3(windDir.y, 0., windDir.x)) : positionUpdated);

			

				vPositionM = position;

		`);

		this.Vertex_After_WorldPosComputed(`
				// worldPos.y += noiseB.g * 1.5;
		`)

		this.Vertex_Before_NormalUpdated(
			`
				// vec3 viewDir = vEyePosition.xyz - vec3(pos.x, 0., pos.y) ;
				// normalUpdated = normalize(vec3(viewDir.x, 0., viewDir.z));
				// normalUpdated = rotationY(normalUpdated, M_PI * 0.05 * (uv.x * 2. - 1.)); //Rounded Normal
				// normalUpdated = rotationAxis(normalUpdated, totalWave.z * M_PI* 0.5 , vec3(-totalWave.y, 0., -totalWave.x));
				normalUpdated = vec3(0.,0.,1.);
				normalUpdated = rotationY(normalUpdated, baseColor.r);
				normalUpdated = rotationAxis(normalUpdated, totalWave.z * M_PI* 0.3 , vec3(-totalWave.y, 0., -totalWave.x));
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

			const vec3 waterAbsortion = vec3(0.35, 0.07, 0.03) * 0.1;
			//const vec3 waterAbsortion = vec3(2., 0.3, 0.05) * 0.1;

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
			// gl_FragColor.rgb = clamp(gl_FragColor.rgb, 0., 1.);
			// gl_FragColor.rgb += ballStrengh * vec3(1., 0., 0.);
			// gl_FragColor.rgb = vec3(normalW * 0.5 + 0.5);
			// gl_FragColor.rgb = vec3(normalW.y);

			gl_FragColor.rgb += max((ballRadius - length(ballPosition - vPositionW)) / ballRadius, 0.) * vec3(2., 0., 0.);
		`)

		this.Fragment_Before_Fog(`
			color.rgb *= vPositionM.y * 1. * baseColor.g;
		`)

		//console.log(this.FragmentShader);

		this.twoSidedLighting = true;
		// this.specularPower = 1000;
		this.backFaceCulling = false;
		// this.twoSidedLighting = true;
		this.diffuseColor = Color3.FromHexString("#4b8024");
		this.diffuseColor = Color3.FromHexString("#ae8307")
		//this.diffuseColor = new Color3(0.6, 1., 0.28);
		//this.diffuseColor = new Color3(1., 1., 1.);

		// this.emissiveColor = new Color3(0.3, 0.3, 0.3);

		this.specularPower = 96;
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

	setTexture(name: string, texture: RenderTargetTexture) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setTexture(name, texture);
		});
	}


}

