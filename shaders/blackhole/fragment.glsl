uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec3 vViewDirection;
varying vec2 vUv;

#define PI 3.14159265359

//////////////////////////////////////////////////////////////
// SIMPLE HASH
//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
// VALUE NOISE
//////////////////////////////////////////////////////////////

float noise(vec2 p){

    vec2 i = floor(p);

    vec2 f = fract(p);

    float a = hash(i);

    float b = hash(i + vec2(1.0,0.0));

    float c = hash(i + vec2(0.0,1.0));

    float d = hash(i + vec2(1.0,1.0));

    vec2 u =

        f * f *

        (3.0 - 2.0 * f);

    return

        mix(a,b,u.x)

        +

        (c-a)*u.y*(1.0-u.x)

        +

        (d-b)*u.x*u.y;

}

void main(){

    //////////////////////////////////////////////////////////
    // UV
    //////////////////////////////////////////////////////////

    vec2 p =

        vUv * 2.0 - 1.0;

    float radius =

        length(p);

    float angle =

        atan(

            p.y,

            p.x

        );

    //////////////////////////////////////////////////////////
    // FRESNEL
    //////////////////////////////////////////////////////////

    float fresnel =

        pow(

            1.0 -

            max(

                dot(

                    normalize(vNormal),

                    normalize(vViewDirection)

                ),

                0.0

            ),

            5.0

        );

    //////////////////////////////////////////////////////////
    // ENERGY
    //////////////////////////////////////////////////////////

    float energy =

        noise(

            vec2(

                angle * 4.0 +

                uTime * 0.35,

                radius * 8.0

            )

        );

    energy +=

        noise(

            vec2(

                angle * 10.0 -

                uTime,

                radius * 18.0

            )

        ) * 0.5;

    //////////////////////////////////////////////////////////
    // GLOW
    //////////////////////////////////////////////////////////

    float glow =

        smoothstep(

            1.15,

            0.45,

            radius

        );

    //////////////////////////////////////////////////////////
    // HORIZON
    //////////////////////////////////////////////////////////

    float horizon =

        smoothstep(

            0.52,

            0.46,

            radius

        );

    //////////////////////////////////////////////////////////
    // COLORS
    //////////////////////////////////////////////////////////

    vec3 black = vec3(0.0);

    vec3 deepBlue = vec3(

        0.03,

        0.07,

        0.22

    );

    vec3 cyan = vec3(

        0.45,

        0.78,

        1.0

    );

    vec3 white = vec3(1.0);

    //////////////////////////////////////////////////////////
    // COLOR
    //////////////////////////////////////////////////////////

    vec3 color =

        mix(

            black,

            deepBlue,

            glow * 0.35

        );

    color =

        mix(

            color,

            cyan,

            energy * 0.25

        );

    color +=

        white *

        fresnel *

        0.9;

    color =

        mix(

            color,

            black,

            horizon

        );

    //////////////////////////////////////////////////////////
    // ALPHA
    //////////////////////////////////////////////////////////

    float alpha =

        glow * 0.35 +

        fresnel * 0.75;

    alpha =

        clamp(

            alpha,

            0.0,

            1.0

        );

    //////////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////////

    gl_FragColor =

        vec4(

            color,

            alpha

        );

}