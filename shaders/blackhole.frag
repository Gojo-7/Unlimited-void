uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vFresnel;

#define PI 3.14159265359

float hash(vec2 p){

    return fract(
        sin(
            dot(
                p,
                vec2(
                    127.1,
                    311.7
                )
            )
        ) * 43758.5453123
    );

}

float noise(vec2 p){

    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0));
    float d = hash(i+vec2(1.0,1.0));

    vec2 u =
    f*f*(3.0-2.0*f);

    return

        mix(a,b,u.x)

        +

        (c-a)*u.y*(1.0-u.x)

        +

        (d-b)*u.x*u.y;

}

void main(){

    ////////////////////////////////////////////////////////
    // POLAR COORDINATES
    ////////////////////////////////////////////////////////

    vec2 p =

        vUv * 2.0 - 1.0;

    float radius =

        length(p);

    float angle =

        atan(
            p.y,
            p.x
        );

    ////////////////////////////////////////////////////////
    // DISTORTION
    ////////////////////////////////////////////////////////

    float distortion =

        noise(

            vec2(

                angle*2.0,

                radius*12.0 -

                uTime*0.8

            )

        );

    distortion +=

        noise(

            vec2(

                angle*4.0 +

                uTime*0.2,

                radius*20.0

            )

        )*0.4;

    ////////////////////////////////////////////////////////
    // EVENT HORIZON
    ////////////////////////////////////////////////////////

    float horizon =

        smoothstep(

            0.48,

            0.44,

            radius

        );

    ////////////////////////////////////////////////////////
    // INNER GLOW
    ////////////////////////////////////////////////////////

    float innerGlow =

        smoothstep(

            0.62,

            0.46,

            radius

        );

    ////////////////////////////////////////////////////////
    // OUTER HALO
    ////////////////////////////////////////////////////////

    float halo =

        smoothstep(

            1.18,

            0.62,

            radius

        );

    ////////////////////////////////////////////////////////
    // SWIRLING ENERGY
    ////////////////////////////////////////////////////////

    float swirl =

        sin(

            angle*14.0 +

            radius*18.0 -

            uTime*2.5 +

            distortion*4.0

        );

    swirl =

        swirl*0.5+0.5;

    ////////////////////////////////////////////////////////
    // COLORS
    ////////////////////////////////////////////////////////

    vec3 black = vec3(

        0.0

    );

    vec3 deepBlue = vec3(

        0.03,
        0.08,
        0.22

    );

    vec3 blue = vec3(

        0.25,
        0.62,
        1.0

    );

    vec3 cyan = vec3(

        0.72,
        0.94,
        1.0

    );

    vec3 white = vec3(

        1.0

    );

    ////////////////////////////////////////////////////////
    // BASE COLOR
    ////////////////////////////////////////////////////////

    vec3 color =

        mix(

            black,

            deepBlue,

            halo*0.35

        );

    color =

        mix(

            color,

            blue,

            innerGlow*0.55

        );

    color =

        mix(

            color,

            cyan,

            swirl*0.18

        );

    color +=

        white *

        vFresnel *

        0.65;

    ////////////////////////////////////////////////////////
    // EVENT HORIZON
    ////////////////////////////////////////////////////////

    color =

        mix(

            color,

            black,

            horizon

        );

    ////////////////////////////////////////////////////////
    // ALPHA
    ////////////////////////////////////////////////////////

    float alpha =

        halo*0.45 +

        innerGlow*0.25 +

        vFresnel*0.9;

    alpha =

        clamp(

            alpha,

            0.0,

            1.0

        );

    ////////////////////////////////////////////////////////
    // OUTPUT
    ////////////////////////////////////////////////////////

    gl_FragColor =

        vec4(

            color,

            alpha

        );

}