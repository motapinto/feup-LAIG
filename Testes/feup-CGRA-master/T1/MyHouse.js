/**
* MyHouse
* @constructor
* @param scene - Reference to MyScene object
* @param roof_slices - roof pyramid slices
* @param pillar_slices - pillar prism slices
* @param wall_img - wall textue image
* @param pillar_img - pillar textue image
* @param door_img - door textue image
* @param window_img - window textue image
*/

class MyHouse extends CGFobject { //"Unit House" with height equal to 1
    constructor(scene, roof_slices, pillar_slices, wall_img, roof_img, pillar_img, door_img, window_img) {
        super(scene);
        this.normals = [];

        this.scene = scene;
        this.roof_slices = roof_slices;
        this.pillar_slices = pillar_slices;

        this.wall_img = wall_img;
        this.roof_img = roof_img;
        this.pillar_img = pillar_img;
        this.door_img = door_img;
        this.window_img = window_img

        this.walls = new MyUnitCubeQuad(scene, wall_img, wall_img, wall_img); //constructor(scene, side_img, top_img, bottom_img)
        this.roof = new MyPyramid(scene, roof_slices, 1); //constructor(scene, slices, height, radius) 
        this.pillar = new MyPrism(scene, pillar_slices, 1, 1); //constructor(scene, slices, height, radius) 
        this.door = new MyQuad(scene, [0,0, 1,0, 0,1, 1,1], 0); //constructor(scene, coords, cubemap) [cubemap = 0 if object is not cubemap]
        this.window = new MyQuad(scene, [0,0, 1,0, 0,1, 1,1], 0); //constructor(scene, coords, cubemap) [cubemap = 0 if object is not cubemap]

        //Walls text defined in MyUnitCubeQuad

        //door texture
        this.door_text = new CGFappearance(scene);
        this.door_text.setAmbient(0.8, 0.8, 0.8, 1);
        this.door_text.setDiffuse(1, 1, 1, 1);
        this.door_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.door_text.setShininess(10.0);
        this.door_text.loadTexture('images/' + door_img);
        this.door_text.setTextureWrap('REPEAT', 'REPEAT');

        //window texture
        this.window_text = new CGFappearance(scene);
        this.window_text.setAmbient(0.9, 0.9, 0.9, 1);
        this.window_text.setDiffuse(0.2, 0.2, 0.2, 1);
        this.window_text.setSpecular(1, 1, 1, 1);
        this.window_text.setShininess(10.0);
        this.window_text.loadTexture('images/' + window_img);
        this.window_text.setTextureWrap('REPEAT', 'REPEAT');

        //Roof texture
        this.roof_text = new CGFappearance(scene);
        this.roof_text.setAmbient(1.0, 1.0, 1.0, 1);
        this.roof_text.setDiffuse(1, 1, 1, 1);
        this.roof_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.roof_text.setShininess(10.0);
        this.roof_text.loadTexture('images/' + this.roof_img);
        this.roof_text.setTextureWrap('REPEAT', 'REPEAT');

        //Pillar texture
        this.pillar_text = new CGFappearance(scene);
        this.pillar_text.setAmbient(0.4, 0.4, 0.4, 1);
        this.pillar_text.setDiffuse(1, 1, 1, 1);
        this.pillar_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillar_text.setShininess(10.0);
        this.pillar_text.loadTexture('images/' + this.pillar_img);
        this.pillar_text.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        //door
        this.scene.pushMatrix();
        if(!this.disable_text)
            this.door_text.apply();
        this.scene.translate(0.2, 0, 1.01);
        this.scene.scale(0.5, 0.9, 1);
        this.door.display();
        this.scene.popMatrix();

        //window 
        this.scene.pushMatrix();
        this.window_text.apply();
        this.scene.translate(1.01, 0.2, 0.3);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.6, 1);
        this.window.display();
        this.scene.popMatrix();

        //walls
        this.scene.pushMatrix();
        this.walls.display();
        this.scene.popMatrix();

        //roof
        this.scene.pushMatrix();
        this.roof_text.apply();
        this.scene.translate(0.5, 1, 0.5);
        this.scene.scale(1.3, 1.3, 1.3);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();

        //pillar1
        this.scene.pushMatrix();
        this.pillar_text.apply();
        this.scene.translate(1.1, 0, -0.1);
        this.scene.scale(0.1, 1, 0.1);
        this.pillar.display();
        this.scene.popMatrix();

        //pillar2
        this.scene.pushMatrix();
        this.pillar_text.apply();
        this.scene.translate(1.1, 0, 1.1);
        this.scene.scale(0.1, 1, 0.1);
        this.pillar.display();
        this.scene.popMatrix();

        //pillar3
        this.scene.pushMatrix();
        this.pillar_text.apply();
        this.scene.translate(-0.1, 0, -0.1);
        this.scene.scale(0.1, 1, 0.1);
        this.pillar.display();
        this.scene.popMatrix();

        //pillar4
        this.scene.pushMatrix();
        this.pillar_text.apply();
        this.scene.translate(-0.1, 0, 1.1);
        this.scene.scale(0.1, 1, 0.1);
        this.pillar.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.roof.enableNormalViz();
        this.pillar.enableNormalViz();
        this.door.enableNormalViz();
        this.window.enableNormalViz();
        this.walls.enableNormalViz();
    }

    disableNormalViz() {
        this.roof.disableNormalViz();
        this.pillar.disableNormalViz();
        this.door.disableNormalViz();
        this.window.disableNormalViz();
        this.walls.disableNormalViz();
    }
}