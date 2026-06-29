export class ShaderLoader {

    constructor() {

        //////////////////////////////////////////////////////
        // CACHE
        //////////////////////////////////////////////////////

        this.cache = new Map();

    }

    //////////////////////////////////////////////////////////
    // LOAD TEXT FILE
    //////////////////////////////////////////////////////////

    async load(path) {

        if (this.cache.has(path)) {

            return this.cache.get(path);

        }

        const response = await fetch(path);

        if (!response.ok) {

            throw new Error(

                `Failed to load shader: ${path}`

            );

        }

        const source = await response.text();

        this.cache.set(

            path,

            source

        );

        return source;

    }

    //////////////////////////////////////////////////////////
    // LOAD SHADER PAIR
    //////////////////////////////////////////////////////////

    async loadProgram(

        vertexPath,

        fragmentPath

    ) {

        const [

            vertexShader,

            fragmentShader

        ] = await Promise.all([

            this.load(vertexPath),

            this.load(fragmentPath)

        ]);

        return {

            vertexShader,

            fragmentShader

        };

    }

    //////////////////////////////////////////////////////////
    // CLEAR CACHE
    //////////////////////////////////////////////////////////

    clear() {

        this.cache.clear();

    }

}