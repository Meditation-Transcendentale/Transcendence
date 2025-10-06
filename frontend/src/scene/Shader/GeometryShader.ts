import { Effect } from "../../babylon";

Effect.ShadersStore["geometryVertexShader"] = `
	precision highp float;

	attribute vec3	position;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;
	uniform float	worldScale;

	varying vec4	vWorldPos;

	void main() {
		vec4 p = vec4(position, 1.);
		p = world * p;
		vWorldPos.xyz = clamp((p.xyz + worldScale * 0.5) / worldScale, 0., 1.);
		p  = view * p;	
		vWorldPos.w = clamp(-p.z / worldScale, 0., 1.);
		
		gl_Position = projection * p;
	}
`

Effect.ShadersStore["geometryFragmentShader"] = `
	precision highp float;

	varying vec4	vWorldPos;

	void main() {
		//gl_FragColor = vec4(vec3(vWorldPos.z), 1.);
		gl_FragColor = vWorldPos;
	}
`
