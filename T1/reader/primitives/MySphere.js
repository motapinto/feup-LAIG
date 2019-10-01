/**
 * MySemiSphere
 * @constructor
 */
class MySphere extends CGFobject
{
	constructor(scene, radius, slices, stacks)
	{
		super(scene);

		this.slices = slices;
        this.stacks = stacks; //for each semisphere
        this.radius = radius;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let theta_angle = 2*Math.PI/this.stacks;
		let omega_angle = 2*Math.PI/this.slices;

		for(let i = 0; i <= this.slices; i++) {
			for(let j = 0; j <= this.stacks; j++) {
                
                let nx = this.radius*Math.cos(theta_angle*j)*Math.cos(omega_angle*i);
                let ny = this.radius*Math.cos(theta_angle*j)*Math.sin(omega_angle*i);
                let nz =  this.radius*Math.sin(theta_angle*j);
				
				this.vertices.push(this.radius*nx, this.radius*ny, this.radius*nz);
				this.normals.push(nx, ny, nz);
				this.texCoords.push( 0.5*(this.radius*nx+1), 1 - 0.5*(this.radius*ny+1));
			}
		}

		for(let i = 0; i < this.slices; i++) {
			for(let j = 0; j < this.stacks; j++) {
                
                let a = (i+1)*(this.stacks+1) + j;
				let b = i*(this.stacks+1) + j+1;
				let c = i*(this.stacks+1) + j;

				let d = i*(this.stacks+1) + j+1;
				let e = (i+1)*(this.stacks+1) + j;
				let f = (i+1)*(this.stacks+1) + j+1;

				this.indices.push(a, b, c);
				this.indices.push(d, e, f);
				//Both sides visible
				this.indices.push(c, b, a);
				this.indices.push(f, e, d);
			}
		}
	
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};


