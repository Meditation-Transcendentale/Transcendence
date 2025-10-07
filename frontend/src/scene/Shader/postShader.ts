import { Effect } from "../../babylon";

Effect.ShadersStore["auroraApplyFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;
uniform sampler2D	auroraTexture;

varying vec2	vUV;

void main(void) {
	vec4	color = texture(textureSampler, vUV);
	vec4	aurora = texture(auroraTexture, vUV);
	
	gl_FragColor.rgb = aurora.rgb + color.rgb;
	gl_FragColor.a = 1.;
}
`;

Effect.ShadersStore["fogApply3DFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;
uniform sampler2D	fogTexture;

uniform vec3	fogAbsorption;

varying vec2	vUV;

void main(void) {
	vec4	color = texture(textureSampler, vUV);
	vec4	fog = texture(fogTexture, vUV);
	
	gl_FragColor.rgb = color.rgb * pow(exp(-fogAbsorption), vec3(fog.a) * color.a) + fog.rgb ;
	gl_FragColor.a = 1.;
}
`;


Effect.ShadersStore["colorCorrectionFragmentShader"] = `
precision highp float;

uniform sampler2D	textureSampler;

uniform float	brightness;
uniform float	contrast;
uniform float	gamma;
uniform int	tonemapping;

varying vec2	vUV;


//tonemapping source: https://www.shadertoy.com/view/lslGzl
vec3 linearToneMapping(vec3 color)
{
	float exposure = 1.;
	color = clamp(exposure * color, 0., 1.);
	color = pow(color, vec3(1. / gamma));
	return color;
}

vec3 simpleReinhardToneMapping(vec3 color)
{
	float exposure = 1.5;
	color *= exposure/(1. + color / exposure);
	color = pow(color, vec3(1. / gamma));
	return color;
}

vec3 lumaBasedReinhardToneMapping(vec3 color)
{
	float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
	float toneMappedLuma = luma / (1. + luma);
	color *= toneMappedLuma / luma;
	color = pow(color, vec3(1. / gamma));
	return color;
}

vec3 whitePreservingLumaBasedReinhardToneMapping(vec3 color)
{
	float white = 2.;
	float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
	float toneMappedLuma = luma * (1. + luma / (white*white)) / (1. + luma);
	color *= toneMappedLuma / luma;
	color = pow(color, vec3(1. / gamma));
	return color;
}

vec3 RomBinDaHouseToneMapping(vec3 color)
{
    color = exp( -1.0 / ( 2.72*color + 0.15 ) );
	color = pow(color, vec3(1. / gamma));
	return color;
}

vec3 filmicToneMapping(vec3 color)
{
	color = max(vec3(0.), color - vec3(0.004));
	color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
	return color;
}

vec3 Uncharted2ToneMapping(vec3 color)
{
	float A = 0.15;
	float B = 0.50;
	float C = 0.10;
	float D = 0.20;
	float E = 0.02;
	float F = 0.30;
	float W = 11.2;
	float exposure = 2.;
	color *= exposure;
	color = ((color * (A * color + C * B) + D * E) / (color * (A * color + B) + D * F)) - E / F;
	float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;
	color /= white;
	color = pow(color, vec3(1. / gamma));
	return color;
}

//source: https://github.com/GarrettGunnell/Post-Processing/blob/main/Assets/Tone%20Mapping/Tonemapping.shader

const mat3 ACESInputMat = mat3(0.59719, 0.35458, 0.04823, 0.07600, 0.90834, 0.01566, 0.02840, 0.13383, 0.83777);

const mat3 ACESOutputMat = mat3( 1.60475, -0.53108, -0.07367, -0.10208,  1.10813, -0.00605, -0.00327, -0.07276,  1.07602);

vec3 RRTAndODTFit(vec3 v) {
	vec3 a = v * (v + 0.0245786) - 0.000090537;
	vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
	return a / b;
}

vec3 hillACES(vec3 color) {
               
	color = ACESInputMat * color; 

	color = RRTAndODTFit(color);

	color = clamp(ACESOutputMat * color, 0., 1.);
	return pow(color, vec3(1. / gamma));
}

void main() {
	vec3 color = texture(textureSampler, vUV).rgb;
	color = max(vec3(0.),(color - 0.5) * contrast + 0.5);
	color = max(color + brightness, vec3(0.));
	if (tonemapping == 1) {
		color = linearToneMapping(color);
	} else if (tonemapping == 2) {
		color = simpleReinhardToneMapping(color);
	} else if (tonemapping == 3) {
		color = lumaBasedReinhardToneMapping(color);
	} else if (tonemapping == 4) {
		color = whitePreservingLumaBasedReinhardToneMapping(color);
	} else if (tonemapping == 5) {
		color = RomBinDaHouseToneMapping(color);
	} else if (tonemapping == 6) {
		color = filmicToneMapping(color);
	} else if (tonemapping == 7) {
		color = Uncharted2ToneMapping(color);
	} else if (tonemapping == 8) {
		color = hillACES(color);
	}
	// color = pow(color, vec3(1. / gamma));
	gl_FragColor.rgb = color;
	gl_FragColor.a = 1.;
}
`;

