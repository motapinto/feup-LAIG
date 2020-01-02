/**
* MyCamera
* @constructor
* @param {XMLscene} scene
* @param {CGFtextureRTT} texture
*/
class MyCamera {
    constructor(scene, environment=null, number=null){
        this.scene = scene;
        this.number = number;
        this.environment = environment;

        this.texture = new CGFtextureRTT(scene, scene.gl.canvas.width, scene.gl.canvas.height);

        if(environment == 'questioning') {
            this.rectangle = new MyRectangle(scene, 0, 0, 1, 1, 10, 10);
        }
    }
  
    attachToFrameBuffer(){
        this.texture.attachToFrameBuffer();
    }

    detachFromFrameBuffer(){
        this.texture.detachFromFrameBuffer();
    }

    display() {
        this.scene.pushMatrix();
            if(this.environment == 'questioning') {
                switch(this.number) {
                    // case 1:  
                    //     this.scene.translate(-4, -9.95, 1);
                    //     this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                    //     this.scene.scale(8, 3, 1); 
                    //     this.rectangle.display();
                    //     break;
                    // case 2:
                    //     this.scene.translate(-4, 9.95, 1);
                    //     this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                    //     this.scene.scale(8, 3, 1);
                    //     this.rectangle.display();
                    //     break;
                    // case 3:
                    //     this.scene.rotate(DEGREE_TO_RAD*90, 0, 0, 1);
                    //     this.scene.translate(-4, -9.95, 1);
                    //     this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                    //     this.scene.scale(8, 3, 1);
                    //     this.rectangle.display();
                    //     break;
                    // case 4:
                    //     this.scene.translate(-4, -9.95, 1);
                    //     this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                    //     this.scene.scale(8, 3, 1);
                    //     this.rectangle.display();
                    //     break; 
                    // case 5:
                    // case 6:
                    // case 7:
                    // case 8:
                }
            }
            this.scene.translate();
            this.scene.rotate();
            this.scene.scale(); 
        this.scene.popMatrix();
    }
}