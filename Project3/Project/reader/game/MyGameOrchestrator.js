/**
 * MyGameOrchestrator class, manages the board state that is to be rendered.
 */
class MyGameOrchestrator{
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     */
    constructor(scene, graph) {
        this.scene = scene;
        this.graph = graph;

        this.selectedScene = 4;
        this.gameEnvironment = new MyGameEnvironment(this.scene, this.selectedScene);
        //menu
        this.gameMenu = new MyGameMenu(this.scene);
        //game sequence
        this.gameSequence = new MyGameSequence(this.scene, this);
        //board of the game 
        this.gameBoard = new MyGameBoard(this.scene, this.graph);
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
        this.boardPicking = false;
        this.changingPlayer = false;
        this.changingStart = null;
        this.moveRequested = false;
        this.cameraDegrees = 0;
        this.player = 0;
        this.moves = [];
        this.start();
    }

    updateGraph(graph) {
        this.graph = graph
        this.gameBoard.updateGraph(graph);
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
                        this.stashPlayer1.addPiece(new MyPiece(this.graph, type + 1));
                    }
                    else if (player == 1) {
                        this.stashPlayer2.addPiece(new MyPiece(this.graph, type + 1));
                    }
                    
                }                
            }
        }
        this.scene.gameEnded = false;
        this.picking = true;
        this.gameSequence.reset();
        this.gameStats.initCounter();
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
        else if (obj == 'undo'){
            this.player == 0 ? this.scene.selectedCamera = 'player1' : this.scene.selectedCamera = 'player2';
            this.undo();
        }
        else if (obj == 'movie') {
            this.player == 0 ? this.scene.selectedCamera = 'player1' : this.scene.selectedCamera = 'player2';
            this.startMovie();
        }
        else if (obj == 'exit'){
            let player1Camera = this.resetCamera(this.player);
            this.scene.graph.views['default'] = player1Camera;
            this.scene.selectedCamera = 'default'
        }
        else if (obj == 'menu'){
            this.player == 0 ? this.scene.selectedCamera = 'cameraPlayer1' : this.scene.selectedCamera = 'cameraPlayer2';
        }
        else if (obj == 'left'){
            this.loadTheme(1);
        }
        else if (obj == 'up'){
            this.loadTheme(2);        
        }
        else if (obj == 'right'){
            this.loadTheme(3);        
        }
        else if (obj == 'down'){
            this.loadTheme(4);
        }
        else {
            console.log(obj);
        }
    }

    resetCamera(player) {
        let playerName;
        player == 0 ? playerName = 'player1' : playerName = 'player2';
        let fov = this.scene.graph.views[playerName].fov;
        let near = this.scene.graph.views[playerName].near;
        let far = this.scene.graph.views[playerName].far;
        let position = this.scene.graph.views[playerName].position;
        let target = this.scene.graph.views[playerName].target;
        return new CGFcamera(fov, near, far, position, target);
    }

    getMoveCoords(type) {
        if (this.player) {
            let pos = this.stashPlayer2.getNewPiecePos(type);
            pos.y += 2 * 11;
            pos.z -= 0.4;
            return pos;
        }
        else {
            let pos = this.stashPlayer1.getNewPiecePos(type);
            pos.y = -pos.y;
            pos.z -= 0.4;
            return pos;
        }
    }

    move(x, y) {
        let tile = this.gameBoard.getTile(x, y);
        this.gameSequence.addMove(
            tile,
            this.player ? this.stashPlayer2 : this.stashPlayer1,
            this.gameBoard.positionCoords(x, y),
            this.getMoveCoords(tile.piece.type)
        );
    }

    failledMove(x, y) {
        let tile = this.gameBoard.getTile(x, y);
        this.gameSequence.addInvalidMove(tile);
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
        this.moveRequested = false;
        if (this.player) this.cameraDegrees = 180 * DEGREE_TO_RAD;
        else this.cameraDegrees = 0;
    }

    undo() {
        if (this.gameSequence.undo())
            this.picking = false;
    }

    startMovie() {
        this.boardPicking = false;
        this.animator.startMovie(this.gameSequence.getMoves());
    }

    endMovie() {
        this.picking = true;
        if (this.scene.gameEnded && confirm('Do you want to start a new game?'))
            this.start();
    }

    gameOver(player) {
        this.scene.gameEnded = true;
        this.boardPicking = false;
        switch(player) {
            case 0: alert('Both players have lost!'); break;
            case 1: this.gameStats.score1++; alert('Player 1 has won!'); break;
            case 2: this.gameStats.score2++; alert('Player 2 has won!'); break;
        }
        if(confirm('Do you want to see the review of the game that you just played?'))
            this.startMovie();
    }

    orchestrate(mode, results) {
        if (!this.scene.gameEnded && this.picking && !this.gameSequence.animating && !this.animator.animating) {
            if (this.stashPlayer1.hasWon()) this.gameOver(1);
            else if (this.stashPlayer2.hasWon()) this.gameOver(2);
            else switch (this.scene.gameType) {
                case '0':
                case 0:
                    this.boardPicking = true;
                    break;
    
                case '1':
                case 1:
                    if (this.player === 1) {
                        this.boardPicking = false;
                        if (!this.moveRequested && !this.changingPlayer) {
                            this.moveRequested = true;
                            this.prolog.aiMove(this.gameBoard.getInstance(), this.scene.AI2);                            
                        }
                    }
                    else {
                        this.boardPicking = true;
                    }
                    break;
    
                case '2':
                case 2:
                    if (this.player === 1) {
                        this.boardPicking = true;
                    }
                    else {
                        this.boardPicking = false;
                        if (!this.moveRequested && !this.changingPlayer) {
                            this.moveRequested = true;
                            this.prolog.aiMove(this.gameBoard.getInstance(), this.scene.AI2);
                        }
                    }
                    break;
    
                case '3':
                case 3:
                    this.boardPicking = false;
                    if (!this.moveRequested && !this.changingPlayer) {
                        this.moveRequested = true;
                        this.prolog.aiMove(this.gameBoard.getInstance(), this.player ? this.scene.AI2 : this.scene.AI1);
                    }
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
        this.animator.update(t);

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
        this.newSelectedScene = theme;
        this.gameEnvironment.changeTheme(theme);
    }
    
    onGraphChanged(graph) {
        this.selectedScene = this.newSelectedScene;
        this.gameEnvironment.selectedScene = this.selectedScene;
        this.gameEnvironment.initEnvironment(this.selectedScene);
        this.updateGraph(graph);
    }

    onGraphLoaded(graph) {
        this.updateGraph(graph);
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
            this.scene.rotate(DEGREE_TO_RAD*180, 0, 1, 0);
            this.gameMenu.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1, 1.1, 0.9);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.rotate(-DEGREE_TO_RAD*90, 1, 0, 0);
            this.gameBoard.display();
            this.gameSequence.display();
            this.animator.display();
        
            this.scene.pushMatrix();
                this.scene.scale(1, -1, 1);
                this.scene.translate(0, 0, -0.4);
                this.stashPlayer1.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 21.8, -0.4);
                this.stashPlayer2.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    }
}