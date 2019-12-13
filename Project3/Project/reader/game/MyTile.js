class MyTile {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {MyGameBoard} gameboard
     * @param {integer} tileId
     * @param {MyPiece} piece
     */
    constructor(scene, graph, gameboard, tileId, piece = null) {
        this.scene = scene;
        this.graph = graph;
        this.gameboard = gameboard;
        this.tileId = tileId;
        this.piece = piece;
    }

    setPiece(piece = null) { this.piece = piece; }

    getPiece() { return this.piece; } 

    display() {
        this.scene.pushMatrix();

        this.scene.registerForPick(this.tileId, this);

        this.graph.displayComponent('Tile');
        if (this.piece != null)
            this.piece.display();

        this.scene.clearPickRegistration();

        this.scene.popMatrix();
    }
}