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

    id = (x, y) => (y * 10 + x + 1);

    position(id) { return {x: (id - 1) % 100, y: Math.floor((id - 1) / 100)} }; 

    positionCoords = (id) => this.positionCoords(this.position(id).x, this.position(id).y);

    positionCoords(x, y) {
        y = 10 - y + 0.5;
        x = x + 0.5;
        if (y % 2)
            x += 0.5;
        
        return { x: x, y: y };
    }

    createInstance() {
<<<<<<< HEAD
        for (let y = 0; y < 11; y++) {
            let yVals = [];
            for (let x = 0; x < 12; x++) {
                if (y % 2 && x == 11) continue;
                yVals.push(new MyTile(this.scene, this.graph, this.id(x, y), new MyPiece(this.scene, this.graph, 1)));
=======
        for (let row = 0; row < 11; row++) {
            let rowVals = [];
            for (let col = 0; col < 12; col++) {
                if (row % 2 && col == 11) continue;
                rowVals.push(new MyTile(this.scene, this.graph, this.id(col, row), new MyPiece(this.scene, this.graph, 1)));
>>>>>>> 4a214c2c0cf09890997c468f22bbc7cf5927983d
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