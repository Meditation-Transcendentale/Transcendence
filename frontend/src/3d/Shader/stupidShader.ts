import { Effect } from "@babylonImport";

Effect.ShadersStore["oneColorVertexShader"] = `
precision highp	float;

attribute vec3	position;

uniform mat4	world;
uniform mat4	viewProjection;

void main() {
	gl_Position = viewProjection * world * vec4(position, 1.);
}
`;

Effect.ShadersStore["oneColorFragmentShader"] = `
precision highp float;

uniform vec4	color;

void main(void) {
	gl_FragColor = color;
}
`;
