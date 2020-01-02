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

        //environment
        this.selectedScene = 4;
        this.gameEnvironment = new MyGameEnvironment(this.scene, this.selectedScene);
        //game sequence
        this.gameSequence = new MyGameSequence(this.scene, this, this.theme);
        //board of the game
        this.gameBoard = new MyGameBoard(this.scene, this.theme);
        //prolog connection
        this.prolog = new MyPrologInterface(this);
        //pices collected by players during game
        this.stashPlayer1 = new MyPlayerStash(this.scene, 1);
        this.stashPlayer2 = new MyPlayerStash(this.scene,);
        //game time and scores
        this.gameStats = new MyGameStats(this.scene, 0, 0);
        //animator for movie
        this.animator = new MyAnimator(this);
        
        this.picking = true;
        this.changingPlayer = false;
        this.changingStart = null;
        this.cameraDegrees = 0;
        this.player = 0;
        this.AILvl = 0;
        this.gameMode = 0;
        this.moves = [];
        this.start();
    }

    start() {
        this.prolog.getBoard();
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
        if(!this.picking)
            results.splice(0, results.length);
    }

    OnObjectSelected(obj, uniqueId) {
        if (obj instanceof MyPiece) {
            this.picking = false;
            this.prolog.validateMove(this.gameBoard.getInstance(),this.gameBoard.position(uniqueId));
        }
        else if (obj instanceof MyTile) {
            this.picking = false;
            let position = this.gameBoard.position(uniqueId);
            this.failledMove(position.x, position.y);
        }
        else {
            // error ?
        }
    }

    getMoveCoords(type) {
        if (this.player) {
            let pos = this.stashPlayer2.getNewPiecePos(type);
            pos.y += 2 * 11;
            return pos;
        }
        else {
            let pos = this.stashPlayer1.getNewPiecePos(type);
            pos.y = -pos.y;
            return pos;
        }
    }

    move(x, y) {
        let tile = this.gameBoard.getTile(x, y);
        this.gameSequence.addMove(tile, this.player ? this.stashPlayer2 : this.stashPlayer1, this.gameBoard.positionCoords(x, y), this.getMoveCoords(tile.piece.type))
    }

    failledMove(x, y) {
        let tile = this.gameBoard.getTile(x, y);
        tile.setColor(2);
        this.moves.push({ tile: tile, timeToLive: 2, startTime: null });
        this.changePlayer();
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

    undo() {
        if (this.gameSequence.undo())
            this.picking = false;
    }

    startMovie() {
        this.picking = false;
        this.animator.start();
    }

    update(t) {
        this.gameSequence.update(t);
        this.gameStats.update(t);
        this.gameEnvironment.update(t)

        // this.animator.update(t);
        if (this.changingPlayer) {
            if (this.changingStart == null) this.changingStart = t;
            let delta = t - this.changingStart;
            if (delta > 2) {
                this.endChangePlayer();
                return;
            }

            this.cameraDegrees = 90 * delta;
            if (this.cameraDegrees > 180) this.cameraDegrees = 180 * DEGREE_TO_RAD + (this.player ? 180 : 0);
            else this.cameraDegrees = this.cameraDegrees * DEGREE_TO_RAD + (this.player ? 180 : 0);
        }

        for (let move of this.moves) {
            if (move.startTime == null) move.startTime = t;
            let delta = t - move.startTime;
            if (delta > move.timeToLive) {
                move.tile.setColor(0);
                this.moves.splice(this.moves.indexOf(move), 1);
            }
        }
    }

    displayCameras() {
        switch(this.selectedScene) {
            case 4:
                this.gameEnvironment.mirror1.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['player1']);
                this.gameEnvironment.mirror1.detachFromFrameBuffer();
                this.gameEnvironment.mirror2.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['player2']);
                this.gameEnvironment.mirror2.detachFromFrameBuffer();

                this.gameEnvironment.gameview1.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['gameView']);
                this.gameEnvironment.gameview1.detachFromFrameBuffer();
                this.gameEnvironment.gameview2.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['gameView']);
                this.gameEnvironment.gameview2.detachFromFrameBuffer();
                break;
            default:
                break;
        }
    }

    display() {
        this.scene.pushMatrix();
            this.gameStats.display();
            this.gameEnvironment.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1, 1.1, 0.9);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
            this.gameBoard.display();
            this.gameSequence.display();
            
            this.scene.pushMatrix();
                this.scene.scale(1, -1, 1);
                this.stashPlayer1.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 21.8, 0);
                this.stashPlayer2.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    }
}