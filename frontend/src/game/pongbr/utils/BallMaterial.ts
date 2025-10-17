import { CustomMaterial, Scene } from "../../../babylon";

export class BallMaterial extends CustomMaterial {

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
			vec3 viewDirection = normalize(vEyePosition.xyz - vPositionW);

			float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormalW)), 3.5);

			float centerDarkness = 1.0 - fresnel;
			centerDarkness = pow(centerDarkness, 2.0);

			vec3 swirl1 = vPositionW * 3.0 + vec3(time * 0.5, time * 0.3, time * 0.4);
			vec3 swirl2 = vPositionW * 2.0 - vec3(time * 0.3, time * 0.5, time * 0.2);

			float mist1 = fbm(swirl1);
			float mist2 = fbm(swirl2);
			float mistPattern = (mist1 + mist2) * 0.5;

			float pulse = sin(time * 1.5) * 0.08 + 0.92;
			float flicker = sin(time * 8.0) * 0.03;

			vec3 darkCore = vec3(0.18, 0.06, 0.06);
			vec3 mistColor = vec3(0.4, 0.15, 0.15);
			vec3 rimGlow = vec3(0.9, 0.25, 0.25);
			vec3 brightRim = vec3(1.2, 0.9, 0.9);

			// Start with brighter bloodred core
			vec3 glassColor = darkCore + darkCore * centerDarkness * 0.4;

			glassColor += mistColor * mistPattern * 0.5;

			glassColor += rimGlow * fresnel * (pulse + flicker) * 1.5;

			float sharpRim = pow(fresnel, 0.4);
			glassColor += brightRim * sharpRim * 1.8;

			float veins = noise(vPositionW * 8.0 + time * 2.0);
			glassColor += vec3(0.6, 0.15, 0.15) * veins * fresnel * 0.4;

			vec3 emissiveGlow = vec3(1.0, 0.3, 0.3) * fresnel * pulse * 1.3;
			vec3 brightEdge = vec3(1.4, 1.0, 1.0) * pow(fresnel, 0.35) * 1.0;

			color.rgb = glassColor * 1.5 + emissiveGlow + brightEdge;
		`);
	}

	setUniform(name: string, value: number) {
		this.onBindObservable.addOnce(() => {
			this.getEffect().setFloat(name, value);
		});
	}
}
