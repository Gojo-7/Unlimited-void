import * as THREE from "three";

import { CAMERA_RIG } from "./Constants.js";

export class CameraRig {

    constructor(camera) {

        //////////////////////////////////////////////////////
        // CAMERA
        //////////////////////////////////////////////////////

        this.camera = camera;

        //////////////////////////////////////////////////////
        // TARGET
        //////////////////////////////////////////////////////

        this.target = new THREE.Vector3(

            0,
            0,
            0

        );

    }

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    update(time) {

        const radius =
        CAMERA_RIG.orbitRadius;

        const angle =
        time *
        CAMERA_RIG.orbitSpeed;

        this.camera.position.x =
        Math.cos(angle) *
        radius;

        this.camera.position.z =
        Math.sin(angle) *
        radius;

        this.camera.position.y =

            CAMERA_RIG.height +

            Math.sin(

                time * 0.35

            ) *

            CAMERA_RIG.verticalAmplitude;

        this.camera.lookAt(

            this.target

        );

    }

    //////////////////////////////////////////////////////////
    // SET TARGET
    //////////////////////////////////////////////////////////

    setTarget(x, y, z) {

        if (x instanceof THREE.Vector3) {

            this.target.copy(x);

            return;

        }

        this.target.set(

            x,
            y,
            z

        );

    }

    //////////////////////////////////////////////////////////
    // GET TARGET
    //////////////////////////////////////////////////////////

    getTarget() {

        return this.target;

    }

}