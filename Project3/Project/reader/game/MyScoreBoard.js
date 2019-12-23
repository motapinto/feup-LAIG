/**
 * MyScoreBoard class, representing the score board of player
 * The MyScoreBoard will contain the time, score and piece collected for a player
 */
class MyScoreBoard {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {integer} player ->>>>>>>>>>>>>>> translate muda conforme player
     */
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.createInstance();
        this.initTime();
    }

    createInstance() {
        this.score = [0, 0, 0];
        this.scoreVal = 0;
        this.pieces = [[], [], []];
    }

    initTime() {
        this.minutesOnes = new MyRectangle(this.scene, -2, 2, -1, 0);
        this.secondsTens = new MyRectangle(this.scene, 0, 2, 1, 0);
        this.secondsOnes = new MyRectangle(this.scene, 1, 2, 2, 0);
        this.divider = new MyRectangle(this.scene, 1, 2, 2, 0);
        this.playerScores = new MyRectangle(this.scene,  1, 2, 2, 0);

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
        let minutes = Math.floor(t / 60);
        let seconds = t % 60;

        this.currentMinutesOnes = Math.abs(minutes);
        this.currentSecondsTens = Math.abs(Math.floor(seconds / 10));
        this.currentSecondsOnes = Math.abs(seconds % 10);
    }

    hasWon() {
        for(let i = 0 ; i < 3; i++) {
            if(this.score[i] != 5)
                return false;
        }
        return true;
    }

    getNewPiecePos(type) {
        return this.getPiecePos(this.score[type - 1] + 1, type);
    }

    addPiece(piece) {
        this.score[piece.type - 1]++;
        this.pieces[piece.type - 1].push(piece);
        this.scoreVal++;
        if(hasWon())
            alert('Player ' + this.player + ' has won!');
    }

    removePiece(type) {
        this.score[type - 1]--;
        this.pieces[type - 1].pop(piece);
        this.scoreVal--;
    }

    getPiecePos(number, type) { return { x: number % 3 + 0.2 + type*3.8, y: Math.floor(number / 3) + 0.2 }; }

    display() {
        this.scene.pushMatrix();
            //Pieces collected
            for (let type = 0; type < 3; type++){
                for (let nPiece = 0; nPiece < this.score[type]; nPiece++) {
                    this.scene.pushMatrix();
                        let pos = this.getPiecePos(nPiece, type+1);
                        this.scene.translate(pos.x, pos.y, 0);
                        this.pieces[type][nPiece].display();
                        this.scene.translate(0.2, 0, 0);
                    this.scene.popMatrix();
                }
                this.scene.translate(0.2, 0, 0);
            }

            //ScoreBoard
            this.digitTextures[this.currentMinutesOnes].apply();
            this.secondsOnes.display();
            this.digitTextures[this.currentSecondsTens].apply();
            this.secondsOnes.display();
            
            this.dividerTex.apply();
            this.divider.display();

            this.digitTextures[this.currentMinutesOnes % 10].apply();
            this.minutesOnes.display();

            this.playerScores.display();

            if(this.player == 2)
                this.scene.translate(5, 0, 0);

        this.scene.popMatrix();
    }

}