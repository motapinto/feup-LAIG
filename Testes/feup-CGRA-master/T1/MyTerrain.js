/**
* MyTerrain
* @constructor
* @param scene - Reference to MyScene object
* @param z_lenght - z lenght of quad
* @param x_lenght - x lenght of quad
* @param img - image name (Ex: 'terrain.jpg')
*/
class MyTerrain extends CGFobject
{
    constructor(scene, z_length, x_length, img)
	{
        super(scene);
        this.scene = scene;

        this.z_length = z_length;
        this.x_length = x_length;
        this.img = img;
        this.tex_iter = 0.2;

        this.quad = new MyQuad(scene, [x_length, 0, x_length, z_length, 0,0, 0, z_length]); //constructor(scene, coords) 
        
        this.terrain_material = new CGFappearance(scene);
		this.terrain_material.setAmbient(0.7 , 0.7 , 0.7 , 1);
		this.terrain_material.setDiffuse(0.4 , 0.4 , 0.4 , 1);
		this.terrain_material.setSpecular(1, 1, 1, 1);
		this.terrain_material.setShininess(80);
        this.terrain_material.loadTexture('images/' + img);
        this.terrain_material.setTextureWrap('REPEAT', 'REPEAT');
    };

    display()
	{
            this.scene.pushMatrix();
            
            this.tex_iter += 0.2;
            this.quad.texCoords = [this.x_length+this.tex_iter, 0, this.x_length+this.tex_iter, this.z_length+this.tex_iter, 0,0, 0, this.z_length+this.tex_iter];
            this.scene.translate(0, -0.0001, 0);
            this.scene.scale(this.x_length, 2, this.z_length);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.terrain_material.apply();
            this.quad.display();

            this.scene.popMatrix();
    };
    
    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}
