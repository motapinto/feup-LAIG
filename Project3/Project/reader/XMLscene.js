var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();
        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);
        this.sceneInited = false;
        this.initCameras();
        this.enableTextures(true);

        this.lightsInterface = {};

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.audioEnable = true;
        this.scaleFactor = 1;
        this.floor = 0;
        this.floorMax = 0;
        this.viewsList = [];
        this.selectedCamera = null;
        this.tInit = null;
        this.updatePeriod = 50;
        this.setUpdatePeriod(this.updatePeriod);
        this.setPickEnabled(true);
        this.fixedCamera = false;

        this.orchestrator = new MyGameOrchestrator(this, this.graph);

        this.speed = 1;
        this.gameType = 0;
        this.AI1 = 0;
        this.AI2 = 0;
        this.custom1 = 0;
        this.custom2 = 0;
        this.gameEnded = false;

        this.floorUp = function(){
            if(this.floor < this.floorMax)
                this.floor++;
            if(this.floor < 0)
                this.floor = 1;
        }

        this.floorDown = function(){
            if(this.floor > 0)
                this.floor--;
            if(this.floor > this.floorMax)
                this.floor = this.floorMax - 1;
        }

        this.resetCamera = function () {
            this.graph.views['default'] = this.orchestrator.resetCamera(0);
            this.selectedCamera = 'default';
        }

        this.resetBoard = function () {
            this.orchestrator.start();
        }

        this.resetScores = function () {
            this.orchestrator.gameStats.score1 = 0;
            this.orchestrator.gameStats.score2 = 0;
        }
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
      this.camera = new CGFcamera(0.4, 0.1, 350, vec3.fromValues(5, 5, 5), vec3.fromValues(0, 0, 0));
    }

    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        let i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (let key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                let light = this.graph.lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                    this.lights[i].setConstantAttenuation(light[9][0]);
                    this.lights[i].setLinearAttenuation(light[9][1]);
                    this.lights[i].setQuadraticAttenuation(light[9][2]);
                }

                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
        while (i < 8) {
            this.lights[i].disable();
            this.lights[i].update();
            i++;
        }
    }

    /**
     * Sets default appearance.
     */
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    /** 
     * Handler called when the graph is finally loaded. 
     *  As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() { 
        this.graph = this.newGraph;
        this.axis = new CGFaxis(this, this.graph.referenceLength);
        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);
        
        if (this.sceneInited)
            this.orchestrator.onGraphChanged(this.graph);
        else
            this.orchestrator.onGraphLoaded(this.graph);
        
        this.initLights();
        this.sceneInited = true;
        this.selectedCamera = this.graph.idView;
        this.viewsList = this.graph.viewsList;
        
        this.addLights(this.graph.lights);

        this.setCamera(this.graph.views[this.selectedCamera]);
    }

    /**
     * Checks keys input.
     */
    checkKeys(t) {
        if (this.gui.isKeyPressed("KeyM")) {
            this.graph.materialRotate++;
        }
        if (this.gui.isKeyPressed("KeyZ")) {
            this.orchestrator.undo();
        }
        if (this.gui.isKeyPressed("KeyC")) {
            this.orchestrator.changePlayer();
        }
        if (this.gui.isKeyPressed("KeyX")) {
            this.orchestrator.startMovie();
        }
        if (this.gui.isKeyPressed("Escape")) {
            this.orchestrator.endMovie();
        }
        if (this.gui.isKeyPressed("Digit1")) {
            this.orchestrator.loadTheme(1);
        }
        if (this.gui.isKeyPressed("Digit2")) {
            this.orchestrator.loadTheme(2);
        }
        if (this.gui.isKeyPressed("Digit3")) {
            this.orchestrator.loadTheme(3);
        }
        if (this.gui.isKeyPressed("Digit4")) {
            this.orchestrator.loadTheme(4);
        }
    }

    /**
     * Update function.
     */
    update(t) {
        if (this.sceneInited) {
            if(this.tInit == null)
                this.tInit = t;
            
            let instant = (t - this.tInit) / 1000;
    
            this.checkKeys(t);
            this.graph.updateAnimations(instant); //t is in miliseconds
    
            // this.sequence.update(t);  
            this.orchestrator.update(instant);
            
        }
    }

    /**
     * Selects active camara.
     */
    setCamera(camera){
        this.camera = camera;
        this.interface.setActiveCamera(this.fixedCamera?null:camera);
    }

    /**
     * Updates interface selected lights
     */
    updateLights() {
        //Updates lights in the display
        let i = 0;
        for (let key in this.lightsInterface) {
            if (this.lightsInterface.hasOwnProperty(key)) {
                if (this.lightsInterface[key]) {
                    this.lights[i].enable();
                    this.lights[i].setVisible(false);
                }
                else {
                    this.lights[i].disable();
                }
                this.lights[i++].update();
            }
        }
    }

    addLights(lights) {
        this.lightsInterface = {};

        for (let key in lights) { //key = light name 
            if (lights.hasOwnProperty(key)) {
                this.lightsInterface[key] = lights[key][0];
            }
        }

    }

    /**
     * Display the scene.
     */
    display() {  
        this.clearPickRegistration();
        
        if(this.sceneInited){
            this.orchestrator.orchestrate(this.pickMode, this.pickResults);
            this.orchestrator.attachCameras();
            this.render(this.graph.views[this.selectedCamera]);
        }
    }

    /**
     * Renders the scene with given camera
     */
    render(camera) {
        this.setCamera(camera);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

        this.pushMatrix();

            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.setDefaultAppearance();    
            this.updateLights();
            
            this.rotate(this.orchestrator.cameraDegrees, 0, 1, 0);
            this.graph.displayScene();
            this.orchestrator.display();
            
        this.popMatrix();
    }
}