import * as THREE from "three";

export function createAsteroids(scene){

    //////////////////////////////////////////////////////////
    // GROUP
    //////////////////////////////////////////////////////////

    const group =
    new THREE.Group();

    scene.add(group);

    //////////////////////////////////////////////////////////
    // GEOMETRY
    //////////////////////////////////////////////////////////

    const geometry =
    new THREE.IcosahedronGeometry(
        1,
        1
    );

    //////////////////////////////////////////////////////////
    // MATERIAL
    //////////////////////////////////////////////////////////

    const material =
    new THREE.MeshStandardMaterial({

        color:0x6a7488,

        roughness:1,

        metalness:0.15

    });

    //////////////////////////////////////////////////////////
    // ASTEROIDS
    //////////////////////////////////////////////////////////

    const COUNT = 180;

    const asteroids = [];

    for(let i=0;i<COUNT;i++){

        const mesh =
        new THREE.Mesh(

            geometry,

            material.clone()

        );

        const radius =

            28 +

            Math.random()*95;

        const angle =

            Math.random()*
            Math.PI*2;

        const height =

            (Math.random()-0.5)*
            22;

        const scale =

            0.15+

            Math.random()*1.2;

        mesh.position.set(

            Math.cos(angle)*radius,

            height,

            Math.sin(angle)*radius

        );

        mesh.scale.setScalar(
            scale
        );

        mesh.rotation.set(

            Math.random()*Math.PI,

            Math.random()*Math.PI,

            Math.random()*Math.PI

        );

        group.add(
            mesh
        );

        asteroids.push({

            mesh,

            radius,

            angle,

            height,

            speed:

                0.0007+

                Math.random()*0.0016,

            rotX:

                (Math.random()-0.5)*0.02,

            rotY:

                (Math.random()-0.5)*0.02,

            rotZ:

                (Math.random()-0.5)*0.02,

            bobOffset:

                Math.random()*
                Math.PI*2

        });

    }

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    function update(time){

        for(

            let i=0;

            i<asteroids.length;

            i++

        ){

            const a =
            asteroids[i];

            ////////////////////////////////////////////////////
            // ORBIT
            ////////////////////////////////////////////////////

            a.angle +=
            a.speed;

            const wobble =

                Math.sin(

                    time*0.45+

                    a.bobOffset

                )*1.8;

            const r =

                a.radius+

                wobble;

            a.mesh.position.x =

                Math.cos(
                    a.angle
                )*r;

            a.mesh.position.z =

                Math.sin(
                    a.angle
                )*r;

            a.mesh.position.y =

                a.height+

                Math.sin(

                    time+

                    a.bobOffset

                )*0.8;

            ////////////////////////////////////////////////////
            // ROTATION
            ////////////////////////////////////////////////////

            a.mesh.rotation.x +=
            a.rotX;

            a.mesh.rotation.y +=
            a.rotY;

            a.mesh.rotation.z +=
            a.rotZ;

        }

        ////////////////////////////////////////////////////////
        // SLOW GLOBAL DRIFT
        ////////////////////////////////////////////////////////

        group.rotation.y +=
        0.00008;

    }

    //////////////////////////////////////////////////////////
    // API
    //////////////////////////////////////////////////////////

    return{

        update

    };

}