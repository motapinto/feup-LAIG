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

        this.createInstance();
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

    createInstance() {
        for (let y = 0; y < 11; y++) {
            let yVals = [];
            for (let x = 0; x < 12; x++) {
                if (y % 2 && x == 11) continue;
                yVals.push(new MyTile(this.scene, this.graph, this.id(x, y), new MyPiece(this.scene, this.graph, 1)));
            }
            this.board.push(yVals);
        }
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

            for (let i = 0; i < 11; i++){
                for (let j = 0; j < 12; j++) {
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