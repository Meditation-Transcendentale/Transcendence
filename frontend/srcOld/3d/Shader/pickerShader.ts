import { Effect } from "@babylonImport";

Effect.ShadersStore["pickerFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;

uniform float	attenuation;
uniform float	radius;
uniform vec2	origin;

varying vec2	vUV;

vec3	getPick() {
	float l = length(origin - vUV);

	l = max(radius - l, 0.) * (1. / radius);
	vec2 d = normalize(vUV - origin) * float(l > 0.);
	return vec3(d.x, d.y, l);
}

void main() {
	vec4 color = texture(textureSampler, vUV) * attenuation ;
	vec3 p = getPick();
	
	p.z += color.z;
	p.xy = normalize((color.xy * 2. - 1.) + p.xy) * 0.5 + 0.5;
	gl_FragColor.rgb = clamp(p, vec3(0.), vec3(1.));
	gl_FragColor.a = 1.;
}
`;
