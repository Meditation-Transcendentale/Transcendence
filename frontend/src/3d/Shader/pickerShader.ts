import { Effect } from "@babylonImport";

Effect.ShadersStore["pickerFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;

uniform float	pick;
uniform float	attenuation;
uniform float	radius;
uniform vec2	origin;

varying vec2	vUV;

vec3	getPick() {
	float l = length(origin - vUV);

	l = max(radius - l, 0.) * (1. / radius);
	vec2 d = normalize(origin - vUV);
	return vec3(l, d.x, d.y);
}

void main() {
	vec4 color = texture(textureSampler, vUV) * attenuation ;
	vec3 p = getPick() * pick;
	
	p.x += color.x;
	p.yz = normalize((color.yz * 2. - 1.) + p.yz) * 0.5 + 0.5;
	gl_FragColor.rgb = p;
	gl_FragColor.a = 1.;
}
`;
