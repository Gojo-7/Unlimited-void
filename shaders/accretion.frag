uniform float uTime;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying float vRadius;
varying float vIntensity;

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

    //////////////////////////////////////////////////////////
    // RADIAL COORDINATES
    //////////////////////////////////////////////////////////

    vec2 p =

        vUv * 2.0 - 1.0;

    float r =

        length(p);

    float angle =

        atan(
            p.y,
            p.x
        );

    //////////////////////////////////////////////////////////
    // TURBULENCE
    //////////////////////////////////////////////////////////

    float n =

        noise(

            vec2(

                angle*3.0 +

                uTime*0.35,

                r*10.0

            )

        );

    n +=

        noise(

            vec2(

                angle*8.0 -

                uTime*0.8,

                r*18.0

            )

        )*0.5;

    //////////////////////////////////////////////////////////
    // PLASMA FLOW
    //////////////////////////////////////////////////////////

    float flow =

        sin(

            angle*18.0 +

            uTime*4.5 +

            r*28.0 +

            n*8.0

        );

    flow =

        flow*0.5+0.5;

    //////////////////////////////////////////////////////////
    // RINGS
    //////////////////////////////////////////////////////////

    float rings =

        sin(

            vRadius*7.0 -

            uTime*3.0

        );

    rings =

        rings*0.5+0.5;

    //////////////////////////////////////////////////////////
    // COLORS
    //////////////////////////////////////////////////////////

    vec3 deep = vec3(

        0.02,
        0.06,
        0.20

    );

    vec3 blue = vec3(

        0.18,
        0.58,
        1.0

    );

    vec3 cyan = vec3(

        0.72,
        0.95,
        1.0

    );

    vec3 white = vec3(

        1.0

    );

    //////////////////////////////////////////////////////////
    // COLOR MIX
    //////////////////////////////////////////////////////////

    vec3 color =

        mix(

            deep,

            blue,

            n

        );

    color =

        mix(

            color,

            cyan,

            flow*0.6

        );

    color +=

        white *

        pow(

            rings,

            5.0

        ) *

        0.35;

    color +=

        white *

        vIntensity *

        0.55;

    //////////////////////////////////////////////////////////
    // EDGE FADE
    //////////////////////////////////////////////////////////

    float alpha =

        smoothstep(

            1.0,

            0.45,

            r

        );

    alpha *=

        0.35 +

        flow*0.65;

    alpha *=

        0.75 +

        vIntensity*0.5;

    //////////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////////

    gl_FragColor =

        vec4(

            color,

            alpha

        );

}