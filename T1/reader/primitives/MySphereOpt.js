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
        this.stacks = stacks;

		this.initBuffers(radius);
	};

	initBuffers(radius)
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var teta_delta = Math.PI/(2*this.stacks);
		var phi_delta = 2*Math.PI/this.slices;

		if(this.slices % 2){
			var j_max = ((this.slices + 1) >> 1) + 1; //round this.slices/4 and add 1
	
			//Vertices and normals generation
			for(var i = 0; i < (this.stacks + 1); i++) {
		
				// 1 more cycle to avoid special cases in the connect parts of the quadrants
				for(var j = 0; j < j_max ; j++) {
					
					var x = Math.cos(teta_delta*i)*Math.cos(phi_delta*j);
					var y = Math.cos(teta_delta*i)*Math.sin(phi_delta*j);
					var z =  Math.sin(teta_delta*i);
					
					this.normals.push(x, y, z);     //1st to 2nd Quadrant
					this.normals.push(x, -y, z);	//4th to 3rd Quadrant
	
					this.normals.push(x, y, -z);	//5th to 6th Quadrant
					this.normals.push(x, -y, -z);	//8th to 7th Quadrant
				
					x *= radius;
					y *= radius;
					z *= radius;
					this.vertices.push(x, y, z);    //1st to 2nd Quadrant
					this.vertices.push(x, -y, z);	//4th to 3rd Quadrant
	
					this.vertices.push(x, y, -z);	//5th to 6th Quadrant
					this.vertices.push(x, -y, -z);	//8th to 7th Quadrant
	
					
					//Tex coords
					
				}
			}
	
	
			//Indices generation
			var quadrant_delta = 4;
			var vertices_stack = j_max * 4; //Number of vertices per stack
	
			for(var i = 0; i < this.stacks; i++){
				for(var j = 0; j < (j_max - 1); j++){
					//Check for top of sphere
					if(i != (this.stacks - 1)){
	
						// 1st to 2nd Quadrant
						//Bottom left triangle
						this.indices.push(	
							j * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + i * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							(j + 1) * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + (i + 1) * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						if(j != (j_max-2)){
							// 4th to 3rd Quadrant
							//Bottom left triangle
							this.indices.push(	
								1 + (j + 1) * quadrant_delta + i * vertices_stack,
								1 + j * quadrant_delta + i * vertices_stack,
								1 + j * quadrant_delta + (i + 1) * vertices_stack
							);
							//Top right triangle
							this.indices.push(	
								1 + (j + 1) * quadrant_delta + i * vertices_stack,
								1 + j * quadrant_delta + (i + 1) * vertices_stack,
								1 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
							);
						}
				
						// 5th to 6th Quadrant
						//Bottom left triangle
						this.indices.push(	
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack,
							2 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
						);
	
						if(j != (j_max-2)){
							// 8th to 7th Quadrant
							//Bottom left triangle
							this.indices.push(	
								3 + j * quadrant_delta + i * vertices_stack,
								3 + (j + 1) * quadrant_delta + i * vertices_stack,
								3 + j * quadrant_delta + (i + 1) * vertices_stack
							);
							//Top right triangle
							this.indices.push(	
								3 + (j + 1) * quadrant_delta + i * vertices_stack,
								3 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack,
								3 + j * quadrant_delta + (i + 1) * vertices_stack
							);
						}
					}
					//Top of sphere
					else{
	
						// 1st to 2nd Quadrant
						this.indices.push(	
							j * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + i * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						// 4th to 3rd Quadrant
						this.indices.push(	
							1 + (j + 1) * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						// 5th to 6th Quadrant
						this.indices.push(	
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 8th to 7th Quadrant
						this.indices.push(	
							3 + j * quadrant_delta + i * vertices_stack,
							3 + (j + 1) * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + (i + 1) * vertices_stack
						);
					}
				}
			}

		}
		else{
			var j_max = (((this.slices >> 1) + 1) >> 1) + 1; //round this.slices/4 and add 1
	
			//Vertices and normals generation
			for(var i = 0; i < (this.stacks + 1); i++) {
		
				// 1 more cycle to avoid special cases in the connect parts of the quadrants
				for(var j = 0; j < j_max ; j++) {
					
					var x = Math.cos(teta_delta*i)*Math.cos(phi_delta*j);
					var y = Math.cos(teta_delta*i)*Math.sin(phi_delta*j);
					var z =  Math.sin(teta_delta*i);
					
					this.normals.push(x, y, z);     //1st Quadrant
					this.normals.push(-x, y, z);	//2nd Quadrant
					this.normals.push(-x, -y, z);	//3th Quadrant
					this.normals.push(x, -y, z);	//4th Quadrant
	
					this.normals.push(x, y, -z);	//5th Quadrant
					this.normals.push(-x, y, -z);	//6th Quadrant
					this.normals.push(-x, -y, -z);	//7th Quadrant
					this.normals.push(x, -y, -z);	//8th Quadrant
				
					x *= radius;
					y *= radius;
					z *= radius;
					this.vertices.push(x, y, z);    //1st Quadrant
					this.vertices.push(-x, y, z);	//2nd Quadrant
					this.vertices.push(-x, -y, z);	//3th Quadrant
					this.vertices.push(x, -y, z);	//4th Quadrant
	
					this.vertices.push(x, y, -z);	//5th Quadrant
					this.vertices.push(-x, y, -z);	//6th Quadrant
					this.vertices.push(-x, -y, -z);	//7th Quadrant
					this.vertices.push(x, -y, -z);	//8th Quadrant
	
					
					//Tex coords
					this.texCoords.push( 0.5*(x+1), 1 - 0.5*(y));
					this.texCoords.push( 0.5*(-x+1), 1 - 0.5*(y));
					this.texCoords.push( 0.5*(-x+1), 1 - 0.5*(-y));
					this.texCoords.push( 0.5*(x+1), 1 - 0.5*(-y));
					this.texCoords.push( 0.5*(x+1),  1 - 0.5*(y));
					this.texCoords.push( 0.5*(-x+1), 1 - 0.5*(y));
					this.texCoords.push( 0.5*(-x+1), 1 - 0.5*(-y));
					this.texCoords.push( 0.5*(x+1), 1 - 0.5*(-y));
						
				}
			}
	
	
			//Indices generation
			var quadrant_delta = 8;
			var vertices_stack = j_max * 8; //Number of vertices per stack
	
			for(var i = 0; i < this.stacks; i++){
				for(var j = 0; j < (j_max - 1); j++){
					//Check for top of sphere
					if(i != (this.stacks - 1)){
	
						// 1st Quadrant
						//Bottom left triangle
						this.indices.push(	
							j * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + i * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							(j + 1) * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + (i + 1) * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						// 2nd Quadrant
						//Bottom left triangle
						this.indices.push(	
							1 + (j + 1) * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							1 + (j + 1) * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + (i + 1) * vertices_stack,
							1 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 3rd Quadrant
						//Bottom left triangle
						this.indices.push(	
							2 + j * quadrant_delta + i * vertices_stack,
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
				
						// 4th Quadrant
						//Bottom left triangle
						this.indices.push(	
							3 + (j + 1) * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							3 + (j + 1) * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + (i + 1) * vertices_stack,
							3 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 5th Quadrant
						//Bottom left triangle
						this.indices.push(	
							4 + (j + 1) * quadrant_delta + i * vertices_stack,
							4 + j * quadrant_delta + i * vertices_stack,
							4 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							4 + (j + 1) * quadrant_delta + i * vertices_stack,
							4 + j * quadrant_delta + (i + 1) * vertices_stack,
							4 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 6th Quadrant
						//Bottom left triangle
						this.indices.push(	
							5 + j * quadrant_delta + i * vertices_stack,
							5 + (j + 1) * quadrant_delta + i * vertices_stack,
							5 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							5 + (j + 1) * quadrant_delta + i * vertices_stack,
							5 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack,
							5 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 7th Quadrant
						//Bottom left triangle
						this.indices.push(	
							6 + (j + 1) * quadrant_delta + i * vertices_stack,
							6 + j * quadrant_delta + i * vertices_stack,
							6 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							6 + (j + 1) * quadrant_delta + i * vertices_stack,
							6 + j * quadrant_delta + (i + 1) * vertices_stack,
							6 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 8th Quadrant
						//Bottom left triangle
						this.indices.push(	
							7 + j * quadrant_delta + i * vertices_stack,
							7 + (j + 1) * quadrant_delta + i * vertices_stack,
							7 + j * quadrant_delta + (i + 1) * vertices_stack
						);
						//Top right triangle
						this.indices.push(	
							7 + (j + 1) * quadrant_delta + i * vertices_stack,
							7 + (j + 1) * quadrant_delta + (i + 1) * vertices_stack,
							7 + j * quadrant_delta + (i + 1) * vertices_stack,
						);
					}
					//Top of sphere
					else{
	
						// 1st Quadrant
						this.indices.push(	
							j * quadrant_delta + i * vertices_stack,
							(j + 1) * quadrant_delta + i * vertices_stack,
							j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						// 2nd Quadrant
						this.indices.push(	
							1 + (j + 1) * quadrant_delta + i * vertices_stack,
							1 + j * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 3rd Quadrant
						this.indices.push(	
							2 + j * quadrant_delta + i * vertices_stack,
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);
					
						// 4th Quadrant
						this.indices.push(	
							3 + (j + 1) * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + i * vertices_stack,
							3 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 5th Quadrant
						this.indices.push(	
							4 + (j + 1) * quadrant_delta + i * vertices_stack,
							4 + j * quadrant_delta + i * vertices_stack,
							4 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 6th Quadrant
						this.indices.push(	
							5 + j * quadrant_delta + i * vertices_stack,
							5 + (j + 1) * quadrant_delta + i * vertices_stack,
							5 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 7th Quadrant
						this.indices.push(	
							6 + (j + 1) * quadrant_delta + i * vertices_stack,
							6 + j * quadrant_delta + i * vertices_stack,
							6 + j * quadrant_delta + (i + 1) * vertices_stack
						);
	
						// 8th Quadrant
						this.indices.push(	
							7 + j * quadrant_delta + i * vertices_stack,
							7 + (j + 1) * quadrant_delta + i * vertices_stack,
							7 + j * quadrant_delta + (i + 1) * vertices_stack
						);
					}
				}
			}
		}
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	updateTexCoords(length_s, length_t) {
	}
};