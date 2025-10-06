import { Effect } from "../../babylon";

Effect.ShadersStore["copyFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;

varying vec2	vUV;

void main(void) {
	gl_FragColor = texture(textureSampler, vUV);
}
`
