/**
* MyInterface
* @constructor
* @param scene - MyScene reference
*/

//bibliography: https://vorg.github.io/pex/docs/pex-geom/Vec3.html
//bibliography: https://tpzf.github.io/GlobWeb/api/symbols/vec3.html

class MyTriangle extends CGFobject {
	constructor(scene, x1, x2, x3, y1, y2, y3, z1, z2, z3) { 
        super(scene);

        this.initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3);
	}

	initBuffers(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        //Because the triangule is in 1 plane we can only compute 1 of the normals (and the other will be the same)
        let vec21 = vec3.fromValues(x2-x1, y2-y1, z2-z1);
        let vec32 = vec3.fromValues(x3-x2, y3-y2, z3-z2);
        
        //vector that defines plane of the triangle (normal ao plano)
        let vec_cross = vec3.create();
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
            5, 4, 3
        ];
        
        this.normals = [];
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(vec_cross[0], vec_cross[1], vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);
        this.normals.push(-vec_cross[0], -vec_cross[1], -vec_cross[2]);

        //Presented in T1 lab pdf
        this.c = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2) + Math.pow(z1 - z3, 2));
        this.a = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
        let b = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) + Math.pow(z3 - z2, 2));
        
        let alpha = Math.acos((Math.pow(this.a, 2) - Math.pow(b, 2) + Math.pow(this.c, 2)) / (2 * this.a * this.c));
        this.cosAlpha = Math.cos(alpha);
        this.sinAlpha = Math.sin(alpha);

		this.texCoords = [
			0, 0,
			1, 0,
			this.c * this.cosAlpha / this.c , -this.c * this.sinAlpha / this.c,

			this.c * this.cosAlpha / this.c , -this.c * this.sinAlpha / this.c,
			1, 0,
			0, 0,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    //updates Texture Coords
    updateTexCoords(length_s, length_t) {
      if(length_s == 0 || length_t == 0) {
        this.texCoords = [
          0, 0,
          1, 0,
          this.c * this.cosAlpha / this.c , -this.c * this.sinAlpha / this.c,
    
          this.c * this.cosAlpha / this.c , -this.c * this.sinAlpha / this.c,
          1, 0,
          0, 0,
        ];
        this.updateTexCoordsGLBuffers();
        return;
      }

      this.texCoords = [
        0, 0,
        this.a / length_s, 0,
        this.c * this.cosAlpha / length_s , -this.c * this.sinAlpha / length_t,

        this.c * this.cosAlpha / length_s , -this.c * this.sinAlpha / length_t,
        this.a / length_s, 0,
        0, 0,
      ];
      this.updateTexCoordsGLBuffers();
	}
}