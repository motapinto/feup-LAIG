/**
* MyBird
* @constructor
* @param scene - Reference to MyScene object
*/

class MyBird extends CGFobject { //"Unit House" with height equal to 1
    constructor(scene, face_text, body_text, wings_text, nose_text, eyes_text, tail_text, legs_text) {
        super(scene);
        
        this.scene = scene;
        this.face_text = face_text;
        this.body_text = body_text;
        this.wings_text = wings_text;
        this.nose_text = nose_text;
        this.eyes_text = eyes_text;
        this.tail_text = tail_text;
        this.legs_text = legs_text;

        this.face = new MySemiSphere(scene, 20, 0.6, 5); //scene, slices, radius, stacks
        this.body = new MyPrism(scene, 10, 1, 0.4); //scene, slices, height, radius
        this.wings = new MyBirdWings(scene);
        this.nose = new MyPyramid(scene, 4, 1, 1); //scene, slices, height, radius
        this.eyes = new MyUnitCubeQuad(scene, eyes_text, body_text, body_text);
        this.tail = new MyBirdTail(scene, 4);
        this.legs = new MyBirdLegs(scene, 0.5);
        
        this.branch = undefined;

        //Initial position coordinates
        this.init_x = -20;
        this.init_y = 15;
        this.init_z = 10;

        //Initial movement parameters
        this.init_speed = 0;
        this.init_y_speed = 0;
        //Speed limits
        this.min_speed = 0; 
        this.max_speed = 5;

        //Time var's
        this.delta_time = 0;
        this.init_time = 0;
        this.total_time = 0;

        //Initial Directional parameter
        this.init_direction_angle = 0;
        //Directional parameters
        this.angle_change = (10*Math.PI) / 180; //6º (degrees)
        
        //Inititalize all variables
        this.init();
        
        //Set all initial textures
        this.setTextures();
        this.counter = 0;
        this.pos = 0;
    }

    //Sets bird textures and materials
    setTextures() {
        this.face_material = new CGFappearance(this.scene);
        this.face_material.setAmbient(0.8,0.8,0.8, 1.0);
        this.face_material.setDiffuse(0.65,0.65,0.65, 1.0);
        this.face_material.setSpecular(0.2,0.2, 0.2, 1.0);
        this.face_material.setShininess(10.0);
        this.face_material.loadTexture('images/' + this.face_text);
        this.face_material.setTextureWrap('REPEAT', 'REPEAT');

        this.body_material = new CGFappearance(this.scene);
        this.body_material.setAmbient(0.8,0.8,0.8, 1.0);
        this.body_material.setDiffuse(0.65,0.65,0.65, 1.0);
        this.body_material.setSpecular(0.2,0.2, 0.2, 1.0);
        this.body_material.setShininess(10.0);
        this.body_material.loadTexture('images/' + this.body_text);
        this.body_material.setTextureWrap('REPEAT', 'REPEAT');

        this.wings_material = new CGFappearance(this.scene);
        this.wings_material.setAmbient(0.7,0.7,0.7, 1.0);
        this.wings_material.setDiffuse(0.55,0.55,0.55, 1.0);
        this.wings_material.setSpecular(0.4,0.4,0.4, 1.0);
        this.wings_material.setShininess(10.0);
        this.wings_material.loadTexture('images/' + this.wings_text);
        this.wings_material.setTextureWrap('REPEAT', 'REPEAT');

        var nose_color = this.scene.hexToRgbA('#F0CB11');
        this.nose_material = new CGFappearance(this.scene);
        this.nose_material.setAmbient(nose_color[0],nose_color[1],nose_color[2], 1.0);
        this.nose_material.setDiffuse(nose_color[0],nose_color[1],nose_color[2], 1.0);
        this.nose_material.setSpecular(nose_color[0], nose_color[1], nose_color[2], 1.0);
        this.nose_material.setShininess(10.0);
    }

    //Inititalize settings and variables
    init() {
        //Position coordinates
        this.x = this.init_x;
        this.y = this.init_y;
        this.z = this.init_z;
        this.y_before_pick = this.y;
        //Directional parameters
        this.direction_angle = this.init_direction_angle;
        this.rot_wings = 0;
        //Speed var's
        this.speed = this.init_speed;
        this.last_speed = 0;
        this.y_speed = this.init_y_speed;
        //Pick tree branch methods var's
        this.ascending = false 
        this.descending = false
        this.to_pick = false;
        this.to_drop = false;
        //Puts branch back in place
        if(this.branch != undefined) {
            this.branch.init();
            this.scene.tree_branch = this.branch;
            this.branch = undefined;
        }
        else {
            for (var i = 0; i < 6; i++) {
                this.scene.tree_branch[i].init();
            }
        }
    }

    //Changes bird speed
    accelerate(key) {
        if(key == "W") {
            this.speed += this.scene.speedFactor * 2 * (this.scene.delta_time/1000);
        }

        else if(key == "S") {
            this.speed -= this.scene.speedFactor * 3 * (this.scene.delta_time/1000);
        }

        else {
            this.speed -= this.scene.speedFactor * 0.7 * (this.scene.delta_time/1000);
        }
    }

    //Changes direction in which the bird is facing -> PROBLEMA COM SPEED FACTOR!!
    turn(key) {          
        if(key == "A") {
            this.direction_angle = (this.direction_angle - (this.scene.speedFactor * this.angle_change)) % (Math.PI*2);
        }

        else if(key == "D") {
            this.direction_angle = (this.direction_angle + (this.scene.speedFactor * this.angle_change)) % (Math.PI*2);
        }

        else {
            this.direction_angle += /*this.scene.speedFactor **/ key;
        }
    }

    //Tries to pick a tree branch (only called when P is clicked)
    pick() {
        //Checks if it can pickup a branch that is referenced in Myscene
        for (var i = 0; i < 6; i++) {
            if(this.branch == undefined && this.scene.tree_branch[i].pick(i) == true) {
                this.branch = this.scene.tree_branch[i];
            }
        }
    }

    drop() {
        if(this.scene.nest.canDropInNest() == true) {
            this.branch.drop();
        }
        else if(this.y == 0) {
            this.to_drop = false;
        }
    }

    //Descend to pick tree branch (1 second animation)
    descend() {
        let speed_counter = 0;
        //Calculates speed counter based on delta_time(seconds passed since last call)
        speed_counter = (this.delta_time/1000) * this.y_before_pick;
        this.y -= speed_counter;
    }

    //Ascend after picking tree branch (1 second animation)
    ascend() {
        let speed_counter = 0;
        //Calculates speed counter based on delta_time(seconds passed since last call)
        speed_counter = (this.delta_time/1000) * this.y_before_pick;
        this.y += speed_counter;
    }

    //Changes y coordinate based on movement (all movements must be completed in 1 second)
    changeY(t) {        
        if ((this.to_pick || this.to_drop) && this.descending) {
            this.descend();
            this.checkBoundaries();
        }
        
        else if ((this.to_pick || !this.to_drop) && this.ascending) {
            this.ascend();
            this.checkBoundaries();
        }

        else {
            this.y += Math.sin(this.pos)/4;
            this.pos += Math.PI * this.scene.delta_time/500;            
            //this.y -= (this.scene.delta_time % 1000) / 2000
        }
    }

    //Check if updated coordinates are legal - turn same angle as the one that does with the normal
    checkBoundaries() {
        let angle_aux;
        //Turns only when is facing x=30 axis
        if(this.x >= 30 && Math.cos(this.direction_angle) > 0) {
            angle_aux = Math.PI/2 - this.direction_angle; 
            this.turn(2*angle_aux);
        }
        //Turns only when is facing x=-30 axis
        else if(this.x <= -30 && Math.cos(this.direction_angle) < 0) {
            angle_aux = this.direction_angle - Math.PI;
            angle_aux = Math.PI/2 - angle_aux;
            this.turn(2*angle_aux);
        }
        //Turns only when is facing z=30 axis
        if(this.z >= 30 && Math.sin(this.direction_angle) > 0) {
            angle_aux = this.direction_angle - Math.PI/2;
            angle_aux = Math.PI/2 - angle_aux;
            this.turn(2*angle_aux);
        }
        //Turns only when is facing z=-30 axis
        else if(this.z <= -30 && Math.sin(this.direction_angle) < 0) {
            angle_aux = this.direction_angle - Math.PI/2;
            angle_aux = Math.PI/2 - angle_aux;
            this.turn(2*angle_aux);
        } 

        if(this.to_pick || this.to_drop || !this.to_drop) {

            if(this.y <= 0) {
                this.y = 0;
                //stops descending
                this.descending = false;
                //starts ascending
                this.ascending = true;
            }

            else if(this.scene.nest.canDropInNest() && this.y <= (this.scene.nest.y - this.scene.nest.radius)) {
                this.y = (this.scene.nest.y - this.scene.nest.radius);
                //stops descending
                this.descending = false;
                //starts ascending
                this.ascending = true;
            }

            if(this.y >= this.y_before_pick) {
                this.y = this.y_before_pick;
                //stops ascending
                this.ascending = false;
                //animation terminates
                this.to_pick = false; 
                this.to_drop = false;
            }
        }
    }

    //Check if updated speed is legal 
    checkSpeed() {
        if(this.speed > this.max_speed) {
            this.speed = this.max_speed;
        }
        else if(this.speed < this.min_speed) {
            this.speed = this.min_speed;
        }
    }

    //Updates birds coordinates 
    update(t) {
        //Air resistance
        this.accelerate(); 
        //Update time var's
        this.delta_time = t - this.last_time;
        this.total_time += this.delta_time;
        this.last_time = t;
        //Checks if speed value is legal
        this.checkSpeed();
        //change y depending on the movement(constant, descending, ascending)
        this.changeY(t);
        //x = x0 + v0t
        this.x += this.speed * Math.cos(this.direction_angle); 
        //z = z0 + v0t 
        this.z += this.speed * Math.sin(this.direction_angle);
        //Swings bird wings
        this.wings.update(t);
        //check if updated coordinates are legal
        this.checkBoundaries(); 
        //Stores speed before update method
        this.last_speed = this.speed;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y , this.z);
        this.scene.rotate(-this.direction_angle, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);

            //face
            this.scene.pushMatrix();
                this.face_material.apply();
                this.scene.translate(1.5, 1.1, 0.5);
                this.scene.scale(2, 1, 1);
                this.scene.rotate(0.15*Math.PI, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.face.display();
            this.scene.popMatrix();

            //body
            this.scene.pushMatrix();
                this.body_material.apply();
                this.scene.translate(0, 0.35, 0.5);
                this.scene.rotate(-0.35*Math.PI, 0, 0, 1);
                this.scene.scale(1, 1.8, 1);
                this.body.display();
            this.scene.popMatrix();

            //wings
            this.scene.pushMatrix();
                this.wings_material.apply();
                this.scene.translate(0.3, -0.4, 0);
                this.wings.display();
            this.scene.popMatrix();

            //eyes
            this.scene.pushMatrix();
                this.scene.translate(1.9, 1.1, 0.15);
                this.scene.scale(0.3, 0.3, 0.1);
                this.eyes.display();
            this.scene.popMatrix();

            //eyes
            this.scene.pushMatrix();
                this.scene.translate(1.9, 1.1, 0.75);
                this.scene.scale(0.3, 0.3, 0.1);
                this.eyes.display();
            this.scene.popMatrix();
            
            //nose
            this.scene.pushMatrix();
                this.nose_material.apply();
                this.scene.translate(2.6, 1.25, 0.5);
                this.scene.scale(0.14, 0.14, 0.14);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.nose.display();
            this.scene.popMatrix();
            
            //tail
            this.scene.pushMatrix();
                this.body_material.apply();
                this.scene.translate(-0.4, 0.2, 0.5);
                this.scene.scale(1, 1, 0.8);
                this.tail.display();
            this.scene.popMatrix();

            //legs
            this.scene.pushMatrix();
                this.scene.translate(0.3, -0.4, 0.2);
                this.scene.scale(1.3, 1.3, 1.3);
                this.legs.display();
            this.scene.popMatrix();

            //tree branch
            if(this.branch != undefined) {
                this.scene.pushMatrix();
                    this.scene.translate(0.5, -0.55, 1.5);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.branch.display();
                this.scene.popMatrix();
            }
            
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.face.enableNormalViz();
        this.body.enableNormalViz();
        this.wings.enableNormalViz();
        this.nose.enableNormalViz();
        this.eyes.enableNormalViz();
        this.tail.enableNormalViz();
        this.legs.enableNormalViz();
    }

    disableNormalViz() {
        this.face.disableNormalViz();
        this.body.disableNormalViz();
        this.wings.disableNormalViz();
        this.nose.disableNormalViz();
        this.eyes.disableNormalViz();
        this.tail.disableNormalViz();
        this.legs.disableNormalViz();
    }
}