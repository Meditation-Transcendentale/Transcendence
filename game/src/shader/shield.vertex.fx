precision highp float;

attribute vec3 position;
// uniform mat4 world;
uniform mat4 worldViewProjection;
uniform float baseAngle; //radian

uniform vec3 cylinderCenter;
uniform vec3 cylinderAxis;
uniform float intensity;


void main() {
	vec3 P = position; // Vertex position
	vec3 D = normalize(cylinderAxis); // Axis direction vector normalized
	vec3 CP = P - cylinderCenter; // Vector CP

	// CP projected on cylinderAxis
	float t = dot(CP, D);
	vec3 projectedPoint = cylinderCenter + t * D;

	float distanceToAxis = length(P - projectedPoint); // Distance between point and projection

	float distanceFactor = distanceToAxis;
	float rotationAngle = baseAngle * distanceFactor;

	float cosAngle = cos(rotationAngle);
	float sinAngle = sin(rotationAngle);

	mat3 rotationMatrix = mat3(
		vec3(cosAngle + D.x * D.x * (1.0 - cosAngle), D.x * D.y * (1.0 - cosAngle) - D.z * sinAngle, D.x * D.z * (1.0 - cosAngle) + D.y * sinAngle),
		vec3(D.y * D.x * (1.0 - cosAngle) + D.z * sinAngle, cosAngle + D.y * D.y * (1.0 - cosAngle), D.y * D.z * (1.0 - cosAngle) - D.x * sinAngle),
		vec3(D.z * D.x * (1.0 - cosAngle) - D.y * sinAngle, D.z * D.y * (1.0 - cosAngle) + D.x * sinAngle, cosAngle + D.z * D.z * (1.0 - cosAngle))
	);

	vec3 rotatedPoint = rotationMatrix * vec3(P - cylinderCenter);

	vec3 newPosition = cylinderCenter + rotatedPoint.xyz * (1.0 - intensity * distanceToAxis);

	gl_Position = worldViewProjection * vec4(newPosition, 1.0);

}
