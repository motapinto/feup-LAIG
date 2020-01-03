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
        this.initKeys();

        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
        this.gui.add(this.scene, 'audioEnable').name("Enable sound"); //checkbox
        this.gui.add(this.scene, 'displayLights').name("Display lights"); //checkbox
        this.gui.add(this.scene, 'difficulty', { 0: 0, 1: 1, 2: 2 } ).name("Difficulty");
        this.gui.add(this.scene, 'gameType', { PVP: 0, PVM: 1, MVM: 2 } ).name("Game Type");
        this.gui.add(this.scene, 'theme', { Beach: 1, Montain: 2, Restaurant: 3, Questioning: 4 } ).name("Environment");
        //LightsFolder called in onGraphLoaded() function
        //CamerasFolder called in onGraphLoaded() function
        
        return true;
    }

    LightsFolder(lights) {
        let lightsFolder = this.gui.addFolder("Lights");
        
        for (let key in lights) { //key = light name 
            if (lights.hasOwnProperty(key)) {
                    this.scene.lightsInterface[key] = lights[key][0]; 
                    lightsFolder.add(this.scene.lightsInterface, key);
            }
        }
    }

    CamerasFolder() {
      //Dropdown for cameras
      this.gui.add(this.scene, 'selectedCamera', this.scene.viewsList).name('Camera');
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
        console.log(event.code);
        this.activeKeys[event.code]=true;
    };
    
    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };
    
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}