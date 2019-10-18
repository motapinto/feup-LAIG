/**
* MyTorus
* @constructor
*/

class MyTorus extends CGFobject {
    //loops = loops;
    constructor(scene, slices, innerRadius, outerRadius, loops) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.loops = loops;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let delta_phi = 2*Math.PI/this.loops;
        let delta_theta = 2*Math.PI/this.slices;


        if(this.loops % 2){
            var j_max = ((this.loops + 1) >> 1) + 1; //round this.loops/4 and add 1
            var max_slices = (this.slices + 1) >> 1;

            // Vertices and normals generation
            for(let i = 0; i <= max_slices; i++) {
                for(let j = 0; j < j_max; j++) {                
                    let nx = Math.cos(delta_theta*i)*Math.cos(delta_phi*j);
                    let ny = Math.cos(delta_theta*i)*Math.sin(delta_phi*j);
                    let nz = Math.sin(delta_theta*i);
                    
                    let x = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.cos(delta_phi*j);
                    let y = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.sin(delta_phi*j);
                    let z = this.innerRadius*nz;
    
    
                    this.vertices.push(x, y, z);  //1st 2nd Quadrant
                    this.vertices.push(x, -y, z); //4th 3rd Quadrant
    
                    this.vertices.push(x, y, -z); //5th 6th Quadrant
                    this.vertices.push(x, -y, -z);//8th 7th Quadrant
    
    
                    this.normals.push(nx, ny, nz); //1st 2nd Quadrant
                    this.normals.push(nx, -ny, nz);//4th 3rd Quadrant
    
                    this.normals.push(nx, ny, -nz); //5th 6th Quadrant
                    this.normals.push(nx, -ny, -nz);//8th 7th Quadrant
    
                    let teta = delta_theta*i;
                    let phi = delta_phi*j;
    
                    this.texCoords.push(phi / (Math.PI*2),          teta / (Math.PI*2));
                    this.texCoords.push(1 - phi / (Math.PI*2),      teta / (Math.PI*2));
    
                    this.texCoords.push(phi / (Math.PI*2),          1 - teta / (Math.PI*2));
                    this.texCoords.push(1 - phi / (Math.PI*2),      1 - teta / (Math.PI*2));
                }
            }
    
            //Indices generation
            var quadrant_delta = 4;
            var vertices_slice = j_max * 4; //Number of vertices per stack
    
            for(let i = 0; i < max_slices; i++) {
                for(let j = 0; j < (j_max - 1); j++) {
                    
                    let a = (j+1)*quadrant_delta + i * vertices_slice;
                    let b = j*quadrant_delta + (i + 1) * vertices_slice;
                    let c = j*quadrant_delta + i * vertices_slice;
                    let d = (j + 1)*quadrant_delta + (i + 1) * vertices_slice;
    
                    // 1st 2nd Quadrant
                    //Bottom left triangle
                    this.indices.push(c, a, b);
                    //Top right triangle
                    this.indices.push(a, d, b);
    
                    if(j != (j_max-2)){
                        // 4th 3th Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 1, c + 1, b + 1);
                        //Top right triangle
                        this.indices.push(a + 1, b + 1, d + 1);
                    }

                    if(!(this.slices % 2)  || i != (max_slices - 1)){
                        // 5th 6th Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 2, c + 2, b + 2);
                        //Top right triangle
                        this.indices.push(a + 2, b + 2, d + 2);
                    }
        
                    if(j != (j_max-2) && (!(this.slices % 2)  || i != (max_slices - 1))){
                        // 8th 7th Quadrant
                        //Bottom left triangle
                        this.indices.push(c + 3, a + 3, b + 3);
                        //Top right triangle
                        this.indices.push(a + 3, d + 3, b + 3);
                    }
                }
            }
        }
        else{
            var j_max = (((this.loops >> 1) + 1) >> 1) + 1; //round this.loops/4 and add 1
            var max_slices = (this.slices + 1) >> 1;

            // Vertices and normals generation
            for(let i = 0; i <= max_slices; i++) {
                for(let j = 0; j < j_max; j++) {                
                    let nx = Math.cos(delta_theta*i)*Math.cos(delta_phi*j);
                    let ny = Math.cos(delta_theta*i)*Math.sin(delta_phi*j);
                    let nz = Math.sin(delta_theta*i);
                    
                    let x = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.cos(delta_phi*j);
                    let y = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.sin(delta_phi*j);
                    let z = this.innerRadius*nz;
    
    
                    this.vertices.push(x, y, z); //1st Quadrant
                    this.vertices.push(-x, y, z); //2nd Quadrant
                    this.vertices.push(-x, -y, z); //3rd Quadrant
                    this.vertices.push(x, -y, z); //4th Quadrant
    
                    this.vertices.push(x, y, -z); //5th Quadrant
                    this.vertices.push(-x, y, -z); //6th Quadrant
                    this.vertices.push(-x, -y, -z); //7th Quadrant
                    this.vertices.push(x, -y, -z); //8th Quadrant
    
    
                    this.normals.push(nx, ny, nz); //1st Quadrant
                    this.normals.push(-nx, ny, nz); //2nd Quadrant
                    this.normals.push(-nx, -ny, nz); //3rd Quadrant
                    this.normals.push(nx, -ny, nz); //4th Quadrant
    
                    this.normals.push(nx, ny, -nz); //5th Quadrant
                    this.normals.push(-nx, ny, -nz); //6th Quadrant
                    this.normals.push(-nx, -ny, -nz); //7th Quadrant
                    this.normals.push(nx, -ny, -nz); //8th Quadrant
    
                    let teta = delta_theta*i;
                    let phi = delta_phi*j;
    
                    this.texCoords.push(phi / (Math.PI*2),          teta / (Math.PI*2));
                    this.texCoords.push(0.5 - phi / (Math.PI*2),    teta / (Math.PI*2));
                    this.texCoords.push(0.5 + phi / (Math.PI*2),    teta / (Math.PI*2));
                    this.texCoords.push(1 - phi / (Math.PI*2),      teta / (Math.PI*2));
    
                    this.texCoords.push(phi / (Math.PI*2),          1 - teta / (Math.PI*2));
                    this.texCoords.push(0.5 - phi / (Math.PI*2),    1 - teta / (Math.PI*2));
                    this.texCoords.push(0.5 + phi / (Math.PI*2),    1 - teta / (Math.PI*2));
                    this.texCoords.push(1 - phi / (Math.PI*2),      1 - teta / (Math.PI*2));
                }
            }
    
            //Indices generation
            var quadrant_delta = 8;
            var vertices_slice = j_max * 8; //Number of vertices per slice
    
            for(let i = 0; i < max_slices; i++) {
                for(let j = 0; j < (j_max - 1); j++) {
                    
                    let a = (j+1)*quadrant_delta + i * vertices_slice;
                    let b = j*quadrant_delta + (i + 1) * vertices_slice;
                    let c = j*quadrant_delta + i * vertices_slice;
                    let d = (j + 1)*quadrant_delta + (i + 1) * vertices_slice;
    
                    // 1st Quadrant
                    //Bottom left triangle
                    this.indices.push(c, a, b);
                    //Top right triangle
                    this.indices.push(a, d, b);

                    if(j != (j_max-2)){
                        // 2nd Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 1, c + 1, b + 1);
                        //Top right triangle
                        this.indices.push(a + 1, b + 1, d + 1);
                    }

                    // 3rd Quadrant
                    //Bottom left triangle
                    this.indices.push(c + 2, a + 2, b + 2);
                    //Top right triangle
                    this.indices.push(a + 2, d + 2, b + 2);
    
                    if(j != (j_max-2)){
                        // 4th Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 3, c + 3, b + 3);
                        //Top right triangle
                        this.indices.push(a + 3, b + 3, d + 3);
                    }
    
                    if(!(this.slices % 2)  || i != (max_slices - 1) ){
                        // 5th Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 4, c + 4, b + 4);
                        //Top right triangle
                        this.indices.push(a + 4, b + 4, d + 4);
                    }

                    if(j != (j_max-2) && (!(this.slices % 2)  || i != (max_slices - 1)) ){
                        // 6th Quadrant
                        //Bottom left triangle
                        this.indices.push(c + 5, a + 5, b + 5);
                        //Top right triangle
                        this.indices.push(a + 5, d + 5, b + 5);
                    }
                    
                    if(!(this.slices % 2)  || i != (max_slices - 1) ){
                        // 7th Quadrant
                        //Bottom left triangle
                        this.indices.push(a + 6, c + 6, b + 6);
                        //Top right triangle
                        this.indices.push(a + 6, b + 6, d + 6);
                    }

                    if( j != (j_max-2) && (!(this.slices % 2)  || i != (max_slices - 1)) ){
                        // 8th Quadrant
                        //Bottom left triangle
                        this.indices.push(c + 7, a + 7, b + 7);
                        //Top right triangle
                        this.indices.push(a + 7, d + 7, b + 7);
                    }
                }
            }
        }    

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(length_s, length_t) {}
}

