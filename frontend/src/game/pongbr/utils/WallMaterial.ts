import { CustomMaterial, Scene } from "../../../babylon";

export class WallMaterial extends CustomMaterial {


	constructor(name: string, scene?: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1);
		this.AddUniform('arenaRadius', 'float', 0);
		this.AddUniform('playerCount', 'float', 0);
		this.AddUniform('fillFraction', 'float', 0);
		this.AddUniform('paddleId', 'float', 0);

		this.Vertex_Begin(`
			#define M_PI 3.1415926535897932384626433832795
			#define RATIO 1. / 5.
			#define PERIMETER 2. * M_PI * 100.

		`);

		this.Vertex_Definitions(`
varying float vPaddleId;

		`)

		this.Vertex_Before_PositionUpdated(`

		  float sliceAngle = 2.0 * PI / playerCount;
		  float paddleArc  = sliceAngle * fillFraction;
		  float localA     = paddleArc * (position.x);

		  float width = (PERIMETER / playerCount) * fillFraction / 2.;


		  float radiusOffset = position.z;
		  float r = arenaRadius + (width * RATIO) / 2.;
		  positionUpdated.x = cos(localA) * r - (position.z) * (width * RATIO);
		  positionUpdated.y = (position.y+ 0.5) * width * RATIO + 2.5;
		  positionUpdated.z = sin(localA) * r; 
vPaddleId = float(gl_InstanceID);

		`);

		this.Fragment_Begin(`
		`)

		this.Fragment_Definitions(`
		varying float vPaddleId;
		`)

		this.Fragment_Before_Lights(`
			
		`);

		this.Fragment_MainEnd(`
							   // float isLocalPaddle = step(abs(vPaddleId - paddleId), 0.5);
							   //
							   // vec3 normalColor = vec3(1.0, 0.0, 0.0); 
							   // vec3 localColor = vec3(0.0, 1.0, 0.0);  
							   //
							   //   vec3 finalColor = mix(normalColor, localColor, isLocalPaddle);
							   //
							   //   gl_FragColor = vec4(finalColor, 1.0);
		`)


	}

	setUniform(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
			//console.log(this.getEffect().defines);
		});
	}
}

