class MyPiece {
    /**
     * @constructor
     * @param {SceneGraph} graph
     * @param {integer} type
     */
    constructor(graph, type) {
        this.graph = graph;
        this.type = type;
    }

    updateGraph(graph) {
        this.graph = graph;
    }

    display() { this.graph.displayComponent('Piece' + this.type); }
}