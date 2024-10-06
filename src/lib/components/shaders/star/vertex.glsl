uniform float radius;

// Star vertex shader
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * radius, 1.0);
}
