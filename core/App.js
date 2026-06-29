import * as THREE from "three";

import { Renderer } from "./Renderer.js";
import { Scene } from "./Scene.js";
import { Camera } from "./Camera.js";
import { CameraRig } from "./CameraRig.js";
import { Clock } from "./Clock.js";
import { ShaderLoader } from "./ShaderLoader.js";

import { LIGHTING } from "./Constants.js";

import { BlackHole } from "../objects/BlackHole.js";

export class App {

    constructor() {

        //////////////////////////////////////////////////////
        // CORE
        //////////////////////////////////////////////////////

        this.scene = new Scene();

        this.camera = new Camera();

        this.renderer = new Renderer();

        this.clock = new Clock();

        this.shaderLoader = new ShaderLoader();

        this.cameraRig = new CameraRig(

            this.camera.get()

        );

        //////////////////////////////////////////////////////
        // OBJECTS
        //////////////////////////////////////////////////////

        this.objects = [];

        //////////////////////////////////////////////////////
        // LOOP
        //////////////////////////////////////////////////////

        this.running = false;

    }

    //////////////////////////////////////////////////////////
    // INITIALIZE
    //////////////////////////////////////////////////////////

    async initialize() {

        this.createLights();

        //////////////////////////////////////////////////////
        // LOAD SHADERS
        //////////////////////////////////////////////////////

        const blackHoleShaders =

            await this.shaderLoader.loadProgram(

                "./shaders/blackhole/vertex.glsl",

                "./shaders/blackhole/fragment.glsl"

            );

        //////////////////////////////////////////////////////
        // CREATE OBJECTS
        //////////////////////////////////////////////////////

        this.objects.push(

            new BlackHole(

                this.scene.get(),

                blackHoleShaders

            )

        );

        //////////////////////////////////////////////////////
        // EVENTS
        //////////////////////////////////////////////////////

        window.addEventListener(

            "resize",

            this.resize.bind(this)

        );

        //////////////////////////////////////////////////////
        // LOADING
        //////////////////////////////////////////////////////

        const loading =

            document.getElementById(

                "loading"

            );

        if (loading) {

            loading.classList.add(

                "hidden"

            );

        }

    }

    //////////////////////////////////////////////////////////
    // START
    //////////////////////////////////////////////////////////

    start() {

        if (this.running) {

            return;

        }

        this.running = true;

        this.animate();

    }

    //////////////////////////////////////////////////////////
    // ANIMATION
    //////////////////////////////////////////////////////////

    animate() {

        if (!this.running) {

            return;

        }

        requestAnimationFrame(

            this.animate.bind(this)

        );

        this.clock.update();

        const elapsed =

            this.clock.getElapsed();

        this.cameraRig.update(

            elapsed

        );

        for (

            const object

            of

            this.objects

        ) {

            object.update(

                elapsed

            );

        }

        this.renderer.render(

            this.scene.get(),

            this.camera.get()

        );

    }

    //////////////////////////////////////////////////////////
    // LIGHTING
    //////////////////////////////////////////////////////////

    createLights() {

        const ambient =

            new THREE.AmbientLight(

                LIGHTING.ambientColor,

                LIGHTING.ambientIntensity

            );

        const point =

            new THREE.PointLight(

                LIGHTING.pointColor,

                LIGHTING.pointIntensity,

                LIGHTING.pointDistance

            );

        point.position.copy(

            LIGHTING.pointPosition

        );

        this.scene.get().add(

            ambient

        );

        this.scene.get().add(

            point

        );

    }

    //////////////////////////////////////////////////////////
    // RESIZE
    //////////////////////////////////////////////////////////

    resize() {

        const width =

            window.innerWidth;

        const height =

            window.innerHeight;

        this.camera.resize(

            width,

            height

        );

        this.renderer.resize(

            width,

            height

        );

    }

}