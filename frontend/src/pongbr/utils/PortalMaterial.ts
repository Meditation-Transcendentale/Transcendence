import { CustomMaterial } from '@babylonjs/materials';
import { Scene } from "@babylonjs/core/scene";

export class PortalMaterial extends CustomMaterial {


	constructor(name: string, scene?: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1);
		this.AddUniform('arenaRadius', 'float', 0);
		this.AddUniform('playerCount', 'float', 0);
		this.AddUniform('fillFraction', 'float', 0);
		this.AddUniform('worldViewProjection', 'float', 0);
		this.AddUniform('iResolution', 'vec2', 0);


		this.Vertex_Definitions(`
		`)

		this.Vertex_Begin(`
			#define M_PI 3.1415926535897932384626433832795
			#define RATIO 1.
			#define PERIMETER 2. * M_PI * 100.

		`);

		this.Vertex_Before_PositionUpdated(`

		  float sliceAngle = 2.0 * PI / 4.;
		  float paddleArc  = sliceAngle * fillFraction;
		  float localA     = paddleArc * position.x;

		  float width = (PERIMETER / 4.) * fillFraction;


		  float radiusOffset = position.z;
		  float r = arenaRadius + 25.;
		  positionUpdated.x = cos(localA) * r - (position.z) * (width * RATIO);
		  positionUpdated.y = (position.y+ 0.5) * width * RATIO + 0.5;
		  positionUpdated.z = sin(localA) * r; 

		`);

		this.Fragment_Definitions(`

 	  #define PI 3.14159265359
 	    #define TWO_PI 6.28318530718
 	    #define HALF_PI 1.57079632679

 	    vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
 	    vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
 	    vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
 	    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

 	    float snoise(vec3 v){
 	      const vec2 C = vec2(1.0/6.0,1.0/3.0);
 	      const vec4 D = vec4(0.0,0.5,1.0,2.0);
 	      vec3 i = floor(v + dot(v,C.yyy));
 	      vec3 x0 = v - i + dot(i,C.xxx);
 	      vec3 g = step(x0.yzx,x0.xyz);
 	      vec3 l = 1.0 - g;
 	      vec3 i1 = min(g.xyz,l.zxy), i2 = max(g.xyz,l.zxy);
 	      vec3 x1 = x0 - i1 + C.xxx;
 	      vec3 x2 = x0 - i2 + C.yyy;
 	      vec3 x3 = x0 - D.yyy;
 	      i = mod289(i);
 	      vec4 p = permute( permute( permute(
 	        i.z+vec4(0.0,i1.z,i2.z,1.0))
 	        + i.y+vec4(0.0,i1.y,i2.y,1.0))
 	        + i.x+vec4(0.0,i1.x,i2.x,1.0));
 	      float n_ = 1.0/7.0;
 	      vec3 ns = n_*D.wyz - D.xzx;
 	      vec4 j = p - 49.0 * floor(p*ns.z*ns.z);
 	      vec4 x_ = floor(j*ns.z), y_ = floor(j - 7.0*x_);
 	      vec4 x = x_*ns.x + ns.yyyy, y = y_*ns.x + ns.yyyy;
 	      vec4 h = 1.0 - abs(x) - abs(y);
 	      vec4 b0 = vec4(x.xy,y.xy), b1 = vec4(x.zw,y.zw);
 	      vec4 s0 = floor(b0)*2.0+1.0, s1 = floor(b1)*2.0+1.0;
 	      vec4 sh = -step(h,vec4(0.0));
 	      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
 	      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
 	      vec3 p0 = vec3(a0.xy,h.x), p1 = vec3(a0.zw,h.y);
 	      vec3 p2 = vec3(a1.xy,h.z), p3 = vec3(a1.zw,h.w);
 	      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),
 	                                     dot(p2,p2),dot(p3,p3)));
 	      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
 	      vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),
 	                            dot(x2,x2),dot(x3,x3)),0.0);
 	      m = m*m;
 	      return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),
 	                                  dot(p2,x2),dot(p3,x3)));
 	    }

 	    float fbm3d(vec3 x, const in int it){
 	      float v=0.0, a=0.5;
 	      vec3 shift=vec3(100.0);
 	      for(int i=0;i<32;i++){
 	        if(i<it){
 	          v += a * snoise(x);
 	          x = x*2.0 + shift;
 	          a *= 0.5;
 	        }
 	      }
 	      return v;
 	    }
								  `);

		this.Fragment_Begin(`

							`);


		this.Fragment_MainBegin(`
      vec2 uv = fract(vPositionW.xz * 0.09);
	
			`);

		this.Fragment_Before_FragColor(`

	  	 float t = time * 0.2;
      float r = length(uv);
      float a = atan(uv.y, uv.x) + r * 1.2;

      float x = fbm3d(vec3(sin(a), cos(a), pow(r,0.3) + t*0.1), 3);
      float y = fbm3d(vec3(cos(1.0 - a), sin(1.0 - a), pow(r,0.5) + t*0.1), 4);
      float c = fbm3d(vec3(x, y, r + t*0.3), 5);
      c = fbm3d(vec3(c - x, c - y, c + t*0.3), 6);
      c = (c + r * 5.0) / 6.0;

      vec3 col = vec3(
        smoothstep(0.3, 0.4, y),
        smoothstep(0.4, 0.55, y),
        smoothstep(0.2, 0.55, y)
      );		 
      	color = vec4( col,  1.0 );
		`);



	}

	setUniform(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
			//console.log(this.getEffect().defines);
		});
	}
	enableResolutionUniform() {
		this.onBindObservable.add(() => {
			// get the currently bound Effect
			const effect = this.getEffect();
			if (!effect) { return; }

			// query the real canvas size
			const engine = this.getScene().getEngine();
			const w = engine.getRenderWidth();
			const h = engine.getRenderHeight();

			// setFloat2(name, x, y) is how you push a vec2
			effect.setFloat2("iResolution", w, h);
		});
	}
}
