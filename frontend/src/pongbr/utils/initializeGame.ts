import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4, Vector3 } from "@babylonjs/core/Maths/math";
import { GameTemplateConfig } from "../templates/GameTemplate";
import { Effect, Material, ShaderMaterial, TransformNode, Vector2, VertexBuffer } from "@babylonjs/core";
import { PaddleMaterial } from './PaddleMaterial';
import { PortalMaterial } from "./PortalMaterial";

Effect.ShadersStore["portalVertexShader"] = `
precision highp    float;    

#define PI 3.1415926535897932384626433832795
#define RATIO 1.
#define PERIMETER 2. * PI * 100.


attribute vec3    position;
attribute vec2    uv;
attribute vec3    normal;

//uniform mat4    worldViewProjection;
//uniform mat4    world;
uniform mat4    view;
uniform mat4    viewProjection;
uniform mat4    projection;

#include<instancesDeclaration>

varying vec2    vUV;

varying vec3    vNormalW;
varying vec3    vPositionW;

void main() {
    vUV = uv;

    #include<instancesVertex>
    
    vec3 positionUpdated;
	  float sliceAngle = 2.0 * PI / 4.;
	  float paddleArc  = sliceAngle * 0.1 ;
	  float localA     = paddleArc * position.x;

	  float width = (PERIMETER / 4.) * 0.1 ;


	  float radiusOffset = position.z;
	  float r = 225.;
	  positionUpdated.x = cos(localA) * r - (position.z) * (width * RATIO);
	  positionUpdated.y = (position.y+ 0.5) * width * RATIO + 0.5;
	  positionUpdated.z = sin(localA) * r; 
    vec3 normalUpdated = normal;

    finalWorld = mat4(world0, world1, world2, world3);
    finalWorld = world*finalWorld;
    vec4 worldPos = finalWorld*vec4(positionUpdated, 1.0);
    vPositionW = vec3(worldPos);
    mat3 normalWorld = mat3(finalWorld);

    vNormalW = normalUpdated/vec3(dot(normalWorld[0], normalWorld[0]), dot(normalWorld[1], normalWorld[1]), dot(normalWorld[2], normalWorld[2]));

    vNormalW = normalize(normalWorld*vNormalW);

    gl_Position = viewProjection*worldPos;
}
`

Effect.ShadersStore["portalFragmentShader"] = `
precision highp    float;

#define M_PI 3.1415926535897932384626433832795

//uniform sampler2D    tNoise;
//uniform vec2        uResolution;
uniform float        time;


uniform mat4        world;
uniform mat4        view;
uniform mat4        projection;

varying vec2    vUV;
varying vec3    vNormalW;
varying vec3    vPositionW;
vec4 permute_3d(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt3d(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

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



void main() {
	vec2 uv = vUV * 2. - 1.;
	vec3 color = vec3(uv.xy, 0.0);
    color.z += 0.5;
    
    color = normalize(color);
    color -= 0.2 * vec3(0.0, 0.0, time);
    
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
	if (max(color, vec3(emissionColor + 0.00001)) != vec3(emissionColor + 0.00001) && abs(length(uv)) > 0.5) {
	discard;}
    gl_FragColor = vec4(color, 1.0);
    
}
`

//export function createCamera(scene: Scene, canvas: any, pongRoot: TransformNode): ArcRotateCamera {
//	const camera = new ArcRotateCamera("camera", Math.PI / 2, 0., 60, Vector3.Zero(), scene);
//	camera.parent = pongRoot;
//	camera.attachControl(canvas, true);
//	//new HemisphericLight("light", new Vector3(0, 1, 0), scene);
//
//	return camera;
//}

export function createWallMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const wallMesh = MeshBuilder.CreateBox("wallBase", { width: 1, height: 1, depth: 2 }, scene);
	wallMesh.parent = pongRoot;
	const wallMaterial = new StandardMaterial("wallMaterial", scene);
	wallMaterial.diffuseColor.set(0, 0, 0);
	wallMaterial.emissiveColor.set(1, 0, 1);
	wallMesh.material = wallMaterial;
	wallMesh.setEnabled(false);
	wallMesh.setPivotPoint(Vector3.Zero());

	return wallMesh;
}

export function createArenaMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const arenaMesh = MeshBuilder.CreateCylinder("arenaBox", { diameter: 200, height: 1, tessellation: 128 }, scene);
	arenaMesh.parent = pongRoot;
	const material = new StandardMaterial("arenaMaterial", scene);
	// material.diffuseColor.set(0, 0, 0;
	// material.specularColor.set(0, 0, 0);
	// material.emissiveColor.set(0.2, 0.2, 0.2980392156862745);
	arenaMesh.material = material;

	return arenaMesh;
}

export function createBallMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const ballMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 1 }, scene);
	ballMesh.parent = pongRoot;
	const ballMaterial = new StandardMaterial("ballMaterial", scene);
	ballMaterial.emissiveColor = Color3.Black();
	// ballMaterial.diffuseTexture = new Texture("moi.png", scene);
	//ballMaterial.emissiveColor.set(1, 1, 1);
	ballMesh.setEnabled(true);
	ballMesh.setPivotPoint(Vector3.Zero());
	ballMesh.material = ballMaterial;

	return ballMesh;
}

export function createPaddleMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const
		arenaRadius = 100,
		paddleWidth = 1,
		paddleHeight = 1,
		paddleDepth = 1
		;

	const paddle = MeshBuilder.CreateTiledBox("paddleBase", {
		//sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		//pattern: pat,
		// alignVertical: av,
		// alignHorizontal: ah,
		width: paddleWidth,
		height: paddleHeight,
		depth: paddleDepth,
		tileSize: 0.1,
		tileWidth: 0.1
	}, scene);
	paddle.parent = pongRoot;
	//paddle.showBoundingBox = true;
	// paddle.enableEdgesRendering();
	//paddle.alwaysSelectAsActiveMesh = true
	//paddle.edgesColor = new Color4(0., 1.0, 0.0, 1.0);
	const mat = new PaddleMaterial('paddleMaterial', scene);

	// (mat.backFaceCulling) = false;
	mat.setUniform("arenaRadius", 200.);
	mat.setUniform("playerCount", 100.);
	mat.setUniform("fillFraction", 0.25);
	paddle.material = mat;
	mat.diffuseColor = Color3.Red();
	paddle.isVisible = true;
	mat.forceDepthWrite = true;
	return paddle;
}

export function createPortalMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const portal = MeshBuilder.CreatePlane("portalBase",
		{ size: 1, sideOrientation: Mesh.DOUBLESIDE }, scene);
	portal.alwaysSelectAsActiveMesh = true

	portal.parent = pongRoot;
	const mat = new ShaderMaterial("portalMat", scene, { vertex: "portal", fragment: "portal" }, {
		attributes: ["position", "uv", "world0", "world1", "world2", "world3", "worldPos"],
		uniforms: ["time", "world", "viewProjection", "projection"],
		defines: ["#define INSTANCES"]
	});
	portal.material = mat;
	return portal;

}

// utils/initializeGame.ts

export function createPillarMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const m = MeshBuilder.CreateBox("pillarBase", {
		width: 1.,
		height: 1,
		depth: 1
	}, scene);
	m.parent = pongRoot;
	m.isVisible = true;
	const mat = new StandardMaterial("pillarMat", scene);
	mat.diffuseColor = Color3.Blue();
	m.material = mat;
	return m;
}

export function createGoalMesh(scene: Scene, config: GameTemplateConfig, pongRoot: TransformNode): Mesh {
	const m = MeshBuilder.CreateBox("goalBase", {
		width: 1,
		height: 1,
		depth: 0.5
	}, scene);
	m.parent = pongRoot;
	const mat = new StandardMaterial("goalMat", scene);
	mat.diffuseColor.set(1, 0, 0);
	m.material = mat;
	m.setEnabled(false);
	m.setPivotPoint(Vector3.Zero());
	return m;
}


