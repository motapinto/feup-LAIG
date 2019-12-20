/**
 * MyGameMenu class, representing the game menu
 */
class MyGameMenu {
    /**
     * @constructor
     * @param {Scene} scene
     */
    constructor(scene) {
        this.scene = scene;
        this.obj = null;
    }

    display() {
        this.scene.pushMatrix();

        this.obj = new MyCylinder(this.scene, 0.5, 0.5, 0.5, 4, 1);

        this.scene.popMatrix();
    }

}