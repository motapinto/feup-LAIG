/**
 * MyRectangle
 * @constructor
 * @param scene 
 */
class MyHexagon extends CGFobject {
	constructor(scene, radius) {
        super(scene);
        this.scene = scene;
        this.radius = radius;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];


		this.vertices.push(0, 0, 0);
		for(let i=0; i<(2*Math.PI); i+=Math.PI / 3) {
				this.vertices.push(this.radius*Math.cos(i), this.radius*Math.sin(i), 0);
				this.normals.push(0, 0, 1);
		}
        
        this.indices.push(0, 1, 2);
        this.indices.push(0, 2, 3);
        this.indices.push(0, 3, 4);
        this.indices.push(0, 4, 5);
		this.indices.push(0, 5, 6);
		this.indices.push(0, 6, 1);
        
    
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    //updates Texture Coords
	updateTexCoords() {
    }

}