/**
* MySphere
* @constructor
* @param scene - Reference to MyScene object
*/

class MySphere extends CGFobject { //"Unit House" with height equal to 1
    constructor(scene, slices, radius, stacks) {
        super(scene);
        this.scene = scene;
        this.semi_sphere = new MySemiSphere(scene, slices, radius, stacks);
    }

    display() {
        //display sphere
        for(let j = 0 ; j < 2 ; j++) {
			this.scene.pushMatrix();
            if(j == 0)
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
            else 
            	this.scene.rotate(Math.PI/2, 1, 0, 0);
			
				this.semi_sphere.display();
			this.scene.popMatrix();
        }
    }
}