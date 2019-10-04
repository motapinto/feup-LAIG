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
        this.gl.clearColor(0.8, 0.4, 0.5, 1);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        this.enableTextures(true);
        this.axis = new CGFaxis(this);
        //TABLE
        this.tableLeg = new MyCylinder(this, 0.1, 0.1, 1, 20, 5);
        this.tableTop = new MyCylinderTops(this, 0.8, 0.8, 0.1, 4, 4, 1);
        this.tableSupport = new MyCylinder(this, 0.5, 0.1, 0.2, 4, 4);
        //CHAIR
        this.chairBase = new MyCylinderTops(this, 0.4, 0.4, 0.2, 4, 4, 2);
        this.chairLeg = new MyCylinderTops(this, 0.05, 0.05, 0.5, 4, 4, 3);
        this.chairLeg2 = new MyCylinderTops(this, 0.05, 0.05, 0.85, 4, 4, 3);
        this.chairSupport = new MyCylinderTops(this, 0.45, 0.45, 0.07, 4, 4, 4);
        //TERRAIN
        this.restaurantTerrain = new MyRectangle(this, -1, 12, -1, 20);
        this.terrain = new MyRectangle(this, -20, 20, -20, 20);
        //BALCAO
        this.balcaoCenter = new MyCylinder(this, 0.7, 0.7, 1.5, 4, 4);
        this.balcaoTop = new MyCylinderTops(this, 1, 1, 0.3, 4, 4, 5);
        this.balcaoChairLeg = new MyCylinder(this, 0.1, 0.1, 1.2, 20, 5);
        this.balcaoChairBase = new MyCylinderTops(this, 0.45, 0.45, 0.07, 4, 4, 4);
        this.balcaoChairSupport = new MyCylinderTops(this, 0.45, 0.45, 0.07, 4, 4, 4);
        //DOOR
        this.door = new MyCylinderTops(this, 0.75, 0.75, 2.5, 4, 4, 4);
        this.doorHandleSupport = new MyCylinder(this, 0.03, 0.03, 0.3, 4, 5);
        this.doorHandle = new MyCylinder(this, 0.03, 0.03, 0.4, 4, 5);
        //WALLS
        this.wall = new MyCylinderTops(this, 6, 6, 3.5, 4, 4, 4);

        //DONOUT LOGO
        this.logo = new MyTorus(this, 40, 0.5, 1, 40);
        this.logoSupport = new MyCylinderTops(this, 0.3, 0.3, 2, 10, 10, 3);

        this.tri = new MyTriangle(this, 0, -2, 2, -1, 0, 2, 0, 1, 0);
        this.sfe = new MySphere(this, 1, 20, 20);
        this.cyl = new MyCylinder(this, 1, 1, 4, 20, 5); //(scene, radiusBottom, radiusTop, height, slices, stacks
        this.tor = new MyTorus(this, 40, 1, 2, 40);
        this.ret = new MyRectangle(this, 0, 5, 0, 5) //constructor(scene, x1, x2, y1, y2)

        this.initMaterials();

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

    initMaterials() {
        this.restaurantTiles = new CGFappearance(this);
        this.restaurantTiles.setAmbient(0.9, 0.2, 0.6, 1.0);
        this.restaurantTiles.setDiffuse(0.9, 0.8, 0.8, 1.0);
        this.restaurantTiles.setSpecular(0.4, 0.1, 0.1, 1.0);
        this.restaurantTiles.setShininess(10.0);
        this.restaurantTiles.loadTexture('restaurantTiles.jpg');
        this.restaurantTiles.setTextureWrap('REPEAT', 'REPEAT');

        this.terrainTiles = new CGFappearance(this);
        this.terrainTiles.setAmbient(0.9, 0.2, 0.6, 1.0);
        this.terrainTiles.setDiffuse(0.9, 0.8, 0.8, 1.0);
        this.terrainTiles.setSpecular(0.4, 0.1, 0.1, 1.0);
        this.terrainTiles.setShininess(10.0);
        this.terrainTiles.loadTexture('grass.jpg');
        this.terrainTiles.setTextureWrap('REPEAT', 'REPEAT');

        this.balconyCenter = new CGFappearance(this);
        this.balconyCenter.setAmbient(0.9, 0.2, 0.6, 1.0);
        this.balconyCenter.setDiffuse(0.9, 0.8, 0.8, 1.0);
        this.balconyCenter.setSpecular(0.4, 0.1, 0.1, 1.0);
        this.balconyCenter.setShininess(10.0);
        this.balconyCenter.loadTexture('balconyCenter.jpg');
        this.balconyCenter.setTextureWrap('REPEAT', 'REPEAT');

        this.balconyTop = new CGFappearance(this);
        this.balconyTop.setAmbient(0.9, 0.2, 0.6, 1.0);
        this.balconyTop.setDiffuse(0.9, 0.8, 0.8, 1.0);
        this.balconyTop.setSpecular(0.4, 0.1, 0.1, 1.0);
        this.balconyTop.setShininess(10.0);
        this.balconyTop.loadTexture('balconyTop.jpg');
        this.balconyTop.setTextureWrap('REPEAT', 'REPEAT');
    }

    displayChairs() {
        for(let i=0; i<3; i++) {
            for(let j=0; j<4; j++) {
                this.pushMatrix();
                    //CHAIR1
                    this.translate(3*j, 3*i, 0.5);
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
                
                //CHAIR2
                this.pushMatrix();
                    this.translate(1+3*j, 1+3*i, 0.5);
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
            }
        }
    }

    displayTables() {
        //TABLES
        for(let i=0; i<3;i++) {//y
            for(let j=0; j<4; j++) {//x
                this.pushMatrix();
                    this.translate(3*j+0.5, 3*i+0.5, 0);
                    this.pushMatrix();
                            this.translate(0, 0, 0);
                            this.tableSupport.display();
                            this.tableLeg.display();
                    this.popMatrix();

                    this.pushMatrix();
                        this.translate(0, 0, 1);
                        this.tableTop.display();
                    this.popMatrix();
                this.popMatrix();
            }
        }
    }

    displayTerrain() {
        //this.terrain.updateTexCoords(11, 11);
        this.pushMatrix();
            this.restaurantTiles.apply();
            this.restaurantTerrain.display();

            this.translate(0, 0, -0.1)
            this.terrainTiles.apply();
            this.terrain.display();
        this.popMatrix();
    }

    displayDoor() {
        this.pushMatrix();
            this.translate(12, 9.5, 0)
            this.pushMatrix();
                this.scale(0.1, 1, 1)
                this.rotate(Math.PI/4, 0, 0, 1)
                this.door.display();
            this.popMatrix();

            this.pushMatrix();
                this.translate(0.2, 0.2, 1)
                this.rotate(-Math.PI/2, 0, 1, 0)
                this.doorHandle.display();
                this.translate(0, 0.01, 0)
                this.rotate(Math.PI/2, 1, 0, 0)
                this.doorHandleSupport.display()
            this.popMatrix();

            this.pushMatrix();
                this.translate(-0.2, 0.2, 1)
                this.rotate(Math.PI/2, 1, 0, 0)
                this.doorHandleSupport.display()
            this.popMatrix();

        this.popMatrix();
    }

    displayLogo() {
        this.pushMatrix();
        this.translate(-2,-2, 0);
            this.pushMatrix();
                this.translate(0, 0, 3);
                this.rotate(Math.PI/2, 1, 0, 0);
                this.logo.display();
            this.popMatrix();
            this.pushMatrix();
                this.logoSupport.display();
            this.popMatrix();
        this.popMatrix();
    }

    displayBalcao() {
        for(let i=0;i<8;i++) {
            this.pushMatrix();
                this.translate(2+i*0.98, 17.8, 1.5);
                this.scale(0.7, 1, 1);
                this.rotate(Math.PI/4, 0, 0, 1);
                
                this.balconyTop.apply();
                this.balcaoTop.display();
            this.popMatrix();
            
            this.pushMatrix();
                this.translate(2+i*0.98, 18, 0);
                this.rotate(Math.PI/4, 0, 0, 1);
                
                this.balconyCenter.apply();
                this.balcaoCenter.display(); 

            this.popMatrix();

        }
    }

    displayBalcaoChair() {
        for(let j=0; j<8;j++) {//y
                this.pushMatrix();
                this.translate(0.98*j+2, 16, 0);
                this.rotate(Math.PI/4, 0,0,1);
                    
                    this.pushMatrix();
                            this.tableSupport.display();
                            this.balcaoChairLeg.display();
                    this.popMatrix();

                    this.pushMatrix();
                        this.translate(0, 0, 1.2);
                            this.balcaoChairBase.display();
                            this.translate(-0.2, -0.2, 0.38);
                            this.rotate(Math.PI/4, 0, 0, 1)
                            this.rotate(Math.PI/4, 1, 0, 0)
                            this.rotate(Math.PI/2, 0, 1, 0)
                            this.balcaoChairSupport.display();
                    this.popMatrix();

                this.popMatrix();
        }
    }

    displayWalls() {
        this.pushMatrix();
            this.pushMatrix();
                this.translate(12, 3.5, 0);
                this.scale(0.01, 1, 1);
                this.rotate(Math.PI/4, 0,0,1);
                this.wall.display();
            this.popMatrix();

            this.pushMatrix();
                this.translate(12, 15.5, 0);
                this.scale(0.01, 1, 1);
                this.rotate(Math.PI/4, 0,0,1);
                this.wall.display();
            this.popMatrix();
        this.popMatrix();
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


        this.displayChairs();
        this.displayTables();
        this.displayTerrain();
        this.displayBalcao();
        this.displayBalcaoChair();
        this.displayLogo();
        this.displayWalls();
        this.displayDoor();
        //this.material.apply();
        
        //this.ret.display();
        //this.cyl.display();
        //this.tor.display();
        //this.sfe.display();
        //this.tri.display();
        
        //this.ret.enableNormalViz();
        //this.cyl.enableNormalViz();
        //this.tor.enableNormalViz();
        //this.sfe.enableNormalViz();
        //this.tri.enableNormalViz();

        
    }
}