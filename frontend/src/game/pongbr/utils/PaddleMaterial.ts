import { CustomMaterial, Scene } from "../../../babylon";

export class PaddleMaterial extends CustomMaterial {


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

		  float width = (PERIMETER / playerCount) * fillFraction;


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

		this.Fragment_Before_FragColor(`
			float isLocalPaddle = step(abs(vPaddleId - paddleId), 0.5);

			// Paddle colors
			vec3 normalColor = vec3(0.6, 0.15, 0.15);
			vec3 localColor = vec3(0.7, 0.6, 0.5);

			// Emissive glow
			vec3 emissiveGlow = vec3(0.5, 0.12, 0.12);
			vec3 localEmissive = vec3(0.08, 0.06, 0.05);

			// Combine lit color with paddle color and emissive
			vec3 paddleColor = mix(normalColor, localColor, isLocalPaddle);
			vec3 paddleEmissive = mix(emissiveGlow, localEmissive, isLocalPaddle);

			color.rgb = color.rgb * 0.4 + paddleColor * 1.2 + paddleEmissive;
		`);


	}

	setUniform(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
			//console.log(this.getEffect().defines);
		});
	}
}
