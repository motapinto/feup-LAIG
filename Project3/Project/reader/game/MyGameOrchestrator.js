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
        this.gameSequence = new MyGameSequence(this.scene, this, this.theme);
        this.gameBoard = new MyGameBoard(this.scene, this.theme);
        this.prolog = new MyPrologInterface(this);
        this.scorePlayer1 = new MyPlayerStash(this.scene, 1);
        this.scorePlayer2 = new MyPlayerStash(this.scene,);
        this.picking = true;
        this.changingPlayer = false;
        this.changingStart = null;
        this.cameraDegrees = 0;
        this.player = 0;
        this.AILvl = 0;
        this.gameMode = 0;
        this.start();
    }

    start() {
        this.prolog.getBoard();
    }

    /**
     * 
     * @param {{x, y}} position 
     */
    validateMove(position) {
        return true;
    }

    /**
    * logs picking results in console
    */
    managePick(mode, results) {
        if (!mode && this.picking) {
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
            if (this.validateMove(this.gameBoard.position(uniqueId))) {
                this.gameSequence.addMove(this.gameBoard.getTile(uniqueId), this.player ? this.scorePlayer2 : this.scorePlayer1, this.gameBoard.positionCoordsId(uniqueId), this.getMoveCoords(obj.type))
                this.picking = false;
                this.changePlayer();
            }
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

    changePlayer() {
        this.picking = false;
        this.changingPlayer = true;
        this.changingStart = null;
        this.player = (this.player + 1) % 2;
    }

    endChangePlayer() {
        this.picking = true;
        this.changingPlayer = false;
        this.changingStart = null;
        if (this.player) this.cameraDegrees = 180 * DEGREE_TO_RAD;
        else this.cameraDegrees = 0;
    }

    update(t) {
        this.picking = !this.gameSequence.update(t);
        // this.animator.update(t);
        if (this.changingPlayer) {
            if (this.changingStart == null) this.changingStart = t;
            let delta = t - this.changingStart;
            if (delta > 2) {
                this.endChangePlayer();
                return;
            }

            this.cameraDegrees = 90 * delta * DEGREE_TO_RAD;
        }
    }

    display() {
        this.scene.pushMatrix();
            this.scene.translate(-1, 1.1, 0.9);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
            this.gameBoard.display();
            this.gameSequence.display();
            
            this.scene.pushMatrix();
                this.scene.scale(1, -1, 1);
                this.scorePlayer1.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 21.8, 0);
                this.scorePlayer2.display();
            this.scene.popMatrix();
            
        this.scene.popMatrix();
    }
}