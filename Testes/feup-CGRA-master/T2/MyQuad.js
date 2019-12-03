/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coords - Texture coordinates of quad
 */

class MyQuad extends CGFobject {
	constructor(scene, coords, rect) { 
		super(scene);
		this.rect = rect;
		
		this.initBuffers();

		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		if(this.rect) {
			this.vertices = [
				0, 0, 0,	//0
				0.2, 0, 0,	//1
				0, 1, 0,	//2
				0.2, 1, 0	//3
			];
		}
		else {
			this.vertices = [
				0, 0, 0,	//0
				1, 0, 0,	//1
				0, 1, 0,	//2
				1, 1, 0		//3
			];
		}

		this.indices = [
			0, 1, 2,
			1, 3, 2,
			//Both side visible
			2, 1, 0,
			2, 3, 1
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		
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


