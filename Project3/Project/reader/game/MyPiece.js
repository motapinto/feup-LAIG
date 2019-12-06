class MyPiece {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {integer} type
     */
    constructor(scene, graph, type) {
        this.scene = scene;
        this.graph = graph;
        this.type = type;
    }

    display() {
        this.graph.displayComponent('Piece' + this.type);
    }
}