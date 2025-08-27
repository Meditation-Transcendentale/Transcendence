import { Effect } from "@babylonImport";

Effect.ShadersStore["waterCustomVertexShader"] = `
precision highp float;

attribute vec3	position;
attribute vec3	normal;

uniform mat4	world;
uniform mat4	viewProjection;
uniform float	intensity;

uniform sampler2D	heightMap;

varying float	height;

void main(void) {
	vec4	worldPos = world * vec4(position, 1.);
	height = texture2D(heightMap, worldPos.xz / 40. + 0.5).r;

	// worldPos.y += (height * 2. - 1.) * intensity;
	worldPos.y += height * intensity;
	gl_Position = viewProjection * worldPos;
}
`;

Effect.ShadersStore["waterCustomFragmentShader"] = `
precision highp	float;

varying float height;

void main(void) {
	gl_FragColor.rgb = vec3(height);
	gl_FragColor.a = 1.;
}
`;
