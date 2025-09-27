import { Color3, CustomMaterial, Scene, Vector3 } from "@babylonImport";

export class ButterflyMaterial extends CustomMaterial {
	constructor(name: string, scene: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 1.0);

		this.AddAttribute('uv');
		this.AddAttribute('move');
		this.AddAttribute('direction');

		this.Vertex_Begin(`
			#define MAINUV1 1
			#define UV1 1
			#define M_PI 3.1415926535897932384626433832795

			attribute vec3	move;
			attribute vec3	direction;
		`)

		this.Vertex_Definitions(`
			#include<rotations>
			#include<noises>

			varying vec3 vFly;
		`)

		this.Vertex_MainBegin(`
			float flap = sin((time + hash12(vec2(float(gl_InstanceID)))) * 15. + position.x * 2.);
			float alpha = atan(direction.x, dot(direction.xy, vec2(.0, 1.)));
		`)

		this.Vertex_Before_PositionUpdated(`
			positionUpdated.xyz = rotationX(positionUpdated.xyz, flap * sign(position.z) * M_PI * 0.5);
			positionUpdated = rotationY(positionUpdated, alpha + M_PI * 0.5);
		`)

		this.Vertex_Before_NormalUpdated(`
			normalUpdated.xyz = rotationX(normalUpdated.xyz, flap * sign(position.z) * M_PI * 0.5);
			normalUpdated = rotationY(normalUpdated, alpha + M_PI * 0.5);
		`)

		this.Vertex_After_WorldPosComputed(`
			worldPos.xyz += move;
		`)

		this.Vertex_MainEnd(`
			//vFly = vec3(0., vec2(1. - clamp(direction.z, 0.0, 1.)));
		`)


		this.Fragment_Begin(`
			#define MAINUV1 1
		`)

		this.Fragment_Definitions(`
			varying vec3 vFly;
		`)

		this.Fragment_MainEnd(`
			// gl_FragColor.rgb *= (vPositionW.y < 0.6 ? vec3(1., 0.1, 0.1) : vec3(1.));
			gl_FragColor.a = 0.1;
			gl_FragColor.rgb += vec3(2.31, 2.39, 4.9);
		`)

		// this.emissiveColor = new Color3(0.1, 0.1, 0.1);
		// this.diffuseColor = new Color3(0., 0., 1.);
		//
		this.specularPower = 2;
		// this.ambientColor = Color3.FromHexString("#c1121f")
		// this.emissiveColor = Color3.FromHexString("#3b3d7d").scale(10.)
		console.log("buttr", this.emissiveColor);
		this.specularColor = Color3.Black();
		this.diffuseColor = new Color3(1, 0, 0);
		this.backFaceCulling = false;

		this.twoSidedLighting = true;
		this.alphaMode = 0;
		// this.alpha = 0.0;
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

	setVec3(name: string, value: Vector3) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setVector3(name, value);
		});

	}
}

