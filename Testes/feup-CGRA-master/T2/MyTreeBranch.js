/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

class MyTreeBranch extends CGFobject {
    constructor(scene, slices, height, radius, img, bool) {//the bool value will define whether the branch can be picked up or not
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.img = img;
        this.bool = bool;
        this.branch = new MyCylinder(this.scene, this.slices, this.height, this.radius);

        //Position parameters
        this.init_x = Math.floor((Math.random() * 10) - 5);
        this.init_y = radius;
        this.init_z = 10 + Math.floor((Math.random() * 10) - 5);

        this.text = new CGFappearance(this.scene);
        this.text.setAmbient(1,1,1, 1.0);
        this.text.setDiffuse(1,1,1, 1.0);
        this.text.setSpecular(1,1,1, 1.0);
        this.text.setShininess(10.0);
        this.text.loadTexture('images/' + this.img);
        this.text.setTextureWrap('REPEAT', 'REPEAT');

        this.init();
        this.initBuffers();
    }

    init() {
        this.x = this.init_x;
        this.y = this.init_y;
        this.z = this.init_z;
    }

    pick(id) {
    //Checks if it can pickup a branch that is referenced in Myscene
        let z_init = this.scene.tree_branch[id].z - 3;
        let z_final = this.scene.tree_branch[id].z + 3;
        let x_init = this.scene.tree_branch[id].x - 3;
        let x_final = this.scene.tree_branch[id].x + 3;
        if(this.scene.bird.y == 0 && this.scene.nest.canDropInNest() == false && this.bool == false) { 
            if(!this.scene.bird.descending && this.scene.bird.ascending) {
                if(this.scene.bird.x >= x_init && this.scene.bird.x <= x_final && this.scene.bird.z >= z_init && this.scene.bird.z <= z_final) {
                    return true;
                }
            }
        }
    }

    drop() {
        let nest_height = this.scene.nest.y - this.scene.nest.radius;
        //Checks if it can drop a tree branch
        for (var i = 0; i < 6; i++) {
            if(this.scene.bird.y == nest_height && this.scene.tree_branch[i] == this.scene.bird.branch && this.bool == false) {
                this.scene.bird.branch.x = this.scene.nest.x;
                this.scene.bird.branch.y = nest_height + 2;
                this.scene.bird.branch.z = this.scene.nest.z;
                this.scene.tree_branch[i] = this.scene.bird.branch
                this.scene.bird.branch = undefined;
                this.scene.bird.to_drop = false;
            }
        }
    }

    display() {
        this.scene.pushMatrix();
        this.text.apply();
        this.branch.display();
        this.scene.popMatrix();
    }
}