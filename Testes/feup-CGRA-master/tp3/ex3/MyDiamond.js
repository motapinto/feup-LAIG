/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	
			0, -1, 0,	
			0, 1, 0,	
			1, 0, 0,
			//For normals
			-1, 0, 0,	
			0, -1, 0,	
			0, 1, 0,	
			1, 0, 0,	
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			//Inverse coordinates to mantain object visible 
			6, 5, 4,
			6, 7, 5,
			
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

