/**
* MyPrism
* @constructor
* @param scene - Reference to MyScene object
* @param slices - number of slices in prism
* @param height - prism height
* @param radius - prism radius
*/

class MyPrism extends CGFobject { // prism with bottom base
    constructor(scene, slices, height, radius) {
        super(scene);
        this.scene =scene;

        this.radius = radius;
        this.slices = slices;
        this.height = height;
        
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = (2 * Math.PI) / this.slices;

        for(var i = 0; i < this.slices; i++){

            var z1 = this.radius*Math.sin(ang); 
            var z2 = this.radius*Math.sin(ang + alphaAng);
            var x1 = this.radius*Math.cos(ang);
            var x2 = this.radius*Math.cos(ang + alphaAng);

            this.vertices.push(x1, 0, z1);//                1|--------|2
            this.vertices.push(x2, 0, z2);//                |        |     ----->x
            this.vertices.push(x1, this.height, z1);//      |        |      |          
            this.vertices.push(x2, this.height, z2);//    1 |--------|0     v z     
            this.vertices.push(0, 0, 0);

            this.indices.push(5*i+2, 5*i+3, 5*i+1);
            this.indices.push(5*i+2, 5*i+1, 5*i);  
            this.indices.push(5*i+0, 5*i+1, 5*i+4);  
            
            var x_med = (x1+x2) / 2;
            var z_med = (z1+z2) / 2;

            this.normals.push(x_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)), 0, z_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)));  
            this.normals.push(x_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)), 0, z_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)));
            this.normals.push(x_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)), 0, z_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)));
            this.normals.push(x_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)), 0, z_med/Math.sqrt(Math.pow(x_med, 2)+Math.pow(z_med, 2)));
            this.normals.push(0, -1, 0);

            this.texCoords.push(0+i*(1/this.slices),1);
            this.texCoords.push((1/this.slices)+i*(1/this.slices),1);
            this.texCoords.push(0+i*(1/this.slices),0);
            this.texCoords.push((1/this.slices)+i*(1/this.slices),0);
            this.texCoords.push(0.5+i*(1/this.slices),0);
            
            ang += alphaAng;
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


