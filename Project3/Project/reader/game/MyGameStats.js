/**
 * MyScoreBoard class, representing the game time and scores of both player
 */
class MyGameStats {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {integer} score1 
     * @param {integer} score2 
     */
    constructor(scene, score1, score2) {
        this.scene = scene;
        this.score1 = score1;
        this.score2 = score2;
        this.tInit = null;
        this.stopped = true;
        this.lastT = 0;
        this.time = 0;

        this.init();
    }

    init() {
        this.minutesOnes = new MyRectangle(this.scene, 0, 1, 0, 1);
        this.secondsTens = new MyRectangle(this.scene, 2, 3, 0, 1);
        this.secondsOnes = new MyRectangle(this.scene, 3, 4, 0, 1);
        this.divider = new MyRectangle(this.scene, 1, 2, 0, 1);
        this.player1Score = new MyRectangle(this.scene, -2, -0.5, -0.5, 1.5);
        this.player2Score = new MyRectangle(this.scene, 4.5, 6, -0.5, 1.5);

        this.texture = new CGFtextureRTT(this.scene, this.scene.gl.canvas.width, this.scene.gl.canvas.height);

        this.scoreBoard = new MyCylinder(this.scene, 0.2, 0.2, 1, 3, 1);
        this.scoreBoardMat = new CGFappearance(this.scene);
        this.scoreBoardMat.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.scoreBoardMat.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.scoreBoardMat.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.scoreBoardMat.setShininess(10.0);

        // Stores all numbers textures
        this.digitTextures = [];
        for (let i = 0; i < 10; ++i) {
            let digitTex = new CGFappearance(this.scene);
            digitTex.setAmbient(0.4, 0.4, 0.4, 1);
            digitTex.setDiffuse(0.4, 0.4, 0.4, 1);
            digitTex.setSpecular(0.0, 0.0, 0.0, 1);
            digitTex.setShininess(120);
            digitTex.loadTexture("scenes/numbers/" + i + ".png");
            this.digitTextures.push(digitTex);
        }

        this.dividerTex = new CGFappearance(this.scene);
        this.dividerTex.loadTexture("scenes/numbers/divider.png");

        // Current values for game time
        this.initCounter();
    }

    reset() {
        this.tInit = null;
        this.stopped = false;
        this.time = 0;
        this.currentMinutesOnes = 0;
        this.currentSecondsTens = 0;
        this.currentSecondsOnes = 0;
    }

    stop() {
        this.stopped = true;
    }

    continue() {
        this.stopped = false;
    }

    initCounter() {
        this.currentMinutesOnes = 0; 
        this.currentSecondsTens = 0;
        this.currentSecondsOnes = 0;
    }

    update(t) {
        if (this.tInit == null)
            this.tInit = t;
        
        if (this.stopped)
            this.tInit += t - this.lastT;
        else {
            this.time = t - this.tInit;
        }
        
        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        
        this.currentMinutesOnes = minutes;
        this.currentSecondsTens = Math.floor(seconds / 10);
        this.currentSecondsOnes = Math.floor(seconds % 10);
        
        this.lastT = t;
    }

    showStats() {
        this.digitTextures[this.currentSecondsOnes].apply();
        this.secondsOnes.display();
        this.digitTextures[this.currentSecondsTens].apply();
        this.secondsTens.display();
        
        this.digitTextures[this.currentMinutesOnes % 10].apply();
        this.minutesOnes.display();

        this.dividerTex.apply();
        this.divider.display();
        
        this.digitTextures[this.score1 % 10].apply();
        this.player1Score.display();

        this.digitTextures[this.score2 % 10].apply();
        this.player2Score.display();
    }

    display() {
        this.scene.pushMatrix();
            this.scene.translate(1.3, 1.2, 0.2);
            this.scene.pushMatrix();
                this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
                this.scene.rotate(90 * DEGREE_TO_RAD, 0, 0, 1);
                this.scoreBoardMat.apply();
                this.scoreBoard.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0.3, 0, 0.12); 
                this.scene.scale(0.1, 0.1, 0.1);
                this.scene.rotate(-DEGREE_TO_RAD*30, 1, 0, 0);
                this.showStats();
            this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1.3, 1.2, -0.2);
            this.scene.rotate(-DEGREE_TO_RAD*180, 0, 1, 0);
            this.scene.pushMatrix();
                this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
                this.scene.rotate(90 * DEGREE_TO_RAD, 0, 0, 1);
                this.scoreBoardMat.apply();
                this.scoreBoard.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0.3, 0, 0.12); 
                this.scene.scale(0.1, 0.1, 0.1);
                this.scene.rotate(-DEGREE_TO_RAD*30, 1, 0, 0);
                this.showStats();
            this.scene.popMatrix();
        this.scene.popMatrix();
    }
}