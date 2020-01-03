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
            this.rectangle = new MyRectangle(scene, 0, 1, 0, 1, 10, 10);
        }

        this.textureMaterial = new CGFappearance(this.scene);
        this.textureMaterial.setShininess(1);
        this.textureMaterial.setAmbient(1 , 1 , 1 , 1 );
        this.textureMaterial.setDiffuse(1 , 1 , 1 , 1 );
        this.textureMaterial.setSpecular(1 , 1 , 1 , 1 );
        this.textureMaterial.setEmission(1, 1, 1, 1);
        this.textureMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
  
    attachToFrameBuffer(){
        this.texture.attachToFrameBuffer();
    }

    detachFromFrameBuffer(){
        this.texture.detachFromFrameBuffer();
    }

    display() {
        this.scene.pushMatrix();
        this.textureMaterial.apply();
        this.texture.bind();
        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
            if(this.environment == 'questioning') {
                switch(this.number) {
                    case 1:  
                        this.scene.translate(-4, 9.95, 4);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(8, 3, 1);
                        this.rectangle.display();
                        break;
                        
                    case 2:
                        this.scene.translate(-4, -9.95, 4);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(8, 3, 1);
                        this.rectangle.display();
                        break;           
                    case 5:
                        this.scene.translate(-8.1, -8.6, 3.85);
                        this.scene.rotate(DEGREE_TO_RAD*135, 0, 0, 1);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(0.75, 0.75, 0.75);
                        this.rectangle.display();
                        break;
                    case 6:
                        this.scene.translate(-9, 8.5, 3.85);
                        this.scene.rotate(DEGREE_TO_RAD*45, 0, 0, 1);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(0.75, 0.75, 0.75);
                        this.rectangle.display();
                        break;
                    case 7:
                        this.scene.translate(8.1, 8.6, 3.85);
                        this.scene.translate(0, 0, 0);
                        this.scene.rotate(-DEGREE_TO_RAD*45, 0, 0, 1);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(0.75, 0.75, 0.75);
                        this.rectangle.display();
                        break;
                    case 8:
                        this.scene.translate(9, -8.5, 3.85);
                        this.scene.translate(0, 0, 0);
                        this.scene.rotate(-DEGREE_TO_RAD*135, 0, 0, 1);
                        this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
                        this.scene.scale(0.75, 0.75, 0.75);
                        this.rectangle.display();
                        break;
                }
            }
        this.scene.popMatrix();
    }
}