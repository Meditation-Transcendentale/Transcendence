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
      varying   vec2 vOrigXZ;     // our varying into the frag

		`)


		this.Vertex_Begin(`
			#define M_PI 3.1415926535897932384626433832795
			#define RATIO 1.
			#define PERIMETER 2. * M_PI * 100.

		`);

		this.Vertex_Before_PositionUpdated(`

		  float sliceAngle = 2.0 * PI / 4.;
		  float paddleArc  = sliceAngle ;
		  float localA     = paddleArc * position.x;

		  float width = (PERIMETER / 4.) * fillFraction;


		  float radiusOffset = position.z + 0.5;
		  float r = arenaRadius + 25.;
		  positionUpdated.x = cos(localA) * r + width;
		  positionUpdated.y = (position.y) ;
		  positionUpdated.z = sin(localA) * r + width; 
		  vOrigXZ = positionUpdated.xz;

		`);

		this.Vertex_After_WorldPosComputed(`


										   `)

		this.Fragment_Definitions(`
								  			#define PERIMETER 2. * M_PI * 100.
			#define M_PI 3.1415926535897932384626433832795

#define time time*0.15
#define tau 6.2831853

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

mat2 makem2(in float theta){float c = cos(theta);float s = sin(theta);return mat2(c,-s,s,c);}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  // fetch four corner hashes
  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // bilinear blend
  float ab = mix(a, b, u.x);
  float cd = mix(c, d, u.x);
  return mix(ab, cd, u.y);
}
float fbm(in vec2 p)
{	
vec4 tt=fract(vec4(time*2.)+vec4(0.0,0.25,0.5,0.75));
vec2 p1=p-normalize(p)*tt.x;
vec2 p2=vec2(4.0)+p-normalize(p)*tt.y;
vec2 p3=vec2(12.0)+p-normalize(p)*tt.z;
vec2 p4=vec2(3.0)+p-normalize(p)*tt.w;
vec4 tr=vec4(1.0)-abs(tt-vec4(0.5))*2.0;//*vec4(0.0,1.0,0.0,1.0);
float z=2.;
vec4 rz = vec4(0.);
for (float i= 1.;i < 4.;i++)
{
rz+= abs((vec4(noise(p1),noise(p2),noise(p3),noise(p4))-vec4(0.5))*2.)/z;
z = z*2.;
p1 = p1*2.;
p2 = p2*2.;
p3 = p3*2.;
p4 = p4*2.;
}
return dot(rz,tr)*0.25;
}
float dualfbm(in vec2 p)
{
    //get two rotated fbm calls and displace the domain
	vec2 p2 = p*.7;
	vec2 basis = vec2(fbm(p2-time*1.6),fbm(p2+time*1.7));
	basis = (basis-.5)*.2;
	p += basis;
	
	return fbm(p); //*makem2(time*2.0));
}

float circ(vec2 p) 
{
	float r = length(p);
	r = log(sqrt(r));
	return abs(mod(r*2.,tau)-4.54)*10.+.5;

}

	  `);

		this.Fragment_Begin(`
				      varying vec2 vOrigXZ;

							`);


		this.Fragment_MainBegin(`
 // 							vec2 fragCoord = gl_FragCoord.xy;
 // vec2 p = fragCoord.xy / iResolution.xy-0.5;
 // 	 p.x *= iResolution.x/iResolution.y;
 // 	p*= 2.;
		  float width = (PERIMETER / 4.) * fillFraction;
		vec2 p = vOrigXZ / width;
							
			`);

		this.Fragment_Before_FragColor(`
float rz = dualfbm(p);
	
	//rings
	//ip /= 7.0; //exp(mod(time*10.,3.14159));
	//rz *= pow(abs((0.0-circ(p))),.99);
    
    rz *= abs((-circ(vec2(p.x / 4.2, p.y / 7.0))));
    rz *= abs((-circ(vec2(p.x / 4.2, p.y / 7.0))));
    rz *= abs((-circ(vec2(p.x / 4.2, p.y / 7.0))));
	
	//final color
	vec3 col = vec3(10.00,3.00,3.15)/rz;
	col=pow(abs(col),vec3(1.93));
color = vec4(col,1.5);
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
