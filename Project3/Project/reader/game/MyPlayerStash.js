/**
 * MyScoreBMyPlayerStashoard class, representing the pieces collected by the player
 */
class MyPlayerStash {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {integer} player 
     */
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.createInstance();
    }

    createInstance() {
        this.score = [0, 0, 0];
        this.scoreVal = 0;
        this.pieces = [[], [], []];
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
            
        this.scene.popMatrix();
    }

}