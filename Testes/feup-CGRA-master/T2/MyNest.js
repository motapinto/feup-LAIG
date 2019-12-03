/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */


class MyNest extends CGFobject { 
    constructor(scene) {
        super(scene);
        this.normals = [];

        this.radius = 1.6;
        this.scene = scene;
        this.nest = new MySemiSphere(scene, 10, this.radius, 100);
        this.tree = new MyTree(scene, 7, 1.5, 7, 3, 'trunk.jpg', 'leaf.jpg');
        this.stick = new MyBranch(scene, 10, 8, 0.5);
        this.branch = undefined;

        //door texture
        var yellow = this.scene.hexToRgbA('#FFFF00');
        this.nest_material = new CGFappearance(this.scene);
        this.nest_material.setAmbient(yellow[0], yellow[1], yellow[2], 1.0);
        this.nest_material.setDiffuse(yellow[0], yellow[1], yellow[2], 1.0);
        this.nest_material.setSpecular(yellow[0], yellow[1], yellow[2], 1.0);
		this.nest_material.setShininess(10.0);

        //eletric ball texture
        var yellow = this.scene.hexToRgbA('#FFFF00');
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(yellow[0], yellow[1], yellow[2], 1.0);
        this.material.setDiffuse(yellow[0], yellow[1], yellow[2], 1.0);
        this.material.setSpecular(yellow[0], yellow[1], yellow[2], 1.0);
        this.material.setShininess(10.0);
        
        this.x = 3;
        this.y = 7;
        this.z = 10;
    }

    canDropInNest() {
        let x_init = this.x - this.radius;
        let x_final = this.x + this.radius;

        let z_init = this.z - this.radius;
        let z_final = this.z + this.radius;

        if(this.scene.bird.x >= x_init && this.scene.bird.x <= x_final && 
            this.scene.bird.z >= z_init && this.scene.bird.z <= z_final) {
                return true;
            }
            
        return false;
    }

    display() {
            this.scene.pushMatrix();
                this.scene.translate(2, 3, 10);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.stick.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(3, 6.694, 10);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.scale(1, 1, 2);
                this.nest_material.apply();
                this.nest.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(10, 0, 10);
                this.tree.display();
            this.scene.popMatrix();

    
    }

    enableNormalViz() {

    }

    disableNormalViz() {

    }
}