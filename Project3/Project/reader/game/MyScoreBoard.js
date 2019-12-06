/**
 * MyScoreBoard class, representing the score board of player
 */
class MyScoreBoard {
    /**
     * @constructor
     * @param {Scene} scene
     */
    constructor(scene) {
        this.scene = scene;
        this.score = [0, 0, 0];
        this.pieces = [[], [], []];
    }

    createInstance() {
        this.score = [0, 0, 0];
        this.pieces = [[], [], []];
    }

    getNewPiecePos(type) {
        return this.getPiecePos(this.score[type - 1] + 1);
    }

    addPiece(piece) {
        this.score[piece.type - 1]++;
        this.pieces[piece.type - 1].push(piece);
    }

    getPiecePos(number) { return { x: number % 3 + 0.2, y: Math.floor(number / 3) + 0.2 }; }

    display() {
        this.scene.pushMatrix();

        for (let type = 0; type < 3; type++){
            for (let nPiece = 0; nPiece < this.score[1]; nPiece++) {
                this.scene.pushMatrix();
    
                let pos = this.getPiecePos(nPiece);
                this.scene.translate(pos.x, pos.y, 0);
                this.pieces[type][nPiece].display();
    
                this.scene.popMatrix();
            }
            this.scene.translate(0.2, 0, 0);
        }

        this.scene.popMatrix();
    }

}