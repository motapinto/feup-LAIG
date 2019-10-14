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
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)


        this.initKeys();

        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
		this.gui.add(this.scene, 'displayAxis').name("Display axis"); //checkbox
		this.gui.add(this.scene, 'floor').name("Floor Number").min(0).step(1); //number
        //Dropdown for cameras
        this.gui.add(this.scene, 'selectedCamera', this.scene.viewsList).name('Selected Camera').onChange(this.scene.updateCamera.bind(this.scene));
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