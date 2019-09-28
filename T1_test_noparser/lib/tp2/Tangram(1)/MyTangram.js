/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/
class MyTangram extends CGFinterface {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        //Triangles
        this.blue_t = new MyTriangle(scene) ;
        this.pink_t = new MyTriangle(scene) ;
        this.orange_t = new MyTriangle(scene) ;
        this.purple_t = new MyTriangle(scene) ;
        this.red_t = new MyTriangle(scene) ;
        //Parallelograms
        this.yellow_p = new MyParallelogram(scene) ;
        //Diamonds (squares)
        this.green_d = new MyDiamond(scene) ;
    }

    display() {
        //blue_t--
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.translate(-3, 0, 0);
        this.scene.scale(3, 3, 0);
        this.blue_t.display();
        this.scene.popMatrix();

        //pink_t --
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 2);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.pink_t.display();
        this.scene.popMatrix();

        //orange_t--
        this.scene.pushMatrix();
        this.scene.scale(3, 3, 0);
        this.scene.translate(-0.33, -0.67, 0);
        this.orange_t.display();
        this.scene.popMatrix();

        //purple_t--
        this.scene.pushMatrix();
        this.scene.translate(-0.65, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.purple_t.display();
        this.scene.popMatrix();

        //red_t--
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, 1, 0);
        this.red_t.display();
        this.scene.popMatrix();

        //yellow_p - PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.translate(4.35, -1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.yellow_p.display();
        this.scene.popMatrix();

        //green_d - DIAMOND - pedido no ex1 para fazer mult de matrizes e declarar matrizes - no need for rotation as the diamond is in "diamond" position
        this.scene.pushMatrix();
        this.translateMatrix = [ //this matriz is transpose taht represent this: 
			1, 0, 0, 0,           //    |1 0 0 1.5|          Tx = 1.5
			0, 1, 0, 0,           //    |0 1 0 3 |           Ty = 3
			0, 0, 1, 0,           //    |0 0 1 0 |           Tz = 0
			1.5, 2.5, 0, 1        //    |0 0 0 1 |           this.scene.translate(1.5, 3, 0);
		];
		this.scene.multMatrix(this.translateMatrix);
        this.green_d.display();
		this.scene.popMatrix();
    }
}

//To rotate ang is in rads ex: for rotation of 90 degress do ..rotate(Math.Pi/2,..)
//For example in yellow_p the instructions read first are pop, display, translate, rotate, psh,...