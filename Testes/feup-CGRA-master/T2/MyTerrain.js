class MyTerrain extends CGFobject {

	constructor(scene, length, texture, heightmap, altimetry) {
		super(scene);
        
		this.scene = scene;
        this.texture = texture;
        this.heightmap = heightmap;
		this.altimetry = altimetry;
		this.lenght = length;
        
        this.terrain = new Plane(scene, 32);
		this.terrainShader =  new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
		this.scene.setActiveShader(this.terrainShader);

        // Materials and textures initialization
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		this.terrain_tex = new CGFtexture(this.scene, 'images/' + this.texture);
		this.terrain_map = new CGFtexture(this.scene, 'images/' + this.heightmap);
		this.terrain_altimetry = new CGFtexture(this.scene, 'images/' + this.altimetry);

		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.terrainShader.setUniformsValues({ uSampler2: 1 , uSampler3: 2});
		this.terrainShader.setUniformsValues({normScale: 60});
		// shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
	}

	display() {
		this.scene.setActiveShader(this.terrainShader);

		//Texture and apearance of terrain
		this.appearance.apply();
		this.appearance.setTexture(this.terrain_tex);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.terrain_map.bind(1);
		this.terrain_altimetry.bind(2);

		this.scene.pushMatrix();
			//this.scene.scale(this.length, this.length, this.length);
        	this.terrain.display();
		this.scene.popMatrix();
		
		this.scene.setActiveShader(this.scene.defaultShader);
	}
}