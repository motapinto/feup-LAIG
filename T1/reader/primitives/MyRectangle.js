/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyRectangle extends CGFobject {
	constructor(scene, x1, x2, y1, y2) {
		//point 1 must have higher y and lower x than point 2
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var num_rect = 0;

		for(let x=this.x1; x<this.x2; x++) {
			for(let y=this.y1; y>this.y2; y--) {
				
				for(let i = 0; i < 2; i++) {
					for(let j=0; j < 2; j++) {
						this.vertices.push(x+i, y-j, 0);
						this.normals.push(0, 0, 1);
					}
				}

				this.indices.push(4*num_rect, 1+4*num_rect, 3+4*num_rect);
				this.indices.push(3+4*num_rect, 2+4*num_rect, 4*num_rect);
				this.indices.push(4*num_rect, 2+4*num_rect, 3+4*num_rect);
				this.indices.push(3+4*num_rect, 1+4*num_rect, 4*num_rect);

				this.texCoords.push(0, 0);
				this.texCoords.push(0, 1);
				this.texCoords.push(1, 0);
				this.texCoords.push(1, 1);

				num_rect++;
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

