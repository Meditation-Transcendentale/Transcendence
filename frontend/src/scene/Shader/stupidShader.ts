import { Effect } from "../../babylon";

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
	gl_FragColor.rgb = color.rgb;
	gl_FragColor.a = color.a;
}
`;

Effect.ShadersStore["texture3DCheckVertexShader"] = `
precision highp	float;
precision highp sampler3D;

attribute vec3	position;
attribute vec3	normal;
attribute vec2	uv;

uniform mat4	world;
uniform mat4	viewProjection;


varying vec2 vUV;
void main() {
	vUV = uv;
	gl_Position = viewProjection * world * vec4(position, 1.);
}
`;

Effect.ShadersStore["texture3DCheckFragmentShader"] = `
precision highp float;
precision highp sampler3D;

uniform sampler3D	textureSampler;
uniform float	depth;

varying vec2	vUV;

void main(void) {
	vec3 uvw = vec3(vUV, depth);
	
	gl_FragColor = texture(textureSampler, uvw);
	// gl_FragColor.rgb = uvw;
	gl_FragColor.a = 1.;
}
`;
