import { Effect } from "@babylonImport";

Effect.ShadersStore["gaussianBlurHorizontalFragmentShader"] = `
precision highp float;

#define W0 0.32716237373929014
#define W1 0.3456752525214198

uniform sampler2D	textureSampler;
uniform vec2		delta;

varying vec2 vUV;

void main() {
	gl_FragColor = texture(textureSampler, vUV) * W0;
	gl_FragColor += texture(textureSampler, vUV + vec2(delta.x, 0.)) * W1;
	gl_FragColor += texture(textureSampler, vUV + vec2(-delta.x, 0)) * W1;
}
`;

Effect.ShadersStore["gaussianBlurVerticalFragmentShader"] = `
precision highp float;

#define W0 0.32716237373929014
#define W1 0.3456752525214198

uniform sampler2D	textureSampler;
uniform vec2		delta;

varying vec2 vUV;

void main() {
	gl_FragColor = texture(textureSampler, vUV) * W0;
	gl_FragColor += texture(textureSampler, vUV + vec2(0., delta.y)) * W1;
	gl_FragColor += texture(textureSampler, vUV + vec2(0., -delta.y)) * W1;
}
`;
