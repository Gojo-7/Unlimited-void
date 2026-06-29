uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vRadius;
varying float vGlow;

void main(){

    //////////////////////////////////////////////////////
    // NORMALIZED RADIUS
    //////////////////////////////////////////////////////

    float r = clamp(

        (vRadius - 6.0) /
        14.0,

        0.0,

        1.0

    );

    //////////////////////////////////////////////////////
    // PLASMA WAVES
    //////////////////////////////////////////////////////

    float wave1 =

        sin(

            vRadius * 8.0 -

            uTime * 4.0

        );

    float wave2 =

        sin(

            (vUv.x + vUv.y) *

            40.0 +

            uTime * 2.5

        );

    float wave3 =

        cos(

            vRadius * 18.0 +

            uTime * 6.0

        );

    float plasma =

        wave1 * 0.45 +

        wave2 * 0.35 +

        wave3 * 0.20;

    plasma =

        plasma * 0.5 +

        0.5;

    //////////////////////////////////////////////////////
    // COLORS
    //////////////////////////////////////////////////////

    vec3 core = vec3(

        0.88,
        0.97,
        1.00

    );

    vec3 blue = vec3(

        0.35,
        0.75,
        1.00

    );

    vec3 deep = vec3(

        0.03,
        0.12,
        0.42

    );

    vec3 color =

        mix(

            deep,

            blue,

            plasma

        );

    color =

        mix(

            color,

            core,

            vGlow

        );

    //////////////////////////////////////////////////////
    // RADIAL BRIGHTNESS
    //////////////////////////////////////////////////////

    float brightness =

        smoothstep(

            1.0,

            0.15,

            r

        );

    brightness +=

        plasma * 0.45;

    //////////////////////////////////////////////////////
    // EDGE FADE
    //////////////////////////////////////////////////////

    float alpha =

        smoothstep(

            1.0,

            0.75,

            r

        );

    alpha *=

        0.82 +

        plasma * 0.18;

    //////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////

    gl_FragColor = vec4(

        color * brightness,

        alpha

    );

}