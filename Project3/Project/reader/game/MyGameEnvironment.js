class MyGameEnvironment extends CGFscene {
    /**
     * @constructor
     * @param {Scene} scene 
     */
    constructor(scene) {
        super();
        this.scene = scene;
        this.selectedScene = 2;

        // Material
        this.terrainMaterial = new CGFappearance(scene);
        this.terrainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.terrainMaterial.setShininess(120);
        // Water shader
        this.waterPlane = new MyRectangle(scene, -50, 50, -50, 50, 100, 100);
        this.waterPlane.updateTexCoords(10, 10);
        this.water_tex = new CGFtexture(scene, "scenes/images/waterTex.jpg");
        this.water_map = new CGFtexture(scene, "scenes/images/waterMap.jpg");
        this.waterShader = new CGFshader(scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.waterShader.setUniformsValues({ uSampler2: 1, timeFactor: 1 });
        // Montain shader
        this.montainPlane = new MyRectangle(scene, -20, 20, -20, 20, 40, 40);
        this.montain_tex = new CGFtexture(scene, "scenes/images/montainTex.jpg");
        this.montain_map = new CGFtexture(scene, "scenes/images/montainMap.png");
        this.montain_altimetry = new CGFtexture(scene, "scenes/images/montainAlt.png");
        this.montainShader = new CGFshader(scene.gl, "shaders/montain.vert", "shaders/montain.frag");
        this.montainShader.setUniformsValues({ uSampler2: 1 , uSampler3: 2, normScale: 1});

        //sound
        let audio;
        switch(this.selectedScene) {
            case 0:
                break;
            case 1:
                audio = new Audio('scenes/sounds/ocean.mp3');
                //audio.play();
                break;
            case 2:
                audio = new Audio('scenes/sounds/birds.mp3');
                //audio.play();
                break;
        }
    }

    update(t) {
        if(this.selectedScene == 1)
            this.waterShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }

    display() {
        this.scene.pushMatrix();
            if(this.selectedScene == 1) {
                // water shader
                this.scene.setActiveShader(this.waterShader);
                this.water_map.bind(1);
                this.terrainMaterial.setTexture(this.water_tex);
                this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
                this.terrainMaterial.apply();
                this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                this.scene.translate(0, 0, 2);
                this.waterPlane.display();
            }
            else if(this.selectedScene == 2) {
                // water shader
                this.scene.setActiveShader(this.montainShader);
                this.montain_map.bind(1);
                this.montain_altimetry.bind(2);
                this.terrainMaterial.setTexture(this.montain_tex);
                this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
                this.terrainMaterial.apply();
                this.scene.rotate(DEGREE_TO_RAD*90, 1, 0, 0);
                this.scene.translate(5, -6, 2);
                this.montainPlane.display();
            }
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}

function getUrllets() {
    let lets = {};
    let parts = window.location.href.replace
    (
        /[?&]+([^=&]+)=([^&]*)/gi,    
        function(m,key,value) {
        lets[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    );

    return lets;
}