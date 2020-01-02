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
        this.pieces = [[], [], []];
    }

    hasWon() {
        for(let i = 0 ; i < 3; i++) {
            if(this.pieces[i].length < 5)
                return false;
        }
        return true;
    }

    getNewPiecePos(type) {
        return this.getPiecePos(this.pieces[type - 1].length, type);
    }

    addPiece(piece) {
        this.pieces[piece.type - 1].push(piece);
        if(this.hasWon())
            alert('Player ' + this.player + ' has won!');
    }

    removePiece(type) {
        return this.pieces[type - 1].pop();
    }

    getPiecePos(number, type) { 
        if(this.player == 1) {
            return { 
                x: type + 26, 
                y: 1, 
                z: Math.floor(number / 3) + 0.5
            }; 
        }
        else {
            return { 
                x: type - 10, 
                y: -3, 
                z: Math.floor(number / 3) + 0.5
            };
        }
    }
         
    display() {
        this.scene.pushMatrix();

            //Pieces collected
            for (let type = 0; type < 3; type++){
                for (let nPiece = 0; nPiece < this.pieces[type].length; nPiece++) {
                    this.scene.pushMatrix();
                        let pos = this.getPiecePos(nPiece, type+1);
                        this.scene.translate(pos.x, pos.y, pos.z);
                        this.pieces[type][nPiece].display();
                    this.scene.popMatrix();
                }
                this.scene.translate(0.2, 0, 0);
            }
            
        this.scene.popMatrix();
    }
}