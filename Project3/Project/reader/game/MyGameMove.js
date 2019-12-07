/**
 * MyGameMove class, representing a move
 */
class MyGameMove {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {MyTile} tile
     * @param {MyScoreBoard} score
     * @param {vec2} coordsInit
     * @param {vec2} coordsFin
     */
    constructor(scene, graph, tileInit, score, coordsInit, coordsFin) {
        this.scene = scene;
        this.graph = graph;
        this.tileInit = tileInit;
        this.score = score;
        this.piece = tile.getPiece();
        this.animating = false;
        this.startTime = null;
        this.createAnimation(coordsInit, coordsFin);
    }

    // ADD REVERSE OPTION FOR FILM
    createAnimation(coordsInit, coordsFin) {
        this.coordsDiff = {
            x: coordsFin.x - coordsInit.x,
            y: coordsFin.y - coordsInit.y
        };
        let distOffset = 0.1 * Math.sqrt(this.coordsDiff.x * this.coordsDiff.x + this.coordsDiff.y * this.coordsDiff.y);
        this.deltaTime = 1 + distOffset;
        this.height = 0.5 + distOffset;
    }

    animate() {
        this.animating = true;
        this.startTime = null;
        this.tileInit.setPiece();
    }

    quadratic(percent) {
        return -4 * Math.pow(percent - 0.5, 2) + this.height;
    }

    update(t) {
        if (!this.animating) return;

        if (this.startTime == null) this.startTime = t;
        
        if ((t - this.startTime) > this.deltaTime) {
            this.endAnimation();
            return;
        }

        let percent = (t - this.startTime) / this.deltaTime;

        mat4.translate(this.matrix, mat4.create(), [this.coordsDiff.x * percent, this.coordsDiff.y * percent, this.quadratic(percent)]);
    }

    endAnimation() {
        this.animating = false;
        this.startTime = null;
        this.score.addPiece(this.piece);
    }

    display() { this.scene.multMatrix(this.matrix); }
}