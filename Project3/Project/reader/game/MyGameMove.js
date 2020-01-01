/**
 * MyGameMove class, representing a move
 */
class MyGameMove {
    /**
     * @constructor
     * @param {Scene} scene
     * @param {SceneGraph} graph
     * @param {MyTile} tile
     * @param {MyplayerStashBoard} playerStash
     * @param {vec2} coordsInit
     * @param {vec2} coordsFin
     */
    constructor(scene, graph, tileInit, playerStash, coordsInit, coordsFin) {
        this.scene = scene;
        this.graph = graph;
        this.tileInit = tileInit;
        this.playerStash = playerStash;
        this.piece = tileInit.getPiece();
        this.animating = false;
        this.reversing = false;
        this.startTime = null;
        this.matrix = mat4.create();
        this.coordsInit = coordsInit;
        this.createAnimation(coordsInit, coordsFin);

        this.animation = new KeyframeAnimation(scene, 60);
    }

    createAnimation(coordsInit, coordsFin) {
        this.coordsDiff = {
            x: coordsFin.x - coordsInit.x,
            y: coordsFin.y - coordsInit.y
        };
        this.transitionTime = 1.5 ;
        this.height = 5 ;
        this.animate();
    }

    animate() {
        this.animating = true;
        this.startTime = null;
        if (this.reversing)
            this.playerStash.removePiece();
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
            this.playerStash.addPiece(this.piece);
    }

    reverse() {
        this.reversing = true;
        this.coordsDiff.x = -this.coordsDiff.x;
        this.coordsDiff.y = -this.coordsDiff.y;
        if (this.animating) this.startTime -= this.transitionTime - this.delta;
    }

    pushKeyframe(percentage) {
        let translation = [], rotation=[], scale=[];
        let x = this.coordsDiff.x * percentage, y = this.coordsDiff.y * percentage, z = this.quadratic(percentage);
        let angle_x = percentage*10, angle_y = percentage*10, angle_z = 0;

        translation.push(...[x, y, z]);
        rotation.push(...[angle_x, angle_y, angle_z]);
        scale.push(...[1, 1, 1]);

        let instant = percentage*1.5;

        this.animation.addKeyframe(instant, translation, rotation, scale);
    }

    update(t) {
        if (!this.animating) return false;
        if (this.startTime == null) this.startTime = t;

        this.delta = t - this.startTime;

        this.animation.update(t);
        this.pushKeyframe(this.delta / this.transitionTime);

        if (this.delta > this.transitionTime) {
            this.endAnimation();
            return false;
        }

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