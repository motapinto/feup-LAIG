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
		this.vertices = [
			//Vertices inferiores
			0.5, 0.5, -0.5,		//0
			-0.5, 0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
			0.5, -0.5, -0.5,	//3
			//Vertices superiores
			0.5, 0.5, 0.5,		//4
			-0.5, 0.5, 0.5,	//5
			-0.5, -0.5, 0.5,		//6
			0.5, -0.5, 0.5,	//7
		];


		this.indices = [
			//Tendo em conta frente como o ponto de menor y ...
			//Face horizontal de baixo
			0, 1, 2,
			2, 3, 0,
			2, 1, 0,
			0, 3, 2,
			//Face horizontal superior
			4, 5, 6,
			6, 7, 4,
			6, 5, 4,
			4, 7, 6,
			//Face lateral frontal
			6, 2, 3,
			3, 7, 6,
			3, 2, 6, 
			6, 7, 3,
			//Face lateral de trás
			0, 4, 5,
			5, 1, 0,
			5, 4, 0,
			0, 1, 5,
			//Face lateral direita (x negativo)
			2, 1, 5,
			5, 6, 2,
			//Face lateral esquerda (x positivo)
			6, 5, 1,
			1, 2, 6,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
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
