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
        
        let radiusIncrement = (top - base)/stacks;
        let heightIncrement = (height/stacks);
        
        stacks = stacks + 1;

        let controlPoints = [[]];

        //Control Points Benzier - P1
        controlPoints[0] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
          let radius = base + radiusIncrement*vDiv;
          controlPoints[0][vDiv] = [-radius, 0, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P2
        controlPoints[1] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
          let radius = base + radiusIncrement*vDiv;
          controlPoints[1][vDiv] = [-radius, -(4*radius)/3, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P3
        controlPoints[2] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
          let radius = base + radiusIncrement*vDiv;
          controlPoints[2][vDiv] = [radius, -(4*radius)/3, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P4
        controlPoints[3] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
          let radius = base + radiusIncrement*vDiv;
          controlPoints[3][vDiv] = [radius, 0, vDiv*heightIncrement, 1];
        }


        let nurbsSurface = new CGFnurbsSurface(3, stacks-1, controlPoints);
        this.obj = new CGFnurbsObject(scene, slices, stacks, nurbsSurface);
  }

  display() {
    this.scene.pushMatrix();
      this.obj.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.scale(-1, -1, 1);
      this.obj.display();
    this.scene.popMatrix();
  }

  updateTexCoords(length_s, length_t) {
  }
}