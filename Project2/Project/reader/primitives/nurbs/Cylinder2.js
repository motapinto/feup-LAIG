/**
 * Cylinder patch using nurbs patch primitve
 */

 //Slices = U? OU V?

class Patch extends CGFobject{
    /**
     * @constructor
     * @param {scene} scene
     * @param {integer} divU
     * @param {integer} divV
     * @param {integer} degreeU
     * @param {integer} degreeV
     */
    constructor (scene, slices, stacks) {
          super(scene);
          this.scene = scene;
  
          let controlvertexes = 
          [
              // U = 0
              [   // V = 0..1;
                  [-0.5, 0.0, -0.5, 1 ],
                  [-0.5, 0.0, 0.5, 1 ]
                 
              ],
             // U = 1
             [    // V = 0..1;
                  [ 0.5, 0.0, -0.5, 1 ],
                  [ 0.5, 0.0, 0.5, 1 ]							 
             ]
          ];
  
          let nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, controlvertexes);
          this.obj = new CGFnurbsObject(scene, slices, stacks, nurbsSurface);
    }
  
    display() {
      this.scene.pushMatrix();
          this.obj.display();
      this.scene.popMatrix();
    }

    updateTexCoords(length_s, length_t) {
    }
  }