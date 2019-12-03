/**
* MyUnitCube
* @constructor
* @param scene - Reference to MyScene object
* @param cubemap - If true UnitCube must behave has a cubemap
*/

class MyUnitCube extends CGFobject {
	constructor(scene, cubemap) {
		super(scene);
		this.cubemap = cubemap;
		
		if (cubemap == undefined) 
			this.cubemap = false;

		this.initBuffers();
	}

	initBuffers() {

		this.vertices = [
			//down
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			
			//up
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,

			//front
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,

			//back
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,

			//left
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,

			//right
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, -0.5
		];

		if(!this.cubemap) {
			this.indices = [
				//Tendo em conta frente como o ponto de menor y ...
				//Face horizontal de baixo
				//0, 1, 3,
				//0, 2, 3,

				//Face horizontal superior
				4, 5, 7,
				4, 6, 7,

				//Face lateral frontal
				7, 3, 2,
				7, 6, 2,

				//Face lateral de trás
				0, 4, 5,
				0, 1, 5,

				//Face lateral direita (x negativo)
				0, 4, 6,
				6, 2, 0,

				//Face lateral esquerda (x positivo)
				5, 1, 3,
				7, 3, 5,
			];
		}
		else {
			this.indices = [
				//Tendo em conta frente como o ponto de maior z...

				//Face horizontal de baixo
				//0, 2, 3,
				//0, 3, 1,

				//Face horizontal superior
				7, 6, 4,
				5, 7, 4,

				//Face lateral frontal
				8, 10, 11,
				11, 9, 8,

				//Face lateral de trás
				12, 13, 15,
				15, 14, 12,

				//Face lateral esquerda (x neg)
				18, 16, 17,
				19, 18, 17,

				//Face lateral direita (x pos)
				22, 23, 21,
				22, 21, 20,
			];
		}

		if(!this.cubemap) {
			this.normals = [
				1, 0, 0,
				-1, 0, 0, 
				1, 0, 0, 
				-1, 0, 0, 
				1, 0, 0, 
				-1, 0, 0, 
				1, 0, 0, 
				-1, 0, 0, 
	
				0, 0, 1, 
				0, 0, 1, 
				0, 0, -1, 
				0, 0, -1, 
				0, 0, 1, 
				0, 0, 1, 
				0, 0, -1, 
				0, 0, -1, 
	
				0, -1, 0,
				0, -1, 0,
				0, -1, 0,
				0, -1, 0,
				0, 1, 0,
				0, 1, 0, 
				0, 1, 0,
				0, 1, 0,	
			] ;
		}
		else {
			this.normals = [
				//z direction
				0, 0, -1,
				0, 0, -1,
				0, 0, 1, 
				0, 0, 1,
				0, 0, -1,
				0, 0, -1,
				0, 0, 1, 
				0, 0, 1,
				//x direction
				-1, 0, 0,
				1, 0, 0,
				-1, 0, 0,
				1, 0, 0,
				-1, 0, 0,
				1, 0, 0,
				-1, 0, 0,
				1, 0, 0,
				//y direction
				0, 1, 0,
				0, 1, 0,
				0, -1, 0,
				0, -1, 0,
				0, 1, 0,
				0, 1, 0, 
				0, -1, 0,
				0, -1, 0,	
			] ;
		}

		if(this.cubemap) { //if it's needed to apply textures to cube not a cubemap use UnitCubeQuad
			this.texCoords = [	
				//down
				0.5, 1,
				0.25, 1,
				0.5, 2/3,
				0.25, 2/3,
				//up
				0.5, 0,
				0.25, 0,
				0.5, 1/3,
				0.25, 1/3,
				//front
				0.5, 2/3,
				0.25, 2/3,
				0.5, 1/3,
				0.25, 1/3,
				//back
				0.75, 2/3,
				1, 2/3,
				0.75, 1/3,
				1, 1/3,
				//left
				0, 2/3,
				0.25, 2/3,
				0, 1/3,
				0.25, 1/3,
				//right
				0.75, 2/3,
				0.5, 2/3,
				0.75, 1/3,
				0.5, 1/3,
			]
		}
		
	   this.primitiveType = this.scene.gl.TRIANGLES;
	   this.initGLBuffers();
	}
}