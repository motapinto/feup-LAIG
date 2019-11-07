/**
* MyCylinder
* @constructor
*/

class MyCylinder extends CGFobject {
    constructor(scene, base, top, height, slices, stacks) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.top = top;
        this.base = base;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;
        let alphaAng = 2*Math.PI/this.slices;

        let delta_z = this.height / this.stacks;
        let delta_radius = (this.top - this.base) / this.stacks;
        

        for(let i = 0; i < this.slices; i++) {
          
          let indices_increment = 4*i*this.stacks;
          let x1_bottom=this.base*Math.cos(ang);
          let y1_bottom=this.base*Math.sin(ang); 
          let x2_bottom=this.base*Math.cos(ang+alphaAng);
          let y2_bottom=this.base*Math.sin(ang+alphaAng);
          
          for(let j = 0; j < this.stacks; j++){
            
            let radius =  this.base + (j + 1) * delta_radius;
            
            let y1_top=radius*Math.sin(ang); 
            let x2_top=radius*Math.cos(ang+alphaAng);
            let y2_top=radius*Math.sin(ang+alphaAng);
            let x1_top=radius*Math.cos(ang);
            
            this.vertices.push(x1_bottom, y1_bottom, delta_z*j);
            this.vertices.push(x2_bottom, y2_bottom, delta_z*j);
            this.vertices.push(x1_top, y1_top, delta_z*(j+1));
            this.vertices.push(x2_top, y2_top, delta_z*(j+1));
          
            //visible from both sides
            this.indices.push(indices_increment+4*j+1, indices_increment+4*j+3, indices_increment+4*j+2);
            this.indices.push(indices_increment+4*j, indices_increment+4*j+1, indices_increment+4*j+2);  
            this.indices.push(indices_increment+4*j+2, indices_increment+4*j+3, indices_increment+4*j+1);
            this.indices.push(indices_increment+4*j+2, indices_increment+4*j+1, indices_increment+4*j);
            
            this.normals.push(x1_bottom, y1_bottom, 0);
            this.normals.push(x2_bottom, y2_bottom, 0);  
            this.normals.push(x1_top, y1_top, 0);     
            this.normals.push(x2_top, y2_top, 0);

            this.texCoords.push(0+i*(1.0/this.slices),                            1 - j*(1.0/this.stacks));
            this.texCoords.push((1.0/this.slices) + i*(1.0/this.slices),          1 - j*(1.0/this.stacks));
            this.texCoords.push(0+i*(1.0/this.slices),                            1 - ((1.0/this.stacks) + j*(1.0/this.stacks)));
            this.texCoords.push((1.0/this.slices) + i*(1.0/this.slices),          1 - ((1.0/this.stacks) + j*(1.0/this.stacks)));

            x1_bottom = x1_top;
            x2_bottom = x2_top;
            y1_bottom = y1_top;
            y2_bottom = y2_top;
          }
          ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(length_s, length_t) {
    }
}

