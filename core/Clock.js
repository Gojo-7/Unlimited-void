import * as THREE from "three";

export class Clock{

    constructor(){

        //////////////////////////////////////////////////////
        // THREE CLOCK
        //////////////////////////////////////////////////////

        this.clock =
        new THREE.Clock();

        //////////////////////////////////////////////////////
        // TIME
        //////////////////////////////////////////////////////

        this.elapsed = 0;

        this.delta = 0;

        //////////////////////////////////////////////////////
        // FRAME
        //////////////////////////////////////////////////////

        this.frame = 0;

        //////////////////////////////////////////////////////
        // FPS
        //////////////////////////////////////////////////////

        this.fps = 0;

        this._accumulator = 0;

        this._frames = 0;

    }

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    update(){

        this.delta =
        this.clock.getDelta();

        this.elapsed =
        this.clock.getElapsedTime();

        this.frame++;

        this._frames++;

        this._accumulator +=
        this.delta;

        if(this._accumulator >= 1){

            this.fps =
            this._frames;

            this._frames = 0;

            this._accumulator = 0;

        }

    }

    //////////////////////////////////////////////////////////
    // GETTERS
    //////////////////////////////////////////////////////////

    getDelta(){

        return this.delta;

    }

    getElapsed(){

        return this.elapsed;

    }

    getFrame(){

        return this.frame;

    }

    getFPS(){

        return this.fps;

    }

    //////////////////////////////////////////////////////////
    // RESET
    //////////////////////////////////////////////////////////

    reset(){

        this.clock.start();

        this.elapsed = 0;

        this.delta = 0;

        this.frame = 0;

        this.fps = 0;

        this._frames = 0;

        this._accumulator = 0;

    }

}