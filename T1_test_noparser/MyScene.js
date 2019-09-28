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

        //Background color
        this.gl.clearColor(0.8, 0, 0.5, 1);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        //this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.tableLeg = new MyCylinder(this, 0.1, 0.1, 1, 20, 5);
        this.tableTop = new MyCylinderTops(this, 0.8, 0.8, 0.1, 4, 4, 1);
        this.tableSupport = new MyCylinder(this, 0.5, 0.1, 0.2, 4, 4);

        this.chairBase = new MyCylinderTops(this, 0.4, 0.4, 0.2, 4, 4, 2);
        this.chairLeg = new MyCylinderTops(this, 0.05, 0.05, 0.5, 4, 4, 3);
        this.chairLeg2 = new MyCylinderTops(this, 0.05, 0.05, 0.85, 4, 4, 3);
        this.chairSupport = new MyCylinderTops(this, 0.45, 0.45, 0.07, 4, 4, 4);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];
        this.multMatrix(sca);


        //CHAIR
        this.pushMatrix();
            this.translate(0, 0, 0.5);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(0, 3, 0.5);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(3, 3, 0.5);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(3, 0, 0.5);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(1, 1, 0.5);
            this.rotate(Math.PI, 0, 0, 1);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(1, 4, 0.5);
            this.rotate(Math.PI, 0, 0, 1);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(4, 1, 0.5);
            this.rotate(Math.PI, 0, 0, 1);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();

        //CHAIR
        this.pushMatrix();
            this.translate(4, 4, 0.5);
            this.rotate(Math.PI, 0, 0, 1);
            //LEGS
            this.pushMatrix();
                this.translate(0.3, 0, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(0, 0.3, -0.5);
                this.chairLeg.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.40, -0.05, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            this.pushMatrix();
                this.translate(-0.05, -0.40, -0.5);
                this.chairLeg2.display();
            this.popMatrix();
            
            //BASE
            this.pushMatrix();
                this.chairBase.display();
            this.popMatrix();

            //SUPPORT
            this.pushMatrix();
                this.translate(-0.248, -0.248, 0.66)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.rotate(Math.PI/4, 1, 0, 0)
                this.rotate(Math.PI/2, 0, 1, 0)
                this.chairSupport.display();
            this.popMatrix();
        this.popMatrix();


        this.pushMatrix();
            this.translate(3, 0, 0);
            this.pushMatrix();
                this.translate(0.5, 0.5, 0);
                    this.tableSupport.display();
                    this.tableLeg.display();
                this.popMatrix();

                this.pushMatrix();
                    this.translate(0.5, 0.5, 1);
                    this.tableTop.display();
            this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
            this.translate(0, 3, 0);
            this.pushMatrix();
                this.translate(0.5, 0.5, 0);
                    this.tableSupport.display();
                    this.tableLeg.display();
                this.popMatrix();

                this.pushMatrix();
                    this.translate(0.5, 0.5, 1);
                    this.tableTop.display();
            this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
            this.translate(3, 3, 0);
            this.pushMatrix();
                this.translate(0.5, 0.5, 0);
                    this.tableSupport.display();
                    this.tableLeg.display();
                this.popMatrix();

        this.pushMatrix();
                    this.translate(0.5, 0.5, 1);
                    this.tableTop.display();
            this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
                this.translate(0.5, 0.5, 0);
                    this.tableSupport.display();
                    this.tableLeg.display();
                this.popMatrix();

                this.pushMatrix();
                    this.translate(0.5, 0.5, 1);
                    this.tableTop.display();
        this.popMatrix();
    }
}