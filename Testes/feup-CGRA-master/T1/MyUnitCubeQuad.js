/**
* MyUnitCubeQuad
* @constructor
* @param scene - Reference to MyScene object
* @param side_img - texture image to aplly to the sides of the quad
* @param top_img - texture image to aplly to the top of the quad
* @param bottom_img - texture image to aplly to the bottom of the quad
*/

class MyUnitCubeQuad extends CGFobject {
	constructor(scene, side_img, top_img, bottom_img){
        super(scene);
        this.normal=[];
        
        this.scene = scene;
        this.side_img = side_img;
        this.top_img = top_img;
        this.bottom_img = bottom_img;
            
        //Upper qua
        this.quad1 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 
        //Down qu
        this.quad2 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 
        //Left qu
        this.quad3 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 
        //Right q
        this.quad4 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 
        //Front q
        this.quad5 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 
        //Back q
        this.quad6 = new MyQuad(scene, [1,1, 0,1, 1,0, 0,0]) ; //constructor(scene, coords) 

        this.quad_material = new CGFappearance(scene);
        this.quad_material.setAmbient(1.0, 1.0, 1.0, 1);
        this.quad_material.setDiffuse(0.6, 0.6, 0.6, 1);
        this.quad_material.setSpecular(0.4, 0.4, 0.4, 1);
        this.quad_material.setShininess(10.0);

        this.lateral_quad = new CGFtexture(scene, 'images/' + side_img);
        this.top_quad = new CGFtexture(scene, 'images/' + top_img);
        this.bottom_quad = new CGFtexture(scene, 'images/' + bottom_img);

	}

	display() {
        
        //Upper
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad_material.setTexture(this.top_quad);
        this.quad_material.apply();
        this.quad1.display();
        this.scene.popMatrix();
        
        //Down
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad_material.setTexture(this.bottom_quad);
        this.quad_material.apply();
        this.quad2.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad_material.setTexture(this.lateral_quad);
        this.quad_material.apply();
        this.quad3.display();
        this.scene.popMatrix();
        
        //Right
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad_material.setTexture(this.lateral_quad);
        this.quad_material.apply();
        this.quad5.display();
        this.scene.popMatrix();
        
        //Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.quad_material.setTexture(this.lateral_quad);
        this.quad_material.apply();
        this.quad5.display();
        this.scene.popMatrix();
        
        //Back
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.quad_material.setTexture(this.lateral_quad);
        this.quad_material.apply();
        this.quad6.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.quad1.enableNormalViz();
        this.quad2.enableNormalViz();
        this.quad3.enableNormalViz();
        this.quad4.enableNormalViz();
        this.quad5.enableNormalViz();
        this.quad6.enableNormalViz();
    }
    disableNormalViz() {
        this.quad1.disableNormalViz();
        this.quad2.disableNormalViz();
        this.quad3.disableNormalViz();
        this.quad4.disableNormalViz();
        this.quad5.disableNormalViz();
        this.quad6.disableNormalViz();
    }
}