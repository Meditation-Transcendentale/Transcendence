import { Effect } from "@babylonImport";

Effect.ShadersStore['auroraFragmentShader'] = `

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
	float	lightScattering;
	float	ambientMultiplier;
	float	auroraHeight;
	vec3	auroraSize;
	vec3	auroraColorBottom;
	vec3	auroraColorTop;
};

uniform vec2	resolution;
uniform float	time;

uniform sampler2D	depthTexture;
uniform sampler2D	surfaceTexture;

varying vec2 vUV;

float heyney_greenstein(float angle, float scattering) {
			return (1. - angle * angle) / (4. * M_PI * pow(1. + scattering * scattering - (2.0 * scattering) * angle, 1.5));
}

//from inigo quilez
//https://iquilezles.org/articles/intersectors/
// axis aligned box centered at the origin, with size boxSize
bool boxIntersection( vec3 ro, vec3 rd, vec3 boxSize, out vec2 result) 
{
	vec3 m = 1.0/rd; // can precompute if traversing a set of aligned boxes
	vec3 n = m*ro;   // can precompute if traversing a set of aligned boxes
	vec3 k = abs(m)*boxSize;
	vec3 t1 = -n - k;
	vec3 t2 = -n + k;
	float tN = max( max( t1.x, t1.y ), t1.z );
	float tF = min( min( t2.x, t2.y ), t2.z );
	result.x = tN;
	result.y = tF;
	return (tN > tF || tF < 0.);
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



void main(void) {
	vec3 position = cameraPosition;
	vec3 worldPos = worldPosFromDepth();
	vec3 ray = normalize(worldPos - cameraPosition);

	// gl_FragColor.r = texture(depthTexture, vUV).r;
	// gl_FragColor.a = 1.;
	// return;
	vec2 intersection;
	if (boxIntersection(position - vec3(0., auroraHeight, 0.), ray, auroraSize, intersection)) {
		gl_FragColor = vec4(0.,0.,0.,1.);
		return;
	} 
	//else {
	// 	gl_FragColor = vec4(0.,1.,0.,1.);
	// 	return;
	// }
	
	float	travel = max(intersection.x, 0.);
	float	limit = min(maxDistance + travel, length(worldPos - cameraPosition));

	vec3	color = vec3(0.);
	vec2	uv;
	position += ray * travel;
	vec3 r = stepSize * ray;
	float d;
	while (travel < limit) {
		// color = vec3(1.);
		d = ((position.y - auroraHeight) / auroraSize.y * 2.) + 0.5;
		d = clamp(d, 0., 1.);

		uv = position.xz * (0.5 / auroraSize.xz) + 0.5;

		color += ambientMultiplier * stepSize * texture(surfaceTexture, uv).g * mix(auroraColorBottom, auroraColorTop, d) * \
			heyney_greenstein(dot(ray, vec3(0., 1, 0.)), lightScattering);

		travel += stepSize;
		position += r;
	}

	gl_FragColor.rgb = clamp(color, vec3(0.), vec3(1.));
	gl_FragColor.a = 1.;
}`;
