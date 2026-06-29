const cache = {};

export async function loadShaders(){

    const shaderFiles = {

        accretionVertex:
            "./shaders/accretion.vert",

        accretionFragment:
            "./shaders/accretion.frag",

        lensVertex:
            "./shaders/lens.vert",

        lensFragment:
            "./shaders/lens.frag",

        particlesVertex:
            "./shaders/particles.vert",

        particlesFragment:
            "./shaders/particles.frag",

        nebulaVertex:
            "./shaders/nebula.vert",

        nebulaFragment:
            "./shaders/nebula.frag"

    };

    const entries =
    Object.entries(shaderFiles);

    await Promise.all(

        entries.map(

            async([key,path])=>{

                const response =
                await fetch(path);

                if(!response.ok){

                    throw new Error(
                        `Unable to load ${path}`
                    );

                }

                cache[key] =
                await response.text();

            }

        )

    );

}

export function getShader(name){

    return cache[name];

}