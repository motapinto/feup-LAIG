/**
 * Animation class, representing the base class for Keyframe Animations.
 */
class Animation {
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
  constructor (scene, timeInit, timeFinal, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod) {
    if (this.constructor === Animation) {
      throw new TypeError('Abstract class "Animation" cannot be instantiated directly.'); 
    }

    if (this.update === undefined) {
      throw new TypeError('Classes extending the Animation abstract class');
    }
  
    if (this.apply === undefined) {
      throw new TypeError('Classes extending the Animation abstract class');
    }

    this.scene = scene;

    this.timeInit = timeInit;
    this.timeFinal = timeFinal;

    var deltaTime = timeFinal - timeInit;

    this.framesPerKeyFrame = deltaTime*1000 / updatePeriod;

    this.linearVelocity = [
      (translateFinal[0] - translateInit[0]) / deltaTime,
      (translateFinal[1] - translateInit[1]) / deltaTime,
      (translateFinal[2] - translateInit[2]) / deltaTime
    ];

    this.angularVelocity = [
      (rotateFinal[0] - rotateInit[0]) / deltaTime,
      (rotateFinal[1] - rotateInit[1]) / deltaTime,
      (rotateFinal[2] - rotateInit[2]) / deltaTime
    ];

    this.scaleR = [
      Math.pow(scaleInit[0] / scaleFinal[0], 1 / this.framesPerKeyFrame),
      Math.pow(scaleInit[1] / scaleFinal[1], 1 / this.framesPerKeyFrame),
      Math.pow(scaleInit[2] / scaleFinal[2], 1 / this.framesPerKeyFrame)
    ];

    this.matrix = mat4.create();
  }
}