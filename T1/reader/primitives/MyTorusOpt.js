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

        let delta_phi = 2*Math.PI/this.slices;
        let delta_theta = 2*Math.PI/this.loops;

        var j_max = (((this.slices >> 1) + 1) >> 1) + 1; //round this.slices/4 and add 1

        // Vertices and normals generation
        for(let j = 0; j <= this.loops; j++) {
            for(let i = 0; i <= j_max; i++) {

                let nx = Math.cos(delta_theta*i)*Math.cos(delta_phi*j);
                let ny = Math.cos(delta_theta*i)*Math.sin(delta_phi*j);
                let nz = Math.sin(delta_theta*i);
                
                let x = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.cos(delta_phi*j);
                let y = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*i))*Math.sin(delta_phi*j);
                let z = this.innerRadius*nz;


                this.vertices.push(x, y, z); //1st Quadrant
                this.vertices.push(x, y, z); //2nd Quadrant
                this.vertices.push(x, y, z); //3rd Quadrant
                this.vertices.push(x, y, z); //4th Quadrant

                this.vertices.push(x, y, z); //5th Quadrant
                this.vertices.push(x, y, z); //6th Quadrant
                this.vertices.push(x, y, z); //7th Quadrant
                this.vertices.push(x, y, z); //8th Quadrant


                this.normals.push(nx, ny, nz); //1st Quadrant
                this.normals.push(nx, ny, nz); //2nd Quadrant
                this.normals.push(nx, ny, nz); //3rd Quadrant
                this.normals.push(nx, ny, nz); //4th Quadrant

                this.normals.push(nx, ny, nz); //5th Quadrant
                this.normals.push(nx, ny, nz); //6th Quadrant
                this.normals.push(nx, ny, nz); //7th Quadrant
                this.normals.push(nx, ny, nz); //8th Quadrant

                
            }
        }

        //Indices generation
        var quadrant_delta = 8;
        var vertices_stack = j_max * 8; //Number of vertices per stack

        for(let i = 0; i < this.loops; i++) {
            for(let j = 0; j < (j_max - 1); j++) {
                
                let a = (j+1)*quadrant_delta + i * vertices_stack;
				let b = j*quadrant_delta + (i + 1) * vertices_stack;
				let c = j*quadrant_delta + i * vertices_stack;
				let d = (j + 1)*quadrant_delta + (i + 1) * vertices_stack;

                // 1st Quadrant
                //Bottom left triangle
                this.indices.push(c, a, b);
                //Top right triangle
				this.indices.push(a, d, b);

                // 2nd Quadrant
                //Bottom left triangle
                this.indices.push(a + 1, c + 1, b + 1);
                //Top right triangle
				this.indices.push(a + 1, b + 1, d + 1);

                // 3rd Quadrant
                //Bottom left triangle
                this.indices.push(c + 2, a + 2, b + 2);
                //Top right triangle
				this.indices.push(a + 2, d + 2, b + 2);

                // 4th Quadrant
                //Bottom left triangle
                this.indices.push(a + 3, c + 3, b + 3);
                //Top right triangle
				this.indices.push(a + 3, b + 3, d + 3);

                // 5th Quadrant
                //Bottom left triangle
                this.indices.push(a + 4, c + 4, b + 4);
                //Top right triangle
				this.indices.push(a + 4, b + 4, d + 4);

                // 6th Quadrant
                //Bottom left triangle
                this.indices.push(c + 5, a + 5, b + 5);
                //Top right triangle
				this.indices.push(a + 5, d + 5, b + 5);

                // 7th Quadrant
                //Bottom left triangle
                this.indices.push(a + 6, c + 6, b + 6);
                //Top right triangle
				this.indices.push(a + 6, b + 6, d + 6);

                // 8th Quadrant
                //Bottom left triangle
                this.indices.push(c + 7, a + 7, b + 7);
                //Top right triangle
				this.indices.push(a + 7, d + 7, b + 7);
            }
		}

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(length_s, length_t) {
	}
}

