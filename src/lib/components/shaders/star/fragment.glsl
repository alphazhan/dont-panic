// Uniforms
uniform vec3 starColor;
uniform float luminosity;
uniform float glowStrength;

// Fragment shader output
void main() {
    // Base color of the star
    vec3 color = starColor * luminosity;

    // Simple glow effect based on the view direction and position
    float glow = smoothstep(0.4, 1.0, length(gl_FragCoord.xy - vec2(0.5, 0.5)) * glowStrength);

    // Final color
    gl_FragColor = vec4(color + glow, 1.0);
}
