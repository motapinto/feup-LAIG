/**
* MyCylinder
* @constructor
*/

class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, height, radiusTop, radiusBottom, coverTop=0, coverBottom=0) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;

        //this.cover = new MyCircle(scene); //covers for cylinder bases

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

            var x1_bottom=this.radiusBottom*Math.cos(ang);
            var y1_bottom=this.radiusBottom*Math.sin(ang); 
            var x2_bottom=this.radiusBottom*Math.cos(ang+alphaAng);
            var y2_bottom=this.radiusBottom*Math.sin(ang+alphaAng);

            var x1_top=this.radiusTop*Math.cos(ang);
            var y1_top=this.radiusTop*Math.sin(ang); 
            var x2_top=this.radiusTop*Math.cos(ang+alphaAng);
            var y2_top=this.radiusTop*Math.sin(ang+alphaAng);

            this.vertices.push(x1_bottom, y1_bottom, 0);
            this.vertices.push(x2_bottom, y2_bottom, 0);
            this.vertices.push(x1_top, y1_top, this.height);
            this.vertices.push(x2_top, y2_top, this.height);
   
            //visible from both sides
            this.indices.push(4*i+1, 4*i+3, 4*i+2);
            this.indices.push(4*i, 4*i+1, 4*i+2);  
            this.indices.push(4*i+2, 4*i+3, 4*i+1);
            this.indices.push(4*i+2, 4*i+1, 4*i);

            this.normals.push(x1_bottom, y1_bottom, 0);
            this.normals.push(x2_bottom, y2_bottom, 0);  
            this.normals.push(x1_top, y1_top, 0);     
            this.normals.push(x2_top, y2_top, 0);

            this.texCoords.push(0+i*(1.0/this.slices),1);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),1);
            this.texCoords.push(0+i*(1.0/this.slices),0);
            this.texCoords.push((1.0/this.slices)+i*(1.0/this.slices),0);

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /*MyCylinder.prototype.display = function() {
        CGFobject.prototype.display.call(this);
      
        if (this.coverTop > 0) {
          this.scene.pushMatrix();
            this.scene.scale(this.coverTop, this.coverTop, 1);
            this.scene.translate(0, 0, this.height);
            this.cover.display();
          this.scene.popMatrix();
        }
      
        if (this.coverBottom > 0) {
          this.scene.pushMatrix();
            this.scene.scale(this.coverBottom, this.coverBottom, 1);
            this.cover.display();
          this.scene.popMatrix();
        }
      };*/
}

