// Uniforms
uniform float radius;
uniform float surfaceRoughness;
uniform float horizontalExaggeration; // For horizontal stretching

// Varying variables to pass to the fragment shader
out vec3 vNormal;
out vec3 vPosition;

void main() {
    // Apply noise to the vertex position
    float noiseValue = sin(position.x * surfaceRoughness) * 0.1; // Example noise function
    vec3 newPosition = position + normal * noiseValue;

    // Apply horizontal exaggeration (egg-shaped effect)
    newPosition.z *= 1.0 + horizontalExaggeration;

    // Set the final position of the vertex
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition * radius, 1.0);

    // Pass the normal and position to the fragment shader
    vNormal = normal;
    vPosition = newPosition;
}
