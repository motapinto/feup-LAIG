/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, height = 1, radius = 0.5) {
        super(scene);
        this.slices = slices;
        this.height = height;
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
        var max = this.slices*2;


        for (var i = 0; i < max; i+=2){
          this.indices.push(i+1, i, i+2);
          this.indices.push(i+2, i+3, i+1);
        }

        for(var i = 0; i <= this.slices; i++){

          this.vertices.push(Math.cos(ang)*this.radius, 0, -Math.sin(ang)*this.radius);
          this.vertices.push(Math.cos(ang)*this.radius, this.height, -Math.sin(ang)*this.radius);
          this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
          this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
          
          ang+=alphaAng;
        }

        for (var i = 0; i < (this.slices)/2; i++){
          this.texCoords.push(i/(this.slices/2), 1);
          this.texCoords.push(i/(this.slices/2), 0);
        }
        for (var i = this.slices/2; i > 0; i--){
          this.texCoords.push(i/(this.slices/2), 1);
          this.texCoords.push(i/(this.slices/2), 0);
        }
        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


