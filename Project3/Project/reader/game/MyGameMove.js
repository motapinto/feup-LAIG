/**
 * MyGameMove class, representing a move
 */
class MyGameMove {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {MyTile} tile
     * @param {vec2} coordsInit
     * @param {vec2} coordsFin
     */
    constructor(scene, graph, tile, coordsInit, coordsFin) {
        this.scene = scene;
        this.graph = graph;
        this.tile = tile;
        this.piece = tile.getPiece();
        this.animation = false;
        this.startTime = null;
        this.createAnimation(coordsInit, coordsFin);
    }

    createAnimation(coordsInit, coordsFin) {
        this.deltaTime = 2;
        this.coordsDiff = {
            x: coordsFin.x - coordsInit.x,
            y: coordsFin.y - coordsInit.y
        };
        let dist = Math.sqrt(this.coordsDiff.x * this.coordsDiff.x + this.coordsDiff.y * this.coordsDiff.y);
        this.height = dist * 0.1 + 0.5;
    }

    animate() { this.animation = true; this.startTime = null}

    quadratic(percent) {
        return -4 * Math.pow(percent - 0.5, 2) + this.height;
    }

    update(t) {
        if (!this.animation) return;

        if (this.startTime == null) this.startTime = t;

        let instant = t - this.startTime;
        let z = this.quadratic(instant);


    }

    getNewPiecePos(type) {
        return this.getPiecePos(this.score[type - 1] + 1);
    }

    addPiece(piece) {
        this.score[piece.type - 1]++;
        this.pieces[piece.type - 1].push(piece);
    }

    getPiecePos(number) { return { x: number % 3 + 0.2, y: Math.floor(number / 3) + 0.2 }; }

    display() {
        this.scene.pushMatrix();

        for (let type = 0; type < 3; type++) {
            for (let nPiece = 0; nPiece < this.score[1]; nPiece++) {
                this.scene.pushMatrix();

                let pos = this.getPiecePos(nPiece);
                this.scene.translate(pos.x, pos.y, 0);
                this.pieces[type][nPiece].display();

                this.scene.popMatrix();
            }
            this.scene.translate(0.2, 0, 0);
        }

        this.scene.popMatrix();
    }

}