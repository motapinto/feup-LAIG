/**
 * @constructor
 * @param {scene} scene
 * @param {integer} npartsU
 * @param {integer} npartsV
 */

class Triangle2 extends CGFobject{
  constructor(scene, x1, x2, x3, y1, y2, y3, z1, z2, z3, npartsU, npartsV) {
        super(scene);
        this.scene = scene;
                
    let controlPoints =
      [
        // U = 0
        [   // V = 0..3;
          [x2, y2, z2, 1],
          [x1, y1, z1, 1]
        ],
        // U = 1
        [   // V = 0..3;
          [x3, y3, z3, 1],
          [x1, y1, z1, 1]
        ],
      ];

        let nurbsSurface = new CGFnurbsSurface(1, 1, controlPoints);
        this.obj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurface);
  }

  display() {
    this.obj.display();
  }

  updateTexCoords(length_s, length_t) {
  }
}