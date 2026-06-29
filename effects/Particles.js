import * as THREE from "three";

export function createParticles(scene){

    //////////////////////////////////////////////////////////
    // CONFIG
    //////////////////////////////////////////////////////////

    const COUNT = 100000;

    const INNER_RADIUS = 7;

    const OUTER_RADIUS = 180;

    //////////////////////////////////////////////////////////
    // DATA
    //////////////////////////////////////////////////////////

    const positions =
    new Float32Array(
        COUNT * 3
    );

    const velocity = [];
    const angle = [];
    const radius = [];
    const height = [];

    //////////////////////////////////////////////////////////
    // INITIALIZE
    //////////////////////////////////////////////////////////

    for(let i=0;i<COUNT;i++){

        const r =
        INNER_RADIUS +
        Math.pow(
            Math.random(),
            0.55
        ) *
        (OUTER_RADIUS-INNER_RADIUS);

        const a =
        Math.random() *
        Math.PI*2;

        const h =
        (Math.random()-0.5) *
        18;

        positions[i*3] =
        Math.cos(a)*r;

        positions[i*3+1] =
        h;

        positions[i*3+2] =
        Math.sin(a)*r;

        radius.push(r);

        angle.push(a);

        height.push(h);

        velocity.push(

            0.0015 +
            Math.random()*0.0025

        );

    }

    //////////////////////////////////////////////////////////
    // GEOMETRY
    //////////////////////////////////////////////////////////

    const geometry =
    new THREE.BufferGeometry();

    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(

            positions,

            3

        )

    );

    //////////////////////////////////////////////////////////
    // MATERIAL
    //////////////////////////////////////////////////////////

    const material =
    new THREE.PointsMaterial({

        color:0xffffff,

        size:0.09,

        transparent:true,

        opacity:0.85,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending,

        sizeAttenuation:true

    });

    //////////////////////////////////////////////////////////
    // POINTS
    //////////////////////////////////////////////////////////

    const particles =
    new THREE.Points(

        geometry,

        material

    );

    scene.add(
        particles
    );

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    function update(time){

        const array =
        geometry.attributes
        .position.array;

        for(let i=0;i<COUNT;i++){

            ////////////////////////////////////////////////////
            // SPIRAL
            ////////////////////////////////////////////////////

            angle[i] +=

                velocity[i] +

                (1/radius[i])*0.15;

            ////////////////////////////////////////////////////
            // GRAVITY
            ////////////////////////////////////////////////////

            radius[i] -=

                0.035 +

                25/(radius[i]+40)*
                0.02;

            ////////////////////////////////////////////////////
            // VERTICAL TURBULENCE
            ////////////////////////////////////////////////////

            height[i] +=

                Math.sin(

                    angle[i]*4 +

                    time +

                    i

                ) * 0.008;

            ////////////////////////////////////////////////////
            // POSITION
            ////////////////////////////////////////////////////

            const twist =

                Math.sin(

                    radius[i]*0.22 +

                    time*2

                ) * 0.9;

            const r =

                radius[i] +

                twist;

            array[i*3] =

                Math.cos(
                    angle[i]
                ) * r;

            array[i*3+1] =

                height[i];

            array[i*3+2] =

                Math.sin(
                    angle[i]
                ) * r;

            ////////////////////////////////////////////////////
            // RECYCLE
            ////////////////////////////////////////////////////

            if(radius[i] < INNER_RADIUS){

                radius[i] =

                    OUTER_RADIUS +

                    Math.random()*30;

                angle[i] =

                    Math.random()*
                    Math.PI*2;

                height[i] =

                    (Math.random()-0.5)*
                    18;

                velocity[i] =

                    0.0015+

                    Math.random()*0.0025;

            }

        }

        geometry.attributes
        .position
        .needsUpdate = true;

        ////////////////////////////////////////////////////
        // SLOW GLOBAL ROTATION
        ////////////////////////////////////////////////////

        particles.rotation.y +=
        0.00025;

    }

    //////////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////////

    return{

        update

    };

}