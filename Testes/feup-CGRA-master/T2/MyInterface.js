
class MyInterface extends CGFinterface
{
	constructor() {
		super();
	};

	init(application) {

		super.init(application);
		this.gui = new dat.GUI();
		var obj = this;

        this.initKeys();
        
        this.gui.add(this.scene, 'scaleFactor',0.5, 3.0).name('Scale');
        this.gui.add(this.scene, 'scaleScene',0.5, 3.0).name('Scale scene');
        this.gui.add(this.scene, 'speedFactor',0.1, 3.0).name('Speed');
        this.gui.add(this.scene, 'score').name('Score').onChange(this.scene.updateScore.bind(this.scene.score))
		this.gui.add(this.scene, 'displayNormals').name("Display normals"); //checkbox
		this.gui.add(this.scene, 'displayAxis').name("Display axis"); //checkbox
        this.gui.add(this.scene, 'firstPerson').name("First person"); //checkbox
        this.gui.add(this.scene, 'cubemap_show').name("Display cubemap"); //checkbox
        this.gui.add(this.scene, 'selected_lights', this.scene.lightsIDs).name('Selected Light').onChange(this.scene.updateDayLight.bind(this.scene)); //checkbox with bind propriety
    
    }

    update(score) {
        this.score = score;
    }

	initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
       
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}
