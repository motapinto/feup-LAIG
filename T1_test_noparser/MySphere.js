/**
 * MySemiSphere
 * @constructor
 */
class MySphere extends CGFobject
{
	constructor(scene, radius, slices, stacks)
	{
		super(scene);

		this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;

        this.top_half = new MySemiSphere(scene, radius, slices, stacks);
        this.bottom_half = new MySemiSphere(scene, radius, slices, stacks);

		this.initBuffers();
	};

	display() {
        this.scene.pushMatrix();
            this.top_half.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.bottom_half.display();
        this.scene.popMatrix();
    }
};


