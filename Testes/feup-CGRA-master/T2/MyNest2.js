/**
 * MySemiSphere
 * @constructor
 */
class MyNest2 extends CGFobject
{
	constructor(scene, slices, trunk_img, straw_img)
	{
		super(scene);
		this.radius = 4;
		this.slices = slices;
		this.trunk_img = trunk_img;
		this.straw_img = straw_img;
		this.ang = 2*Math.PI/slices;
		this.side = 2*this.radius*Math.sin(this.ang/2);
		this.p = this.radius*Math.cos(this.ang/2);
		this.branchtr = new MyTreeBranch(this.scene, 20, this.side*1.2, 0.1, this.trunk_img, true);
		this.branchst = new MyTreeBranch(this.scene, 20, this.side*1.2, 0.1, this.straw_img, true);
		this.rnd = [];
		this.bool = [];
		this.cont = 0;

		for (var j = 0; j < 50; j++) {
			for (var i = 0; i < this.slices; i++) {
				this.rnd[this.cont] = Math.random()*2-1;
				this.cont++;
			};
		};
		this.cont = 0;
		for (var j = 0; j < 50; j++) {
			for (var i = 0; i < this.slices; i++) {
				this.bool[this.cont] = Math.round(Math.random());
				this.cont++;
			};
		};
		this.x = 3;
        this.y = 7;
        this.z = 10;
	};
	canDropInNest() {
        let x_init = this.x - this.radius;
        let x_final = this.x + this.radius;

        let z_init = this.z - this.radius;
        let z_final = this.z + this.radius;

        if(this.scene.bird.x >= x_init && this.scene.bird.x <= x_final && 
            this.scene.bird.z >= z_init && this.scene.bird.z <= z_final) {
            return true;
        };            
        return false;
    };
	display() {
		this.cont = 0;
		for (var j = 0; j < 50; j++) {
			for (var i = 0; i < this.slices; i++) {
				this.scene.pushMatrix();
				this.scene.scale(this.rnd[this.cont]*0.3+1,this.rnd[this.cont]*0.3+1,this.rnd[this.cont]*0.2+1);
				this.scene.rotate(Math.PI/4*0.2*this.rnd[this.cont], 1, 1, 1);
				this.scene.translate(this.rnd[this.cont]*0.1,this.rnd[this.cont]*0.1, 0.1*this.rnd[this.cont]);
				this.scene.rotate(this.ang*i, 0, 0, 1);
				this.scene.translate(this.p*Math.tanh(4*j/50),-this.side*1.2/2, 0.05*j);
				if (this.bool[i*j]) {
					this.branchtr.display();
				} else {
					this.branchst.display();
				}
				this.scene.popMatrix();
				this.cont++;
			};
		};
	};
};