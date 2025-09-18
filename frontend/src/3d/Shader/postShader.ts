import { Effect } from "@babylonImport";

Effect.ShadersStore["auroraApplyFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;
uniform sampler2D	auroraTexture;

varying vec2	vUV;

void main(void) {
	vec4	color = texture(textureSampler, vUV);
	vec4	aurora = texture(auroraTexture, vUV);
	
	gl_FragColor.rgb = aurora.rgb + color.rgb;
	gl_FragColor.a = 1.;
}
`;

Effect.ShadersStore["fogApplyFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;
uniform sampler2D	fogTexture;

uniform vec3	fogAbsorption;

varying vec2	vUV;

void main(void) {
	vec4	color = texture(textureSampler, vUV);
	vec4	fog = texture(fogTexture, vUV);
	
	gl_FragColor.rgb = color.rgb * pow(exp(-fogAbsorption), vec3(fog.r * 100.) * color.a) + fog.gba;
	// gl_FragColor.rgb = color.rgb + fog.gba;
	gl_FragColor.a = 1.;
	// gl_FragColor.rgb = fog.rgb;
}
`;

Effect.ShadersStore["colorCorrectionFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;

uniform float	brightness;
uniform float	contrast;
uniform float	gamma;

varying vec2	vUV;

void main() {
	vec3 color = texture(textureSampler, vUV).rgb;
	color = (color - 0.5) * contrast + 0.5;
	color += brightness;
	color = pow(color, vec3(1. / gamma));
	gl_FragColor.rgb = color;
	gl_FragColor.a = 1.;
}
`;
