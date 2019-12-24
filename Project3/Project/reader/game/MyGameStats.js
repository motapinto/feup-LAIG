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
        this.startTime = true;

        this.init();
    }

    init() {
        this.minutesOnes = new MyRectangle(this.scene, 0, 1, 0, 1);
        this.secondsTens = new MyRectangle(this.scene, 2, 3, 0, 1);
        this.secondsOnes = new MyRectangle(this.scene, 3, 4, 0, 1);
        this.divider = new MyRectangle(this.scene, 1, 2, 0, 1);
        this.player1Score = new MyRectangle(this.scene, -2, -0.5, -0.5, 1.5);
        this.player2Score = new MyRectangle(this.scene, 4.5, 6, -0.5, 1.5);

        this.tvs = [];
        this.tvs.push(new MyRectangle(this.scene, -2, 6, 0, 3));
        this.tvs.push(new MyRectangle(this.scene, -2, 6, 0, 3));
        this.tvs.push(new MyRectangle(this.scene, -2, 6, 0, 3));
        this.tvs.push(new MyRectangle(this.scene, -2, 6, 0, 3));
        this.texture = new CGFtextureRTT(this.scene, this.scene.gl.canvas.width, this.scene.gl.canvas.height);

        this.scoreBoardStick = new MyCylinder(this.scene, 2.99, 2.99, 4, 4, 1);

        // Stores all numbers textures
        this.digitTextures = [];
        for (let i = 0; i < 10; ++i) {
            let digitTex = new CGFappearance(this.scene);
            digitTex.loadTexture("scenes/numbers/" + i + ".png");
            this.digitTextures.push(digitTex);
        }

        this.dividerTex = new CGFappearance(this.scene);
        this.dividerTex.loadTexture("scenes/numbers/divider.png");

        // Current values for game time
        this.currentMinutesOnes = 0;
        this.currentSecondsTens = 0;
        this.currentSecondsOnes = 0;
    }

    update(t) {
        if(this.startTime) {
            let minutes = Math.floor(t / 60);
            let seconds = t % 60;
    
            this.currentMinutesOnes = Math.abs(minutes);
            this.currentSecondsTens = Math.abs(Math.floor(seconds / 10));
            this.currentSecondsOnes = Math.abs(seconds % 10);
        }
    }

    attachToFrameBuffer(){
        this.texture.attachToFrameBuffer();
    }

    detachFromFrameBuffer(){
        this.texture.detachFromFrameBuffer();
    }

    showStats() {
        this.digitTextures[this.currentMinutesOnes].apply();
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
            this.scene.translate(5, 4.9, -12);
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.pushMatrix();
                this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);
                this.scene.rotate(45 * DEGREE_TO_RAD, 0, 0, 1);
                this.scoreBoardStick.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.scale(0.5, 0.7, 0.5);
                this.scene.translate(-2, -5, 4.25); // y = -5
            for(let i = 0; i < 4; i++) {
                if(i == 0) {
                    this.scene.pushMatrix();
                        this.showStats();
                        this.scene.translate(0, 2, 0);
                        this.tvs[i].display();
                    this.scene.popMatrix();
                }

                if(i == 1) {
                    this.scene.pushMatrix();
                        this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
                        this.scene.translate(2.5, 0, 6.25);
                        this.showStats();
                        this.scene.translate(0, 2, 0);
                        this.tvs[i].display();
                    this.scene.popMatrix();
                }

                if(i == 2) {
                    this.scene.pushMatrix();
                        this.scene.rotate(-90 * DEGREE_TO_RAD, 0, 1, 0);
                        this.scene.translate(-6.25, 0, 2.25);
                        this.showStats();
                        this.scene.translate(0, 2, 0);
                        this.tvs[i].display();
                    this.scene.popMatrix();
                }

                if(i == 3) {
                    this.scene.pushMatrix();
                        this.scene.rotate(180 * DEGREE_TO_RAD, 0, 1, 0);
                        this.scene.translate(-3.8, 0, 8.5);
                        this.showStats();
                        this.scene.translate(0, 2, 0);
                        this.tvs[i].display();
                    this.scene.popMatrix();
                }
            }
            this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.graph.displayScene();
        //this.removeLaterBoard.display();
    }

}