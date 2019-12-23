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

        init();
    }

    init() {
        this.minutesOnes = new MyRectangle(this.scene,-2, 2, -1, 0);
        this.divider = new MyRectangle(this.scene, -1, 2, 0, 0);

        this.secondsTens = new MyRectangle(this.scene, 0, 2, 1, 0);
        this.secondsOnes = new MyRectangle(this.scene, 1, 2, 2, 0);

        this.playerScores = new MyRectangle(this.scene,  3, 3,  5, -1);

        // Stores all numbers textures
        this.digitTextures = [];
        for (let i = 0; i < 10; ++i) {
            let digitTex = new CGFappearance(this.scene);
            digitTex.loadTexture("scenes/numbers/" + i + ".png");
            this.digitTextures.push(digitTex);
        }

        this.dividerTex = new CGFappearance(this.scene);
        this.dividerTex.loadTexture("scenes/numbers/divider.png");

        // Current values for game time
        this.currentminutesOnes = 0;
        this.currentsecondsTens = 0;
        this.currentsecondsOnes = 0;
    }

    id = (col, row) => (row * 10 + col + 1);

    position(id) { return {col: (id - 1) % 100, row: Math.floor((id - 1) / 100)}}; 

    positionCoords = (id) => this.positionCoords(this.position(id).col, this.position(id).row);

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
                if (row % 2 && col == 11) continue;
                rowVals.push(new MyTile(this.scene, this.graph, this, this.id(col, row), new MyPiece(this.scene, this.graph, 1)));
            }
            this.board.push(rowVals);
        }
    }

    getPiece = (row, col) => this.board[row][col].getPiece();

    setPiece(row, col, piece = null) {
        this.board[row][col].setPiece(piece);
    }

    getTile(id) {
        let position = this.position(id);
        return this.board[position.row][position.col];
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