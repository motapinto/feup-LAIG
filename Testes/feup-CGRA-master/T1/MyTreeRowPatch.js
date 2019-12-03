/**
* MyTreeRowPatch
* @constructor
* @param scene - Reference to MyScene object
* @param trunk_height - trunk height of tree
* @param trunk_radius - trunk radius of tree
* @param tree_height - tree(copa) height
* @param tree_radius - tree(copa) radius
* @param trunk_text - trunk texture image
* @param tree_text - tree(copa) texture image
*/

class MyTreeRowPatch extends CGFobject {
    constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text) { 
        super(scene);
        this.scene = scene;
       
        this.tree = []; //array of trees
        this.rand_val = []; //array of rand values

        this.trunk_height = trunk_height;
        this.tree_height = tree_height;

        this.trunk_radius = trunk_radius;
        this.tree_radius = tree_radius;

        this.trunk_text = trunk_text;
        this.tree_text = tree_text;

        this.row_num = 6; //number of trees in a row

        for(var i = 0; i < this.row_num; i++) {
            this.rand_val[i] = Math.random() - 0.5;
            this.tree[i] = new MyTree(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text);
        }
    }

    display() {
        //mantem um linha em x e varia ligeiramente em z
        for(var i = 0; i < this.row_num; i++) {
            this.scene.pushMatrix();
            this.scene.translate(i, 0, this.rand_val[i]);
            this.tree[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        for(var i = 0; i < this.row_num; i++) {
            this.tree[i].enableNormalViz();
        }
    }

    disableNormalViz() {
        for(var i = 0; i < this.row_num; i++) {
            this.tree[i].disableNormalViz();
        }
    }
}