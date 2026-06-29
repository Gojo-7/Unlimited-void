import * as THREE from "three";

import {

    SCENE,

    LIGHTING

} from "./Constants.js";

export class Scene{

    constructor(){

        //////////////////////////////////////////////////////
        // SCENE
        //////////////////////////////////////////////////////

        this.instance =
        new THREE.Scene();

        //////////////////////////////////////////////////////
        // BACKGROUND
        //////////////////////////////////////////////////////

        this.instance.background =
        new THREE.Color(

            SCENE.background

        );

        //////////////////////////////////////////////////////
        // FOG
        //////////////////////////////////////////////////////

        this.instance.fog =
        new THREE.FogExp2(

            SCENE.fogColor,

            SCENE.fogDensity

        );

        //////////////////////////////////////////////////////
        // AMBIENT LIGHT
        //////////////////////////////////////////////////////

        this.ambientLight =
        new THREE.AmbientLight(

            LIGHTING.ambientColor,

            LIGHTING.ambientIntensity

        );

        this.instance.add(

            this.ambientLight

        );

        //////////////////////////////////////////////////////
        // MAIN LIGHT
        //////////////////////////////////////////////////////

        this.pointLight =
        new THREE.PointLight(

            LIGHTING.pointColor,

            LIGHTING.pointIntensity,

            LIGHTING.pointDistance

        );

        this.pointLight.position.set(

            0,
            0,
            0

        );

        this.instance.add(

            this.pointLight

        );

        //////////////////////////////////////////////////////
        // OPTIONAL HELPERS
        //////////////////////////////////////////////////////

        this.helpers = [];

    }

    //////////////////////////////////////////////////////////
    // GET SCENE
    //////////////////////////////////////////////////////////

    get(){

        return this.instance;

    }

    //////////////////////////////////////////////////////////
    // ADD OBJECT
    //////////////////////////////////////////////////////////

    add(object){

        this.instance.add(

            object

        );

    }

    //////////////////////////////////////////////////////////
    // REMOVE OBJECT
    //////////////////////////////////////////////////////////

    remove(object){

        this.instance.remove(

            object

        );

    }

    //////////////////////////////////////////////////////////
    // ADD HELPER
    //////////////////////////////////////////////////////////

    addHelper(helper){

        this.helpers.push(

            helper

        );

        this.instance.add(

            helper

        );

    }

    //////////////////////////////////////////////////////////
    // UPDATE LIGHT POSITION
    //////////////////////////////////////////////////////////

    setLightPosition(

        x,
        y,
        z

    ){

        this.pointLight.position.set(

            x,
            y,
            z

        );

    }

    //////////////////////////////////////////////////////////
    // CHANGE FOG
    //////////////////////////////////////////////////////////

    setFog(

        color,

        density

    ){

        this.instance.fog =
        new THREE.FogExp2(

            color,

            density

        );

    }

    //////////////////////////////////////////////////////////
    // CLEAR SCENE
    //////////////////////////////////////////////////////////

    clear(){

        while(

            this.instance.children.length > 0

        ){

            this.instance.remove(

                this.instance.children[0]

            );

        }

    }

}