/**
* MyCylinder
* @constructor
*/

class MyCylinder extends CGFobject {
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

        for(var i = 0; i < this.slices; i++) {

            var z1=this.radius*Math.sin(ang); 
            var z2=this.radius*Math.sin(ang+alphaAng);
            var x1=this.radius*Math.cos(ang);
            var x2=this.radius*Math.cos(ang+alphaAng);

            this.vertices.push(x1, 0, z1);//               3|--------|2
            this.vertices.push(x2, 0, z2);//                |        |
            this.vertices.push(x1, this.height, z1);//      |        |
            this.vertices.push(x2, this.height, z2);//     1|--------|0
            this.vertices.push(0, 0, 0);
            this.vertices.push(0, this.height, 0);

            this.indices.push(6*i+2, 6*i+3, 6*i+1);
            this.indices.push(6*i+2, 6*i+1, 6*i);  
            this.indices.push(6*i, 6*i+1, 6*i+4);
            this.indices.push(6*i+3, 6*i+2, 6*i+5);

            this.normals.push(x1, 0, z1);  
            this.normals.push(x2, 0, z2);    
            this.normals.push(x1, 0, z1);     
            this.normals.push(x2, 0, z2);
            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);

            this.texCoords.push(0+i*(1.0/this.slices),1);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),1);
            this.texCoords.push(0+i*(1.0/this.slices),0);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),0);
            this.texCoords.push(0.5+i*(1.0/this.slices),0);
            this.texCoords.push(0.5+i*(1.0/this.slices),1);

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity) {
        this.slices = 5 + Math.round(5 * complexity); 
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


