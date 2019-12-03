/**
* MyLamp
* @constructor
* @param scene - Reference to MyScene object
* @param slices - number of slices to use on prism
* @param radius - lamp radius
*/

class MyLamp extends CGFobject {
    constructor(scene, slices, radius) { 
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.radius = radius;

        this.holder = new MyPrism(scene, slices, 1, radius-0.4); //constructor(scene, slices, height, radius) 
        this.lamp = new MySemiSphere(scene, slices, radius, slices); //	constructor(scene, slices, radius, stacks)

        this.lamp_material = new CGFappearance(scene);
        this.lamp_material.setAmbient(1,1,1, 1.0);
        this.lamp_material.setDiffuse(0.2,0.2,0.2, 1.0);
        this.lamp_material.setSpecular(0.2,0.2,0.2, 1.0);
        this.lamp_material.setShininess(10.0);
        this.lamp_material.setTextureWrap('REPEAT', 'REPEAT');

        this.stick_material = new CGFappearance(scene);
        this.stick_material.setAmbient(1,1,1, 1.0);
        this.stick_material.setDiffuse(1,1,1, 1.0);
        this.stick_material.setSpecular(1,1,1, 1.0);
        this.stick_material.setShininess(10.0);
        this.stick_material.loadTexture('images/aluminium.jpg');
        this.stick_material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        //holder
        this.scene.pushMatrix();
        this.stick_material.apply();
        this.holder.display();
        this.scene.popMatrix();

        //lamp 
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.lamp_material.apply();
        this.lamp.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.lamp.enableNormalViz();
        this.holder.enableNormalViz();
    }

    disableNormalViz() {
        this.lamp.disableNormalViz();
        this.holder.disableNormalViz();
    }


}