import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { createPostFX } from "./effects/PostFX.js";
import { createCameraRig } from "./effects/CameraRig.js";
import { createAccretionDisk } from "./effects/AccretionDisk.js";
import { createParticles } from "./effects/Particles.js";
import { createNebula } from "./effects/Nebula.js";
import { createAsteroids } from "./effects/Asteroids.js";

//////////////////////////////////////////////////////////////
// SCENE
//////////////////////////////////////////////////////////////

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

scene.fog = new THREE.FogExp2(
    0x000814,
    0.011
);

//////////////////////////////////////////////////////////////
// CAMERA
//////////////////////////////////////////////////////////////

const camera =
new THREE.PerspectiveCamera(

    60,

    window.innerWidth /
    window.innerHeight,

    0.1,

    3000

);

camera.position.set(
    0,
    12,
    60
);

//////////////////////////////////////////////////////////////
// RENDERER
//////////////////////////////////////////////////////////////

const renderer =
new THREE.WebGLRenderer({

    antialias:true,

    powerPreference:"high-performance"

});

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
1.2;

document.body.appendChild(
    renderer.domElement
);

//////////////////////////////////////////////////////////////
// LIGHTS
//////////////////////////////////////////////////////////////

const ambient =
new THREE.AmbientLight(
    0x5d8cff,
    0.4
);

scene.add(
    ambient
);

const point =
new THREE.PointLight(
    0x8ec9ff,
    250,
    600
);

point.position.set(
    0,
    0,
    0
);

scene.add(
    point
);

//////////////////////////////////////////////////////////////
// STARFIELD
//////////////////////////////////////////////////////////////

const STAR_COUNT = 12000;

const starPositions =
new Float32Array(
    STAR_COUNT * 3
);

for(let i=0;i<STAR_COUNT;i++){

    const radius =
    700 +
    Math.random()*1200;

    const theta =
    Math.random()*Math.PI*2;

    const phi =
    Math.acos(
        2*Math.random()-1
    );

    starPositions[i*3] =
    radius*
    Math.sin(phi)*
    Math.cos(theta);

    starPositions[i*3+1] =
    radius*
    Math.cos(phi);

    starPositions[i*3+2] =
    radius*
    Math.sin(phi)*
    Math.sin(theta);

}

const starGeometry =
new THREE.BufferGeometry();

starGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
        starPositions,
        3
    )

);

const stars =
new THREE.Points(

    starGeometry,

    new THREE.PointsMaterial({

        color:0xffffff,

        size:1.5,

        sizeAttenuation:true

    })

);

scene.add(
    stars
);

//////////////////////////////////////////////////////////////
// BLACK HOLE
//////////////////////////////////////////////////////////////

const eventHorizon =
new THREE.Mesh(

    new THREE.SphereGeometry(
        5,
        128,
        128
    ),

    new THREE.MeshPhysicalMaterial({

        color:0x000000,

        roughness:0,

        metalness:1,

        transmission:0,

        clearcoat:1

    })

);

scene.add(
    eventHorizon
);

//////////////////////////////////////////////////////////////
// POST FX
//////////////////////////////////////////////////////////////

const composer =
createPostFX(

    renderer,
    scene,
    camera,

    EffectComposer,
    RenderPass,
    UnrealBloomPass

);

//////////////////////////////////////////////////////////////
// EFFECTS
//////////////////////////////////////////////////////////////

const cameraRig =
createCameraRig(
    camera
);

const disk =
createAccretionDisk(
    scene
);

const particles =
createParticles(
    scene
);

const nebula =
createNebula(
    scene
);

const asteroids =
createAsteroids(
    scene
);

//////////////////////////////////////////////////////////////
// CLOCK
//////////////////////////////////////////////////////////////

const clock =
new THREE.Clock();

//////////////////////////////////////////////////////////////
// RESIZE
//////////////////////////////////////////////////////////////

window.addEventListener(

    "resize",

    ()=>{

        camera.aspect =
        window.innerWidth/
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        composer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);

//////////////////////////////////////////////////////////////
// LOADING SCREEN
//////////////////////////////////////////////////////////////

window.addEventListener(

    "load",

    ()=>{

        setTimeout(()=>{

            document
            .getElementById("loading")
            .classList
            .add("hide");

        },700);

    }

);

//////////////////////////////////////////////////////////////
// ANIMATION
//////////////////////////////////////////////////////////////

function animate(){

    requestAnimationFrame(
        animate
    );

    const elapsed =
    clock.getElapsedTime();

    cameraRig.update(
        elapsed
    );

    disk.update(
        elapsed
    );

    particles.update(
        elapsed
    );

    nebula.update(
        elapsed
    );

    asteroids.update(
        elapsed
    );

    stars.rotation.y +=
    0.00005;

    composer.render();

}

animate();