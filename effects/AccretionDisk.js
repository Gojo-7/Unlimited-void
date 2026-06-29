import * as THREE from "three";

export function createAccretionDisk(scene){

    //////////////////////////////////////////////////////////
    // GROUP
    //////////////////////////////////////////////////////////

    const group =
    new THREE.Group();

    scene.add(group);

    //////////////////////////////////////////////////////////
    // INNER GLOW RING
    //////////////////////////////////////////////////////////

    const innerRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            9,
            1.6,
            64,
            256
        ),

        new THREE.MeshBasicMaterial({

            color:0x7fd6ff,

            transparent:true,

            opacity:0.9

        })

    );

    innerRing.rotation.x =
    Math.PI/2;

    group.add(
        innerRing
    );

    //////////////////////////////////////////////////////////
    // MIDDLE RING
    //////////////////////////////////////////////////////////

    const middleRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            12,
            2.2,
            64,
            256
        ),

        new THREE.MeshBasicMaterial({

            color:0x4ca7ff,

            transparent:true,

            opacity:0.55

        })

    );

    middleRing.rotation.x =
    Math.PI/2;

    group.add(
        middleRing
    );

    //////////////////////////////////////////////////////////
    // OUTER RING
    //////////////////////////////////////////////////////////

    const outerRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            16,
            2.7,
            64,
            256
        ),

        new THREE.MeshBasicMaterial({

            color:0x234cff,

            transparent:true,

            opacity:0.22

        })

    );

    outerRing.rotation.x =
    Math.PI/2;

    group.add(
        outerRing
    );

    //////////////////////////////////////////////////////////
    // VERTICAL HALO
    //////////////////////////////////////////////////////////

    const halo =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            8.4,
            0.45,
            32,
            256
        ),

        new THREE.MeshBasicMaterial({

            color:0xbef4ff,

            transparent:true,

            opacity:0.85

        })

    );

    halo.rotation.y =
    Math.PI/2;

    group.add(
        halo
    );

    //////////////////////////////////////////////////////////
    // LIGHT SPHERE
    //////////////////////////////////////////////////////////

    const glow =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            6.5,
            64,
            64
        ),

        new THREE.MeshBasicMaterial({

            color:0x3d8fff,

            transparent:true,

            opacity:0.08,

            side:THREE.BackSide

        })

    );

    group.add(
        glow
    );

    //////////////////////////////////////////////////////////
    // PARTICLE DISK
    //////////////////////////////////////////////////////////

    const COUNT = 18000;

    const positions =
    new Float32Array(
        COUNT * 3
    );

    const radii = [];
    const angles = [];
    const speeds = [];

    for(let i=0;i<COUNT;i++){

        const radius =
        8 +
        Math.pow(
            Math.random(),
            0.55
        ) * 18;

        const angle =
        Math.random() *
        Math.PI * 2;

        positions[i*3] =
        Math.cos(angle) * radius;

        positions[i*3+1] =
        (Math.random()-0.5) *
        0.9;

        positions[i*3+2] =
        Math.sin(angle) * radius;

        radii.push(radius);

        angles.push(angle);

        speeds.push(

            0.008 +

            (22-radius) *
            0.0008 +

            Math.random()*0.002

        );

    }

    const particleGeometry =
    new THREE.BufferGeometry();

    particleGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(

            positions,

            3

        )

    );

    const particleMaterial =
    new THREE.PointsMaterial({

        color:0xd7f5ff,

        size:0.12,

        transparent:true,

        opacity:0.9,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });

    const particleDisk =
    new THREE.Points(

        particleGeometry,

        particleMaterial

    );

    group.add(
        particleDisk
    );

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    function update(time){

        innerRing.rotation.z +=
        0.0022;

        middleRing.rotation.z -=
        0.0015;

        outerRing.rotation.z +=
        0.0009;

        halo.rotation.z +=
        0.0045;

        glow.scale.setScalar(

            1 +

            Math.sin(
                time*1.4
            ) * 0.03

        );

        const array =
        particleGeometry
        .attributes
        .position
        .array;

        for(let i=0;i<COUNT;i++){

            angles[i] +=
            speeds[i];

            const r =
            radii[i];

            const wobble =

                Math.sin(
                    time*3.0 +
                    r*0.4
                ) * 0.18;

            array[i*3] =

                Math.cos(
                    angles[i]
                ) *

                (r+wobble);

            array[i*3+1] =

                Math.sin(

                    angles[i]*5.0 +

                    time*2.0

                ) * 0.18;

            array[i*3+2] =

                Math.sin(
                    angles[i]
                ) *

                (r+wobble);

        }

        particleGeometry
        .attributes
        .position
        .needsUpdate = true;

    }

    //////////////////////////////////////////////////////////
    // PUBLIC API
    //////////////////////////////////////////////////////////

    return{

        update

    };

}