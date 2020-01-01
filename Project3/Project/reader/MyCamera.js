/**
* MyCamera
* @constructor
* @param {XMLscene} scene
* @param {CGFtextureRTT} texture
*/
class MyCamera {
    constructor(scene, environment=null, number=null){
        this.scene = scene;

        if(environment == 'questioning') {
            if(number <= 2)
                this.rectangle = scene.graph.components['mirror' + number];
            else  if(number <=4)
                this.rectangle = scene.graph.components['gameview' + number];
            else 
                this.rectangle = scene.graph.components['camera' + number-4];
        }
    
        this.texture = new CGFtextureRTT(scene, scene.gl.canvas.width, scene.gl.canvas.height);
        //this.rectangle = new MyRectangle(this.scene, -2, 6, 0, 3)
        
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
            this.texture.bind();
            this.rectangle.display();
        this.scene.popMatrix();
    }
}