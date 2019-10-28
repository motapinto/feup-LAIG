/**
 * Path class, representing, using NURBS a plane with 1*1 dimension
 * in the plane XZ centered in graphic origin with the visible face 
 * pointing into Y+.
 */

class Plane extends CFGobject{
    /**
     * @constructor
     * @param {scene} scene
     * @param {integer} divX
     * @param {integer} divZ
     */
    constructor (scene, divX, divZ) {
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
  
          let nurbsSurface = new CGFnurbsSurface(1, 1, controlvertexes);
          obj = new CGFnurbsObject(scene, divX, divZ, nurbsSurface );
    }
  
    display() {
      this.pushMatrix();
          this.obj.display();
      this.popMatrix();
    }
  }