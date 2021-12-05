precision highp float;
#define M_PI 3.14159265358979323846;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_size;
uniform float u_fromMin;
uniform float u_fromMax;
uniform float u_toMin;
uniform float u_toMax;
uniform float u_steps;
uniform vec3 u_fromColor;
uniform vec3 u_toColor;

varying vec3 vColor;

// #pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

float mapRange(float value, float fromMin, float fromMax, float toMin, float toMax, float steps) {
    if(fromMax != fromMin) {
        float factor = value;
        factor = (factor - fromMin) / (fromMax - fromMin);
        factor = steps > 0. ? floor(factor * steps) / steps : 0.0;
        factor = toMin + factor * (toMax - toMin);
        return factor;
    }
    return 0.;
}

float clamp_range(float value, float min, float max) {
    return (max > min) ? clamp(value, min, max) : clamp(value, max, min);
}

vec3 colorRamp(float n, float pos_a, vec3 col_a, float pos_b, vec3 col_b) {
    if(n < pos_a)
        return col_a;
    else if(n < pos_b) {
        n -= pos_a;
        n /= (pos_b - pos_a);
        return col_a * (1.0 - n) + col_b * n;
    }

    return col_b;
}

void main() {
    // vUV = uv;
    // vNormal = normal;

    // vPerlin = snoise3(vec3(u_size * uv, 1.0)) + 0.5;
    float vPerlin = cnoise3(position * u_size) + 0.5;

    float rangeFactor = mapRange(vPerlin, u_fromMin, u_fromMax, u_toMin, u_toMax, u_steps);
    rangeFactor = clamp_range(rangeFactor, u_toMin, u_toMax);
    vColor = colorRamp(rangeFactor, 0.0, u_fromColor, 1.0, u_toColor);
    

    vec3 newPosition = position + normal * rangeFactor;
    newPosition.z = clamp_range(newPosition.z, 0., 0.01);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1);
}
