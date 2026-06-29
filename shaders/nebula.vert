uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying float vDensity;
varying float vHeight;

void main(){

    //////////////////////////////////////////////////////
    // UV
    //////////////////////////////////////////////////////

    vUv = uv;

    //////////////////////////////////////////////////////
    // POSITION
    //////////////////////////////////////////////////////

    vec3 pos = position;

    float radius = length(pos.xz);

    //////////////////////////////////////////////////////
    // LARGE SCALE MOTION
    //////////////////////////////////////////////////////

    float wave1 =

        sin(
            radius * 0.18 +
            uTime * 0.22
        ) * 2.2;

    float wave2 =

        cos(
            position.x * 0.08 +
            uTime * 0.35
        ) * 1.4;

    float wave3 =

        sin(
            position.z * 0.10 -
            uTime * 0.28
        ) * 1.6;

    pos.y +=
        wave1 +
        wave2 +
        wave3;

    //////////////////////////////////////////////////////
    // SPIRAL DRIFT
    //////////////////////////////////////////////////////

    float theta =

        atan(
            pos.z,
            pos.x
        );

    theta +=

        uTime * 0.02 +

        radius * 0.0018;

    pos.x =
        cos(theta) * radius;

    pos.z =
        sin(theta) * radius;

    //////////////////////////////////////////////////////
    // BREATHING
    //////////////////////////////////////////////////////

    float pulse =

        1.0 +

        sin(
            uTime * 0.30
        ) * 0.03;

    pos *= pulse;

    //////////////////////////////////////////////////////
    // OUTPUT VALUES
    //////////////////////////////////////////////////////

    vPosition = pos;

    vHeight = pos.y;

    vDensity =

        smoothstep(
            180.0,
            20.0,
            radius
        );

    //////////////////////////////////////////////////////
    // FINAL POSITION
    //////////////////////////////////////////////////////

    gl_Position =

        projectionMatrix *

        modelViewMatrix *

        vec4(
            pos,
            1.0
        );

}