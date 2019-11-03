/**
* KeyframeAnimation
* @constructor
* @param {scene} scene
* @param {integer} updatePeriod
*/
class KeyframeAnimation extends Animation {
    constructor (scene, updatePeriod){
      super(scene, updatePeriod);
      this.keyframes = [];
      this.matrix = mat4.create();
    }
    
    addKeyframe(instant, translate, rotate, scale){
      // New keyframe instant must higher than the previously added instant
      if(this.keyframes.length != 0 && this.keyframes[this.keyframes.length - 1].instant > instant)
        return false;

      this.keyframes.push(new Keyframe(instant, translate, rotate, scale));
      return true;
    }

    update(instant){
      this.matrix = mat4.create();
      var translate = [0, 0, 0];
      var rotate = [0, 0, 0];
      var scale = [1, 1, 1];

      for(let i in this.keyframes){
        //Work before this.keyframes[i].instant >= instant
        if(this.keyframes[i].instant < instant){
            //Tranlation - Addictive operation 
            translate[0] = this.keyframes[i].translate[0];
            translate[1] = this.keyframes[i].translate[1];
            translate[2] = this.keyframes[i].translate[2];
            //Rotation - Addictive operation 
            rotate[0] = this.keyframes[i].rotate[0];
            rotate[1] = this.keyframes[i].rotate[1];
            rotate[2] = this.keyframes[i].rotate[2];
            //Scale - Multiplicative operation 
            scale[0] = this.keyframes[i].scale[0];
            scale[1] = this.keyframes[i].scale[1];
            scale[2] = this.keyframes[i].scale[2];
        }
        else{
          var deltaInstant = this.keyframes[i].instant;
          //First iteration instant is always 0
          if(i != 0){
              deltaInstant -= this.keyframes[i-1].instant;
              instant -= this.keyframes[i-1].instant;
          }

          //Number of divisions for the keyframe
          var framesPerKeyframe = deltaInstant*1000 / this.scene.updatePeriod;
          //Number of curent frame in keyframe
          var nFrame = (framesPerKeyframe * instant) / this.keyframes[i].instant;

          //R = root^n(S0/Sn)
          var scaleR = [
            Math.pow(scale[0] / this.keyframes[i].scale[0], 1 / framesPerKeyframe),
            Math.pow(scale[1] / this.keyframes[i].scale[1], 1 / framesPerKeyframe),
            Math.pow(scale[2] / this.keyframes[i].scale[2], 1 / framesPerKeyframe)
          ];
          //All rotation done in the keyframe
          var totalRotation = [
            this.keyframes[i].rotate[0] - rotate[0],
            this.keyframes[i].rotate[1] - rotate[1],
            this.keyframes[i].rotate[2] - rotate[2]
          ];
          //All translation done in keyframe
          var totalTranslation = [
            this.keyframes[i].translate[0] - translate[0],
            this.keyframes[i].translate[1] - translate[1],
            this.keyframes[i].translate[2] - translate[2]
          ];

          // Percentage of time during keyframe
          var keyframePercentage = instant / deltaInstant;

          //Translation - Addictive operation 
          translate[0] += totalTranslation[0]*keyframePercentage;
          translate[1] += totalTranslation[1]*keyframePercentage;
          translate[2] += totalTranslation[2]*keyframePercentage;
          //Rotation - Addictive operation 
          rotate[0] += totalRotation[0]*keyframePercentage;
          rotate[1] += totalRotation[1]*keyframePercentage;
          rotate[2] += totalRotation[2]*keyframePercentage;
          //Scale - Multiplicative operation 
          scale[0] *= Math.pow(scaleR[0], nFrame);
          scale[1] *= Math.pow(scaleR[1], nFrame);
          scale[2] *= Math.pow(scaleR[2], nFrame);
          break;
        }
      }

      //mat4.translate(dest, op1, op2)
      mat4.translate(this.matrix, this.matrix, translate);
      //mat4.rotate(dest, op1, angle, axis)
      mat4.rotate(this.matrix, this.matrix, rotate[0] * Math.PI / 180, [1, 0, 0]);
      mat4.rotate(this.matrix, this.matrix, rotate[1] * Math.PI / 180, [0, 1, 0]);
      mat4.rotate(this.matrix, this.matrix, rotate[2] * Math.PI / 180, [0, 0, 1]);
      //mat4.scale(dest, op1, op2)
      mat4.scale(this.matrix, this.matrix, scale);    
    }

    apply(){
        this.scene.multMatrix(this.matrix);
    }
}

/**
* Keyframe
* @constructor
* @param {integer} instant
* @param {vec3} translate
* @param {vec3} rotate
* @param {vec3} scale
*/
class Keyframe {
  constructor(instant, translate, rotate, scale){
    this.instant = instant;
    this.translate = translate;
    this.rotate = rotate;
    this.scale = scale;
  }
}