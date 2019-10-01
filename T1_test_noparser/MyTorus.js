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

        let phi_angle = 2*Math.PI/this.slices;
        let theta_angle = 2*Math.PI/this.loops;

        for(let i = 0; i <= this.slices; i++) {
			for(let j = 0; j <= this.loops; j++) {
                
                var x = (this.outerRadius + this.innerRadius*Math.cos(theta_angle*j))*Math.cos(phi_angle*i);
                var y = (this.outerRadius + this.innerRadius*Math.cos(theta_angle*j))*Math.sin(phi_angle*i);
                var z =  this.innerRadius*Math.sin(theta_angle*j);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
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
}

