import { CustomMaterial, Scene } from "../../../babylon";

export class PillarMaterial extends CustomMaterial {

	constructor(name: string, scene?: Scene) {
		super(name, scene);

		this.AddUniform('time', 'float', 0);

		this.Fragment_Definitions(`
			// Simple 3D noise function
			float hash(vec3 p) {
				p = fract(p * 0.3183099 + 0.1);
				p *= 17.0;
				return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
			}

			float noise(vec3 x) {
				vec3 p = floor(x);
				vec3 f = fract(x);
				f = f * f * (3.0 - 2.0 * f);

				return mix(
					mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), f.x),
						mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), f.x), f.y),
					mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), f.x),
						mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), f.x), f.y),
					f.z);
			}

			float fbm(vec3 p) {
				float value = 0.0;
				float amplitude = 0.5;
				float frequency = 1.0;
				for(int i = 0; i < 4; i++) {
					value += amplitude * noise(p * frequency);
					frequency *= 2.0;
					amplitude *= 0.5;
				}
				return value;
			}
		`);

		this.Fragment_Before_FragColor(`
			vec3 normalColor = vec3(0.6, 0.15, 0.15);
			vec3 localColor = vec3(0.7, 0.6, 0.5);

			vec3 emissiveGlow = vec3(0.5, 0.6, 0.12);
			vec3 localEmissive = vec3(0.08, 0.06, 0.05);

			color.rgb = color.rgb * 0.4 + emissiveGlow * 1.2 + localEmissive;
		`);
	}

	setUniform(name: string, value: number) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
		});
	}
}
