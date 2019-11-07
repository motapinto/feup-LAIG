/**
 * Patch class, representing, using NURBS a plane with 1*1 dimension
 * in the plane XZ centered in graphic origin with the visible face 
 * pointing into Y+ and with different degres in both U and V directions
 */


class Patch extends CGFobject{
    /**
     * @constructor
     * @param {scene} scene
     * @param {integer} divU
     * @param {integer} divV
     * @param {integer} degreeU
     * @param {integer} degreeV
     */
    constructor (scene, divU, divV, degreeU, degreeV, controlVertexes) {
          super(scene);
          this.scene = scene;

          //Benzier points of control
          let controlPoints = [[[]]];
          let posCounter = 0;

          for(let uDiv = 0; uDiv <= divU; uDiv++) {
            controlPoints[0][uDiv] = [];
            for(let vDiv = 0; vDiv <= divV; vDiv++) {
              controlPoints[0][uDiv][vDiv] = controlVertexes[posCounter];
              controlPoints[0][uDiv][vDiv].push(1);
              posCounter++;
            }
          }

          /*Example of control points for patch
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
          ];*/
  
          let nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, controlPoints);
          this.obj = new CGFnurbsObject(scene, divU, divV, nurbsSurface);
    }
  
    display() {
      this.scene.pushMatrix();
        this.obj.display();
      this.scene.popMatrix();
    }

    updateTexCoords(length_s, length_t) {
    }
  }