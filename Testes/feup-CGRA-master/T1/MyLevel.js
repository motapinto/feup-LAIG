/**
* MyLevel
* @constructor
* @param scene - Reference to MyScene object
* @param levels - amount of levels
* @param hill_img - hill texture image
* @param water_img - water texture image
*/

class MyLevel extends CGFobject {
	constructor(scene, level, side_img, top_img, bottom_img) {
        super(scene);
        this.scene = scene;

        this.side_img = side_img;
        this.top_img = top_img;
        this.bottom_img = bottom_img;

        this.level = level;    
        this.block = new MyUnitCubeQuad(scene, side_img, top_img, bottom_img); //constructor(scene, side_img, top_img, bottom_img)
	}
    
	display() {
        var x = -Math.floor(this.level / 2);
        var z = -Math.floor(this.level / 2);
        for (var i = x; i < this.level+x; i++) {
            for (var j = z; j < this.level+z; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i, 0, j);
                this.block.display();
                this.scene.popMatrix();
            }
        }
    }
            
    enableNormalViz() {
        this.block.enableNormalViz();
        this.water_block.enableNormalViz();
    }

    disableNormalViz() {
        this.block.disableNormalViz();
        this.water_block.disableNormalViz();
    }
}