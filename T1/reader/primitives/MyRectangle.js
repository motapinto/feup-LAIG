/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyRectangle extends CGFobject {
	constructor(scene, x1, x2, y1, y2) {
		//point 1 must have lower y and lower x than point 2
		super(scene);

		this.initBuffers(x1, x2, y1, y2);
	}
	
	initBuffers(x1, x2, y1, y2) {
		this.length = x2-x1;
		this.height= y2-y1;

		this.vertices = [
			x1, y1, 0,	//0
			x2, y1, 0,	//1
			x1, y2, 0,	//2
			x2, y2, 0,	//3

			x1, y1, 0,	//0
			x2, y1, 0,	//1
			x1, y2, 0,	//2
			x2, y2, 0	//3
				];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,

			6, 5, 4,
			5, 6, 7
				];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
				];

		this.texCoords = [
					0, 1,
					1, 1,
					0, 0,
					1, 0,

					0, 1,
					1, 1,
					0, 0,
					1, 0
				];
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    //updates Texture Coords
	updateTexCoords(length_s, length_t) {
		if(length_s == 0 || length_t == 0) {
			this.texCoords = [
				0, 1,
				1, 1,
				0, 0,
				1, 0,

				0, 1,
				1, 1,
				0, 0,
				1, 0
			];
		}
		else{
			var tex_u = this.length / length_s;
			var tex_v = this.height / length_t;
			this.texCoords = [
				0, tex_v,
				tex_u, tex_v,
				0, 0,
				tex_u, 0,

				0, tex_v,
				tex_u, tex_v,
				0, 0,
				tex_u, 0
			];

		}

		this.updateTexCoordsGLBuffers();
	}
}

