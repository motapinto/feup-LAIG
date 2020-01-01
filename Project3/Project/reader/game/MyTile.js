class MyTile {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {integer} tileId
     * @param {MyPiece} piece
     */
    constructor(scene, graph, tileId, piece = null) {
        this.scene = scene;
        this.graph = graph;
        this.tileId = tileId;
        this.piece = piece;
        this.color = 0;
    }

    setPiece = (piece = null) => this.piece = piece; 

    getPiece = () => this.piece; 

    setColor = (color) => this.color = color;

    display() {
        this.scene.pushMatrix();

        this.scene.registerForPick(this.tileId, (this.piece == null)?this:this.piece);

        this.graph.displayComponentMatRot('Tile', this.color);
        if (this.piece != null)
            this.piece.display();

        this.scene.clearPickRegistration();

        this.scene.popMatrix();
    }
}