/**
 * MyGameSequence class, representing a move
 */
class MyGameSequence {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     */
    constructor(scene, graph) {
        this.scene = scene;
        this.graph = graph;
        this.moves = [];
    }

    addMove = (tile, score, x, y) => this.moves.push(new MyGameMove(this.scene, this.graph, tile, score, {x, y}, {x, y}));

    undo() {
        if (this.moves.length < 1 || this.moves[this.moves.length - 1].reversing)
            return;
        
        this.moves[this.moves.length - 1].reverse();
    }

    update(t) {
        if (this.moves.length > 0)
            this.moves[this.moves.length - 1].update(t);
    }

    display() {
        if (this.moves.length > 0)
            this.moves[this.moves.length - 1].display();
    }
}