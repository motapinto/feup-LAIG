
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
    constructor (scene, timeInit, timeFinal, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod) {
        super(scene, timeInit, timeFinal, translateInit, translateFinal, rotateInit, rotateFinal, scaleInit, scaleFinal, updatePeriod);
    }
    
    update(instant){
        //create new matrix
        this.matrix = mat4.create();

        //maximum instant is equal to deltaTime
        if(instant > this.timeFinal)
            instant = this.timeFinal - this.timeInit;
        else if(instant < this.timeInit)
            return;
        else  
            instant -= this.timeInit;

        //Number of curent frame in keyframe
        var nFrame = (this.framesPerKeyFrame * instant) / (this.timeFinal - this.timeInit);


        //translate
        mat4.translate(this.matrix, this.matrix, [instant*this.linearVelocity[0], instant*this.linearVelocity[1], instant*this.linearVelocity[2]]);
    
        //rotate on X
        mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[0] * instant) * Math.PI / 180, vec3.fromValues(1, 0, 0));
        //rotate on Y
        mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[1] * instant) * Math.PI / 180, vec3.fromValues(0, 1, 0));
        //rotate on Z
        mat4.rotate(this.matrix, this.matrix, (this.angularVelocity[2] * instant) * Math.PI / 180, vec3.fromValues(0, 0, 1));

        //scale
        mat4.scale(this.matrix, this.matrix, [Math.pow(this.scaleR[0], nFrame), Math.pow(this.scaleR[1], nFrame), Math.pow(this.scaleR[2], nFrame)]);
    }

    apply(){
        this.scene.multMatrix(this.matrix);
    }
}