import { Effect } from "../../babylon";

Effect.ShadersStore["kelpVertexShader"] = `
	precision highp float;

	attribute vec3	position;
	attribute vec2	uv;
	attribute vec3	normal;
	attribute vec4	world0;
	attribute vec4	world1;
	attribute vec4	world2;
	attribute vec4	world3;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;

	varying vec2	vUV;

	void main() {
		mat4 finalWorld = mat4(world0, world1, world2, world3);
	    finalWorld = world*finalWorld;

		vec4 p = vec4(position, 1.);
		p = world * p;
		p  = view * p;	
		gl_Position = projection * p;
	}
`

Effect.ShadersStore["kelpFragmentShader"] = `
	precision highp float;

	varying vec2	vUV;

	void main() {
		gl_FragColor = vec4(1.);
	}
`
