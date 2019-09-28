/**
* MyPrism
* @constructor
*/

class MyPrism extends CGFobject {
    constructor(scene, height, slices, baseRadius) {
        super(scene);
        this.scene = scene;

        this.height = height;
        this.slices = slices;
        this.baseRadius = baseRadius;

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

          var x1=this.baseRadius*Math.cos(ang);
          var y1=this.baseRadius*Math.sin(ang); 
          var x2=this.baseRadius*Math.cos(ang+alphaAng);
          var y2=this.baseRadius*Math.sin(ang+alphaAng);

          this.vertices.push(x1, y1, 0);
          this.vertices.push(x2, y2, 0);
          this.vertices.push(x1, y1, this.height);
          this.vertices.push(x2, y2, this.heigth);

          this.indices.push(i, i+1, i+2);
          this.indices.push(i+1, i+3, i+2);      
          
          ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

