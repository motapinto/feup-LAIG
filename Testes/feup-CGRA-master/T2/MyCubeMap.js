/**
* MyCubeMap
* @constructor
* @param scene - MyScene reference
* @param size - size of UnitCube
* @param day_value - day_value = {0, 1} 0 : day, 1..* : night
* @param day_text - day texture 
* @param night_text - night texture 
*/
class MyCubeMap extends CGFobject {
    constructor(scene, size, day_value, day_text, night_text) { 
        super(scene);
        this.scene = scene;
		
		this.cubemap = new MyUnitCube(this.scene, true);
        
        this.day_value = day_value;//to distinguish  between day and night (depends on the light used in scene) [0->day; else->night]
        this.day_text = day_text;//cubemap to use in day mode
        this.night_text = night_text; //cubemap to use in night mode
        this.size = size;  

        this.day_material = new CGFappearance(scene);
        this.day_material.setAmbient(1, 1, 1, 1.0);
        this.day_material.setDiffuse(0.7 ,0.7 ,0.7, 1.0);
        this.day_material.setSpecular(0.8, 0.8, 0.8 , 1.0);
        this.day_material.setShininess(100);

        //Different material with different properties
        this.night_material = new CGFappearance(scene);
        this.night_material.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.night_material.setDiffuse(0.4 ,0.4 ,0.4 , 1.0);
        this.night_material.setSpecular(0.2, 0.2, 0.2 , 1.0);
        this.night_material.setShininess(10.0);

        this.day_text = new CGFtexture(scene, 'images/' + day_text);
        this.night_text = new CGFtexture(scene, 'images/' + night_text);     
    }

	display() {

		this.scene.pushMatrix();
            
            if(this.day_value == 0) {
                this.day_material.setTexture(this.day_text);
                this.day_material.apply();
            } else {
                this.night_material.setTexture(this.night_text);
                this.night_material.apply();
            }

            this.scene.scale(this.size, this.size*4/5, this.size);
            this.scene.translate(0.5, 0.5-0.003, 0.5);
            this.cubemap.display();

        this.scene.popMatrix();

	}

	enableNormalViz() {
		this.cubemap.enableNormalViz();
	}

	disableNormalViz() {
		this.cubemap.disableNormalViz();
	}
}