import { Effect } from "@babylonImport";

Effect.ShadersStore["OLDunderwaterFragmentShader"] = `
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



Effect.ShadersStore["underwaterFragmentShader"] = `
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

		-godrays: beerlaw from surface * godrayintensity
		-ambient: beerlaw * surface
		-hit: beearlaw to hit
		
		

}
`;

Effect.ShadersStore["underwaterFragmentShader"] = `
precision highp float;

#define M_PI 3.1415926535897932384626433832795
#define EPS	0.1

layout(std140) uniform camera {
	float	cameraMaxZ;
	vec3	cameraPosition;
	mat4	projection;
	mat4	iprojection;
	mat4	iview;
	mat4	world;
};
layout(std140) uniform data {
	float	noiseOffset;
	float	stepSize;
	float	maxDistance;
	float	worldSize;
	float	waterHeight;
	float	waveMaxDisplacement;
	float	density;
	float	lightScattering;
	float	ambientMultiplier;
	vec3	waterAbsorption;
};

uniform vec2	resolution;
uniform float	time;

uniform sampler2D	textureSampler;
uniform sampler2D	depthTexture;
uniform sampler2D	waveTexture;
uniform sampler2D	causticTexture;


varying vec2 vUV;

float heyney_greenstein(float angle, float scattering) {
			return (1. - angle * angle) / (4. * M_PI * pow(1. + scattering * scattering - (2.0 * scattering) * angle, 1.5));
}

vec3 worldPosFromDepth(){
	float depth = texture2D(depthTexture, vUV).r;
	vec4 ndc = vec4(
		(vUV.x - 0.5) * 2.0,
				(vUV.y - 0.5) * 2.0,
			projection[2].z + projection[3].z / (depth * cameraMaxZ),
		1.0
			);
	vec4 worldSpaceCoord = iview * iprojection * ndc;
	worldSpaceCoord /= worldSpaceCoord.w;
	return worldSpaceCoord.xyz;
}

float hash(float p) { 
	p = fract(p * 0.1031); 
	p *= p + 33.33; 
	return fract(p * (p + p)); 
}

float travelStartOffset(void) {
	vec2 uv = vUV * resolution * 0.5;
	uv -= fract(uv);
	uv *= 0.1;
	return hash(uv.x * uv.y + time) * noiseOffset;
}


float waterSdf(vec3 p, float h) {
	p.y -= waterHeight * 0.5;
	vec3 q = abs(p) - vec3(worldSize * 0.5, h * 0.5, worldSize * 0.5);
	return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

void main(void) {
	vec3 position = cameraPosition;

	vec3 worldPos = worldPosFromDepth();


	float distanceToHit = length(worldPos - cameraPosition);
	vec3 ray = normalize(worldPos - cameraPosition);

	vec4 color = texture2D(textureSampler, vUV);
	float travel = travelStartOffset();
	vec3 transmittance = vec3(1.);

	vec4 fogColor = vec4(0.,0.,0.,0.);

	vec2 v = vec2(0., 100.);
	vec3 p = position + travel * ray;
	float maxDist = min(maxDistance, distanceToHit);

	float s = 100.;//waterSdf(p);
	float r = travel;
	float h = 0.;
	float d = 0.;
	vec2 uv;

	float surfaceTransmittance = 1.;
	float rayTransmittance = 1.;
	float surfaceLuminance = 0.;
	while (travel < maxDist) {
		h = texture(waveTexture, p.xz * (1. / worldSize) + 0.5).r  * waveMaxDisplacement + waterHeight;
		s = waterSdf(p, p.y > 0. ? h : waterHeight);
		d = density * float(s < 0.);
		//s = abs(s);
		r = min(stepSize, abs(s));

		uv = (p.xz + (h - p.y) * 0.2)* (1. / worldSize) + 0.5;

		//surfaceLuminance += texture(causticTexture, uv).r;
		rayTransmittance *= exp(-d * r);
		surfaceTransmittance  *=  exp(-d * 0.01 * (h - p.y));// * float(dot(step(uv, vec2(1.)),step(-uv, vec2(0.))) == 2.);
		surfaceLuminance += ambientMultiplier * r * texture(causticTexture, uv).r * exp(-d * (h - p.y)) * float(s < 0.) * \
			heyney_greenstein(dot(ray, vec3(0., -1, 0.)), lightScattering) *  float(dot(step(uv, vec2(1.)),step(-uv, vec2(0.))) == 2.);
//* heyney_greenstein(dot(ray, vec3(0., -1, 0.)), lightScattering) 

		r = stepSize;
		p += ray * r;

		travel += r;
	}
	gl_FragColor.r = min(rayTransmittance, 1.);
	gl_FragColor.g = min(surfaceLuminance , 1.);
	gl_FragColor.b = 0.;
	gl_FragColor.a = 1.;
}
`;

Effect.ShadersStore["underwaterApplyFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;
uniform sampler2D	sceneTexture;

uniform vec3	waterAbsorption;

varying vec2	vUV;

void main(void) {
	vec4	transmittances = texture(textureSampler, vUV);
	vec4	color = texture(sceneTexture, vUV);
	//gl_FragColor.rgb = (color.rgb * transmittances.r + transmittances.g) ;//* exp(-waterAbsorption);
	gl_FragColor.rgb = (color.rgb * transmittances.r + transmittances.g) * exp(-waterAbsorption);
	gl_FragColor.a = 1.;
}
`;
