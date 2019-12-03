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
        this.blue_t     = new MyTriangle(scene) ;
        this.pink_t     = new MyTriangle(scene) ;
        this.orange_t   = new MyTriangle(scene) ;
        this.purple_t   = new MyTriangle(scene) ;
        this.red_t      = new MyTriangle(scene) ;
        //Parallelograms
        this.yellow_p   = new MyParallelogram(scene) ;
        //Diamonds (squares)
        this.green_d    = new MyDiamond(scene) ;

        var blue = this.hexToRgbA('#1E90FF');
        this.material1 = new CGFappearance(scene);
        this.material1.setAmbient(blue[0],blue[1],blue[2], 1.0);
        this.material1.setDiffuse(blue[0],blue[1],blue[2], 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0);

        var pink = this.hexToRgbA('#FF69B4');
        this.material2 = new CGFappearance(scene);
        this.material2.setAmbient(pink[0],pink[1],pink[2], 1.0);
        this.material2.setDiffuse(pink[0],pink[1],pink[2], 1.0);
        this.material2.setSpecular(0, 0, 0, 1.0);
        this.material2.setShininess(10.0);

        var orange = this.hexToRgbA('#F7830F');
        this.material3 = new CGFappearance(scene);
        this.material3.setAmbient(orange[0],orange[1],orange[2], 1.0);
        this.material3.setDiffuse(orange[0],orange[1],orange[2], 1.0);
        this.material3.setSpecular(0, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        var purple = this.hexToRgbA('#8A2BE2');
        this.material4 = new CGFappearance(scene);
        this.material4.setAmbient(purple[0],purple[1],purple[2], 1.0);
        this.material4.setDiffuse(purple[0],purple[1],purple[2], 1.0);
        this.material4.setSpecular(0, 0, 0, 1.0);
        this.material4.setShininess(10.0);

        var red = this.hexToRgbA('#FF0000');
        this.material5 = new CGFappearance(scene);
        this.material5.setAmbient(red[0],red[1],red[2], 1.0);
        this.material5.setDiffuse(red[0],red[1],red[2], 1.0);
        this.material5.setSpecular(0, 0, 0, 1.0);
        this.material5.setShininess(10.0);

        var yellow = this.hexToRgbA('#FFFF00');
        this.material6 = new CGFappearance(scene);
        this.material6.setAmbient(yellow[0],yellow[1],yellow[2], 1.0);
        this.material6.setDiffuse(yellow[0],yellow[1],yellow[2], 1.0);
        this.material6.setSpecular(yellow[0], yellow[1], yellow[2], 1.0);
        this.material6.setShininess(10.0);

        var green = this.hexToRgbA('#00FF00');
        this.material7 = new CGFappearance(scene);
        this.material7.setAmbient(green[0],green[1],green[2], 1.0);
        this.material7.setDiffuse(green[0],green[1],green[2], 1.0);
        this.material7.setSpecular(green[0], green[1], green[2], 1.0);
        this.material7.setShininess(10.0);

        this.customMaterial = new CGFappearance(this);
        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.updateCustomMaterial();

    }

    display() {
        //blue_t--
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.translate(-3, 0, 0);
        this.scene.scale(3, 3, 1);
        this.scene.materials[4].apply();
        this.material1.apply();
        this.blue_t.display();
        this.scene.popMatrix();

        //pink_t --
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 2);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.material2.apply();
        this.pink_t.display();
        this.scene.popMatrix();

        //orange_t--
        this.scene.pushMatrix();
        this.scene.scale(3, 3, 1);
        this.scene.translate(-0.33, -0.67, 0);
        this.material3.apply();
        this.orange_t.display();
        this.scene.popMatrix();

        //purple_t--
        this.scene.pushMatrix();
        this.scene.translate(-0.65, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.material4.apply();
        this.purple_t.display();
        this.scene.popMatrix();

        //red_t--
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0, 1, 0);
        this.material5.apply();
        this.red_t.display();
        this.scene.popMatrix();

        //yellow_p - PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.translate(4.35, -1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.material6.apply();
        this.yellow_p.display();
        this.scene.popMatrix();

        //green_d - DIAMOND - pedido no ex1 para fazer mult de matrizes e declarar matrizes - no need for rotation as the diamond is in "diamond" position
        this.scene.pushMatrix();
        this.translateMatrix = [ //this matriz is transpose that represent this: 
			1, 0, 0, 0,           //    |1 0 0 1.5|          Tx = 1.5
			0, 1, 0, 0,           //    |0 1 0 3 |           Ty = 3
			0, 0, 1, 0,           //    |0 0 1 0 |           Tz = 0
			1.5, 2.5, 0, 1        //    |0 0 0 1 |           this.scene.translate(1.5, 3, 0);
		];
        this.scene.multMatrix(this.translateMatrix);
        this.scene.materials[4].apply();
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