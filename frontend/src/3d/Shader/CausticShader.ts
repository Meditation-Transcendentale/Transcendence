import { Effect } from "@babylonImport";


Effect.ShadersStore["CausticVertexShader"] = `
	precision highp float;

	attribute vec3	position;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;

	uniform float	worldScale;
	uniform vec3	lightDirection;
	uniform float	waterY;

	uniform sampler2D waterNormal;
	uniform sampler2D textureSampler;

	varying vec4	vWorldPos;
	varying vec3	oldPos;
	varying vec3	newPos;

	void main() {
		vec4 p = vec4(position, 1.);
		oldPos = world * p;

		p  = view * p;	
		
		gl_Position = projection * p;
	}

`
Effect.ShadersStore["CausticFragmentShader"] = `

`
