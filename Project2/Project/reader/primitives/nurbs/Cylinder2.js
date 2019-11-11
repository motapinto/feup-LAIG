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

        let controlPoints1 = [[]];

        //Control Points Benzier - P1
        controlPoints1[0] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
            let radius = base + radiusIncrement*vDiv;
            controlPoints1[0][vDiv] = [-radius, 0, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P2
        controlPoints1[1] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
            let radius = base + radiusIncrement*vDiv;
            controlPoints1[1][vDiv] = [-radius, -(4*radius)/3, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P3
        controlPoints1[2] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
            let radius = base + radiusIncrement*vDiv;
            controlPoints1[2][vDiv] = [radius, -(4*radius)/3, vDiv*heightIncrement, 1];
        }

        //Control Points Benzier - P4
        controlPoints1[3] = [];
        for(let vDiv = 0; vDiv < stacks; vDiv++) {
            let radius = base + radiusIncrement*vDiv;
            controlPoints1[3][vDiv] = [radius, 0, vDiv*heightIncrement, 1];
        }

        //Example of control points for semi cylinder
        /*let controlPoints69 = 
        [	// U = 0
          [ // V = 0..1;
            [ 0, 0, 0, 1 ],
            [ 0,  1, 0, 1 ]
          ],
          // U = 1
          [ // V = 0..1
            [ 0, 0, 2, 1 ],
            [ 0,  1, 2, 1 ]							 
          ],
          // U = 2
          [ // V = 0..1							 
            [ 3, 0, 2, 1 ],
            [ 3,  1, 2, 1 ]
          ],
          // U = 3
          [ // V = 0..1							 
            [ 3, 0, 0, 1 ],
            [ 3,  1, 0, 1 ]
          ]
        ];*/

        let nurbsSurface = new CGFnurbsSurface(3, stacks-1, controlPoints1);
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