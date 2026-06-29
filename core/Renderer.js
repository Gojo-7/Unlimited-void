import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import {

    RENDERER,
    BLOOM

} from "./Constants.js";

export class Renderer{

    constructor(scene,camera){

        //////////////////////////////////////////////////////
        // RENDERER
        //////////////////////////////////////////////////////

        this.instance =
        new THREE.WebGLRenderer({

            antialias:
                RENDERER.antialias,

            alpha:
                RENDERER.alpha,

            powerPreference:
                RENDERER.powerPreference

        });

        this.instance.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                RENDERER.maxPixelRatio

            )

        );

        this.instance.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.instance.outputColorSpace =
        THREE.SRGBColorSpace;

        this.instance.toneMapping =
        RENDERER.toneMapping;

        this.instance.toneMappingExposure =
        RENDERER.exposure;

        document.body.appendChild(

            this.instance.domElement

        );

        //////////////////////////////////////////////////////
        // COMPOSER
        //////////////////////////////////////////////////////

        this.composer =
        new EffectComposer(

            this.instance

        );

        //////////////////////////////////////////////////////
        // RENDER PASS
        //////////////////////////////////////////////////////

        this.renderPass =
        new RenderPass(

            scene,

            camera

        );

        this.composer.addPass(

            this.renderPass

        );

        //////////////////////////////////////////////////////
        // BLOOM
        //////////////////////////////////////////////////////

        this.bloom =
        new UnrealBloomPass(

            new THREE.Vector2(

                window.innerWidth,

                window.innerHeight

            ),

            BLOOM.strength,

            BLOOM.radius,

            BLOOM.threshold

        );

        this.composer.addPass(

            this.bloom

        );

    }

    //////////////////////////////////////////////////////////
    // RENDER
    //////////////////////////////////////////////////////////

    render(){

        this.composer.render();

    }

    //////////////////////////////////////////////////////////
    // RESIZE
    //////////////////////////////////////////////////////////

    resize(){

        const width =
        window.innerWidth;

        const height =
        window.innerHeight;

        this.instance.setSize(

            width,

            height

        );

        this.composer.setSize(

            width,

            height

        );

        this.instance.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                RENDERER.maxPixelRatio

            )

        );

    }

    //////////////////////////////////////////////////////////
    // GET RENDERER
    //////////////////////////////////////////////////////////

    getRenderer(){

        return this.instance;

    }

    //////////////////////////////////////////////////////////
    // GET COMPOSER
    //////////////////////////////////////////////////////////

    getComposer(){

        return this.composer;

    }

    //////////////////////////////////////////////////////////
    // DISPOSE
    //////////////////////////////////////////////////////////

    dispose(){

        this.instance.dispose();

        this.composer.dispose();

    }

}