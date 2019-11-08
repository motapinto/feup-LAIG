/**
 * @constructor
 * @param {scene} scene
 * @param {integer} divU
 * @param {integer} divV
 * @param {integer} npointsV //degreeU
 * @param {integer} npointsV //degreeV
 */

class Cylinder2 extends CGFobject{
  constructor (scene, base, top, height, slices, stacks) {
        super(scene);
        this.scene = scene;
        let controlPoints = [[]];
        let posCounter = 0;

        //Control Points Benzier
        /*for(let uDiv = 0; uDiv < slices; uDiv++) {
          controlPoints[uDiv] = [];
          let xBase = base*Math.cos((slices*Math.PI) / slices);
          let zBase = base*Math.sin((slices*Math.PI) / slices);
          let xTop = top*Math.cos((slices*Math.PI) / slices);
          let zTop = top*Math.sin((slices*Math.PI) / slices);
          for(let vDiv = 0; vDiv < stacks; vDiv++) {
            controlPoints[uDiv][vDiv] = [xBase, 0, zBase, 1];
            controlPoints[uDiv][vDiv] = [xTop, vDiv*(stacks/height), zTop, 1];
            posCounter++;
          }
        }*/

        //let xBase = base*Math.cos(((360/slices)*Math.PI) / 360);

        //Example of control points for patch
        let controlPoints1 = 
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
        ];

        let nurbsSurface = new CGFnurbsSurface(2, 1, controlPoints1);
        this.obj = new CGFnurbsObject(scene, 20, 2, nurbsSurface);
  }

  display() {
    this.scene.pushMatrix();
      this.obj.display();
    this.scene.popMatrix();
  }

  updateTexCoords(length_s, length_t) {
  }
}