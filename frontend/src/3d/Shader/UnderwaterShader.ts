import { Effect } from "@babylonImport";

Effect.ShadersStore["underwaterFragmentShader"] = `
	precision highp float;

	#define M_PI 3.1415926535897932384626433832795
	#define EPS	0.1

	uniform sampler2D	textureSampler;
	uniform sampler2D	depthTexture;
	uniform sampler2D	surfaceTexture;
	uniform sampler2D	causticTexture;

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
	uniform float	worldSize;
	uniform vec3	waterAbsorption;
	uniform float	waterMaxDisplacement;
	uniform float	density;
	uniform float	lightScattering;
	

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

	bool inWorld(vec3 p) {
		return abs(p.x) < 20. && abs(p.z) < 20. && p.y < waterHeigth + waterMaxDisplacement;
	}

	vec2 getDensity(vec3 p) {
		if (inWorld(p)) {
			float h = texture(surfaceTexture, p.xz * (1. / 40.) + 0.5).r * waterMaxDisplacement + waterHeigth;
			// return texture(surfaceTexture, p.xz * (1. / 40.) + 0.5).r + waterHeigth > p.y ? 10. : 0.;
			float d =  h > p.y ? density : 0.;
			return vec2(d, h - p.y);
			// return max(0., h - p.y) * 0.1;
		}
		return vec2(0., 100.);
	}

	float heyney_greenstein(float angle, float scattering) {
			return (1. - angle * angle) / (4. * M_PI * pow(1. + scattering * scattering - (2.0 * scattering) * angle, 1.5));
	}

	// float getCaustic(vec3 p, float d) {
	// 	if (inWorld(p)) 
	// }

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
		vec4 fogColor = vec4(0.,0.,0.,0.);

		float maxDist = min(maxDistance, distance);
		vec2 v = vec2(0., 100.);
		vec3 p = position + travel * ray;
		while (travel < maxDist && v.y > EPS) {
			p += ray * stepLength;
			v = getDensity(p);
			fogColor.rgb += v.x * stepLength * texture(causticTexture, (p.xz + v.y * 0.2)* (1. / 40.) + 0.5).r * heyney_greenstein(dot(ray, vec3(0., -1, 0.)), lightScattering);
			transmittance *= exp(-waterAbsorption * v.x * stepLength);
			travel += stepLength;
		}
		vec4	colo = vec4(0.);
		if (v.y < EPS) {
			colo.rgb = vec3(1.) * dot(texture(surfaceTexture, p.xz * (1. / 40.) + 0.5).bga * 2.0 - 1., vec3(0., -1., 0.));
		}


		//gl_FragColor = vec4(vec3(transmittance), 1.);
		
		// vec4 alpha = vec4(1.) - vec4(min(transmittance, vec3(1.)), 0.);
		vec4 alpha = vec4(min(transmittance, vec3(1.)), 1.);
		gl_FragColor = (color + fogColor) * alpha;
		// gl_FragColor = mix(color + colo, fogColor, alpha);

		// float d = texture2D(depthTexture, vUV).r;
		// gl_FragColor = vec4(1. - d, color.g, 0., 1.);
	}
`;



Effect.ShadersStore["TESTunderwaterFragmentShader"] = `
-Make use of UBO

void main() {
	-init position, ray direction and max distance

	-init initial ray offset by noise and

	-loop:
		-get density and distance from sdf / water surface
		-calculate godray from caustic texture
		-calculate refract and reflect
		?-use refract ray maybe something when outside the box
		-set new stepSize to be:
					- if inside sdf min(sdf, stepSize)
					- if outsite sdf max(sdf, stepSize)
		
		

}
`;

Effect.ShadersStore["TESTunderwaterFragmentShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795
#define EPS	0.1

layout(std140) uniform camera {
	float	maxZ;
	vec3	direction; //seems useless;
	vec3	position;
	mat4	projection;
	mat4	iprojection;
	mat4	iview;
	mat4	world;
};
laytout(std140) uniform data {
	float	noiseOffset;
	float	stepSize;
	float	maxDistance;
	float	worldSize;
	float	waterHeight;
	float	waveMaxDisplacement;
	float	density;
	float	lightScattering;
	vec3	waterAbsorption;
};

uniform vec2	resolution;
uniform float	time;

uniform sampler2D	textureSampler;
uniform sampler2D	depthTexture;
uniform sampler2D	waveTexture;
uniform sampler2D	causticTexture;


vec3 worldPosFromDepth(){
	float depth = texture2D(depthTexture, vUV).r;
	vec4 ndc = vec4(
		(vUV.x - 0.5) * 2.0,
				(vUV.y - 0.5) * 2.0,
			camera.projection[2].z + camera.projection[3].z / (depth * camera.maxZ),
		1.0
			);
	vec4 worldSpaceCoord = camera.iview * camera.iprojection * ndc;
	worldSpaceCoord /= worldSpaceCoord.w;
	return worldSpaceCoord.xyz;
}

float hash(float p) { 
	p = fract(p * 0.1031); 
	p *= p + 33.33; 
	return fract(p * (p + p)); 
}

float travelStartOffset(void) {
	vec2 uv = vUV * resotution * 0.5;
	uv -= fract(uv);
	uv *= 0.1;
	return hash(uv.x * uv.y + time) * data.noiseOffset;
}

varying vec2 vUV;

void main(void) {
	vec3 position = camera.position;

	vec3 worldPos = worldPosFromDepth();


	float distanceToHit = length(worldPos - camera.position);
	vec3 ray = normalize(viewDir);

	vec4 color = texture2D(textureSampler, vUV);
	float travel = travelStartOffset();
	vec3 transmittance = vec3(1.);

	vec4 fogColor = vec4(0.,0.,0.,0.);

	float maxDist = min(maxDistance, distance);
	vec2 v = vec2(0., 100.);
	vec3 p = position + travel * ray;
	float maxDistance = min(data.maxDistance, distanceToHit);

}



`;
