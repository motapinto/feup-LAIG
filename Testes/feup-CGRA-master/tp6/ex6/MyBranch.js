/**
* MyBranch
* @constructor
* @param scene - Reference to MyScene object
* @param slices - slices of cone
* @param height - cone height
* @param radius - radius of cone base
*/

class MyBranch extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.radius = radius;
        this.height = height;

        this.cilinder = new MyCylinder(scene, slices, height, radius);
        var green = this.hexToRgbA('#be935a');
        this.material = new CGFappearance(scene);
        this.material.setAmbient(green[0],green[1],green[2], 1.0);
        this.material.setDiffuse(green[0],green[1],green[2], 1.0);
        this.material.setSpecular(green[0], green[1], green[2], 1.0);
        this.material.setShininess(10.0);

        this.initBuffers();
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

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.cilinder.display();
        this.scene.popMatrix();
    }
}


