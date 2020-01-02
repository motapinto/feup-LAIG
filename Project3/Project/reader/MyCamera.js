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
            this.scene.graph.textures['white'] = this.texture;
            // if(number <= 2) {
            //     this.rectangle = scene.graph.components['mirror' + number];
            // }
            // else if(number <=4)
            //     this.rectangle = scene.graph.components['gameview' + (number-2)];
            // else 
            //     this.rectangle = scene.graph.components['camera' + (number-4)];
        }
    }
  
    attachToFrameBuffer(){
        this.texture.attachToFrameBuffer();
    }

    detachFromFrameBuffer(){
        this.texture.detachFromFrameBuffer();
    }
}