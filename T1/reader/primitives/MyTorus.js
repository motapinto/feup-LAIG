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

        for(let i = 0; i <= this.slices; i++) {
			for(let j = 0; j <= this.loops; j++) {
                
                let x = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*j))*Math.cos(delta_phi*i);
                let y = (this.outerRadius + this.innerRadius*Math.cos(delta_theta*j))*Math.sin(delta_phi*i);
                
                let nx = Math.cos(delta_theta*j)*Math.cos(delta_phi*i);
                let ny = Math.cos(delta_theta*j)*Math.sin(delta_phi*i);
                let nz = Math.sin(delta_theta*j);

                this.vertices.push(x, y, this.innerRadius*nz);
                this.normals.push(nx, ny, this.innerRadius*nz);
                this.texCoords.push(1-1/this.slices, 1-1/this.loops);
            }
        }

        for(let i = 0; i < this.slices; i++) {
			for(let j = 0; j < this.loops; j++) {
                
                let a = (i+1)*(this.loops+1) + j;
				let b = i*(this.loops+1) + j+1;
				let c = i*(this.loops+1) + j;

				let d = i*(this.loops+1) + j+1;
				let e = (i+1)*(this.loops+1) + j;
				let f = (i+1)*(this.loops+1) + j+1;

				this.indices.push(a, b, c);
				this.indices.push(d, e, f);
				//Both sides visible
				this.indices.push(c, b, a);
				this.indices.push(f, e, d);
			}
		}

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    updateTexCoords(length_s, length_t) {
    }
}

