/**
* MySecurityCamera
* @constructor
* @param {XMLscene} scene
* @param {CGFtextureRTT} texture
*/
class MySecurityCamera {
    constructor(scene){
        this.scene = scene;
    
        this.texture = new CGFtextureRTT(this.scene, this.scene.gl.canvas.width, this.scene.gl.canvas.height);;
        this.rectangle = new MyRectangle(this.scene, -2, 6, 0, 3)
        
        this.textureMaterial = new CGFappearance(this.scene);
        this.textureMaterial.setShininess(1);
        this.textureMaterial.setAmbient(1, 1, 1, 1);
        this.textureMaterial.setDiffuse(1, 1, 1, 1);
        this.textureMaterial.setSpecular(1, 1, 1, 1);
        this.textureMaterial.setEmission(1, 1, 1, 1);
        this.textureMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.rectangle.updateTexCoords(8, -3);
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