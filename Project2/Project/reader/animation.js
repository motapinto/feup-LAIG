/**
 * Animation class, representing the base class for Keyframe Animations.
 */
class Animation {
    /**
   * @constructor
   * @param {scene} scene
   * @param {integer} updatePeriod
   */
  constructor (scene, updatePeriod) {
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

    this.updatePeriod = updatePeriod;

    this.matrix = mat4.create();
  }
}