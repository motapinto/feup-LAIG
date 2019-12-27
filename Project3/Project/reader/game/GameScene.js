/**
 * MyScoreBMyPlayerStashoard class, representing the pieces collected by the player
 */
class GameScene {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {integer} player 
     */
    constructor(scene, type) {
        this.scene = scene;
        this.type = type;
        this.createObjs();
    }

    createObjs() {

    }

    display() {
        this.scene.pushMatrix();
            this.obj.display();
        this.scene.popMatrix();
    }

}