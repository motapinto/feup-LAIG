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

        if(environment == 'questioning') {
            if(number <= 2) {
                this.rectangle = scene.graph.components['mirror' + number];
            }
            else  if(number <=4)
                this.rectangle = scene.graph.components['gameview' + (number-2)];
            else 
                this.rectangle = scene.graph.components['camera' + (number-4)];
        }

        this.texture = new CGFtextureRTT(scene, scene.gl.canvas.width, scene.gl.canvas.height);
        
        this.textureMaterial = new CGFappearance(this.scene);
        this.textureMaterial.setShininess(1);
        this.textureMaterial.setAmbient(1, 1, 1, 1);
        this.textureMaterial.setDiffuse(1, 1, 1, 1);
        this.textureMaterial.setSpecular(1, 1, 1, 1);
        this.textureMaterial.setEmission(1, 1, 1, 1);
        this.textureMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
  
    attachToFrameBuffer(){
        this.texture.attachToFrameBuffer();
    }

    detachFromFrameBuffer(){
        this.texture.detachFromFrameBuffer();
    }

    display(){
        this.scene.pushMatrix();
            this.textureMaterial.apply();
            this.scene.graph.textures['white'] = this.texture;
            if(this.environment == 'questioning') {
                if(this.number <= 2) {
                    this.scene.graph.displayComponent('mirror' + this.number);
                }
                else  if(this.number <=4) {
                    this.scene.graph.displayComponent('gameview' + (this.number-2));
                }
                else {
                    this.scene.graph.displayComponent('camera' + (this.number-4));
                }
            }
        this.scene.popMatrix();
    }
}