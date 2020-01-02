/**
 * MyAnimator class, handles the movie
 */
class MyAnimator {
    /**
     * @constructor
     * @param {MyGameOrchestrator} orchestrator
     */
    constructor(orchestrator) {
        this.orchestrator = orchestrator;
        this.animating = false;
        this.started = false;
        this.moves = [];
        this.currentMove = 0;
    }

    /**
     * 
     * @param {Array<MyGameMove>} moves 
     */
    startMovie(moves) {
        if (moves.length == 0) return false;
        this.moves = moves;
        this.started = false;
        this.animating = true;
        this.currentMove = 0;
        for (let move of this.moves) {
            move.reverse();
        }

        return true;
    }
    
    endMovie() {
        this.moves.forEach(move => {
            move.endAnimation();
        });
        this.animating = false;
        this.started = false;
        this.moves = [];
        this.currentMove = 0;
        this.orchestrator.picking = true;
    }

    checkStart() {
        for (const move of this.moves) {
            if (move.animating) return false;
        }

        return true;
    }

    update(t) {
        if (this.animating) {
            // Check if all pieces are in their original position
            if (!this.started) {
                this.started = this.checkStart();
                if (!this.started) {
                    for (let move of this.moves) {
                        move.update(t);
                    }
                }
                else {
                    this.moves[0].animate();
                }
            }
    
            // run game movie
            if (this.started) {
                // Update if until finish
                if (this.moves[this.currentMove].animating) {
                    this.moves[this.currentMove].update(t);
                }
                // Start next move
                else {
                    this.currentMove++;
                    // Reached the end of the moves
                    if (this.moves.length < this.currentMove) {
                        this.endMovie();
                    }
                    else {
                        this.moves[this.currentMove].animate();
                    }
                }                
            }

        }
        
    }
}