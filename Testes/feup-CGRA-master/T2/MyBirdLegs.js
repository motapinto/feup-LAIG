/**
* MyBirdLegs
* @constructor
* @param scene - Reference to MyScene object
*/

/*A casa deverá ter até 3 unidades de lado, colocada a menos de 8 unidades de distância da origem (de
forma a ser vísivel com a inicialização da cena).*/


class MyBirdLegs extends CGFobject { //"Unit House" with height equal to 1
    constructor(scene, dist_legs) {
        super(scene);
        this.scene = scene;
        this.dist_legs = dist_legs;

        this.leg = new MyCylinder(scene, 20, 0.5, 0.08); //scene, slices, height, radius
        this.foot = new MyPyramid(scene, 4, 0.5, 0.12);//scene, slices, height, radius

        this.leg_material = new CGFappearance(scene);
        this.leg_material.setAmbient(0.8,0.8,0.8, 1.0);
        this.leg_material.setDiffuse(0.65,0.65,0.65, 1.0);
        this.leg_material.setSpecular(0.2,0.2, 0.2, 1.0);
        this.leg_material.setShininess(10.0);
        this.leg_material.loadTexture('images/escamas.jpg');
        this.leg_material.setTextureWrap('REPEAT', 'REPEAT');

        this.foot_material = new CGFappearance(scene);
        this.foot_material.setAmbient(0.8,0.8,0.8, 1.0);
        this.foot_material.setDiffuse(0.65,0.65,0.65, 1.0);
        this.foot_material.setSpecular(0.2,0.2, 0.2, 1.0);
        this.foot_material.setShininess(10.0);
        this.foot_material.loadTexture('images/foot.jpg');
        this.foot_material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

            //leg_left
            this.scene.pushMatrix();
            this.leg.display();
            this.scene.popMatrix();
            
            //foot_left
            this.scene.pushMatrix();
            this.foot_material.apply();
            this.scene.translate(0, 0.1, 0);
            this.scene.rotate(-0.65*Math.PI, 0, 0, 1);
            this.foot.display();
            this.scene.popMatrix();
            
            //leg_right
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.dist_legs);
            this.leg.display();
            this.scene.popMatrix();
            
            //foot_right
            this.scene.pushMatrix();
            this.foot_material.apply();
            this.scene.translate(0, 0.1, this.dist_legs);
            this.scene.rotate(-0.65*Math.PI, 0, 0, 1);
            this.foot.display();
            this.scene.popMatrix();
    }   


    enableNormalViz() {
        this.leg.enableNormalViz();
        this.foot.enableNormalViz();
    }

    disableNormalViz() {
        this.leg.disableNormalViz();
        this.foot.disableNormalViz();
    }
}