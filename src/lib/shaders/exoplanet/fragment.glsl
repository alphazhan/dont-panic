// Varying variables from the vertex shader
in vec3 vNormal;
in vec3 vPosition;

// Uniforms
uniform vec3 lightPosition;          // Position of the PointLight (Star)
uniform vec3 color;                  // Main surface color
uniform vec3 secondaryColor;         // Secondary color for horizontal scars
uniform vec3 brushColor;             // Color of the brushes (blobby craters)
uniform vec3 cloudColor;             // Color of the clouds
uniform float atmosphereThickness;   // Intensity of atmosphere
uniform float cloudCoverage;         // Cloud coverage (randomized clouds)
uniform float scarsPercentage;       // Percentage of scars (Jupiter bands)
uniform float brushRadius;           // Radius of each brush (blobby crater)
uniform float minDiffuse;            // Minimum diffuse light
uniform vec2 brushPositions[100];    // Pre-calculated random brush positions
uniform int brushCount;              // Total number of brushes
uniform float horizontalExaggeration; // Horizontal elongation

// Helper function to calculate distance on the sphere's surface
float sphereDistance(vec3 pointA, vec3 pointB) {
    return acos(dot(normalize(pointA), normalize(pointB)));
}

// Function to convert brush positions to 3D coordinates on a sphere
vec3 toSphere(vec2 position) {
    float theta = position.x * 3.14159265359; // Convert x to angle in radians
    float phi = position.y * 3.14159265359;   // Convert y to angle in radians
    float x = sin(theta) * cos(phi);          // X position on the sphere
    float y = sin(theta) * sin(phi);          // Y position on the sphere
    float z = cos(theta);                     // Z position on the sphere
    return vec3(x, y, z);                     // Return as 3D coordinates
}

// Function to create a static blob effect with distortion
float blobEffect(float distance, vec3 brushWorldPos, vec3 fragmentPosition) {
    float noiseX = sin(brushWorldPos.x * 10.0 + 3.14) * 0.2;
    float noiseY = cos(brushWorldPos.y * 10.0 + 3.14) * 0.2;
    float noiseZ = sin(brushWorldPos.z * 10.0 + 3.14) * 0.2;

    float distortion = sin(distance * 3.0 + noiseX + noiseY + noiseZ) * 0.5;
    float adjustedDistance = distance - brushRadius + distortion;

    return smoothstep(brushRadius, brushRadius * 0.5, adjustedDistance);
}

// Function to generate curved clouds using sine distortions
float curvedClouds(vec3 pos) {
    float cloudPattern = sin(pos.x * 5.0) * cos(pos.y * 5.0);
    cloudPattern += sin(pos.y * 10.0) * 0.3;
    cloudPattern += sin(pos.x * pos.y * 7.0);
    return cloudPattern;
}

void main() {
    // Normalize the normal vector
    vec3 normal = normalize(vNormal);

    // Compute the light direction based on the actual light position (from PointLight)
    vec3 lightDir = normalize(lightPosition - vPosition); // Direction of the light
    float diffuse = max(dot(normal, lightDir), minDiffuse);

    // Curved cloud effect using sine wave distortions
    float cloudPattern = curvedClouds(vPosition); // Get the cloud pattern
    float cloudFactor = smoothstep(0.2, 0.5, cloudPattern); // Smooth transition for cloudiness
    vec3 cloudEffect = mix(color, cloudColor, cloudFactor * cloudCoverage); // Apply cloud color

    // Secondary color scars (Jupiter-style bands)
    float bandFactor = smoothstep(0.3, 0.6, abs(vPosition.y)) * cloudFactor;
    vec3 scarEffect = mix(cloudEffect, secondaryColor, scarsPercentage * bandFactor);

    // Apply brushes (non-overlapping static blobs)
    vec3 brushEffect = scarEffect;
    for (int i = 0; i < brushCount; i++) {
        vec2 brushPos = brushPositions[i];
        vec3 brushWorldPos = toSphere(brushPos); // Convert to 3D point on sphere
        float dist = sphereDistance(vPosition, brushWorldPos);
        
        if (dist < brushRadius) {
            float softness = blobEffect(dist, brushWorldPos, vPosition);
            brushEffect = mix(brushEffect, brushColor, softness);
        }
    }

    // Add atmospheric effect (fade towards horizon)
    float atmosphereEffect = smoothstep(0.0, 1.0, length(vPosition) * atmosphereThickness);

    // Final color combining diffuse lighting, specular highlights, and effects
    vec3 finalColor = (brushEffect * diffuse) * (1.0 - atmosphereEffect);
    gl_FragColor = vec4(finalColor, 1.0);
}
