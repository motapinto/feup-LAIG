/**
* MySecurityCamera
* @constructor
* @param {XMLscene} scene
* @param {CGFtextureRTT} texture
*/
class MySecurityCamera {
  constructor(scene){
    this.scene = scene;
    this.lineSpeed = 1;
    this.linesNumber = 40.0;
    this.lineDiff = 1.0;
    this.radiusVar = 2.0;
    this.brightness = 1.2;

    this.texture = new CGFtextureRTT(this.scene, this.scene.gl.canvas.width, this.scene.gl.canvas.height);;
    this.rectangle = new MyRectangle(this.scene, 0.5, 1, -1, -0.5, 1, 1);
    this.cameraShader = new CGFshader(this.scene.gl, "shaders/securityCamera.vert", "shaders/securityCamera.frag");

    this.cameraShader.setUniformsValues({ linesNumber: this.linesNumber });
    this.cameraShader.setUniformsValues({ lineDiff: this.lineDiff });
    this.cameraShader.setUniformsValues({ radiusVar: this.radiusVar });
    this.cameraShader.setUniformsValues({ brightness: this.brightness });

    this.rectangle.updateTexCoords(0.5, -0.5);    
  }
  
  updateShader() {
    this.cameraShader.setUniformsValues({ linesNumber: this.linesNumber });
    this.cameraShader.setUniformsValues({ lineDiff: this.lineDiff });
    this.cameraShader.setUniformsValues({ radiusVar: this.radiusVar });
    this.cameraShader.setUniformsValues({ brightness: this.brightness });
  }

  attachToFrameBuffer(){
    this.texture.attachToFrameBuffer();
  }

  detachFromFrameBuffer(){
    this.texture.detachFromFrameBuffer();
  }

  update(t){
    this.cameraShader.setUniformsValues({ timeFactor: (t / 100 % 1000) * this.lineSpeed });
  }

  display(){
    this.scene.setActiveShader(this.cameraShader);
    
    this.texture.bind();
    this.rectangle.display();

    // restore default shader
		this.scene.setActiveShader(this.scene.defaultShader);
  }

}