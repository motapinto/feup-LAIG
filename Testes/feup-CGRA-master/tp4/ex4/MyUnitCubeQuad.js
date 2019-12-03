/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.normal=[];
            
        //Upper quad
        this.quad1 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;
        //Down quad
        this.quad2 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;
        //Left quad
        this.quad3 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;
        //Right quad
        this.quad4 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;
        //Front quad
        this.quad5 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;
        //Back quad
        this.quad6 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ;

        this.lateral_quad = new CGFappearance(scene);
        this.lateral_quad.setAmbient(0.1, 0.1, 0.1, 1);
        this.lateral_quad.setDiffuse(0.9, 0.9, 0.9, 1);
        this.lateral_quad.setSpecular(0.1, 0.1, 0.1, 1);
        this.lateral_quad.setShininess(10.0);
        this.lateral_quad.loadTexture('images/mineSide.png');
        this.lateral_quad.setTextureWrap('REPEAT', 'REPEAT');

        this.top_quad = new CGFappearance(scene);
        this.top_quad.setAmbient(0.1, 0.1, 0.1, 1);
        this.top_quad.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top_quad.setSpecular(0.1, 0.1, 0.1, 1);
        this.top_quad.setShininess(10.0);
        this.top_quad.loadTexture('images/mineTop.png');
        this.top_quad.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom_quad = new CGFappearance(scene);
        this.bottom_quad.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottom_quad.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottom_quad.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottom_quad.setShininess(10.0);
        this.bottom_quad.loadTexture('images/mineBottom.png');
        this.bottom_quad.setTextureWrap('REPEAT', 'REPEAT');

	}

	display() {
        //Upper
        this.scene.pushMatrix();
        this.top_quad.apply();
        this.scene.translate(0, 1, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad1.display();
        this.scene.popMatrix();
        
        //Down
        this.scene.pushMatrix();
        this.bottom_quad.apply();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad2.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.lateral_quad.apply();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad3.display();
        this.scene.popMatrix();
        //Right
        this.scene.pushMatrix();
        this.lateral_quad.apply();
        this.scene.translate(1, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad5.display();
        this.scene.popMatrix();
        //Front
        this.scene.pushMatrix();
        this.lateral_quad.apply();
        this.scene.translate(0, 0, 1,);
        this.quad5.display();
        this.scene.popMatrix();
        //Back
        this.scene.pushMatrix();
        this.lateral_quad.apply();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.quad6.display();
        this.scene.popMatrix();
    }

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
/*
Como fazer load de uma textura:


*/


