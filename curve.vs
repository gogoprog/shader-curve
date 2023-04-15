#version 300 es

precision highp float;

in vec2 height;

out vec4 outColor;

void main() {
    float alpha = 1.0 - abs(height.x - 0.5) * 2.0;
    outColor = vec4(1.0, 1.0, 1.0, alpha);
}
`;
