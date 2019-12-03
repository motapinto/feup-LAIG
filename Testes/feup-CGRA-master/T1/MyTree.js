/**
* MyTreeRowPatch
* @constructor
* @param scene - Reference to MyScene object
* @param trunk_height - trunk height of tree
* @param trunk_radius - trunk radius of tree
* @param tree_height - tree(copa) height
* @param tree_radius - tree(copa) radius
* @param trunk_img - trunk texture image
* @param tree_img - tree(copa) texture image
*/

class MyTree extends CGFobject {
    constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_img, tree_img) { //slices = 10, height = 1?
        super(scene);
        this.normals = [];
        this.scene = scene;

        this.trunk_height = trunk_height;
        this.tree_height = tree_height;

        this.trunk_radius = trunk_radius;
        this.tree_radius = tree_radius;

        this.trunk_img = trunk_img;
        this.tree_img = tree_img;

        //Tronco 
        this.trunk = new MyCylinder(scene, 15, trunk_height, trunk_radius); //constructor(scene, slices, height, radius) 
        //Copa 
        this.tree = new MyCone(scene, 15, tree_height, tree_radius); //constructor(scene, slices, height, radius)
        
        this.trunk_text = new CGFappearance(scene);
        this.trunk_text.setAmbient(1,1,1, 1.0);
        this.trunk_text.setDiffuse(1,1,1, 1.0);
        this.trunk_text.setSpecular(1,1,1, 1.0);
        this.trunk_text.setShininess(10.0);
        this.trunk_text.loadTexture('images/' + trunk_img);
        this.trunk_text.setTextureWrap('REPEAT', 'REPEAT');

        this.tree_text = new CGFappearance(scene);
        this.tree_text.setAmbient(1,1,1, 1.0);
        this.tree_text.setDiffuse(1,1,1, 1.0);
        this.tree_text.setSpecular(1,1,1, 1.0);
        this.tree_text.setShininess(10.0);
        this.tree_text.loadTexture('images/' + tree_img);
        this.tree_text.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        //trunk
        this.scene.pushMatrix();
        this.trunk_text.apply();
        this.trunk.display();
        this.scene.popMatrix();

        //tree 
        this.scene.pushMatrix();
        this.tree_text.apply();
        this.scene.translate(0, this.tree_height, 0);
        this.tree.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.tree.enableNormalViz();
        this.trunk.enableNormalViz();
    }

    disableNormalViz() {
        this.tree.disableNormalViz();
        this.trunk.disableNormalViz();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); 
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}