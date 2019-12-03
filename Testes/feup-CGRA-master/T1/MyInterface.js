/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.gui = new dat.GUI();
        var obj = this;
        
        this.gui.add(this.scene, 'displayAxis').name("Display axis"); //checkbox
        this.gui.add(this.scene, 'displayNormals').name("Display normals"); //checkbox
        this.gui.add(this.scene, 'enable_textures').name("Disable textures"); //checkbox
        this.gui.add(this.scene, 'selected_lights', this.scene.lightsIDs).name('Selected Light').onChange(this.scene.updateDayLight.bind(this.scene)); //checkbox with bind propriety
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5.0).name('Scale'); //slider

        return true;
    }

}