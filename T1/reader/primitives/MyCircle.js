/**
* MyCylinder
* @constructor
*/

class MyCircle extends CGFobject {
    constructor(scene, slices, radius) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.radius = radius;

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

            var x1=this.radius*Math.cos(ang);
            var y1=this.radius*Math.sin(ang); 
            var x2=this.radius*Math.cos(ang+alphaAng);
            var y2=this.radius*Math.sin(ang+alphaAng);

            this.vertices.push(0, 0, 0);
            this.vertices.push(x1, y1, 0);
            this.vertices.push(x2, y2, 0);
   
            //visible from both sides
            this.indices.push(3*i+1, 3*i+2, 3*i);
            this.indices.push(3*i, 3*i+2, 3*i+1);                 

            /*
            this.texCoords.push(0+i*(1.0/this.slices),1);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),1);
            this.texCoords.push(0+i*(1.0/this.slices),0);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),0); */

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

