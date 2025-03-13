precision highp float;

attribute vec3 position;
uniform mat4 worldViewProjection;
uniform float shieldAngle;

void main() {
    vec3 newPosition = position;
    float currentAngle = atan(newPosition.z, newPosition.x);

    if (abs(currentAngle) > shieldAngle) {
        float clampedAngle = sign(currentAngle) * shieldAngle;
        float radius = length(vec2(newPosition.x, newPosition.z));
        newPosition.x = cos(clampedAngle) * radius;
        newPosition.z = sin(clampedAngle) * radius;
    }

    gl_Position = worldViewProjection * vec4(newPosition, 1.0);
}
