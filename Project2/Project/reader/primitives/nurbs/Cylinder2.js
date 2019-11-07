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
        this.obj = new CGFnurbsObject(scene, 5, 5, nurbsSurface);
  }

  display() {
    this.scene.pushMatrix();
      this.obj.display();
    this.scene.popMatrix();
  }

  updateTexCoords(length_s, length_t) {
  }
}