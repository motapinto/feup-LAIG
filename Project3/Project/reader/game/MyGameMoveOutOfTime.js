/**
 * MyGameOutOfTime class, representing an out of time faul
 */
class MyGameMoveOutOfTime {
    /**
     * @constructor
     * @param {MyGameBoard} board
     * @param {Scene} scene
     */
    constructor(board, scene) {
        this.board = board;
        this.scene = scene;
        this.animating = false;
        this.reversing = false;
        this.ended = false;
        this.startTime = null;
        this.deltaTime = 2;
        this.animate();
    }

    setAll(color) {
        for (let line of this.board.board) {
            for (let tile of line) {
                tile.setColor(color);
            }
        }
    }

    animate() {
        this.ended = false;
        this.animating = true;
        this.startTime = null;
        this.setAll(0);
    }
    
    endAnimation() {
        this.ended = true;
        this.setAll(0);
        this.animating = false;
        this.startTime = null;
    }

    reverse() {
        this.reversing = true;
        if (this.animating) this.startTime -= this.deltaTime/2 - this.delta;
        else {
            this.startTime = null;
            this.animating = true;
        }
    }

    update(t) {
        if (!this.animating) return false;
        if (this.startTime == null) this.startTime = t;

        this.delta = t - this.startTime;

        if (this.delta > this.deltaTime/this.scene.speed) {
            this.endAnimation();
            return false;
        }

        this.setAll((this.delta % 1) < 0.5 ? 2 : 0);

        return true;
    }

    display() {}
}