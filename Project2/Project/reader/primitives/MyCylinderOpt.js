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

        let delta_ang = 2*Math.PI/this.slices;

        let delta_z = this.height / this.stacks;
        let delta_radius = (this.top - this.base) / this.stacks;
        

        if(this.slices % 2){
          let j_max = ((this.slices + 1) >> 1) + 1; //round this.slices/4 and add 1
  
          for(let i = 0; i <= this.stacks; i++){
            for(let j = 0; j < j_max; j++){
              let ang = delta_ang*j;
              let x = Math.cos(ang);
              let y = Math.sin(ang);
              let z = delta_z*i;

              let n = vec3.fromValues(x, y, Math.cos(Math.atan(this.height/(this.base-this.top))) );
              vec3.normalize(n, n);

              this.normals.push(n[0], n[1], n[2]);   //1st to 2nd Quadrant
              this.normals.push(n[0], -n[1], n[2]);  //4th to 3rd Quadrant

              x *= (this.base + delta_radius*i);
              y *= (this.base + delta_radius*i);

              this.vertices.push(x, y, z);  //1st to 2nd Quadrant
              this.vertices.push(x, -y, z); //4th to 3rd Quadrant

              let texV = z/this.height;
              this.texCoords.push(ang / (Math.PI*2), 1 - texV);  //1st to 2nd Quadrant
              this.texCoords.push(1 - ang / (Math.PI*2), 1 - texV); //4th to 3rd Quadrant

            }
          }

          //Indices generation
          let quadrant_delta = 2;
          let vertices_stack = j_max * 2; //Number of vertices per stack

          for(let i = 0; i < this.stacks; i++){
            for(let j = 0; j < (j_max-1); j++){
              let a = j * quadrant_delta + i * vertices_stack;
							let b = (j + 1) * quadrant_delta + i * vertices_stack;
              let c = j * quadrant_delta + (i + 1) * vertices_stack;
              let d = (j + 1) * quadrant_delta + (i + 1) * vertices_stack;

              // 1st to 2nd Quadrant
              //Bottom left triangle
              this.indices.push(a, b, c);
              //Top right triangle
              this.indices.push(b, d, c);

              if(j != (j_max - 2)){
                // 4th to 3rd Quadrant
                //Bottom left triangle
                this.indices.push(1 + b, 1 + a, 1 + c);
                //Top right triangle
                this.indices.push(1 + b, 1 + c, 1 + d);
              }
            }
          }
        }
        else{
          let j_max = (((this.slices >> 1) + 1) >> 1) + 1; //round this.slices/4 and add 1
  
          for(let i = 0; i <= this.stacks; i++){
            for(let j = 0; j < j_max; j++){
              let ang = delta_ang*j;
              let x = Math.cos(ang);
              let y = Math.sin(ang);
              let z = delta_z*i;

              let n = vec3.fromValues(x, y, Math.cos(Math.atan(this.height/(this.base-this.top))) );
              vec3.normalize(n, n);

              this.normals.push(n[0], n[1], n[2]);   //1st Quadrant
              this.normals.push(-n[0], n[1], n[2]);  //2nd Quadrant
              this.normals.push(-n[0], -n[1], n[2]); //3rd Quadrant
              this.normals.push(n[0], -n[1], n[2]);  //4th Quadrant

              x *= (this.base + delta_radius*i);
              y *= (this.base + delta_radius*i);

              this.vertices.push(x, y, z);  //1st Quadrant
              this.vertices.push(-x, y, z); //2nd Quadrant
              this.vertices.push(-x, -y, z);//3rd Quadrant
              this.vertices.push(x, -y, z); //4th Quadrant

              let texV = z/this.height;
              this.texCoords.push(ang / (Math.PI*2), 1 - texV);  //1st Quadrant
              this.texCoords.push(0.5 - ang / (Math.PI*2), 1 - texV); //2nd Quadrant
              this.texCoords.push(0.5 + ang / (Math.PI*2), 1 - texV);//3rd Quadrant
              this.texCoords.push(1 - ang / (Math.PI*2), 1 - texV); //4th Quadrant
            }
          }

          //Indices generation
          let quadrant_delta = 4;
          let vertices_stack = j_max * 4; //Number of vertices per stack

          for(let i = 0; i < this.stacks; i++){
            for(let j = 0; j < (j_max-1); j++){
              let a = j * quadrant_delta + i * vertices_stack;
							let b = (j + 1) * quadrant_delta + i * vertices_stack;
              let c = j * quadrant_delta + (i + 1) * vertices_stack;
              let d = (j + 1) * quadrant_delta + (i + 1) * vertices_stack;

						// 1st Quadrant
						//Bottom left triangle
            this.indices.push(a, b, c);
            //Top right triangle
            this.indices.push(b, d, c);

						// 2nd Quadrant
						//Bottom left triangle
            this.indices.push(1 + b, 1 + a, 1 + c);
            //Top right triangle
            this.indices.push(1 + b, 1 + c, 1 + d);

						// 3rd Quadrant
						//Bottom left triangle
            this.indices.push(2 + a, 2 + b, 2 + c);
            //Top right triangle
            this.indices.push(2 + b, 2 + d, 2 + c);

						// 4th Quadrant
						//Bottom left triangle
            this.indices.push(3 + b, 3 + a, 3 + c);
            //Top right triangle
            this.indices.push(3 + b, 3 + c, 3 + d);
            }
          }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(length_s, length_t) {
    }
}

