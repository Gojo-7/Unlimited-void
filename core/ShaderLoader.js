export class ShaderLoader{

    constructor(){

        //////////////////////////////////////////////////////
        // CACHE
        //////////////////////////////////////////////////////

        this.cache = new Map();

    }

    //////////////////////////////////////////////////////////
    // LOAD SINGLE SHADER
    //////////////////////////////////////////////////////////

    async load(path){

        if(this.cache.has(path)){

            return this.cache.get(path);

        }

        const response =
        await fetch(path);

        if(!response.ok){

            throw new Error(

                `Failed to load shader: ${path}`

            );

        }

        const source =
        await response.text();

        this.cache.set(

            path,

            source

        );

        return source;

    }

    //////////////////////////////////////////////////////////
    // LOAD SHADER PAIR
    //////////////////////////////////////////////////////////

    async loadPair(

        vertexPath,

        fragmentPath

    ){

        const [

            vertexShader,

            fragmentShader

        ] = await Promise.all([

            this.load(

                vertexPath

            ),

            this.load(

                fragmentPath

            )

        ]);

        return{

            vertexShader,

            fragmentShader

        };

    }

    //////////////////////////////////////////////////////////
    // PRELOAD ALL SHADERS
    //////////////////////////////////////////////////////////

    async preload(){

        await Promise.all([

            this.loadPair(

                "./shaders/blackhole.vert",

                "./shaders/blackhole.frag"

            ),

            this.loadPair(

                "./shaders/accretion.vert",

                "./shaders/accretion.frag"

            ),

            this.loadPair(

                "./shaders/particles.vert",

                "./shaders/particles.frag"

            ),

            this.loadPair(

                "./shaders/nebula.vert",

                "./shaders/nebula.frag"

            )

        ]);

    }

    //////////////////////////////////////////////////////////
    // GET SHADER
    //////////////////////////////////////////////////////////

    get(path){

        if(!this.cache.has(path)){

            throw new Error(

                `Shader not loaded: ${path}`

            );

        }

        return this.cache.get(path);

    }

    //////////////////////////////////////////////////////////
    // GET SHADER PAIR
    //////////////////////////////////////////////////////////

    getPair(

        vertexPath,

        fragmentPath

    ){

        return{

            vertexShader:

                this.get(

                    vertexPath

                ),

            fragmentShader:

                this.get(

                    fragmentPath

                )

        };

    }

    //////////////////////////////////////////////////////////
    // CLEAR CACHE
    //////////////////////////////////////////////////////////

    clear(){

        this.cache.clear();

    }

}