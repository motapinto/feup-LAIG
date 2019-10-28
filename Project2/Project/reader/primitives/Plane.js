/**
 * Plane class, representing the base class for Keyframe Animations.
 * extensão de CGFobject, de forma a gerar, utilizando NURBS, um plano de dimensões 1 x 1 unidades, assente em XZ, centrado na origem e com a face visível apontando para +Y. O número de divisões nas direções U e V pode ser distinto e deve ser especificado no construtor da classe. Com
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

        this.init();
  }

  init() {
  }

  display() {
    this.pushMatrix();
        this.obj.display();
    this.popMatrix();
  }
}