//------------------------------
//Vertex shader input attributes
//------------------------------
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform float normScale;
varying vec4 coords;

void main() {
	vec3 offset=vec3(0.0, 0.0, 0.0);
	vec3 temp = vec3(1.0, 0.0, 0.0); 

	offset=normScale*0.1*sin(timeFactor)*temp; //so esta a variar o x de acordo com p tempo
	
	vec4 vertex=vec4(uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0));

	gl_Position = vertex; //vertex transformation applied to each vertex - must be written by VS, it's the vertex position in eye space

	coords=vertex/10.0 ;
}

