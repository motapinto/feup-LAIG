function Tree(scene, th, tb, ch, cb, nt, tm){
  CGFobject.call(this, scene);

  if (ch >= th) {
    console.log("CH is higher or equal to TH!");
    return;
  }

  this.scene = scene;

  this.th = th;
  this.tb = tb;
  this.ch = ch;
  this.nt = nt;

  this.triangles = [];
  this.trunk = new ShapeClosedCylinder(this.scene, th, tb, 0, 20, 20);

  this.spawn_triangles(nt, cb, ch);

}

Tree.prototype = Object.create(CGFobject.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.spawn_triangles = function(nt, cb, ch) {

  for (let i = 0; i < nt; i++) {
    let triangle = new ShapeTriangle(this.scene, -cb / 2, 0, 0, cb / 2, 0, 0, 0, ch, 0);
    this.triangles.push(triangle);
  }

}

Tree.prototype.display = function() {

    this.scene.pushMatrix();
      this.scene.rotate(DEGREE_TO_RAD * -90, 1, 0, 0);
      this.trunk.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, this.th - this.ch, 0);

      var angle = 180 / this.nt;

      for (let i = 0; i < this.triangles.length; i++) {
        this.scene.pushMatrix();
        this.scene.rotate(DEGREE_TO_RAD * (i * angle), 0, 1, 0);
        this.triangles[i].display();
        this.scene.popMatrix();
      }
    this.scene.popMatrix();
};


Tree.prototype.updateTexture = function(texture) {
}
