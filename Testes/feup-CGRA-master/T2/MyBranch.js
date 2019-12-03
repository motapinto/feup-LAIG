/**
* MyBranch
* @constructor
* @param scene - Reference to MyScene object
* @param slices - slices of cone
* @param height - cone height
* @param radius - radius of cone base
*/

class MyBranch extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.radius = radius;
        this.height = height;

        //Position parameters
        this.init_x = Math.floor((Math.random() * 10) - 5);
        this.init_y = radius;
        this.init_z = 10 + Math.floor((Math.random() * 10) - 5);

        this.cilinder = new MyCylinder(scene, slices, height, radius);
        
        var brown = this.scene.hexToRgbA('#be935a');
        this.material = new CGFappearance(scene);
        this.material.setAmbient(brown[0],brown[1],brown[2], 1.0);
        this.material.setDiffuse(brown[0],brown[1],brown[2], 1.0);
        this.material.setSpecular(brown[0], brown[1], brown[2], 1.0);
        this.material.setShininess(10.0);

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
        if(this.scene.bird.y == 0 && this.scene.nest.canDropInNest() == false) { 
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
            if(this.scene.bird.y == nest_height && this.scene.tree_branch[i] == this.scene.bird.branch) {
                this.scene.bird.branch.x = this.scene.nest.x;
                this.scene.bird.branch.y = nest_height;
                this.scene.bird.branch.z = this.scene.nest.z;
                this.scene.tree_branch[i] = this.scene.bird.branch
                this.scene.bird.branch = undefined;
                this.scene.bird.to_drop = false;
            }
        }
    }

    display() {
        this.scene.pushMatrix();
            this.material.apply();
            this.cilinder.display();
        this.scene.popMatrix();
    }
}


