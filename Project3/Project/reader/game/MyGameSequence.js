/**
 * MyGameSequence class, representing a move
 */
class MyGameSequence {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {MyGameOrchestrator} orchestrator
     */
    constructor(scene, orchestrator) {
        this.scene = scene;
        this.orchestrator = orchestrator;
        this.moves = [];
        this.animating = false;
        this.auxTile = new MyTile(this.scene, this.orchestrator.graph, 9999999);
    }

    reset() {
        this.moves = [];
        this.animating = false;
    }

    getMoves = () => this.moves;

    addMove(tile, score, coordsInit, coordsFin) {
        this.moves.push(new MyGameMove(this.scene, tile, score, coordsInit, coordsFin));
        this.animating = true;
    }

    addInvalidMove(tile) {
        this.moves.push(new MyGameMoveInvalid(tile, this.scene));
        this.animating = true;
    }

    addOutOfTimeMove(board) {
        this.animating = true;
        this.moves.push(new MyGameMoveOutOfTime(board, this.scene));
    }

    undo() {
        if (this.moves.length < 1 || this.moves[this.moves.length - 1].reversing)
            return false;
        
        if (this.moves[this.moves.length - 1].ended) {
            this.orchestrator.changePlayer();
            this.orchestrator.gameStats.reset();
            this.orchestrator.gameStats.stop();
        }
        this.moves[this.moves.length - 1].reverse();
        this.animating = true;
        return true;
    }

    update(t) {
        if (this.moves.length > 0 && this.animating) {
            this.animating = this.moves[this.moves.length - 1].update(t);  
            if (!this.animating) {
                if (!this.moves[this.moves.length - 1].reversing) {
                    this.orchestrator.prolog.verifyBoard();
                }
                else {
                    this.moves.pop();
                    this.orchestrator.picking = true;
                    this.orchestrator.moveRequested = false;
                    this.orchestrator.gameStats.continue();
                }
            }
        }
    }

    display() {
        if (this.moves.length > 0 && this.animating)
            this.moves[this.moves.length - 1].display();
    }
}