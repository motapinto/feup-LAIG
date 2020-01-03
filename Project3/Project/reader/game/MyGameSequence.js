/**
 * MyGameSequence class, representing a move
 */
class MyGameSequence {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {MyGameOrchestrator} orchestrator
     * @param {SceneGraph} graph
     */
    constructor(scene, orchestrator, graph) {
        this.scene = scene;
        this.orchestrator = orchestrator;
        this.graph = graph;
        this.moves = [];
        this.animating = false;
    }

    reset() {
        this.moves = [];
        this.animating = false;
    }

    getMoves = () => this.moves;

    addMove(tile, score, coordsInit, coordsFin) {
        this.moves.push(new MyGameMove(this.scene, this.graph, tile, score, coordsInit, coordsFin));
        this.animating = true;
    }

    undo() {
        if (this.moves.length < 1 || this.moves[this.moves.length - 1].reversing)
            return false;
        
        this.moves[this.moves.length - 1].reverse();
        this.animating = true;
        return true;
    }

    update(t) {
        if (this.moves.length > 0 && this.animating) {
            this.animating = this.moves[this.moves.length - 1].update(t);  
            if (!this.animating) {
                if (!this.moves[this.moves.length - 1].reversing)
                    this.orchestrator.prolog.verifyBoard();
                else {
                    let lastMove = this.moves.pop();
                    if (lastMove.ended)
                        this.orchestrator.changePlayer();
                    else {
                        this.orchestrator.picking = true;
                    }
                }
            }
        }
    }

    display() {
        if (this.moves.length > 0 && this.animating)
            this.moves[this.moves.length - 1].display();
    }
}