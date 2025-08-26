import { Effect } from "@babylonImport";

Effect.ShadersStore["underwaterFragmentShader"] = `
	precision highp float;


	uniform sampler2D	textureSampler;
	uniform sampler2D	depthTexture;

	uniform mat4	projection;
	uniform mat4	iprojection;
	uniform mat4	iview;
	uniform float	maxZ;
	uniform vec3	cameraDirection;
	uniform vec3	cameraPosition;
	uniform mat4	cameraWorld;
	uniform vec2	resolution;
	uniform float	noiseOffset;
	uniform float	time;

	uniform float	maxDistance;
	uniform float	stepLength;
	uniform float	waterHeigth;
	uniform vec3	waterAbsorption;
	uniform float	density;
	

	varying vec2 vUV;

	vec3 worldPosFromDepth(){
		float depth = texture2D(depthTexture, vUV).r;
		vec4 ndc = vec4(
			(vUV.x - 0.5) * 2.0,
	                (vUV.y - 0.5) * 2.0,
		        projection[2].z + projection[3].z / (depth * maxZ),
			1.0
	            );

		vec4 worldSpaceCoord = iview * iprojection * ndc;

	        worldSpaceCoord /= worldSpaceCoord.w;

	        vec3 dir = normalize(cameraDirection + worldSpaceCoord.xyz);
	        //vec3 vectorToPixel = (dir * (depth * maxZ)) + cameraPosition;
		return worldSpaceCoord.xyz;
	}
	
	float hash(float p) { 
		p = fract(p * 0.1031); 
		p *= p + 33.33; 
		return fract(p * (p + p)); 
	}


	float getDensity(vec3 p) {
		return waterHeigth - p.y;
	}

	void main() {
		vec3 position = cameraPosition;

		vec3 worldPos = worldPosFromDepth();


		vec3 viewDir = worldPos - cameraPosition;
		float distance = length(viewDir);
		vec3 ray = normalize(viewDir);

		vec4 color = texture2D(textureSampler, vUV);

		vec2 uv = vUV * resolution * 0.5 + 10.;
		uv -= fract(uv);
		uv *= 0.1;
		float travel = hash(uv.x * uv.y + time) * noiseOffset;
		vec3 transmittance = vec3(1.);
		//color = vec4(travel);

		float maxDist = min(maxDistance, distance);
		while (travel < maxDist) {
			//transmittance += max(density, 0.) * stepLength;
			transmittance *= exp(-waterAbsorption * getDensity(position + travel * ray) * stepLength);
			travel += stepLength;
		}


		//gl_FragColor = vec4(vec3(transmittance), 1.);
		vec4 alpha = vec4(1.) - vec4(min(transmittance, vec3(1.)), 0.);
		gl_FragColor = mix(color, vec4(0.,0.,1.,1.), alpha);
//gl_FragColor = color;
		
	}
`
