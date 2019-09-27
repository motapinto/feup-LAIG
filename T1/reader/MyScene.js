/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        // this.cilindro = new MyCylinder(this, 1, 5, 5, 20, 5);
        // this.circle = new MyCircle(this, 10, 1)
        this.cone = new MyCone(this, 5, false, 2, 2);
        this.tri = new MyTriangle(this, -2, 2, 0, 0, 0, 0, 6, 6, 0);
        this.Ambient_Light = 0.3;

        this.branchTxt = new CGFappearance(this);
        this.branchTxt.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.branchTxt.setDiffuse(.8, .8, .8, 1.0);
        this.branchTxt.setSpecular(0, 0, 0, 1.0);
        this.branchTxt.setShininess(10.0);
        this.branchTxt.loadTexture('scenes/images/bank.jpg');
        this.branchTxt.setTextureWrap('REPEAT', 'REPEAT'); 
    }

    updateAmbientLight() {
        this.setGlobalAmbientLight(this.Ambient_Light, this.Ambient_Light, this.Ambient_Light, 1, 0);
    }

    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(5.0, 5.0, 5.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix(); 

        this.setDefaultAppearance();
 
        this.axis.display();
        // this.circle.display();
        // this.cilindro.display();
        // this.cilindro.enableNormalViz();
        this.branchTxt.apply();
        this.cone.display();
        // this.tri.display();
        // this.tri.enableNormalViz();
    }
}