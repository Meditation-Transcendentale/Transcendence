import { Effect } from "@babylonImport";

Effect.ShadersStore["fogFragmentShader"] = `
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

uniform sampler2D	depthTexture;
uniform sampler2D	surfaceTexture;


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

//from inigo quilez
//https://iquilezles.org/articles/intersectors/
// axis aligned box centered at the origin, with size boxSize
bool boxIntersection( vec3 ro, vec3 rd, vec3 boxSize, out float result) 
{
	vec3 m = 1.0/rd; // can precompute if traversing a set of aligned boxes
	vec3 n = m*ro;   // can precompute if traversing a set of aligned boxes
	vec3 k = abs(m)*boxSize;
	vec3 t1 = -n - k;
	vec3 t2 = -n + k;
	float tN = max( max( t1.x, t1.y ), t1.z );
	float tF = min( min( t2.x, t2.y ), t2.z );
	result = tF;
	// result.y = tF;
	return (tN > tF || tF < 0.);
}

void main(void) {
	vec3 position = cameraPosition;

	// gl_FragColor.rgb = vec3(texture(depthTexture, vUV).r);
	// return;
	vec3 worldPos = worldPosFromDepth();


	float distanceToHit = length(worldPos - cameraPosition);
	vec3 ray = normalize(worldPos - cameraPosition);

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

	float	rayTransmittance = 0.;
	vec3	fog = vec3(0.);
	while (travel < maxDist) {
		h = texture(surfaceTexture, p.xz * (1. / worldSize) + 0.5).r  * waveMaxDisplacement + waterHeight;
		s = waterSdf(p, p.y > 0. ? h : waterHeight);
		d = density * float(s < 0.);
		r = min(stepSize, abs(s));

		// uv = (p.xz + (h - p.y) * 0.2)* (1. / worldSize) + 0.5;
		uv = (p.xz )* (1. / worldSize) + 0.5;

		rayTransmittance += d * r;
		
		fog += ambientMultiplier * r * texture(surfaceTexture, uv).g * exp(d * (h - p.y) * -waterAbsorption) * float(s < 0.) * \
			heyney_greenstein(dot(ray, vec3(0., 1, 0.)), lightScattering) *  float(dot(step(uv, vec2(1.)),step(-uv, vec2(0.))) == 2.);


		r = stepSize;
		p += ray * r;

		travel += r;
	}
	// position += travel * ray;
	// if (travel >= maxDistance && !boxIntersection(position , ray, vec3(worldSize * 0.5, waterHeight, worldSize * 0.5), d)) {
	// 	rayTransmittance += density * max(d, length(worldPos - position));
	// }
	gl_FragColor.r = min(rayTransmittance * 0.01, 1.);
	gl_FragColor.gba = fog;
}
`;

