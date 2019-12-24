/**
 * MyGameOrchestrator class, manages the board state that is to be rendered.
 */
class MyGameOrchestrator{
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     */
    constructor(scene, theme) {
        this.scene = scene;
        this.theme = theme;
        // this.animator = new MyAnimator(…);
        
        // this.theme = new MyScenegraph('main.xml', this.scene);
        this.gameSequence = new MyGameSequence(this.scene, this.theme);
        this.gameBoard = new MyGameBoard(this.scene, this.theme);
        this.gameBoard.createInstance();
        this.scorePlayer1 = new MyPlayerStash(this.scene);
        this.scorePlayer2 = new MyPlayerStash(this.scene);
        // this.prolog = new MyPrologInterface(…);
        this.pickMode = false;
        this.player = 0;
        this.AILvl = 0;
    }

    /**
    * logs picking results in console
    */
    managePick(mode, results) {
        if (mode == false) {
            if (results != null && results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var obj = results[i][0];
                    if (obj) {
                        var uniqueId = results[i][1];
                        console.log("Picked object: with pick id " + uniqueId);
                        this.OnObjectSelected(obj, uniqueId);
                    }
                }
                results.splice(0, results.length);
            }
        }
    }

    OnObjectSelected(obj, uniqueId) {
        if (obj instanceof MyPiece) {
            this.gameSequence.addMove(this.gameBoard.getTile(uniqueId), this.player ? this.scorePlayer2 : this.scorePlayer1, this.gameBoard.position(uniqueId), this.getMoveCoords(obj.type))
        }
        else if (obj instanceof MyTile) {
            // do something with id knowing it is a tile
        }
        else {
            // error ?
        }
    }

    getMoveCoords(type) {
        if (this.player) {
            let pos = this.scorePlayer2.getNewPiecePos(type);
            pos.y += 2 * 11;
            return pos;
        }
        else {
            let pos = this.scorePlayer1.getNewPiecePos(type);
            pos.y = -pos.y;
            return pos;
        }
    }

    update(t) {
        this.gameSequence.update(t);
        // this.animator.update(t);
    }

    display() {
        this.gameBoard.display();
        this.gameSequence.display();
        this.scorePlayer1.display();
        this.scorePlayer2.display();
    }
}