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
        this.gui.add(this.scene, 'displayAxis').name("Display axis"); //checkbox

        //Sims still floor
        this.gui.add(this.scene, 'floorUp').name("Floor Up"); 
        this.gui.add(this.scene, 'floorDown').name("Floor Down"); 

        //LightsFolder called in onGraphLoaded() function
        //CamerasFolder called in onGraphLoaded() function
        
        return true;
    }

    LightsFolder(lights) {
        var lightsFolder = this.gui.addFolder("Lights");
        lightsFolder.open();

        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {
                    this.scene.lightsInterface[key] = lights[key][0]; //light name 
                    lightsFolder.add(this.scene.lightsInterface, key);
            }
        }
    }

    CamerasFolder(views) {
        var camerasFolder = this.gui.addFolder("Cameras");
        camerasFolder.open();

        for (var key in views) {
            if (views.hasOwnProperty(key)) {
                    this.scene.camerasInterface[key] = views[key][0]; //camera name 
                    camerasFolder.add(this.scene.camerasInterface, key);
            }
        }
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