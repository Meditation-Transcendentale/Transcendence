import { Effect, Material, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, Texture, TransformNode, Vector3 } from "../../../babylon";
import { Constants, RenderTargetTexture } from "@babylonjs/core";

Effect.ShadersStore["blackholeVertexShader"] = `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 worldViewProjection;
    varying vec2 vUV;
    
    void main(void) {
        gl_Position = worldViewProjection * vec4(position, 1.0);
        vUV = uv; // Pass UV coordinates directly
    }
`;

Effect.ShadersStore["blackholeFragmentShader"] = `
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718

    precision highp float;
    varying vec2 vUV;
    uniform float time;
    
    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }


    
    float fbm3d(vec3 x, const in int it) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100.0);
        
        for (int i = 0; i < 32; ++i) {
            if(i < it) {
                v += a * snoise(x);
                x = x * 2.0 + shift;
                a *= 0.5;
            }
        }
        return v;
    }
    
 void main(void) {
        vec2 uv = vUV - 0.5;
        float dist = length(uv);
        
        if (dist > 0.5) {
            gl_FragColor = vec4(0.0);
            return;
        }
        
        float t = time * 0.2;
        
        // Pre-calculate expensive operations
        float angle = atan(uv.y, uv.x);
        vec2 st = vec2(dist * 3.0, angle);
        st.y += st.x * 1.1;
        
        float st_x_pow3 = pow(st.x, 0.3);
        float st_x_pow5 = pow(st.x, 0.5);
        float sin_st = sin(st.y);
        float cos_st = cos(st.y);
        float sin_inv = sin(1.0 - st.y);
        float cos_inv = cos(1.0 - st.y);
        
        // Reduced iterations: 2, 2, 3, 2 (was 3, 4, 5, 6)
        float x = fbm3d(vec3(sin_st, cos_st, st_x_pow3 + t * 0.1), 3);
        float y = fbm3d(vec3(cos_inv, sin_inv, st_x_pow5 + t * 0.1), 4);
        float r = fbm3d(vec3(x, y, st.x + t * 0.3), 5);
        r = fbm3d(vec3(r - x, r - y, r + t * 0.3), 6);  // ← Key change: 6→2
        
        float c = (r + st.x * 5.0) / 6.0;
        
        vec3 bloodRed = vec3(0.9, 0.0, 0.0);
        vec3 darkCrimson = vec3(0.4, 0.0, 0.0);
        vec3 fireOrange = vec3(0.0, 0.0, 0.0);
        
        vec3 finalColor = vec3(0.0);
        finalColor = mix(vec3(0.0), darkCrimson, smoothstep(0.2, 0.3, c));
        finalColor = mix(finalColor, bloodRed, smoothstep(0.3, 0.6, c));
        finalColor = mix(finalColor, fireOrange, smoothstep(0.7, 0.9, c));
        
        float alpha = 1.0 - smoothstep(0.7, 0.9, c);

        gl_FragColor = vec4(finalColor, alpha);
    }


`;

export function createBlackHoleBackdrop(scene: Scene, statuePosition: Vector3, pongRoot: TransformNode): { backdrop: any, observer: any } {

	const backdrop = MeshBuilder.CreatePlane("blackholeBackdrop", {
		width: 1500,
		height: 1500
	}, scene);
	backdrop.parent = pongRoot;

	backdrop.position = new Vector3(
		statuePosition.x - 500,
		statuePosition.y,
		statuePosition.z
	);

	backdrop.rotationQuaternion = null;
	backdrop.rotation.y = Math.PI / 2;
	backdrop.alwaysSelectAsActiveMesh = false;

	const blackholeMaterial = new ShaderMaterial("blackholeMaterial", scene, {
		vertex: "blackhole",
		fragment: "blackhole"
	}, {
		attributes: ["position", "uv"],
		uniforms: ["worldViewProjection", "time"]
	});

	blackholeMaterial.setFloat("time", 0);
	blackholeMaterial.backFaceCulling = false;
	blackholeMaterial.transparencyMode = Material.MATERIAL_ALPHABLEND;
	blackholeMaterial.alphaMode = Constants.ALPHA_COMBINE;
	blackholeMaterial.disableDepthWrite = false;
	blackholeMaterial.needAlphaBlending = () => true;
	backdrop.material = blackholeMaterial;

	const observer = scene.onBeforeRenderObservable.add(() => {
		blackholeMaterial.setFloat("time", performance.now() * 0.001);
	});

	return { backdrop, observer };
}
