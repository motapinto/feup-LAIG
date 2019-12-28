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
        this.piece = tileInit.getPiece();
        this.animating = false;
        this.reversing = false;
        this.startTime = null;
        this.matrix = mat4.create();
        this.coordsInit = coordsInit;
        this.createAnimation(coordsInit, coordsFin);
    }

    createAnimation(coordsInit, coordsFin) {
        this.coordsDiff = {
            x: coordsFin.x - coordsInit.x,
            y: coordsFin.y - coordsInit.y
        };
        let distOffset = 0.1 * Math.sqrt(this.coordsDiff.x * this.coordsDiff.x + this.coordsDiff.y * this.coordsDiff.y);
        this.deltaTime = 2 + distOffset;
        this.height = 0.5 + distOffset;
        this.animate();
    }

    animate() {
        this.animating = true;
        this.startTime = null;
        if (this.reversing)
            this.score.removePiece();
        else
            this.tileInit.setPiece();
    }

    quadratic = (percent) => -4 * (percent - 0.5) * (percent - 0.5) + this.height;
    
    endAnimation() {
        this.animating = false;
        this.startTime = null;
        if (this.reversing)
            this.tileInit.setPiece(this.piece);
        else
            this.score.addPiece(this.piece);
    }

    reverse() {
        this.reversing = true;
        this.coordsDiff.x = -this.coordsDiff.x;
        this.coordsDiff.y = -this.coordsDiff.y;
        if (this.animating) this.startTime -= this.deltaTime - this.delta;
    }

    update(t) {
        if (!this.animating) return false;

        if (this.startTime == null) this.startTime = t;

        this.matrix = mat4.create();

        this.delta = t - this.startTime;
        
        if (this.delta > this.deltaTime) {
            this.endAnimation();
            return false;
        }

        let percent = this.delta / this.deltaTime;

        mat4.translate(this.matrix, this.matrix, [this.coordsDiff.x * percent, this.coordsDiff.y * percent, this.quadratic(percent)]);

        return true;
    }

    display() {
        if (this.animating) {
            this.scene.pushMatrix();
            
            this.scene.multMatrix(this.matrix);
            this.scene.translate(this.coordsInit.x, this.coordsInit.y, 0);

                this.piece.display();
            this.scene.popMatrix();
        }
    }
}