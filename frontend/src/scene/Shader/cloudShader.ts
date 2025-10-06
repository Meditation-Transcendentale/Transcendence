import { Effect } from "../../babylon";

Effect.ShadersStore["cloudPixelShader"] = `
// https://www.shadertoy.com/view/WdXBW4

precision highp float;

#define M_PI 3.1415926535897932384626433832795
 
uniform float	time;
uniform vec2	coord;
uniform vec3	worldPos;
uniform float	ratio;

varying vec2	vUV;

const float cloudscale = 1.1;
const float speed = 0.005;
const float clouddark = 0.5;
const float cloudlight = 0.3;
const float cloudcover = 0.8;
const float cloudalpha = 8.0;
const float skytint = 0.5;
//const vec3 skycolour2 = vec3(0.2, 0.4, 0.66) * 1.;
//const vec3 skycolour1 = vec3(0.5, 0.71, .86) * 1.;
const vec3 skycolour1 = vec3(0.) * 1.;
const vec3 skycolour2 = vec3(0.) * 1.;

const mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );

vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
	vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));	
}

float fbm(vec2 n) {
	float total = 0.0, amplitude = 0.1;
	for (int i = 0; i < 7; i++) {
		total += noise(n) * amplitude;
		n = m * n;
		amplitude *= 0.4;
	}
	return total;
}

// -----------------------------------------------

void main() {
	vec2 v = vUV * 2. - 1.;
	v.y = v.y + 0.1;
	vec2 p2 = coord + v.yx * vec2(-0.4, -ratio * 0.4);
	vec2 p = vec2(cos(p2.y), sin(p2.y)) * sin(p2.x);
	float red = 0.1 / max(cos(p2.x), 0.001);
	p *= red;
	p += worldPos.xz * 0.005;
	// p = p. - vec2(100., 100.);
	// p = p.yx;
	// p = p * 0.001 + 0.5;
	// p = p * 0.5 + 0.5;
	vec2 j = p;
	// vec2 p = p2 * vec2(10.);
	// vec2 p = vUV * vec2(2., 5.);
	vec2 uv = p;
	float mTime =  time * speed;
    float q = fbm(uv * cloudscale * 0.5);
    
    //ridged noise shape
	float r = 0.0;
	uv *= cloudscale;
    uv -= q - mTime;
    float weight = 0.8;
    for (int i=0; i<8; i++){
		r += abs(weight*noise( uv ));
        uv = m*uv + mTime;
		weight *= 0.7;
    }
    
    //noise shape
	float f = 0.0;
	uv = p; 
	uv *= cloudscale;
    uv -= q - mTime;
    weight = 0.7;
    for (int i=0; i<8; i++){
		f += weight*noise( uv );
        uv = m*uv + mTime;
		weight *= 0.6;
    }
    
    f *= r + f;
    
    //noise colour
    float c = 0.0;
    mTime = time * speed * 2.0;/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	uv = p; 
	uv *= cloudscale*2.0;
    uv -= q - mTime;
    weight = 0.4;
    for (int i=0; i<7; i++){
		c += weight*noise( uv );
        uv = m*uv + mTime;
		weight *= 0.6;
    }
    
    //noise ridge colour
    float c1 = 0.0;
    mTime  *= 3.0;
    uv = p;
	uv *= cloudscale*3.0;
    uv -= q - mTime;
    weight = 0.4;
    for (int i=0; i<7; i++){
		c1 += abs(weight*noise( uv ));
        uv = m*uv + mTime;
		weight *= 0.6;
    }
	
    c += c1;
    
    vec3 skycolour = mix(skycolour2, skycolour1, clamp(red * 0.8, 0., 1.));
    //vec3 cloudcolour = vec3(0.89, 0.91, 0.92) * 1.2 * clamp((clouddark + cloudlight*c), 0.0, 1.0);
    vec3 cloudcolour = vec3(1., 0.91, 0.92) * 1.2 * clamp((clouddark + cloudlight*c), 0.0, 1.0);
   
    f = cloudcover + cloudalpha*f*r;
    
     vec3 result = mix(skycolour, clamp(skytint * skycolour + cloudcolour, 0.0, 1.0), clamp(f + c, 0.0, 1.0));
	// result = cloudcolour;
	

	//red *= 0.3;
	//vec3 result = mix(skycolour, cloudcolour, clamp(f + c + red, 0.0, 1.0));
	//gl_FragColor = vec4( result, 1.0 );

	 red = max(0.,1. - red * 0.03);
	 red = red * red * red;

	 //vec3 result = mix(skycolour, cloudcolour, clamp(f + c, 0.0, 1.0));
	 gl_FragColor = vec4( result * red, (f + c) * 1.);
}
`


