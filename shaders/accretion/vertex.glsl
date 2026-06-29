uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vRadius;

void main() {

    //////////////////////////////////////////////////////
    // UV
    //////////////////////////////////////////////////////

    vUv = uv;

    //////////////////////////////////////////////////////
    // POSITION
    //////////////////////////////////////////////////////

    vec3 pos = position;

    //////////////////////////////////////////////////////
    // RADIAL DISTANCE
    //////////////////////////////////////////////////////

    float radius = length(pos.xz);

    vRadius = radius;

    //////////////////////////////////////////////////////
    // PLASMA WAVES
    //////////////////////////////////////////////////////

    float wave =

        sin(

            radius * 2.0 +

            uTime * 4.0

        ) * 0.12;

    float ripple =

        sin(

            position.x * 3.5 +

            position.z * 3.5 -

            uTime * 6.0

        ) * 0.06;

    pos.y +=

        wave +

        ripple;

    //////////////////////////////////////////////////////
    // TWIST
    //////////////////////////////////////////////////////

    float angle =

        radius * 0.03 +

        uTime * 0.12;

    float c = cos(angle);
    float s = sin(angle);

    pos.xz =

        mat2(

            c, -s,

            s,  c

        ) *

        pos.xz;

    //////////////////////////////////////////////////////
    // OUTPUTS
    //////////////////////////////////////////////////////

    vec4 worldPosition =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vPosition =

        worldPosition.xyz;

    vNormal =

        normalize(

            mat3(modelMatrix) *

            normal

        );

    //////////////////////////////////////////////////////
    // FINAL
    //////////////////////////////////////////////////////

    gl_Position =

        projectionMatrix *

        viewMatrix *

        worldPosition;

}