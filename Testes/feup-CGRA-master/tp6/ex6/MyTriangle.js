/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

class MyTriangle extends CGFobject {
	constructor(scene, coords) { []
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
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
			2, 1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,

			0, 1,
			1, 1,
			0, 0,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
