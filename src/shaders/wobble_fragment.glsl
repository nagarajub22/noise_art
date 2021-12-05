precision highp float;


varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.0);
}

// float ambientIntensity = 0.5;
// vec3 ambientColor = vec3(0.89, 0.33, 0.33);

// vec3 color = ambientColor * ambientIntensity;
// gl_FragColor = vec4(color, 1.0);
