import * as THREE from "three";

export function createPostFX(

    renderer,
    scene,
    camera,

    EffectComposer,
    RenderPass,
    UnrealBloomPass

){

    //////////////////////////////////////////////////////////
    // COMPOSER
    //////////////////////////////////////////////////////////

    const composer =
    new EffectComposer(
        renderer
    );

    //////////////////////////////////////////////////////////
    // BASE RENDER
    //////////////////////////////////////////////////////////

    const renderPass =
    new RenderPass(

        scene,
        camera

    );

    composer.addPass(
        renderPass
    );

    //////////////////////////////////////////////////////////
    // BLOOM
    //////////////////////////////////////////////////////////

    const bloom =
    new UnrealBloomPass(

        new THREE.Vector2(

            window.innerWidth,

            window.innerHeight

        ),

        1.6,
        0.55,
        0.18

    );

    bloom.threshold = 0.02;

    bloom.strength = 2.2;

    bloom.radius = 0.92;

    composer.addPass(
        bloom
    );

    //////////////////////////////////////////////////////////
    // RESIZE
    //////////////////////////////////////////////////////////

    function setSize(
        width,
        height
    ){

        composer.setSize(
            width,
            height
        );

        bloom.setSize(
            width,
            height
        );

    }

    //////////////////////////////////////////////////////////
    // PUBLIC API
    //////////////////////////////////////////////////////////

    return{

        composer,

        render(){

            composer.render();

        },

        setSize

    };

}