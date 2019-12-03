class ShaderScene extends CGFscene {

	constructor() {
		super();
		this.texture = null;
		this.appearance = null;

		// initial configuration of interface
		this.wireframe = false;
		this.showShaderCode = false;
        this.displayNormals = false;
        this.displayAxis = true;
		this.scaleFactor = 15.0;

		this.time_val = 0;
	}

	init(application) {
		// main initialization
		super.init(application);
		this.initCameras();
		this.initLights();

		this.enableTextures(true);

		this.gl.clearDepth(10000.0);
		this.gl.clearColor(1, 1, 1, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		// objects initialization
		this.axis = new CGFaxis(this);
		this.terrain = new Plane(this, 60);
        this.bird = new MyBird(this, 'bird_face.jpg', 'escamas.jpg', 'wings.jpg', 'eyes.jpg', 'eyes.jpg', 'tail.jpg', 'legs.jpg');
		this.house = new MyHouse(this, 4, 8, 'wall.jpg', 'roof.jpg', 'pillar.jpg', 'door.png', 'window.png');
		this.cubemap = new MyUnitCube(this, true);

		// Materials and textures initialization
		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		this.terrain_tex = new CGFtexture(this, "images/terrain.jpg");
		this.terrain_map = new CGFtexture(this, "images/heightmap.png");
		//this.terrain_map = new CGFtexture(this, "images/heightmap_origin.jpg");
		this.terrain_altimetry = new CGFtexture(this, "images/altimetry.png");

		// shaders initialization
		this.testShaders = 
			new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.testShaders.setUniformsValues({ uSampler2: 1, uSampler3: 2});

		// shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

		// force initial setup of shader code panels
		this.onShaderCodeVizChanged(this.showShaderCode);
		// set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.setUpdatePeriod(50);

	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 20, 100), vec3.fromValues(0, 0, 0));
	};

	initLights() {

		if (this.lights.length > 0) {
			this.lights[0].setPosition(0, 0, 10, 1);
			this.lights[0].setAmbient(0.2, 0.2, 0.2, 1);
			this.lights[0].setDiffuse(0.9, 0.9, 1.0, 1);
			this.lights[0].setSpecular(0, 0, 0, 1);
			this.lights[0].enable();
			this.lights[0].update();
		}
	};

	// Show/hide shader code
	onShaderCodeVizChanged(v) {
		if (v)
			this.shadersDiv.style.display = "block";
		else
			this.shadersDiv.style.display = "none";
	}

	// Called when selected shader changes
	onSelectedShaderChanged(v) {
		// update shader code
		this.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].vertexURL) + "</xmp>";
		this.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[v].fragmentURL) + "</xmp>";

		// update scale factor
		this.onScaleFactorChanged(this.scaleFactor);
	}

	// updates the selected object's wireframe mode
	onWireframeChanged(v) {
		if (v)
			this.object.setLineMode();
		else
			this.object.setFillMode();

	}

	// called when the scale factor changes on the interface
	onScaleFactorChanged(v) {
		this.testShaders.setUniformsValues({ normScale: this.scaleFactor });
	}

	// called periodically (as per setUpdatePeriod() in init())
	update(t) {
		this.testShaders.setUniformsValues({ timeFactor: t / 100 % 1000 });
	}

	// main display function
	display() {
		// Clear image and depth buffer every time we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();
		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();
		//Uncomment following lines in case texture must have wrapping mode 'REPEAT'
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
		// Update all lights used
		this.lights[0].update();
		// Draw axis
		this.axis.display();

		//Texture and apearance of terrain
		this.appearance.setTexture(this.terrain_tex);
		this.appearance.apply();
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.terrain_map.bind(1);
		this.terrain_altimetry.bind(2);

		// activate selected shader
		this.setActiveShader(this.testShaders);

		this.pushMatrix();

		if (this.displayNormals) {
			this.house.enableNormalViz();
			this.bird.enableNormalViz();
        }

        else {
			this.house.disableNormalViz();
			this.bird.disableNormalViz();
		}

		this.pushMatrix();
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.scale(60, 60, 60);
		this.terrain.display();
		this.popMatrix();

		this.pushMatrix();
        this.translate(0, 5, 0);
        this.scale(0.7, 0.7, 0.7);
        this.bird.display();
        this.popMatrix();

        this.pushMatrix();
        this.house.display();
		this.popMatrix();
		
		this.pushMatrix();
		this.cubemap.display();
		this.popMatrix();

		// restore default shader (will be needed for drawing the axis in next frame)
		this.setActiveShader(this.defaultShader);
	}
}