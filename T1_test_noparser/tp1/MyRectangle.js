/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyRectangle extends CGFobject {
	constructor(scene, x1, x2, y1, y2, stacks = 5, slices = 5) {
		//point 1 must have lower y and lower x than point 2
		super(scene);
		
		this.initBuffers(x1, x2, y1, y2, stacks, slices);
	}
	
	initBuffers(x1, x2, y1, y2, stacks, slices) {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let length = x2-x1;
		let height = y2-y1;
		let x_iter = length/stacks;
		let y_iter = height/slices;

		//vertice and normal generation
		for(let x = x1; x <= x2; x += x_iter) {
			for(let y = y1; y <= y2; y += y_iter) {
				this.vertices.push(x, y, 0);
				this.texCoords.push((x-x1)/length, (y2-y)/height);

				this.vertices.push(x, y, 0);
				this.texCoords.push((x-x1)/length, (y2-y)/height);

				this.normals.push(0, 0, 1);
				this.normals.push(0, 0, -1);
			}
		}

		//indices generation
		var n_y = slices+1;

		for(let i = 0; i < stacks; i++){
			for(let j = 0; j < slices; j++){
				this.indices.push((j + 1 + i*n_y)*2, 	(j + i * n_y)*2, 	(j + 1 + (i + 1)*n_y)*2);
				this.indices.push((j + i * n_y)*2, 		(j + (i + 1)*n_y)*2, (j + 1 + (i + 1)*n_y)*2);
				//Both sides visible
				this.indices.push((j + 1 + (i + 1)*n_y)*2 + 1, 	(j + i * n_y)*2 + 1, 	(j + 1 + i*n_y)*2 + 1);
				this.indices.push((j + 1 + (i + 1)*n_y)*2 + 1, 		(j + (i + 1)*n_y)*2 + 1, (j + i * n_y)*2 + 1);
			}
		}

		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

