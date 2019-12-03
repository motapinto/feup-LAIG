/**
* MyCone
* @constructor
* @param scene - Reference to MyScene object
* @param slices - slices of cone
* @param height - cone height
* @param radius - radius of cone base
*/

class MyCone extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.radius = radius;
        this.height = height;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            var z1=this.radius*Math.sin(ang); 
            var z2=this.radius*Math.sin(ang-alphaAng);
            var x1=this.radius*Math.cos(ang);
            var x2=this.radius*Math.cos(ang-alphaAng);

            this.vertices.push(0, this.height, 0);     
            this.vertices.push(x1, 0, z1);   
            this.vertices.push(x2, 0, z2); 
            this.vertices.push(0, 0, 0);

            this.indices.push(4*i+2, 4*i,4*i+1);
            this.indices.push(4*i+3, 4*i+2,4*i+1);

            this.normals.push(0, 1, 0);     
            this.normals.push(x1/Math.sqrt(Math.pow(x1, 2)+Math.pow(z1, 2)), 0, z1/Math.sqrt(Math.pow(x1, 2)+Math.pow(z1, 2)));  
            this.normals.push(x2/Math.sqrt(Math.pow(x2, 2)+Math.pow(z2, 2)), 0, z2/Math.sqrt(Math.pow(x2, 2)+Math.pow(z2, 2)));    
            this.normals.push(0, -1, 0);    

            this.texCoords.push((0.5/this.slices)+i*(0.5/this.slices),0);
            this.texCoords.push(0+i*(1/this.slices),1);
            this.texCoords.push((1/this.slices)+i*(1/this.slices),1);
            this.texCoords.push(0, 0); // vertice centro da base

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 5 + Math.round(5 * complexity); 
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


