/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

//bibliography: https://vorg.github.io/pex/docs/pex-geom/Vec3.html
//bibliography: https://tpzf.github.io/GlobWeb/api/symbols/vec3.html

class MyTriangle extends CGFobject {
	constructor(scene, id, x1, x2, x3, y1, y2, y3, z1, z2, z3) { 
        super(scene);
        this.id = id;

        this.initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3);
	}

	initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        //Because the triangule is in 1 plane we can only compute 1 of the normals (and the other will be the same)
        var vec21 = vec3.fromValues(x2-x1, y2-y1, z2-z1);
        var vec32 = vec3.fromValues(x3-x2, y3-y2, z3-z2);
        
        //vector that defines plane of the triangle (normal ao plano)
        var vec_cross = vec3.create();
        vec3.cross(vec_cross, vec21, vec32);
        vec3.normalize(vec_cross, vec_cross);
        
		this.vertices = [
            x1, y1, z1,
            x2, y2, z2,
            x3, y3, z3,
            //Both sides visible
            x1, y1, z1,
            x2, y2, z2,
            x3, y3, z3,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            //Both sides visible
            2, 1, 0
        ];
        
        this.normals = [];
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);

        //Presented in T1 lab pdf
        this.a = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2) + Math.pow(z1 - z3, 2));
        this.b = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
        this.c = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) + Math.pow(z3 - z2, 2));
        
        var beta = Math.acos((Math.pow(this.a, 2) - Math.pow(this.b, 2) + Math.pow(this.c, 2)) / (2 * this.a * this.c));
        this.cosBeta = Math.cos(beta);
        this.sinBeta = Math.sin(beta)

		this.texCoords = [
			(this.c - this.a * this.cosBeta)/Math.sqrt(Math.pow(this.a*this.cosBeta, 2)+Math.pow(this.c, 2)) , (this.a - this.a * this.sinBeta)/this.a,
			0, 1,
			1, 1,

			1, 1,
			0, 1,
			(this.c - this.a * this.cosBeta)/Math.sqrt(Math.pow(this.a*this.cosBeta, 2)+Math.pow(this.c, 2)) , (this.a - this.a * this.sinBeta)/this.a,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    //
    updateTexCoords(length_s, length_t) {
		this.texCoords = [
			this.c - this.a * this.cosBeta, length_s - this.a * this.sinBeta,
			0, length_s,
			this.c, length_s,

			this.c, length_s,
			0, length_s,
			this.c - this.a * this.cosBeta, length_s - this.a * this.sinBeta,
		];
		this.updateTexCoordsGLBuffers();
	}
}