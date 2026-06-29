uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vRadius;
varying float vGlow;

void main(){

    vUv = uv;

    vec3 pos = position;

    float r = length(pos.xz);

    vRadius = r;

    //////////////////////////////////////////////////////
    // TURBULENCE
    //////////////////////////////////////////////////////

    float wave1 =
        sin(
            r * 2.6 -
            uTime * 2.4
        ) * 0.18;

    float wave2 =
        sin(
            position.x * 1.8 +
            position.z * 1.3 +
            uTime * 1.8
        ) * 0.12;

    float wave3 =
        cos(
            r * 5.5 +
            uTime * 4.5
        ) * 0.05;

    pos.y +=
        wave1 +
        wave2 +
        wave3;

    //////////////////////////////////////////////////////
    // BREATHING
    //////////////////////////////////////////////////////

    float pulse =

        1.0 +

        sin(
            uTime * 0.55 +
            r
        ) * 0.015;

    pos.xz *= pulse;

    //////////////////////////////////////////////////////
    // TWIST
    //////////////////////////////////////////////////////

    float angle =

        uTime * 0.03 +

        r * 0.02;

    float c = cos(angle);
    float s = sin(angle);

    mat2 rot = mat2(
        c,-s,
        s, c
    );

    pos.xz =
        rot * pos.xz;

    //////////////////////////////////////////////////////
    // OUTPUTS
    //////////////////////////////////////////////////////

    vGlow =

        smoothstep(
            18.0,
            8.0,
            r
        );

    vPosition =
        pos;

    vNormal =
        normal;

    gl_Position =

        projectionMatrix *

        modelViewMatrix *

        vec4(
            pos,
            1.0
        );

}