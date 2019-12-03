/**
 * @constructor
 * @param {scene} scene
 * @param {integer} divU
 * @param {integer} divV
 * @param {integer} npointsV //degreeU
 * @param {integer} npointsV //degreeV
 */

class Patch extends CGFobject{
    constructor(scene, npointsU, npointsV, npartsU, npartsV, controlVertexes) {
          super(scene);
          this.scene = scene;

          //Benzier points of control
          let controlPoints = [[]];
          let posCounter = 0;

          for(let uDiv = 0; uDiv < npointsU; uDiv++) {
            controlPoints[uDiv] = [];
            for(let vDiv = 0; vDiv < npointsV; vDiv++) {
              controlPoints[uDiv][vDiv] = controlVertexes[posCounter];
              controlPoints[uDiv][vDiv].push(1);
              posCounter++;
            }
          }
		
        var nurbsSurface = new CGFnurbsSurface(npointsU-1, npointsV-1, controlPoints);
        this.obj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurface );

          //Example of control points for patch
          /*let controlPoints1 = 
          [	// U = 0
            [ // V = 0..1;
              [ -1.5, -1.5, 0.0, 1 ],
              [ -1.5,  1.5, 0.0, 1 ]
              
            ],
            // U = 1
            [ // V = 0..1
              [ 0, -1.5, 3.0, 1 ],
              [ 0,  1.5, 3.0, 1 ]							 
            ],
            // U = 2
            [ // V = 0..1							 
              [ 1.5, -1.5, 0.0, 1 ],
              [ 1.5,  1.5, 0.0, 1 ]
            ]
          ];*/
    }
  
    display() {
      this.scene.pushMatrix();
        this.obj.display();
      this.scene.popMatrix();
    }

    updateTexCoords(length_s, length_t) {
    }
  }