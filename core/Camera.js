import * as THREE from "three";

import { CAMERA } from "./Constants.js";

export class Camera{

    constructor(){

        //////////////////////////////////////////////////////
        // CAMERA
        //////////////////////////////////////////////////////

        this.instance =
        new THREE.PerspectiveCamera(

            CAMERA.fov,

            window.innerWidth /
            window.innerHeight,

            CAMERA.near,

            CAMERA.far

        );

        //////////////////////////////////////////////////////
        // INITIAL POSITION
        //////////////////////////////////////////////////////

        this.instance.position.copy(

            CAMERA.startPosition

        );

        //////////////////////////////////////////////////////
        // DEFAULT LOOK TARGET
        //////////////////////////////////////////////////////

        this.target =
        new THREE.Vector3(

            0,
            0,
            0

        );

        this.instance.lookAt(
            this.target
        );

    }

    //////////////////////////////////////////////////////////
    // GET CAMERA
    //////////////////////////////////////////////////////////

    get(){

        return this.instance;

    }

    //////////////////////////////////////////////////////////
    // LOOK AT
    //////////////////////////////////////////////////////////

    lookAt(x,y,z){

        if(

            x instanceof THREE.Vector3

        ){

            this.target.copy(x);

        }

        else{

            this.target.set(

                x,
                y,
                z

            );

        }

        this.instance.lookAt(

            this.target

        );

    }

    //////////////////////////////////////////////////////////
    // SET POSITION
    //////////////////////////////////////////////////////////

    setPosition(

        x,
        y,
        z

    ){

        if(

            x instanceof THREE.Vector3

        ){

            this.instance.position.copy(x);

        }

        else{

            this.instance.position.set(

                x,
                y,
                z

            );

        }

    }

    //////////////////////////////////////////////////////////
    // GET POSITION
    //////////////////////////////////////////////////////////

    getPosition(){

        return this.instance.position;

    }

    //////////////////////////////////////////////////////////
    // RESIZE
    //////////////////////////////////////////////////////////

    resize(){

        this.instance.aspect =

            window.innerWidth /

            window.innerHeight;

        this.instance.updateProjectionMatrix();

    }

    //////////////////////////////////////////////////////////
    // RESET
    //////////////////////////////////////////////////////////

    reset(){

        this.instance.position.copy(

            CAMERA.startPosition

        );

        this.lookAt(

            0,
            0,
            0

        );

    }

}