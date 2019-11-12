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
    this.rectangle = new MyRectangle(this.scene, 0.5, 1, -1, -0.5, 1, 1);
    this.cameraShader = new CGFshader(this.scene.gl, "shaders/securityCamera.vert", "shaders/securityCamera.frag");
    this.cameraShader.setUniformsValues({ uGrayScale: 20.0 });
    this.cameraShader.setUniformsValues({ vGrayScale: 20.0 });
    this.rectangle.updateTexCoords(-0.5, 0.5);
  }

  display(){
    this.scene.setActiveShader(this.cameraShader);
    
    this.texture.bind();
    this.rectangle.display();

    // restore default shader
		this.scene.setActiveShader(this.scene.defaultShader);
  }

  attachToFrameBuffer(){
    this.texture.attachToFrameBuffer();
  }
  detachFromFrameBuffer(){
    this.texture.detachFromFrameBuffer();
  }
}