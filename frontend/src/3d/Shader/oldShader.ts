import { Effect } from "@babylonImport";

Effect.ShadersStore["shellVertexShader"] = `
	precision highp float;

	attribute vec3	position;
	attribute vec2	uv;
	attribute vec3	normal;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;


	varying vec2	vUV;

	void main() {
		vUV = uv;
		vec4 p = vec4(position, 1.);
		p = world * p;
		vec3 normalW = normalize(mat3(world) * normal);
		gl_Position = projection * view * p;
	}
`;

Effect.ShadersStore["shellFragmentShader"] = `
precision highp    float;

#define M_PI 3.1415926535897932384626433832795
#define AA 1.

uniform float       time;
uniform float	    rand;

uniform mat4        world;
uniform mat4        view;
uniform mat4        projection;

varying vec2    vUV;

float hash(ivec2 p )  // this hash is not production ready, please
{                         // replace this by something better

    // 2D -> 1D
    int n = p.x*3 + p.y*113;

    // 1D hash by Hugo Elias
	n = (n << 13) ^ n;
    n = n * (n * n * 15731 + 789221) + 1376312589;
    return -1.0+2.0*float( n & 0x0fffffff)/float(0x0fffffff);
}

float noise(vec2 p )
{
    ivec2 i = ivec2(floor( p ));
    vec2 f = fract( p );
	
    // cubic interpolant
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( hash( i + ivec2(0,0) ), 
                     hash( i + ivec2(1,0) ), u.x),
                mix( hash( i + ivec2(0,1) ), 
                     hash( i + ivec2(1,1) ), u.x), u.y);
}

float noise_sum(vec2 p)
{
    float f = 0.0;
    p = p * 4.0;
    f += 1.0000 * noise(p); p = 2.0 * p;
    f += 0.5000 * noise(p); p = 2.0 * p;
	f += 0.2500 * noise(p); p = 2.0 * p;
	f += 0.1250 * noise(p); p = 2.0 * p;
	f += 0.0625 * noise(p); p = 2.0 * p;
    
    return f;
}

float noise_sum_abs(vec2 p)
{
    float f = 0.0;
    p = p * 3.0;
    f += 1.0000 * abs(noise(p)); p = 2.0 * p;
    f += 0.5000 * abs(noise(p)); p = 2.0 * p;
	f += 0.2500 * abs(noise(p)); p = 2.0 * p;
	f += 0.1250 * abs(noise(p)); p = 2.0 * p;
	f += 0.0625 * abs(noise(p)); p = 2.0 * p;
    
    return f;
}

float noise_sum_abs_sin(vec2 p)
{
    float f = noise_sum_abs(p);
    f = sin(f * 2.5 + p.x * 5.0 - 1.5);
    
    return f ;
}

void main() {
	vec2 p = vUV * SIZE * 0.01;

	vec2 uv = p*vec2(5.) + (time * DIR) * (1. / SIZE);
	float t = (noise(time * 10. * p.yx) * 0.5 + 0.5) * 0.1;
	float f = 0.0;

   	f = noise_sum_abs( 15.0*uv );

	f = 0.5 + 0.5*f;
	//f = floor(f * 1.2);
	if (f < CEIL + t) {discard;}
	vec3 col  = vec3(min(1., (1. - f) * 2.));
	// float alpha = f * 0.5;
	gl_FragColor = vec4(col *col, 1.);
}`;


Effect.ShadersStore['WindHeightPixelShader'] = `
precision highp float;

#include<noises>

float height(vec3 v) {
	return (gradientNoise(v * 4., 4.) + 0.25 * gradientNoise(v * 8., 8.) + 0.5 * gradientNoise(v * 16., 16.)) * (1. / 1.75);
}

float wind(vec3 v) {
	return (gradientNoise(v * 4., 4.) + 0.5 * gradientNoise(v * 8., 8.) + 0.25 * gradientNoise(v * 16., 16.)) * (1. / 1.75);
}

varying vec2 vUV;
void main(void) {
	vec3 uv = vec3(vUV.x, 0, vUV.y);
	gl_FragColor = vec4(wind(uv) * 0.5 +0.5, height(uv + vec3(173437.,0., 3348.)) * 0.5 + 0.5, 0.0, 1.);
	//gl_FragColor = vec4(height(uv) * 0.5 +0.5, height(uv) * 0.5 + 0.5, 0.0, 1.);
}
`;

Effect.ShadersStore['glitchFragmentShader'] = `
precision highp float;

varying vec2		vUV;
uniform sampler2D	textureSampler;
uniform vec3		origin;
uniform float		time;
uniform float		ratio;

#include<noises>


float sdfCircle(vec2 p, float r) {
	return length(p) - r;
}

float getContrast(vec2 pos) {
	
	vec2 p = pos - origin.xy;
	p.x *= ratio;
	float r = (time - origin.z) * 0.5;
	r *= r;
	r += 0.05;
	float n = 0.2 * noise12(p * 10000. + p);
	p += n * normalize(p);
	float c = sdfCircle(p, r);
	return step(c,0.);
}

void main() {
	vec2 uv = vUV;
	vec2 centre = uv - origin.xy;

	gl_FragColor = texture2D(textureSampler, uv);
	if (origin.z == 0.) {
		return ;
	}
	
	vec3	color = vec3(0.);
	float t = fract(time);
	
	float contrast = 1. + (1. + time - origin.z) * getContrast(uv);
	contrast *= contrast;
	gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * contrast + 0.5;
	float dith = max(2., 256. - (time - origin.z));
	gl_FragColor = min(gl_FragColor, vec4(1.));
}
`;

Effect.ShadersStore['combineFragmentShader'] = `
	precision highp float;

	uniform sampler2D	textureSampler;
	uniform sampler2D	cloudSampler;
	uniform sampler2D	grassSampler;
	uniform vec2		resolution;
	uniform float		time;
	uniform	float		noise;

	varying vec2		vUV;

	const mat2 M2 = mat2(
	    0.0 / 4.0, 3.0 / 4.0,
	    2.0 / 4.0, 1.0 / 4.0
	);

	float hash( float n )
	{
		return fract(sin(n)*43758.5453);
	}

	const mat4 M4 = (1.0 / 16.0) * mat4(
	     0.0, 12.0,  3.0, 15.0,  // Column 0
	     8.0,  4.0, 11.0,  7.0,  // Column 1
	     2.0, 14.0,  1.0, 13.0,  // Column 2
	    10.0,  6.0,  9.0,  5.0   // Column 3
	);

	const float M8[64] = float[64](
	     0.0 / 64.0, 32.0 / 64.0,  8.0 / 64.0, 40.0 / 64.0,  2.0 / 64.0, 34.0 / 64.0, 10.0 / 64.0, 42.0 / 64.0,
	    48.0 / 64.0, 16.0 / 64.0, 56.0 / 64.0, 24.0 / 64.0, 50.0 / 64.0, 18.0 / 64.0, 58.0 / 64.0, 26.0 / 64.0,
	    12.0 / 64.0, 44.0 / 64.0,  4.0 / 64.0, 36.0 / 64.0, 14.0 / 64.0, 46.0 / 64.0,  6.0 / 64.0, 38.0 / 64.0,
	    60.0 / 64.0, 28.0 / 64.0, 52.0 / 64.0, 20.0 / 64.0, 62.0 / 64.0, 30.0 / 64.0, 54.0 / 64.0, 22.0 / 64.0,
	     3.0 / 64.0, 35.0 / 64.0, 11.0 / 64.0, 43.0 / 64.0,  1.0 / 64.0, 33.0 / 64.0,  9.0 / 64.0, 41.0 / 64.0,
	    51.0 / 64.0, 19.0 / 64.0, 59.0 / 64.0, 27.0 / 64.0, 49.0 / 64.0, 17.0 / 64.0, 57.0 / 64.0, 25.0 / 64.0,
	    15.0 / 64.0, 47.0 / 64.0,  7.0 / 64.0, 39.0 / 64.0, 13.0 / 64.0, 45.0 / 64.0,  5.0 / 64.0, 37.0 / 64.0,
	    63.0 / 64.0, 31.0 / 64.0, 55.0 / 64.0, 23.0 / 64.0, 61.0 / 64.0, 29.0 / 64.0, 53.0 / 64.0, 21.0 / 64.0
	);
	
	void main() {
		vec4 cloud = texture2D(cloudSampler, vUV);
		float f = (noise == 2. ? hash(time * 0.00001 + vUV.y) : 1.);

		ivec2 n = ivec2(mod(floor(vUV * resolution * 0.5 * f), 2.));
		float weight = M2[n.x][n.y]- 0.5;
		//cloud.rgb -= 0.3;
		cloud.rgb = floor(cloud.rgb * 32. + 0.5) * (1. / 32.);
		cloud.rgb = cloud.rgb + 0.1 * cloud.a * weight;
		cloud.rgb = (cloud.rgb - 0.5) * 1.3 + 0.5;

		vec4 color = texture2D(textureSampler, vUV);
		vec4 grass = texture2D(grassSampler, vUV);

		f = (noise == 1. ? hash(time * 0.00001 + vUV.y) : 1.);
		n = ivec2(mod(floor(vUV * resolution * f), 4.));
		weight = M4[n.x][n.y]- 0.65;
		//grass.rgb = floor(grass.rgb * 7. + 0.5) * (1. / 7.);
		grass.rgb = grass.rgb + 0.4 * weight;
		//grass.rgb += 0.2;
		//grass.rgb = (grass.rgb - 0.5) * 1.4 + 0.5;
		grass.rgb = (grass.rgb - 0.5) * 3.4 + 0.5;

		
		float a = clamp(2. * (grass.a - color.a), 0., 1.);
		color = mix(grass, color, 1. - a);

		gl_FragColor = mix(cloud, color, min(color.a * 2., 1.));
	}
`

Effect.ShadersStore["sharpenFragmentShader"] = `
	precision highp float;

	#define LENGTH 1.

	uniform sampler2D	textureSampler;
	uniform vec2		resolution;

	varying vec2 vUV;

	void main() {
		// Adapted from https://igortrindade.wordpress.com/2010/04/23/fun-with-opengl-and-shaders/
		float dx = 1.0 / resolution.x;
		float dy = 1.0 / resolution.y;
		vec4 sum = vec4(0.0);
		float amount = 1.;
		float neighbor = amount * -1.;
		float center = amount * 4. + 1.;
		sum += neighbor * texture2D(textureSampler, vUV + vec2( -LENGTH * dx , 0.0 ));
		sum += neighbor * texture2D(textureSampler, vUV + vec2( 0.0 , -LENGTH * dy));
		sum += center * texture2D(textureSampler, vUV );
		sum += neighbor * texture2D(textureSampler, vUV + vec2( 0.0 , LENGTH * dy));
		sum += neighbor * texture2D(textureSampler, vUV + vec2( LENGTH * dx , 0.0 ));
		
		gl_FragColor = sum;
		gl_FragColor.a = 1.;
	}
`

Effect.ShadersStore["cloudVertexShader"] = `
	precision highp float;

	attribute vec3	position;
	attribute vec2	uv;
	attribute vec3	normal;

	uniform mat4	world;
	uniform mat4	view;
	uniform mat4	projection;


	varying vec2	vUV;
	varying vec3	vPositionW;

	void main() {
		vUV = uv;
		vec4 p = vec4(position, 1.);
		p = world * p;
		vPositionW = p.xyz;
		
		vec3 normalW = normalize(mat3(world) * normal);
		gl_Position = projection * view * p;
	}

`

