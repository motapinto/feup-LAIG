
class Animation {
  constructor (scene, deltaTime, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod) {
    this.deltaTime = deltaTime;
    this.framesPerKeyFrame = deltaTime*1000 / updatePeriod;
    this.linearVelocity = [
      (translateFinal[0] - translateInit[0]) / deltaInstant,
      (translateFinal[1] - translateInit[1]) / deltaInstant,
      (translateFinal[2] - translateInit[2]) / deltaInstant
    ];

    this.angularVelocity = [
      (rotateFinal[0] - rotateInit[0]) / deltaInstant,
      (rotateFinal[1] - rotateInit[1]) / deltaInstant,
      (rotateFinal[2] - rotateInit[2]) / deltaInstant
    ];

    this.scaleR = [
      Math.pow(scaleInit[0] / scaleFinal[0], 1 / this.framesPerKeyFrame),
      Math.pow(scaleInit[1] / scaleFinal[1], 1 / this.framesPerKeyFrame),
      Math.pow(scaleInit[2] / scaleFinal[2], 1 / this.framesPerKeyFrame)
    ];

    this.matrix = mat4.create();
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