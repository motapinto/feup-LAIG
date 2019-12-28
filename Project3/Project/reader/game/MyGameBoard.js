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
        this.createInstance([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    }

    id = (x, y) => (y * 100 + x + 1);

    position(id) { return {x: (id - 1) % 100, y: Math.floor((id - 1) / 100)} }; 

    positionCoordsId(id) {
        let pos = this.position(id);
        return this.positionCoords(pos.x, pos.y);
    }

    positionCoords(x, y) {
        if (y % 2)
            x += 0.5;
        
        return { x: x*1.8, y: (y+0.775)*1.55 };
    }

    createInstance(board) {
        this.board = [];
        for (let y = 0; y < board.length; y++) {
            let lineVals = [];
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x] == 4) continue;
                if (board[y][x] != 0)
                    lineVals.push(new MyTile(this.scene, this.graph, this.id(x, y), new MyPiece(this.scene, this.graph, board[y][x])));
                else
                    lineVals.push(new MyTile(this.scene, this.graph, this.id(x, y)));
            }
            this.board.push(lineVals);
        }
    }

    getInstance() {
        let instance = [];
        for (let line in this.board) {
            let instanceLine = [];
            for (let tile in line) {
                instanceLine.push(tile.piece ? tile.piece.type : 0);
            }
            if (instanceLine.length == 11) instanceLine.push(4);
            instance.push(instanceLine);
        }

        return instance;
    }

    getPiece = (y, x) => this.board[y][x].getPiece();

    setPiece(y, x, piece = null) {
        this.board[y][x].setPiece(piece);
    }

    getTile(id) {
        let position = this.position(id);
        return this.board[position.y][position.x];
    }

    display() {
        this.scene.pushMatrix();
            this.scene.translate(0, 1.2, 0);
 
            for (let i = 0; i < this.board.length; i++){
                for (let j = 0; j < this.board[i].length; j++) {
                    this.scene.pushMatrix();
                    
                    if (i % 2) {
                        if (j == 11) {
                            this.scene.popMatrix();
                            continue;
                        };
                        this.scene.translate((j + 0.5)*1.8, i*1.55, 0);
                    }
                    else
                        this.scene.translate(j*1.8, i*1.55, 0);
                    
                    this.board[i][j].display();
                    this.scene.popMatrix();
                }
            }
        this.scene.popMatrix();
    }
}