/**
* MyTreeGroupPatch
* @constructor
* @param scene - Reference to MyScene object
* @param trunk_height - trunk height of tree
* @param trunk_radius - trunk radius of tree
* @param tree_height - tree(copa) height
* @param tree_radius - tree(copa) radius
* @param trunk_text - trunk texture image
* @param tree_text - tree(copa) texture image
*/

class MyTreeGroupPatch extends CGFobject {
    constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text) { 
        super(scene);
        this.scene = scene;

        this.tree = [];
        this.rand_height ;
        this.rand_radius ;
        this.rand_x ;
        this.rand_z ;

        this.trunk_height = trunk_height;
        this.tree_height = tree_height;

        this.trunk_radius = trunk_radius;
        this.tree_radius = tree_radius;

        this.trunk_text = trunk_text;
        this.tree_text = tree_text;

        this.line_num = 3; 
        this.columns = 3;

        for(var i=0; i<this.line_num; i++) {
            for(var j=0; j<this.columns; j++) {
                this.rand_height = Math.random()-0.5; // -0.5 <-> 0.5
                this.rand_radius = (Math.random()-0.5)/4; // -0.5 <-> 0.5
                this.rand_x = Math.random()/2-0.25; // -0.5 <-> 0.5
                this.rand_z = Math.random()/2-0.25; // -0.5 <-> 0.5
                
                this.tree[3*i+j] = new MyTree(scene, trunk_height+this.rand_height, trunk_radius+this.rand_radius, tree_height+this.rand_height, tree_radius+this.rand_radius, trunk_text, tree_text);//constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_img, tree_img) 
            }
        }
    }

    display() {
        //3*3
        for(var i=0; i<this.line_num; i++) {
            for(var j=0; j<this.columns; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j, 0, i);
                this.tree[3*i+j].display();
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        for(var i=0; i<this.line_num; i++) {
            for(var j=0; j<this.columns; j++) {
                this.tree[3*i+j].enableNormalViz();
            }
        }
    }

    disableNormalViz() {
        for(var i=0; i<this.line_num; i++) {
            for(var j=0; j<this.columns; j++) {
                this.tree[3*i+j].disableNormalViz();
            }
        }
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); 
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}