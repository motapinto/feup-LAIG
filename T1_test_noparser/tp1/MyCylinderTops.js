/**
* MyCylinder
* @constructor
*/

class MyCylinderTops extends CGFobject {
    constructor(scene, radiusBottom, radiusTop, height, slices, stacks, id) {
        super(scene);
        this.scene = scene;
        this.height = height;
        this.radiusTop = radiusTop;

        var aux = 0

        this.cylinder = new MyCylinder(scene, radiusBottom, radiusTop, height, slices, stacks);
        if(id == 1) aux = 1.13
        else if (id == 2)aux = 0.57
        else if (id == 3)aux = 0.071
        else if (id == 4)aux = 0.64 //se raio = 0.8 -> h=sqrt(0.8^2 * 2)
        
        this.top = new MyRectangle(scene, 0, aux, 0, aux);

        this.initBuffers();
    }

    display() {

        this.cylinder.display();

        this.scene.pushMatrix();
            this.scene.translate(0, -this.radiusTop, this.height);
            this.scene.rotate(Math.PI/4, 0, 0, 1)
            this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, -this.radiusTop, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1)
            this.top.display();
        this.scene.popMatrix();

    }
}

