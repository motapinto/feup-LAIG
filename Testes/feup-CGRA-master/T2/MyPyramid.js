/**
* MyPyramid
* @constructor
* @param scene - Reference to MyScene object
* @param slices - number of slices in pyramid
* @param stacks - stacks 
*/

class MyPyramid extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.scene = scene;

        this.slices = slices;
        this.height = height;
        this.radius = radius
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var z1=this.radius*Math.sin(ang);
            var z2=this.radius*Math.sin(ang+alphaAng);
            var x1=this.radius*Math.cos(ang);
            var x2=this.radius*Math.cos(ang+alphaAng);

            this.vertices.push(0,this.height,0);
            this.vertices.push(x1, 0, -z1);
            this.vertices.push(x2, 0, -z2);

            // triangle normal computed by cross product of two edges
            var normal= [
                z2-z1,
                x1*z2-z1*x2,
                x2-x1
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            this.texCoords.push(0.5,0);
            this.texCoords.push(0,1);
            this.texCoords.push(1,1);

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


