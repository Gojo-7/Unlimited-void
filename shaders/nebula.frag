uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying float vDensity;
varying float vHeight;

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
        ) *
        43758.5453123
    );

}

float noise(vec2 p){

    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));

    vec2 u =
    f*f*(3.0-2.0*f);

    return mix(a,b,u.x)
         + (c-a)*u.y*(1.0-u.x)
         + (d-b)*u.x*u.y;

}

void main(){

    //////////////////////////////////////////////////////
    // RADIAL MASK
    //////////////////////////////////////////////////////

    vec2 p =
    vUv*2.0-1.0;

    float r =
    length(p);

    float mask =

        smoothstep(

            1.0,

            0.15,

            r

        );

    //////////////////////////////////////////////////////
    // FRACTAL NOISE
    //////////////////////////////////////////////////////

    float n = 0.0;

    float amp = 0.5;

    vec2 uv =
    vUv*8.0;

    for(int i=0;i<5;i++){

        n +=

            noise(

                uv +

                uTime*0.02

            ) * amp;

        uv *= 2.0;

        amp *= 0.5;

    }

    //////////////////////////////////////////////////////
    // SWIRL
    //////////////////////////////////////////////////////

    float swirl =

        sin(

            atan(
                p.y,
                p.x
            )*8.0 +

            uTime +

            r*18.0

        )*0.5+0.5;

    //////////////////////////////////////////////////////
    // HEIGHT FADE
    //////////////////////////////////////////////////////

    float heightFade =

        1.0 -

        smoothstep(

            8.0,

            25.0,

            abs(vHeight)

        );

    //////////////////////////////////////////////////////
    // COLORS
    //////////////////////////////////////////////////////

    vec3 deep = vec3(

        0.01,
        0.03,
        0.10

    );

    vec3 blue = vec3(

        0.15,
        0.42,
        0.95

    );

    vec3 cyan = vec3(

        0.65,
        0.90,
        1.00

    );

    vec3 white = vec3(

        1.0

    );

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

            swirl*0.45

        );

    color =

        mix(

            color,

            white,

            pow(n,4.0)*0.18

        );

    //////////////////////////////////////////////////////
    // ALPHA
    //////////////////////////////////////////////////////

    float alpha =

        mask *

        vDensity *

        heightFade;

    alpha *=

        0.25 +

        n*0.6;

    //////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////

    gl_FragColor =

        vec4(

            color,

            alpha

        );

}