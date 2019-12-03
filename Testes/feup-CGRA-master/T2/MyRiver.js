class MyRiver extends CGFobject {

	constructor(scene, length, texture, heightmap) {
		super(scene);
        
		this.scene = scene;
        this.texture = texture;
        this.heightmap = heightmap;
        
        this.river = new Plane(scene, length);
		this.riverShader =  new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
		this.scene.setActiveShader(this.riverShader);

        // Materials and textures initialization
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.9, 0.9, 0.9, 1);
		this.appearance.setShininess(120);

		this.river_tex = new CGFtexture(this.scene, 'images/' + this.texture);
		this.river_map = new CGFtexture(this.scene, 'images/' + this.heightmap);

		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.riverShader.setUniformsValues({ uSampler2: 1 });
		this.riverShader.setUniformsValues({ timeFactor: 0 });
		// shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
	}

	update(t) {
		this.riverShader.setUniformsValues({ timeFactor: (t / 3000)*5*this.scene.speedFactor % 1000 });
	}

	display() {
		this.scene.setActiveShader(this.riverShader);

		//Texture and apearance of river
		this.appearance.apply();
		this.appearance.setTexture(this.river_tex);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.river_map.bind(1);

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);

        this.scene.pushMatrix();
        	this.river.display();
		this.scene.popMatrix();
		
		this.scene.setActiveShader(this.scene.defaultShader);
	}
}