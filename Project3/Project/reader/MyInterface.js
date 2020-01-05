/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();
        this.initKeys();

        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
        this.gui.add(this.scene, 'speed', 0.5, 5.0).name('Speed Factor');
        this.gui.add(this.scene, 'audioEnable').name("Enable sound"); //checkbox
        this.gui.add(this.scene, 'fixedCamera').name("Fixed camera"); //checkbox
        this.gui.add(this.scene, 'resetCamera').name("Reset camera");
        this.gui.add(this.scene, 'resetBoard').name("Reset board");
        this.gui.add(this.scene, 'resetScores').name("Reset scores");
        this.gui.add(this.scene, 'gameEnded').name('Pause'); //checkbox
        this.gui.add(this.scene, 'custom1', {'Red': 0, 'Yellow': 1, 'Blue': 2, 'Black': 3, 'White': 4}).name("Player 1");
        this.gui.add(this.scene, 'custom2', {'Red': 0, 'Yellow': 1, 'Blue': 2, 'Black': 3, 'White': 4}).name("Player 2");
        this.gui.add(this.scene, 'AI1', {'0': 0, '1': 1, '2': 2}).name("AI player 1");
        this.gui.add(this.scene, 'AI2', {'0': 0, '1': 1, '2': 2}).name("AI player 2");
        this.gui.add(this.scene, 'gameType', { PVP: 0, PVM: 1, MVP: 2, MVM: 3 } ).name("Game Type");
        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }
    
    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };
    
    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };
    
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}