/**
 * MyScoreBoard class, representing the score board of player
 */
class MyScoreBoard {
    /**
     * @constructor
     * @param {Scene} scene
     */
    constructor(scene, player) {
        this.scene = scene;
        this.score = [0, 0, 0];
        this.pieces = [[], [], []];
    }

    createInstance() {
        this.score = [0, 0, 0];
        this.pieces = [[], [], []];
    }

    getNewPiecePos(type) {
        return this.getPiecePos(this.score[type - 1] + 1, type);
    }

    addPiece(piece) {
        this.score[piece.type - 1]++;
        this.pieces[piece.type - 1].push(piece);
    }

    removePiece(type) {
        this.score[type - 1]--;
        return this.pieces[type - 1].pop(piece);
    }

    getPiecePos(number, type) { return { x: number % 3 + 0.2 + type*3.8, y: Math.floor(number / 3) + 0.2 }; }

    display() {
        this.scene.pushMatrix();
            for (let type = 0; type < 3; type++){
                for (let nPiece = 0; nPiece < this.score[type]; nPiece++) {
                    this.scene.pushMatrix();
                    let pos = this.getPiecePos(nPiece, type+1);
                    this.scene.translate(pos.x, pos.y, 0);
                    this.pieces[type][nPiece].display();
                    this.scene.popMatrix();
                    this.scene.translate(0.2, 0, 0);
                }
                this.scene.translate(0.2, 0, 0);
            }
        this.scene.popMatrix();
    }

}