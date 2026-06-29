import * as THREE from "three";

export function createCameraRig(camera){

    //////////////////////////////////////////////////////////
    // CONFIGURATION
    //////////////////////////////////////////////////////////

    const target =
    new THREE.Vector3(
        0,
        0,
        0
    );

    let radius = 42;

    let height = 8;

    let roll = 0;

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    function update(time){

        //////////////////////////////////////////////////////
        // PRIMARY ORBIT
        //////////////////////////////////////////////////////

        const orbitSpeed = 0.075;

        const angle =
        time *
        orbitSpeed;

        //////////////////////////////////////////////////////
        // RADIUS VARIATION
        //////////////////////////////////////////////////////

        const currentRadius =

            radius +

            Math.sin(
                time * 0.18
            ) * 3.5 +

            Math.sin(
                time * 0.47
            ) * 1.2;

        //////////////////////////////////////////////////////
        // HEIGHT FLOAT
        //////////////////////////////////////////////////////

        const currentHeight =

            height +

            Math.sin(
                time * 0.36
            ) * 2.0 +

            Math.cos(
                time * 0.13
            ) * 1.0;

        //////////////////////////////////////////////////////
        // POSITION
        //////////////////////////////////////////////////////

        camera.position.set(

            Math.cos(angle) *
            currentRadius,

            currentHeight,

            Math.sin(angle) *
            currentRadius

        );

        //////////////////////////////////////////////////////
        // SUBTLE DRIFT
        //////////////////////////////////////////////////////

        camera.position.x +=

            Math.sin(
                time * 0.71
            ) * 0.6;

        camera.position.y +=

            Math.cos(
                time * 0.93
            ) * 0.35;

        camera.position.z +=

            Math.cos(
                time * 0.54
            ) * 0.6;

        //////////////////////////////////////////////////////
        // LOOK TARGET
        //////////////////////////////////////////////////////

        target.set(

            Math.sin(time * 0.22) * 0.35,

            Math.sin(time * 0.31) * 0.18,

            Math.cos(time * 0.26) * 0.35

        );

        camera.lookAt(
            target
        );

        //////////////////////////////////////////////////////
        // CINEMATIC ROLL
        //////////////////////////////////////////////////////

        roll =

            Math.sin(
                time * 0.18
            ) * 0.025 +

            Math.cos(
                time * 0.41
            ) * 0.012;

        camera.rotation.z = roll;

        //////////////////////////////////////////////////////
        // SLOW BREATHING FOV
        //////////////////////////////////////////////////////

        camera.fov =

            60 +

            Math.sin(
                time * 0.16
            ) * 1.8;

        camera.updateProjectionMatrix();

    }

    //////////////////////////////////////////////////////////
    // PUBLIC API
    //////////////////////////////////////////////////////////

    return{

        update

    };

}