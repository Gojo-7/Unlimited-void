uniform float uTime;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vFresnel;

void main(){

    vUv = uv;

    vec3 pos = position;

    //////////////////////////////////////////////////////
    // PULSING SURFACE
    //////////////////////////////////////////////////////

    float pulse =

        sin(

            uTime * 0.8 +

            length(position.xy) * 5.0

        ) * 0.03;

    pos += normal * pulse;

    //////////////////////////////////////////////////////
    // WORLD POSITION
    //////////////////////////////////////////////////////

    vec4 worldPos =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vWorldPosition =
    worldPos.xyz;

    //////////////////////////////////////////////////////
    // WORLD NORMAL
    //////////////////////////////////////////////////////

    vec3 worldNormal =

        normalize(

            mat3(modelMatrix) *

            normal

        );

    vNormal =
    worldNormal;

    //////////////////////////////////////////////////////
    // VIEW DIRECTION
    //////////////////////////////////////////////////////

    vec3 viewDirection =

        normalize(

            cameraPosition -

            worldPos.xyz

        );

    //////////////////////////////////////////////////////
    // FRESNEL
    //////////////////////////////////////////////////////

    vFresnel =

        pow(

            1.0 -

            max(

                dot(

                    worldNormal,

                    viewDirection

                ),

                0.0

            ),

            3.5

        );

    //////////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////////

    gl_Position =

        projectionMatrix *

        viewMatrix *

        worldPos;

}