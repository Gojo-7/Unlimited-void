import * as THREE from "three";

export function createNebula(scene){

    //////////////////////////////////////////////////////////
    // GROUP
    //////////////////////////////////////////////////////////

    const group =
    new THREE.Group();

    scene.add(group);

    //////////////////////////////////////////////////////////
    // CLOUD CONFIG
    //////////////////////////////////////////////////////////

    const CLOUDS = 220;

    const clouds = [];

    //////////////////////////////////////////////////////////
    // TEXTURE
    //////////////////////////////////////////////////////////

    const size = 256;

    const canvas =
    document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx =
    canvas.getContext("2d");

    const gradient =
    ctx.createRadialGradient(

        size*0.5,
        size*0.5,
        0,

        size*0.5,
        size*0.5,
        size*0.5

    );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.3,
        "rgba(255,255,255,.55)"
    );

    gradient.addColorStop(
        0.7,
        "rgba(120,170,255,.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(
        0,
        0,
        size,
        size
    );

    const texture =
    new THREE.CanvasTexture(
        canvas
    );

    //////////////////////////////////////////////////////////
    // MATERIAL
    //////////////////////////////////////////////////////////

    const material =
    new THREE.SpriteMaterial({

        map:texture,

        transparent:true,

        opacity:0.18,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending,

        color:0x9fd8ff

    });

    //////////////////////////////////////////////////////////
    // CREATE CLOUDS
    //////////////////////////////////////////////////////////

    for(let i=0;i<CLOUDS;i++){

        const sprite =
        new THREE.Sprite(
            material.clone()
        );

        const r =
        18 +
        Math.random()*120;

        const a =
        Math.random()*
        Math.PI*2;

        sprite.position.set(

            Math.cos(a)*r,

            (Math.random()-0.5)*18,

            Math.sin(a)*r

        );

        const s =
        12+
        Math.random()*45;

        sprite.scale.set(
            s,
            s,
            1
        );

        group.add(
            sprite
        );

        clouds.push({

            sprite,

            radius:r,

            angle:a,

            speed:

                0.0008+

                Math.random()*0.0015,

            offset:
                Math.random()*
                Math.PI*2

        });

    }

    //////////////////////////////////////////////////////////
    // CENTRAL FOG
    //////////////////////////////////////////////////////////

    const core =
    new THREE.Sprite(

        new THREE.SpriteMaterial({

            map:texture,

            color:0x6fb6ff,

            transparent:true,

            opacity:0.32,

            depthWrite:false,

            blending:
            THREE.AdditiveBlending

        })

    );

    core.scale.set(
        55,
        55,
        1
    );

    group.add(
        core
    );

    //////////////////////////////////////////////////////////
    // OUTER HAZE
    //////////////////////////////////////////////////////////

    const haze =
    new THREE.Sprite(

        new THREE.SpriteMaterial({

            map:texture,

            color:0xbfe9ff,

            transparent:true,

            opacity:0.08,

            depthWrite:false,

            blending:
            THREE.AdditiveBlending

        })

    );

    haze.scale.set(
        170,
        170,
        1
    );

    group.add(
        haze
    );

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    function update(time){

        group.rotation.y +=
        0.00018;

        core.material.opacity =

            0.28 +

            Math.sin(
                time*1.4
            )*0.05;

        haze.material.opacity =

            0.07 +

            Math.sin(
                time*0.6
            )*0.015;

        for(

            let i=0;

            i<clouds.length;

            i++

        ){

            const c =
            clouds[i];

            c.angle +=
            c.speed;

            const wave =

                Math.sin(

                    time +

                    c.offset +

                    c.radius*0.05

                )*2.2;

            c.sprite.position.x =

                Math.cos(
                    c.angle
                )*

                c.radius;

            c.sprite.position.z =

                Math.sin(
                    c.angle
                )*

                c.radius;

            c.sprite.position.y =

                wave;

            const pulse =

                1+

                Math.sin(

                    time*0.8+

                    c.offset

                )*0.12;

            c.sprite.scale.setScalar(

                pulse*

                c.sprite.scale.x

            );

        }

    }

    //////////////////////////////////////////////////////////
    // API
    //////////////////////////////////////////////////////////

    return{

        update

    };

}