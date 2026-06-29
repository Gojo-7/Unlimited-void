import * as THREE from "three";

import { ACCRETION } from "../core/Constants.js";

export class AccretionDisk {

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

        const radius =

            (

                ACCRETION.innerRadius +

                ACCRETION.outerRadius

            ) * 0.5;

        const tube =

            (

                ACCRETION.outerRadius -

                ACCRETION.innerRadius

            ) * 0.5;

        this.geometry =

            new THREE.TorusGeometry(

                radius,

                tube,

                ACCRETION.radialSegments,

                ACCRETION.tubularSegments

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

                blending:

                    THREE.AdditiveBlending,

                side:

                    THREE.DoubleSide

            });

        //////////////////////////////////////////////////////
        // MESH
        //////////////////////////////////////////////////////

        this.mesh =

            new THREE.Mesh(

                this.geometry,

                this.material

            );

        this.mesh.rotation.x =

            Math.PI * 0.5;

        //////////////////////////////////////////////////////
        // SCENE
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