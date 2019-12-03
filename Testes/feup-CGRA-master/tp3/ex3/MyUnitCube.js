/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {

		this.vertices = [];

		var num_vertices = 8;

		for(var i = 0 ; i < 2 ; i++) { //face inferior e depois face superior
			for(var j = 0 ; j < 2 ; j++) { //y positivo e depois y negativo
				this.vertices.push( 0.5, 0.5 - j, -0.5 + i);
				this.vertices.push(-0.5, 0.5 - j, -0.5 + i);
			}
		}

		for(var i = 0 ; i < 2 ; i++) { //face inferior e depois face superior
			for(var j = 0 ; j < 2 ; j++) { //y positivo e depois y negativo
				this.vertices.push( 0.5, 0.5 - j, -0.5 + i);
				this.vertices.push(-0.5, 0.5 - j, -0.5 + i);
			}
		}

		for(var i = 0 ; i < 2 ; i++) { //face inferior e depois face superior
			for(var j = 0 ; j < 2 ; j++) { //y positivo e depois y negativo
				this.vertices.push( 0.5, 0.5 - j, -0.5 + i);
				this.vertices.push(-0.5, 0.5 - j, -0.5 + i);
			}
		}

		this.indices = [
			//Tendo em conta frente como o ponto de menor y ...
			//Face horizontal de baixo
			0, 1, 3,
			3, 2, 0,
			3, 1, 0,
			0, 2, 3,
			//Face horizontal superior
			4, 5, 7,
			7, 6, 4,
			7, 5, 4,
			4, 6, 7,
			//Face lateral frontal
			7, 3, 2,
			2, 6, 7,
			2, 3, 6, 
			7, 6, 2,
			//Face lateral de trás
			0, 4, 5,
			5, 1, 0,
			5, 4, 0,
			0, 1, 5,
			//Face lateral direita (x negativo)
			0, 4, 6,
			6, 2, 0,
			//Face lateral esquerda (x positivo)
			5, 1, 3,
			7, 3, 5,
		];

		this.normals = [
			1, 0, 0,
			-1, 0, 0, 
			1, 0, 0, 
			-1, 0, 0, 
			1, 0, 0, 
			-1, 0, 0, 
			1, 0, 0, 
			-1, 0, 0, 

			0, 1, 0, 
			0, 1, 0, 
			0, -1, 0, 
			0, -1, 0, 
			0, 1, 0, 
			0, 1, 0, 
			0, -1, 0, 
			0, -1, 0, 

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1, 
			0, 0, 1,
			0, 0, 1,	

		] ;

	   this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	   this.initGLBuffers();
	}

}

/*
Essa classe deve definir na função initBuffers os 8 vértices do cubo,
e a conectividade entre eles de forma a formar os triângulos que constituem as faces
quadradas do cubo. Recomenda-se que sejam inseridos comentários identificando os
vértices e as faces que estão a ser definidas.

Cubo centrado na origem e de aresta unitária, ou
seja , com coordenadas entre (-0.5, -0.5, -0.5) e (0.5, 0.5, 0.5), construído com uma única
malha de triângulos.

Ordem da escolha dos indices tem de ser no sentido da mao direita!! sentido anti-horario

*/ 
