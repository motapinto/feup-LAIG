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

		let teta_delta = Math.PI/(2*this.stacks);
		let phi_delta = 2*Math.PI/this.slices;

		if(this.slices % 2){
			let j_max = ((this.slices + 1) >> 1) + 1; //round this.slices/4 and add 1
	
			//Vertices and normals generation
			for(let i = 0; i < (this.stacks + 1); i++) {
		
				// 1 more cycle to avoid special cases in the connect parts of the quadrants
				for(let j = 0; j < j_max ; j++) {
					let cos_phi = Math.cos(phi_delta*j);
					let sin_phi = Math.sin(phi_delta*j);
					let cos_teta = Math.cos(teta_delta*i);

					let x = cos_teta * cos_phi;
					let y = cos_teta * sin_phi;
					let z =  Math.sin(teta_delta*i);
					
					this.normals.push(x, y, z);     //1st to 2nd Quadrant
					this.normals.push(x, -y, z);	//4th to 3rd Quadrant

					this.normals.push(x, y, -z);	//5th to 6th Quadrant
					this.normals.push(x, -y, -z);	//8th to 7th Quadrant
				
					//Tex coords
					let phi = phi_delta*j;
					let teta = teta_delta*i;

					this.texCoords.push(phi/(Math.PI*2), 0.5 - teta/Math.PI); //1st to 2nd Quadrant
					this.texCoords.push(1 - phi/(Math.PI*2), 0.5 - teta/Math.PI); //4th to 3rd Quadrant
					
					this.texCoords.push(phi/(Math.PI*2), 0.5 + teta/Math.PI); //5th to 6th Quadrant
					this.texCoords.push(1 - phi/(Math.PI*2), 0.5 + teta/Math.PI); //8th to 7th Quadrant
					
					x *= radius;
					y *= radius;
					z *= radius;
					this.vertices.push(x, y, z);    //1st to 2nd Quadrant
					this.vertices.push(x, -y, z);	//4th to 3rd Quadrant
	
					this.vertices.push(x, y, -z);	//5th to 6th Quadrant
					this.vertices.push(x, -y, -z);	//8th to 7th Quadrant
				}
			}
	
	
			//Indices generation
			let quadrant_delta = 4;
			let vertices_stack = j_max * 4; //Number of vertices per stack
	
			for(let i = 0; i < this.stacks; i++){
				for(let j = 0; j < (j_max - 1); j++){
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
					
						if(j != (j_max-2)){
							// 4th to 3rd Quadrant
							this.indices.push(	
								1 + (j + 1) * quadrant_delta + i * vertices_stack,
								1 + j * quadrant_delta + i * vertices_stack,
								1 + j * quadrant_delta + (i + 1) * vertices_stack
							);
						}
						// 5th to 6th Quadrant
						this.indices.push(	
							2 + (j + 1) * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + i * vertices_stack,
							2 + j * quadrant_delta + (i + 1) * vertices_stack
						);

						if(j != (j_max-2)){
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

		}
		else{
			let j_max = (((this.slices >> 1) + 1) >> 1) + 1; //round this.slices/4 and add 1
	
			//Vertices and normals generation
			for(let i = 0; i < (this.stacks + 1); i++) {
		
				// 1 more cycle to avoid special cases in the connect parts of the quadrants
				for(let j = 0; j < j_max ; j++) {

					let cos_phi = Math.cos(phi_delta*j);
					let sin_phi = Math.sin(phi_delta*j);
					let cos_teta = Math.cos(teta_delta*i);

					let x = cos_teta * cos_phi;
					let y = cos_teta * sin_phi;
					let z =  Math.sin(teta_delta*i);
					
					this.normals.push(x, y, z);     //1st Quadrant
					this.normals.push(-x, y, z);	//2nd Quadrant
					this.normals.push(-x, -y, z);	//3th Quadrant
					this.normals.push(x, -y, z);	//4th Quadrant
	
					this.normals.push(x, y, -z);	//5th Quadrant
					this.normals.push(-x, y, -z);	//6th Quadrant
					this.normals.push(-x, -y, -z);	//7th Quadrant
					this.normals.push(x, -y, -z);	//8th Quadrant
				
					//Tex coords
					let phi = phi_delta*j;
					let teta = teta_delta*i;

					this.texCoords.push(phi/(Math.PI*2), 		0.5 - teta/Math.PI); //1st Quadrant
					this.texCoords.push(0.5 - phi/(Math.PI*2),  0.5 - teta/Math.PI); //2nd Quadrant
					this.texCoords.push(0.5 + phi/(Math.PI*2),  0.5 - teta/Math.PI); //3rd Quadrant
					this.texCoords.push(1 - phi/(Math.PI*2),  	0.5 - teta/Math.PI); //4th Quadrant
					
					this.texCoords.push(phi/(Math.PI*2), 		0.5 + teta/Math.PI); //5th Quadrant
					this.texCoords.push(0.5 - phi/(Math.PI*2), 	0.5 + teta/Math.PI); //6th Quadrant
					this.texCoords.push(0.5 + phi/(Math.PI*2), 	0.5 + teta/Math.PI); //7th Quadrant
					this.texCoords.push(1 - phi/(Math.PI*2),	0.5 + teta/Math.PI);//8th Quadrant


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
				}
			}
	
	
			//Indices generation
			let quadrant_delta = 8;
			let vertices_stack = j_max * 8; //Number of vertices per stack
	
			for(let i = 0; i < this.stacks; i++){
				for(let j = 0; j < (j_max - 1); j++){
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
	updateTexCoords(length_s, length_t) {}
};