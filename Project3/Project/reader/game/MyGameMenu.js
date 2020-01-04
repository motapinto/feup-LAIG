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
        this.obj = new MyCylinderTops(this.scene, 0.5, 0.5, 0.05, 4, 1);
        this.arrowRect = new MyRectangle(this.scene, 0, 0.1, 0, 0.1);
        this.arrowCyl = new MyCylinder(this.scene, 0.071, 0.071, 0.05, 4, 1);
        this.extraRect = new MyRectangle(this.scene, 0, 1, 0, 0.5);

        this.mat = new CGFappearance(this.scene);
        this.mat.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.mat.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.mat.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.mat.setShininess(10.0);

        this.mat2 = new CGFappearance(this.scene);
        this.mat2.setDiffuse(0.2, 0.2, 0.2, 1.0);
        this.mat2.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.mat2.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.mat2.setShininess(10.0);

        this.arrow = new CGFappearance(this.scene);
        this.arrow.setAmbient(1, 1, 1, 1);
        this.arrow.setDiffuse(1, 1, 1, 1);
        this.arrow.setSpecular(1, 1, 1, 1);
        this.arrow.setShininess(10.0);
        this.arrow.loadTexture("scenes/icons/arrow.png");

        this.instruct = new CGFappearance(this.scene);
        this.instruct.setAmbient(1, 1, 1, 1);
        this.instruct.setDiffuse(1, 1, 1, 1);
        this.instruct.setSpecular(1, 1, 1, 1);
        this.instruct.setShininess(10.0);
        this.instruct.loadTexture("scenes/icons/instruct.jpg");

        this.movie = new CGFappearance(this.scene);
        this.movie.loadTexture("scenes/icons/movie.png");

        this.exit = new CGFappearance(this.scene);
        this.exit.loadTexture("scenes/icons/exit.png");

        this.undo = new CGFappearance(this.scene);
        this.undo.loadTexture("scenes/icons/undo.png");
    }

    display() {
        this.scene.pushMatrix();
            this.scene.registerForPick(10003, 'menu');
            this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
            this.scene.translate(1.8, -0.6, 1.1);
            this.scene.scale(0.4, 0.4, 0.4);
            this.scene.pushMatrix();
                this.scene.scale(3, 1, 1);
                this.scene.rotate(DEGREE_TO_RAD*45, 0, 0, 1);
                this.mat.apply();
                this.obj.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.registerForPick(10008, 'right');
                this.scene.translate(0.8, 0.05, 0.1);
                this.scene.rotate(-DEGREE_TO_RAD*90, 0, 0, 1);
                this.arrow.apply();
                this.arrowRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.registerForPick(10009, 'left');
                this.scene.translate(0.6, -0.05, 0.1);
                this.scene.rotate(DEGREE_TO_RAD*90, 0, 0, 1);
                this.arrow.apply();
                this.arrowRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.registerForPick(10010, 'down');
                this.scene.translate(0.75, -0.15, 0.1);
                this.scene.rotate(DEGREE_TO_RAD*180, 0, 0, 1);
                this.arrow.apply();
                this.arrowRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.registerForPick(10011, 'up');
                this.scene.translate(0.65, 0.15, 0.15);
                this.arrow.apply();
                this.arrowRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.registerForPick(10011, 'up');
                this.scene.translate(0.7, 0.2, 0.1);
                this.scene.rotate(DEGREE_TO_RAD*45, 0, 0, 1);
                this.mat2.apply();
                this.arrowCyl.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            //instructions
            this.scene.pushMatrix();
                this.scene.registerForPick(10003, 'menu');
                this.scene.translate(-0.9, -0.25, 0.1);
                this.instruct.apply();
                this.extraRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            //movie
            this.scene.pushMatrix();
                this.scene.registerForPick(1000, 'movie');
                this.scene.translate(0.2, -0.25, 0.1);
                this.scene.scale(0.1, 0.2, 0.1);
                this.movie.apply();
                this.extraRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            //undo
            this.scene.pushMatrix();
                this.scene.registerForPick(10001, 'undo');
                this.scene.translate(0.2, -0.05, 0.1);
                this.scene.scale(0.1, 0.2, 0.3);
                this.undo.apply();
                this.extraRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();

            //exit
            this.scene.pushMatrix();
                this.scene.registerForPick(10002, 'exit');
                this.scene.translate(0.2, 0.15, 0.1);
                this.scene.scale(0.1, 0.2, 0.3);
                this.exit.apply();
                this.extraRect.display();
                this.scene.clearPickRegistration();
            this.scene.popMatrix();
            this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }
}