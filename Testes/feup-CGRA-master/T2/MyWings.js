/**
* MyWings
* @constructor
* @param scene - Reference to MyScene object
*/

class MyWings extends CGFobject { 
    constructor(scene) { 
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			0, 0, 1,	//2
            1, 0, 1,	//3
            1.5, -0.5, 0.5    //4
            
		];

		this.indices = [
			0, 1, 2,
            1, 3, 2,
            1, 3, 4,
			//Both side visible
			2, 1, 0,
            2, 3, 1,
            4, 3, 1
		];

		//Facing Z positive
		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
            0, 1, 0,
            1, 0, 0
		];

		this.texCoords = [
			0, 0,
			0.5, 0,
			0, 1,
            0.5, 1,
            0.5, 0.5
		]
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}