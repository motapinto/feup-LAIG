/**
* MyVoxelHill
* @constructor
* @param scene - Reference to MyScene object
* @param levels - amount of levels
* @param hill_img - hill texture image
* @param water_img - water texture image
*/

class MyVoxelHill extends CGFobject {
    constructor(scene, levels, side_img, top_img, bottom_img) { 
        super(scene);
        this.scene = scene;

        this.side_img = side_img;
        this.top_img = top_img;
        this.bottom_img = bottom_img;

        this.levels = 2*levels;
        this.cont = 0;
        this.layer = [];

        for (var i = 1; i < this.levels; i+=2){
           this.layer[this.cont] = new MyLevel(scene, i, side_img, top_img, bottom_img); //constructor(scene, level, hill_img, water_img)
           this.cont++;
        }
    }

    display() {
        for (var j = 0; j < this.cont; j++) {
            this.scene.pushMatrix();
            this.scene.translate(0, j, 0);
            this.layer[this.cont-j-1].display();
            this.scene.popMatrix();
        }
    }   
    
    enableNormalViz() {
        for (var i = 1; i < this.levels.length; i++){
            this.layer[i].enableNormalViz();
        }
    }

    disableNormalViz() {
        for (var i = 1; i < this.levels.length; i++){
            this.layer[i].disableNormalViz();
        }
    }
}