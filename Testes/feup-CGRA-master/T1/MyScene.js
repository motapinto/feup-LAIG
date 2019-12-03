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
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this, 35, 35, 'terrain.jpg'); //constructor(scene, z_length, x_length, img)
        this.lake = new MyLake(this, 6, 35, 'water_pool.jpg'); //constructor(scene, z_length, x_length, img)
        this.tree_row_patch_1 = new MyTreeRowPatch(this, 1, 0.15, 1, 0.4, 'trunk1.jpg', 'leaf2.jpg'); //constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text) 
        this.tree_row_patch_2 = new MyTreeRowPatch(this, 1, 0.15, 1, 0.4, 'trunk1.jpg', 'leafs1.png'); //constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text) 
        this.tree_group_patch_1 = new MyTreeGroupPatch(this, 1, 0.15, 1, 0.4, 'trunk1.jpg', 'leafs2.png'); //constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text)
        this.tree_group_patch_2 = new MyTreeGroupPatch(this, 1, 0.15, 1, 0.4, 'trunk1.jpg', 'leaf1.jpg'); //constructor(scene, trunk_height, trunk_radius, tree_height, tree_radius, trunk_text, tree_text) 
        this.hill_small = new MyVoxelHill(this, 3, 'mineSide.png', 'mineTop.png', 'mineBottom.png'); //constructor(scene, levels, side_img, top_img, bottom_img)
        this.hill_big = new MyVoxelHill(this, 5, 'mineSide.png', 'mineTop.png', 'mineBottom.png'); //constructor(scene, levels, side_img, top_img, bottom_img)
        this.lamp = new MyLamp(this, 10, 0.5); //constructor(scene, slices, radius) 
 
        this.house = new MyHouse(this, 4, 6, 'wall.jpg', 'roof.jpg', 'pillar.jpg', 'door.png', 'window.png'); //constructor(scene, roof_slices, pillar_slices, wall_img, roof_img, pillar_img, door_img, windows_img)
        this.cube_map = new MyCubeMap(this, 35, this.selected_lights, 'day_cubemap.png', 'night_cubemap.png'); //constructor(scene, size, day_value, day_text, night_text) 

        this.lights = [this.lights[0], this.lights[1], this.lights[2]];
        this.lightsIDs = { 'Day': 0, 'Night': 1};

        //Other variables connected to MyInterface
        this.selected_lights = 0;
        this.displayAxis = true;
        this.displayNormals = false;
        this.enable_textures = true;
        this.scaleFactor = 1.0;
    }

    initCameras() {
        this.camera = new CGFcamera(1, 1, 100, vec3.fromValues(25, 15, 29), vec3.fromValues(12, 7, 12));
    }

    initLights() {
        this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);
        
        this.sun_color = this.hexToRgbA('#F3C25F');
        this.lights[0].setPosition(10, 10, 10, 1.0);
        this.lights[0].setDiffuse(this.sun_color[0], this.sun_color[1], this.sun_color[2], 1.0);
        this.lights[0].setSpecular(this.sun_color[0], this.sun_color[1], this.sun_color[2], 1.0);
        this.lights[0].setLinearAttenuation(0.1);
        this.lights[0].enable();
        this.lights[0].setVisible(false);
        this.lights[0].update();

        this.night1_color = this.hexToRgbA('#314C5D');
        this.lights[1].setPosition(10, 10, 10, 1.0);
        this.lights[1].setDiffuse(this.night1_color[0], this.night1_color[1], this.night1_color[2], 1.0);
        this.lights[1].setSpecular(this.night1_color[0], this.night1_color[1], this.night1_color[2], 1.0);
        this.lights[1].setLinearAttenuation(0.1);
        this.lights[1].enable();
        this.lights[1].setVisible(false);
        this.lights[1].update();

        this.night2_color = this.hexToRgbA('#aa5a17');
        this.lights[2].setPosition(8, 2.5, 10, 1.0);
        this.lights[2].setDiffuse(this.night2_color[0], this.night2_color[1], this.night2_color[2], 1.0);
        this.lights[2].setSpecular(this.night2_color[0], this.night2_color[1], this.night2_color[2], 1.0);
        this.lights[2].setLinearAttenuation(0.1);
        this.lights[2].enable();
        this.lights[2].setVisible(false);
        this.lights[2].update();
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

    updateObject(){
        //this.objects[this.selectedObject];
    }

    updateDayLight(){
        if(this.selected_lights == 1) {
            this.lights[1].update();
        }
        else
            this.lights[0].update();
    }
    
    display() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();

        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        //Lights management
        for(var i = 0; i <= 2; i++) {
            if(i == this.selected_lights)
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
             if(this.selected_lights == 1) {
                this.lights[2].enable();
                this.cube_map.day_value = 1; 
             }
             else 
                this.cube_map.day_value = 0;

            this.lights[i].update();
       }
        
        if (this.displayAxis) {
            this.axis.display();
        }

        if (this.displayNormals) {
            this.tree_group_patch_1.enableNormalViz();
            this.tree_group_patch_2.enableNormalViz();
            this.tree_row_patch_1.enableNormalViz();
            this.tree_row_patch_2.enableNormalViz();
            this.house.enableNormalViz();
            this.hill_small.enableNormalViz();
            this.hill_big.enableNormalViz();
            this.lake.enableNormalViz();
            this.terrain.enableNormalViz();
            this.cube_map.enableNormalViz();
        }

        else {
            this.tree_group_patch_1.disableNormalViz();
            this.tree_group_patch_2.disableNormalViz();
            this.tree_row_patch_1.disableNormalViz();
            this.tree_row_patch_2.disableNormalViz();
            this.house.disableNormalViz();
            this.hill_small.disableNormalViz();
            this.hill_big.disableNormalViz();
            this.terrain.disableNormalViz();
            this.lake.disableNormalViz();
            this.cube_map.disableNormalViz();
        }

        if(this.enable_textures) {
            this.enableTextures(true);
        }

        else {
            this.enableTextures(false);
        }

        //CUBEMAP
        this.cube_map.display();

        //LAMP
        this.pushMatrix();
        this.translate(8, 0, 10);
        this.lamp.display();
        this.popMatrix();
        
        //HOUSE
        this.pushMatrix();
        this.translate(5, 0, 9);
        this.house.display();
        this.popMatrix();

        //HILLS
        this.pushMatrix();
        this.translate(4, 0, 23);
        this.rotate(-Math.PI, 0, 1, 0)
        this.hill_small.display(); 
        this.popMatrix();

        this.pushMatrix();
        this.translate(16, 0, 8);
        this.hill_big.display(); 
        this.popMatrix();
        
        //TREES
        this.pushMatrix();
        this.translate(1, 0, 4);
        this.tree_group_patch_1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(8, 0, 4);
        this.tree_group_patch_2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(1, 0, 2.5);
        this.tree_row_patch_1.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(5, 0, 1);
        this.tree_row_patch_2.display();
        this.popMatrix();

        //TERRAIN
        this.terrain.display();

        //LAKE
        this.pushMatrix();
        this.translate(0, 0.0001, 14.5);
        this.lake.display();
        this.popMatrix();
    }
}