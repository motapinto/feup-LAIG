/**
* MyLake
* @constructor
*/
class MyLake extends CGFobject
{
    constructor(scene, z_length, x_length, water_img)
	{
        super(scene);
        this.scene = scene;

        
        this.water_img = water_img;
        this.z_length = z_length
        this.x_length = x_length;

        this.iter_x = x_length / 2;
        this.iter_z = z_length / 2;

        this.quad = new MyQuad(scene, [x_length, 0, x_length, z_length, 0,0, 0, z_length]);

        
        this.water_material = new CGFappearance(this.scene);
		this.water_material.setAmbient(0.4 , 0.4 , 0.4 , 1);
		this.water_material.setDiffuse(0.5 , 0.5 , 0.5 , 1);
		this.water_material.setSpecular(1, 1, 1, 1);
		this.water_material.setShininess(80);
        this.water_material.loadTexture('images/' + this.water_img);
        this.water_material.setTextureWrap('REPEAT', 'REPEAT');
    };

    display()
	{
        for(var i = 0; i < this.z_length; i++) {
            for(var j = 0; j < this.x_length; j++) {
                this.scene.pushMatrix();
                this.scene.translate(j, 0, i);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.water_material.apply();
                this.quad.display();
                this.scene.popMatrix();

                this.iter_x *= 2;
                this.iter_z *= 2;
                this.quad.texCoords += [this.iter_x, 0, this.iter_x, this.iter_z, 0,0, 0, this.iter_z];
            }
        }
    };
    
    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}
