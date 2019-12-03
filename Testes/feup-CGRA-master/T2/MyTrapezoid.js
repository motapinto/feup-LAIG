/**
 * MyTrapezoid
 * @constructor
 */
class MyTrapezoid extends CGFobject
{
	constructor(scene, smallBaseSize, isFlipped)
	{
		super(scene);

		if (smallBaseSize > 1) {
			smallBaseSize = 1;
		}

		this.smallBaseSize = smallBaseSize;
		this.isFlipped = isFlipped ;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
			-0.5, -0.5, 0,
			-0.5+this.smallBaseSize, -0.5, 0,
			-0.5, 0.5, 0,
			-0.5+this.smallBaseSize, 0.5, 0,
			0.5, -0.5, 0
		];



		if (this.isFlipped) {
			this.indices = [
				2, 1, 0,
				1, 2, 3,
				3, 4, 1
			];
			this.normals = [
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1
			];
		} else {
			this.indices = [
				0, 1, 2,
				3, 2, 1,
				1, 4, 3
			];
			this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
			];
		}

		this.texCoords = [
			0, 1,
			this.smallBaseSize, 1,
			0, 0,
			this.smallBaseSize, 0,
			1, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
