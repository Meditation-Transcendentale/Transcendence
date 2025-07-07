import { CustomMaterial, Scene } from "@babylonImport";

export class PaddleMaterial extends CustomMaterial {


	constructor(name: string, scene?: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1);
		this.AddUniform('arenaRadius', 'float', 0);
		this.AddUniform('playerCount', 'float', 0);
		this.AddUniform('fillFraction', 'float', 0);

		this.Vertex_Begin(`
			#define M_PI 3.1415926535897932384626433832795
			#define RATIO 1. / 5.
			#define PERIMETER 2. * M_PI * 100.

		`);

		this.Vertex_Definitions(`


		`)

		this.Vertex_Before_PositionUpdated(`

		  float sliceAngle = 2.0 * PI / playerCount;
		  float paddleArc  = sliceAngle * fillFraction;
		  float localA     = paddleArc * (position.x);

		  float width = (PERIMETER / playerCount) * fillFraction;


		  float radiusOffset = position.z;
		  float r = arenaRadius;
		  positionUpdated.x = cos(localA) * r - (position.z) * (width * RATIO);
		  positionUpdated.y = (position.y+ 0.5) * width * RATIO + 0.5;
		  positionUpdated.z = sin(localA) * r; 


		`);



	}

	setUniform(name: string, value: number) {

		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
			//console.log(this.getEffect().defines);
		});
	}
}
