/**
 * MyGameBoard class, representing the board state that is to be rendered.
 */
class MyGameBoard{
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     */
    constructor(scene, graph) {
        this.scene = scene;
        this.graph = graph;
        this.board = [];
        this.scorePlayer1 = new MyScoreBoard(scene, graph);
        this.scorePlayer2 = new MyScoreBoard(scene, graph);
    }

    id(col, row) { return (col * 10 + row); }

    position(id) { return {col: id % 100, row: Math.floor(id / 100)}; }

    positionCoords(id) {
        let pos = this.position(id);
        return this.positionCoords(pos.col, pos.row);
    }

    positionCoords(col, row) {
        let y = 10 - row + 0.5;
        let x = col + 0.5;
        if (row % 2)
            x += 0.5;
        
        return { x: x, y: y };
    }

    createInstance() {
        for (let row = 0; row < 11; row++) {
            let rowVals = [];
            for (let col = 0; col < 12; col++) {
                if (!(row % 2) && col == 11) continue;
                rowVals.push(new MyTile(scene, this.graph, this, this.id(col, row)));
            }
            this.board.push(rowVals);
        }
    }

    setPiece(row, col, piece = null) {
        this.board[row][col].setPiece(piece);
    }

    getPiece(row, col) { return this.board[row][col].getPiece(); }

    getTile(row, col) { return this.board[row][col]; }

    getTile(id) {
        let position = this.position(id);
        return this.board[position.row][position.col];
    }


}