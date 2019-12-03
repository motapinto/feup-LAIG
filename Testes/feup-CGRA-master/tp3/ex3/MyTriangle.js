/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            0, 0, 0,
            1, 0, 0,
			0, 1, 0,
			//For Normals
			0, 0, 0,
            1, 0, 0,
			0, 1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			//Inverse coordinates to mantain object visible 
			5, 4, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
