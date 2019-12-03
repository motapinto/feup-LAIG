/**
* MyBirdWings
* @constructor
* @param scene - Reference to MyScene object
*/

class MyBirdWings extends CGFobject { 
    constructor(scene) {
        super(scene);

        //Attributes
        this.scene = scene;
        //W = delta_ang/delta_tim
        this.ang_velocity = Math.PI/2;
        this.circular_radius = 0;
        this.rot_wings = 0;
        this.change_ang = -1;
        
        //Objects
        this.wing_left = new MyWings(scene);
        this.wing_right = new MyWings(scene);
    }

    //Wings method that rotates wings
    update() {
        //W = V / R
        let angular_init = this.ang_velocity;

        this.ang_velocity += (this.scene.speedFactor+2*this.scene.bird.speed)/2;
        this.rot_wings = (this.rot_wings + (2*this.ang_velocity * this.change_ang * (this.scene.delta_time/1000))) % Math.PI;  
        
        //delta ang = W * delta_time
        if(this.rot_wings < -Math.PI/4){
            this.change_ang = 1;
        }

        
        if(this.rot_wings > Math.PI/4) {
            this.change_ang = -1;
        }
        
        this.ang_velocity = angular_init;

    }

    display() {            
        this.scene.pushMatrix();
            this.scene.translate(0.85, 1.25, 0.8);
            this.scene.rotate(Math.PI/8, 0, 0, 1);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.rotate(this.rot_wings, 0, 0, 1);
            this.wing_left.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.scene.translate(0, 1, 0.15);
            this.scene.rotate(Math.PI/8, 0, 0, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.rotate(this.rot_wings, 0, 0, 1);
            this.wing_right.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.wing_left.enableNormalViz();
        this.wing_right.enableNormalViz();
    }

    disableNormalViz() {
        this.wing_left.disableNormalViz();
        this.wing_right.disableNormalViz();
    }
}