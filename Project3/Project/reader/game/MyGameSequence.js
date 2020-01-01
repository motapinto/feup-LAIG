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
            if (!this.animating)
                this.orchestrator.prolog.verifyBoard();
        }
    }

    display() {
        if (this.moves.length > 0 && this.animating)
            this.moves[this.moves.length - 1].display();
    }
}