/**
 * Path class, representing, using NURBS a plane with 1*1 dimension
 * in the plane XZ centered in graphic origin with the visible face 
 * pointing into Y+.
 */

class Patch extends CFGobject{
    /**
     * @constructor
     * @param {scene} scene
     * @param {integer} divU
     * @param {integer} divV
     * @param {integer} degreeU
     * @param {integer} degreeV
     */
    constructor (scene, divU, divV, degreeU, degreeV) {
          this.scene = scene;
          this.obj;
  
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
  
          let nurbsSurface = new CGFnurbsSurface(degreeu, degreeV, controlvertexes);
          obj = new CGFnurbsObject(scene, divU, divV, nurbsSurface);
    }
  
    display() {
      this.pushMatrix();
          this.obj.display();
      this.popMatrix();
    }
  }