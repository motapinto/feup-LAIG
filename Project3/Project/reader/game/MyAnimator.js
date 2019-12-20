/**
 * MyAnimator class, manages animations
 */
class MyAnimator {
    /**
     * @constructor
     * @param {MyGameOrchestrator} orchestrator
     * @param {MyGameSequence} gameSequence
     */
    constructor(orchestrator, gameSequence) {
        this.orchestrator = orchestrator;
        this.gameSequence = gameSequence;
    }

    start() {
        
    }

    reset() {
        
    }

    update(t) {
        this.gameSequence.update(t);
    }

    display() {
        this.gameSequence.display();
    }
}