/**
* MyBirdTail
* @constructor
* @param scene - Reference to MyScene object
*/

/*A casa deverá ter até 3 unidades de lado, colocada a menos de 8 unidades de distância da origem (de
forma a ser vísivel com a inicialização da cena).*/


class MyBirdTail extends CGFobject { //"Unit House" with height equal to 1
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.tail_1 = new MyCylinder(scene, 20, 0.8, 0.22); //scene, slices, height, radius
        this.tail_2 = new MyCylinder(scene, 20, 0.6, 0.20); //scene, slices, height, radius
        this.tail_3 = new MyCone(scene, 20, 1, 0.17); //scene, slices, height, radius
    }

    display() {

        //tail_1
        this.scene.pushMatrix();
        this.scene.rotate(-0.35*Math.PI, 0, 0, 1);
        this.tail_1.display();
        this.scene.popMatrix();

        //tail_2
        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.3, -0.2);
        this.scene.rotate(-0.4*Math.PI, 0, 1, 1);
        this.tail_2.display();
        this.scene.popMatrix();

        //tail_3
        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.3, -0.2);
        this.scene.rotate(-0.2*Math.PI, 0, 1, 0);
        this.scene.rotate(0.7*Math.PI, 0, 0, 1);
        this.tail_3.display();
        this.scene.popMatrix();
    }


    enableNormalViz() {
        this.tail_1.enableNormalViz();
        this.tail_2.enableNormalViz();
        this.tail_3.enableNormalViz();
    }

    disableNormalViz() {
        this.tail_1.disableNormalViz();
        this.tail_2.disableNormalViz();
        this.tail_3.disableNormalViz();
    }
}