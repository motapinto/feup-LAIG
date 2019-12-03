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
    	];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,
			2, 1, 0, //not necessary
			3, 2, 0, //not necessary
			//Inverse coordinates to mantain object visible 
			2, 1, 0,
			3, 2, 0,
			0, 1, 2,
			0, 2, 3,

		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
