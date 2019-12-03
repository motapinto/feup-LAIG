/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	
			2, 0, 0,	
            1, 1, 0,	
			-1, 1, 0,
			//For Normals
			0, 0, 0,	
			2, 0, 0,	
            1, 1, 0,	
            -1, 1, 0,
    	];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,

			6, 5, 4,
			7, 6, 4,


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
