import * as THREE from "three";

import { BLACK_HOLE } from "../core/Constants.js";

export class BlackHole {

    constructor(

        scene,

        shader

    ) {

        //////////////////////////////////////////////////////
        // SCENE
        //////////////////////////////////////////////////////

        this.scene = scene;

        //////////////////////////////////////////////////////
        // UNIFORMS
        //////////////////////////////////////////////////////

        this.uniforms = {

            uTime: {

                value: 0

            }

        };

        //////////////////////////////////////////////////////
        // GEOMETRY
        //////////////////////////////////////////////////////

        this.geometry =

        new THREE.SphereGeometry(

            BLACK_HOLE.radius,

            BLACK_HOLE.widthSegments,

            BLACK_HOLE.heightSegments

        );

        //////////////////////////////////////////////////////
        // MATERIAL
        //////////////////////////////////////////////////////

        this.material =

        new THREE.ShaderMaterial({

            uniforms:

                this.uniforms,

            vertexShader:

                shader.vertexShader,

            fragmentShader:

                shader.fragmentShader,

            transparent: true,
            depthWrite: false,
            depthTest: true,
            blending: THREE.NormalBlending

        });

        //////////////////////////////////////////////////////
        // MESH
        //////////////////////////////////////////////////////

        this.mesh =

        new THREE.Mesh(

            this.geometry,

            this.material

        );

        //////////////////////////////////////////////////////
        // ADD TO SCENE
        //////////////////////////////////////////////////////

        this.scene.add(

            this.mesh

        );

    }

    //////////////////////////////////////////////////////////
    // GET
    //////////////////////////////////////////////////////////

    get() {

        return this.mesh;

    }

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    update(

        elapsedTime

    ) {

        this.uniforms.uTime.value =

        elapsedTime;

    }

    //////////////////////////////////////////////////////////
    // DISPOSE
    //////////////////////////////////////////////////////////

    dispose() {

        this.scene.remove(

            this.mesh

        );

        this.geometry.dispose();

        this.material.dispose();

    }

}