class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
		    0, 0 ,0,
		    1, 0 ,0,
		    0, 1, 0, 
		    -1, 0, 0,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
		    0, 1, 2,
		    3, 0, 2,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
