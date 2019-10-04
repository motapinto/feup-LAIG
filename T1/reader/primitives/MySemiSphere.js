/**
 * MySemiSphere
 * @constructor
 */
class MySemiSphere extends CGFobject
{
	constructor(scene, slices, radius, stacks)
	{
		super(scene);

		this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var alpha_angle = Math.PI/(2*this.stacks);
		var omega_angle = 2*Math.PI/this.slices;

		for(var i = 0; i <= this.slices; i++) {

			for(var j = 0; j <= this.stacks; j++) {
                
                var x = this.radius*Math.cos(alpha_angle*j)*this.radius*Math.cos(omega_angle*i);
                var y = this.radius*Math.cos(alpha_angle*j)*this.radius*Math.sin(omega_angle*i);
                var z =  this.radius*Math.sin(alpha_angle*j);
				this.vertices.push(x, y, z);
                
                if(i != this.slices && j != this.stacks) {
                    var a = (i+1)*(this.stacks+1) + j;
                    var b = i*(this.stacks+1) + j+1;
                    var c = i*(this.stacks+1) + j;
                    var d = i*(this.stacks+1) + j+1;
                    var e = (i+1)*(this.stacks+1) + j;
                    var f = (i+1)*(this.stacks+1) + j+1;
                
                    this.indices.push(a, b, c);
					this.indices.push(d, e, f);
					this.indices.push(c, b, a);
					this.indices.push(f, e, d);
                }

				this.normals.push(x, y, z);

				this.texCoords.push( (x+1) / 2, 1 - (y+1) / 2 );

			}

        }
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};