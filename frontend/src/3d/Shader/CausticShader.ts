import { Effect } from "@babylonImport";


Effect.ShadersStore["CausticVertexShader"] = `
	precision highp float;

	attribute vec3	position;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;
	uniform float	worldScale;

	varying vec4	vWorldPos;
	varying vec3	oldPos;

	void main() {
		vec4 p = vec4(position, 1.);
		p = world * p;
		vWorldPos.xyz = clamp((p.xyz + worldScale * 0.5) / worldScale, 0., 1.);
		p  = view * p;	
		vWorldPos.w = clamp(-p.z / worldScale, 0., 1.);
		
		gl_Position = projection * p;
	}

`
Effect.ShadersStore["CausticFragmentShader"] = `

`
