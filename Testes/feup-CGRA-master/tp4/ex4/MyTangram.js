/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/
class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.normals = [];

        //Triangles
        this.blue_t     = new MyTriangle(scene, [0.5,0.5, 1,0, 1,1 ]) ;
        this.pink_t     = new MyTriangle(scene, [0,1, 0,0.5, 0.5,1]) ;
        this.orange_t   = new MyTriangle(scene, [0.5,0.5, 0,0, 1,0]) ;
        this.purple_t   = new MyTriangle(scene, [0.5, 0.5, 0.75,0.75, 0.25,0.75]) ;
        this.red_t      = new MyTriangle(scene, [0.25, 0.25, 0,0.5, 0,0]) ;
        //Parallelograms
        this.yellow_p   = new MyParallelogram(scene, [0.5,1, 1,1, 0.75,0.75, 0.5,0.75]) ;
        //Diamonds (squares)
        this.green_d    = new MyDiamond(scene, [0.5,0.5, 0,0.5, 0.25,0.25, 0.25,0.75]) ;

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1,1,1, 1.0);
        this.material.setDiffuse(1,1,1, 1.0);
        this.material.setSpecular(1,1,1, 1.0);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        //blue_t--
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.translate(-3, 0, 0);
        this.scene.scale(3, 3, 1);
        this.blue_t.display();
        this.scene.popMatrix();

        //pink_t --
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(2, 2, 2);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.pink_t.display();
        this.scene.popMatrix();

        //orange_t--
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(3, 3, 1);
        this.scene.translate(-0.33, -0.67, 0);
        this.orange_t.display();
        this.scene.popMatrix();

        //purple_t--
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(-0.65, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.purple_t.display();
        this.scene.popMatrix();

        //red_t--
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, 1, 0);
        this.red_t.display();
        this.scene.popMatrix();

        //yellow_p - PARALLELOGRAM
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(4.35, -1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.yellow_p.display();
        this.scene.popMatrix();

        //green_d - DIAMOND - pedido no ex1 para fazer mult de matrizes e declarar matrizes - no need for rotation as the diamond is in "diamond" position
        this.scene.pushMatrix();
        this.material.apply();
        this.translateMatrix = [ //this matriz is transpose that represent this: 
			1, 0, 0, 0,           //    |1 0 0 1.5|          Tx = 1.5
			0, 1, 0, 0,           //    |0 1 0 3 |           Ty = 3
			0, 0, 1, 0,           //    |0 0 1 0 |           Tz = 0
			1.5, 2.5, 0, 1        //    |0 0 0 1 |           this.scene.translate(1.5, 3, 0);
		];
        this.scene.multMatrix(this.translateMatrix);
        this.green_d.display();
		this.scene.popMatrix();
    }

    enableNormalViz() {
        this.yellow_p.enableNormalViz();
        this.green_d.enableNormalViz();
        this.blue_t.enableNormalViz();
        this.orange_t.enableNormalViz();
        this.purple_t.enableNormalViz();
        this.red_t.enableNormalViz();
        this.pink_t.enableNormalViz();
    }

    disableNormalViz() {
        this.yellow_p.disableNormalViz();
        this.green_d.disableNormalViz();
        this.blue_t.disableNormalViz();
        this.orange_t.disableNormalViz();
        this.purple_t.disableNormalViz();
        this.red_t.disableNormalViz();
        this.pink_t.disableNormalViz();
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    updateCustomMaterial() {
        var rgba;

        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));
        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };
}