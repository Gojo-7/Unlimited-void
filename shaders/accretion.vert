uniform float uTime;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying float vRadius;
varying float vIntensity;

void main(){

    //////////////////////////////////////////////////////////
    // UV
    //////////////////////////////////////////////////////////

    vUv = uv;

    //////////////////////////////////////////////////////////
    // LOCAL POSITION
    //////////////////////////////////////////////////////////

    vec3 pos = position;

    //////////////////////////////////////////////////////////
    // RADIUS
    //////////////////////////////////////////////////////////

    float radius =

        length(

            pos.xz

        );

    vRadius = radius;

    //////////////////////////////////////////////////////////
    // PLASMA WAVES
    //////////////////////////////////////////////////////////

    float wave1 =

        sin(

            radius * 2.4 -

            uTime * 2.8

        ) * 0.18;

    float wave2 =

        sin(

            pos.x * 1.5 +

            pos.z * 2.3 +

            uTime * 2.2

        ) * 0.12;

    float wave3 =

        cos(

            radius * 8.0 +

            uTime * 5.5

        ) * 0.05;

    pos.y +=

        wave1 +

        wave2 +

        wave3;

    //////////////////////////////////////////////////////////
    // BREATHING
    //////////////////////////////////////////////////////////

    float pulse =

        1.0 +

        sin(

            uTime * 0.4 +

            radius * 0.4

        ) * 0.02;

    pos.xz *= pulse;

    //////////////////////////////////////////////////////////
    // ROTATION TWIST
    //////////////////////////////////////////////////////////

    float theta =

        uTime * 0.03 +

        radius * 0.02;

    float c = cos(theta);
    float s = sin(theta);

    mat2 rot = mat2(

        c,-s,

        s, c

    );

    pos.xz =

        rot *

        pos.xz;

    //////////////////////////////////////////////////////////
    // WORLD POSITION
    //////////////////////////////////////////////////////////

    vec4 worldPosition =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vWorldPosition =

        worldPosition.xyz;

    //////////////////////////////////////////////////////////
    // INTENSITY
    //////////////////////////////////////////////////////////

    vIntensity =

        smoothstep(

            18.0,

            8.0,

            radius

        );

    //////////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////////

    gl_Position =

        projectionMatrix *

        viewMatrix *

        worldPosition;

}