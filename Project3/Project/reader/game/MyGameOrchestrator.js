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
        this.selectedScene = 1;
        this.gameEnvironment = new MyGameEnvironment(this.scene, this.selectedScene);
        //menu
        this.gameMenu = new MyGameMenu(this.scene);
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

        //load theme not working
        //this.loadTheme(2);
        
        this.picking = true;
        this.boardPicking = false;
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

    startGame(board, scores) {
        this.gameBoard.createInstance(board);
        for (let player = 0; player < scores.length; player++) {
            for (let type = 0; type < scores[player].length; type++) {
                const score = scores[player][type];
                for (let i = 0; i < score; i++) {
                    if (player == 0) {
                        this.stashPlayer1.addPiece(new MyPiece(this.scene, this.scene.graph, type + 1));
                    }
                    else if (player == 1) {
                        this.stashPlayer2.addPiece(new MyPiece(this.scene, this.scene.graph, type + 1));
                    }
                    
                }                
            }
        }
        this.gameEnded = false;
        this.gameSequence.reset();
    }

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
        if (obj instanceof MyPiece && this.boardPicking) {
            this.picking = false;
            this.prolog.validateMove(this.gameBoard.getInstance(),this.gameBoard.position(uniqueId));
        }
        else if (obj instanceof MyTile && this.boardPicking) {
            this.picking = false;
            let position = this.gameBoard.position(uniqueId);
            this.failledMove(position.x, position.y);
        }
        else {
            // gameboard
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

    gameOver() {
        this.gameEnded = true;
        this.boardPicking = false;
    }

    orchestrate(mode, results) {
        if (!this.gameEnded) {
            switch (this.gameMode) {
                case 0:
                    this.boardPicking = true;
                    break;
    
                case 1:
                    if (this.player) {
                        this.boardPicking = false;
                        this.prolog.aiMove(this.gameBoard.getInstance(), this.AILvl1);
                    }
                    else {
                        this.boardPicking = true;
                    }
                    break;
    
                case 2:
                    if (this.player) {
                        this.boardPicking = true;
                    }
                    else {
                        this.boardPicking = false;
                        this.prolog.aiMove(this.gameBoard.getInstance(), this.AILvl2);
                    }
                    break;
    
                case 3:
    
                    this.prolog.aiMove(this.gameBoard.getInstance(), this.player ? this.AILvl2 : this.AILvl1);
                    break;
    
                default:
                    this.boardPicking = false;
                    break;
            }            
        }
        this.managePick(mode, results);
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
            if (this.cameraDegrees > 180) this.cameraDegrees = (180 + (this.player ? 0 : 180)) * DEGREE_TO_RAD;
            else this.cameraDegrees = (this.cameraDegrees + (this.player ? 0 : 180)) * DEGREE_TO_RAD;
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

    attachCameras() {
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

                this.gameEnvironment.security1.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['camera1']);
                this.gameEnvironment.security1.detachFromFrameBuffer();
                this.gameEnvironment.security2.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['camera2']);
                this.gameEnvironment.security2.detachFromFrameBuffer();
                this.gameEnvironment.security3.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['camera3']);
                this.gameEnvironment.security3.detachFromFrameBuffer();
                this.gameEnvironment.security4.attachToFrameBuffer();
                this.scene.render(this.scene.graph.views['camera4']);
                this.gameEnvironment.security4.detachFromFrameBuffer();
                break;
            default:
                break;
        }
    }

    loadTheme(theme) {
        this.gameEnvironment.changeTheme(theme);
        this.gameEnvironment.initEnvironment(theme);
    }

    display() {
        this.scene.pushMatrix(); 
            this.gameStats.display();
            this.gameEnvironment.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.gameMenu.display();
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