import * as THREE from "three";

import { RENDERER } from "./Constants.js";

export class Renderer {

    constructor() {

        //////////////////////////////////////////////////////
        // RENDERER
        //////////////////////////////////////////////////////

        this.instance = new THREE.WebGLRenderer({

            antialias: RENDERER.antialias,

            alpha: RENDERER.alpha,

            powerPreference: RENDERER.powerPreference

        });

        //////////////////////////////////////////////////////
        // COLOR
        //////////////////////////////////////////////////////

        this.instance.outputColorSpace =
        RENDERER.outputColorSpace;

        this.instance.toneMapping =
        RENDERER.toneMapping;

        this.instance.toneMappingExposure =
        RENDERER.toneMappingExposure;

        //////////////////////////////////////////////////////
        // SIZE
        //////////////////////////////////////////////////////

        this.instance.setPixelRatio(

            RENDERER.pixelRatio

        );

        this.instance.setSize(

            window.innerWidth,

            window.innerHeight

        );

        //////////////////////////////////////////////////////
        // SHADOWS
        //////////////////////////////////////////////////////

        this.instance.shadowMap.enabled = false;

        //////////////////////////////////////////////////////
        // DOM
        //////////////////////////////////////////////////////

        document.body.appendChild(

            this.instance.domElement

        );

    }

    //////////////////////////////////////////////////////////
    // GET
    //////////////////////////////////////////////////////////

    get() {

        return this.instance;

    }

    //////////////////////////////////////////////////////////
    // RENDER
    //////////////////////////////////////////////////////////

    render(scene, camera) {

        this.instance.render(

            scene,

            camera

        );

    }

    //////////////////////////////////////////////////////////
    // RESIZE
    //////////////////////////////////////////////////////////

    resize(width, height) {

        this.instance.setSize(

            width,

            height

        );

        this.instance.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

    }

}