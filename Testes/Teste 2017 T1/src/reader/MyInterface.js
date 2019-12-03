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
        this.gui.add(this.scene, 'materialMarkVisible').name("Material marked visible"); //checkbox

        //Sims still floor
        this.gui.add(this.scene, 'floorUp').name("Floor Up"); 
        this.gui.add(this.scene, 'floorDown').name("Floor Down"); 

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
    SecurityCamerasFolder() {
      //Dropdown for cameras
      this.gui.add(this.scene, 'selectedSecurityCamera', this.scene.viewsList).name('Security Camera');
      this.SecurityCamerasOptionsFolder();
    }
    SecurityCamerasOptionsFolder() {
      let securityCameraFolder = this.gui.addFolder("Security Camera Options");

      securityCameraFolder.add(this.scene.securityCamera, 'lineSpeed', 0.1, 10.0).name('Line Speed').onChange(this.scene.securityCamera.updateShader.bind(this.scene.securityCamera));
      securityCameraFolder.add(this.scene.securityCamera, 'linesNumber', 1, 100.0).name('Number of lines').onChange(this.scene.securityCamera.updateShader.bind(this.scene.securityCamera));
      securityCameraFolder.add(this.scene.securityCamera, 'lineDiff', 0.0, 2.0).name('Thickness Difference').onChange(this.scene.securityCamera.updateShader.bind(this.scene.securityCamera));
      securityCameraFolder.add(this.scene.securityCamera, 'radiusVar', 1.0, 2.0).name('Blackout Radius').onChange(this.scene.securityCamera.updateShader.bind(this.scene.securityCamera));
      securityCameraFolder.add(this.scene.securityCamera, 'brightness', 0.1, 5.0).name('Line Brightness').onChange(this.scene.securityCamera.updateShader.bind(this.scene.securityCamera));
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