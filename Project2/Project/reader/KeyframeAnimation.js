
class KeyframeAnimation extends Animation {
    /**
   * @constructor
   * @param {scene} scene
   * @param {integer} deltaTime
   * @param {vec3} translateInit
   * @param {vec3} translateInit
   * @param {vec3} rotateInit
   * @param {vec3} rotateFinal
   * @param {vec3} scaleInit
   * @param {vec3} scaleFinal
   * @param {integer} updatePeriod
   */
  constructor (scene, deltaTime, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod) {
    super(scene, deltaTime, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod);
  }

  update(instant){
    //maximum instant is equal to deltaTime
    if(instant > this.deltaTime)
      instant = this.deltaTime;

    //Number of curent frame in keyframe
    var nFrame = (this.framesPerKeyFrame * instant) / this.deltaTime;

    //create new matrix
    this.matrix = mat4.create();

    //translate
    mat4.translate(this.matrix, this.matrix, vec3.fromValues(instant*this.linearVelocity[0], instant*this.linearVelocity[1], instant*this.linearVelocity[2]));
  
    //rotate on X
    mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[0] * instant) * Math.PI / 180, 1, 0, 0);
    //rotate on Y
    mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[1] * instant) * Math.PI / 180, 0, 1, 0);
    //rotate on Z
    mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[2] * instant) * Math.PI / 180, 0, 0, 1);

    //scale
    mat4.scale(this.matrix, this.matrix, vec3.fromValues(Math.pow(this.scaleR[0], nFrame), Math.pow(this.scaleR[1], nFrame), Math.pow(this.scaleR[2], nFrame)));
  }

  apply(){
    this.scene.multMatrix(this.matrix);
  }
}