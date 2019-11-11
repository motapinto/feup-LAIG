/**
 * Traingle primitive using NURBS
 */

class Triangle2 extends CGFobject{
    /**
     * @constructor
     * @param {scene} x1
     * @param {scene} x2
     * @param {scene} x3
     * @param {scene} y1
     * @param {scene} y2
     * @param {scene} y3
     * @param {scene} z1
     * @param {scene} z2
     * @param {scene} z3
     * @param {integer} divX
     * @param {integer} divZ
     */
    constructor(scene, x1, x2, x3, y1, y2, y3, z1, z2, z3, divX, divZ) { 
        super(scene);
        this.scene = scene;
        
        let controlvertexes = 
        [
        // U = 0
            [   // V = 0..1;
                [0.0, 0.0, 0.0, 1 ],
                [0.0, 0.0, 0.0, 1 ]
            
            ],
            // U = 1
            [    // V = 0..1;
                [ 0.5, 0.0, 0.5, 1 ],
                [ 0.5, 0.0, -0.5, 1 ]							 
            ],
        ];
  
        let nurbsSurface = new CGFnurbsSurface(1, 1, controlvertexes);
        this.obj = new CGFnurbsObject(scene, 5, 5, nurbsSurface );
    }
  
    display() {
      this.scene.pushMatrix();
          this.obj.display();
      this.scene.popMatrix();
    }

    updateTexCoords(length_s, length_t) {
    }
  }