/**
* MySecurityCamera
* @constructor
* @param {XMLscene} scene
* @param {CGFtextureRTT} texture
*/
class MySecurityCamera {
  constructor(scene, texture){
    this.scene = scene;
    this.texture = texture;
    this.rectangle = new MyRectangle(this.scene, 0.5, 1, -1, -0.5, 1, 1);
    this.cameraShader = new CGFshader(this.scene.gl, "shaders/securityCamera.vert", "shaders/securityCamera.frag");
    this.cameraShader.setUniformsValues({ uSampler2: 1 });
    this.cameraShader.setUniformsValues({ uGrayScale: 20.0 });
    this.cameraShader.setUniformsValues({ vGrayScale: 20.0 });
  }

  display(){
    this.scene.setActiveShader(this.cameraShader);
    
    this.texture.bind(1);
    this.rectangle.display();

    // restore default shader
		this.scene.setActiveShader(this.scene.defaultShader);
  }
}