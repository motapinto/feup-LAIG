#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;
	
	vec4 map = texture2D(uSampler2, vec2(timeFactor*0.01, timeFactor*0.01) + vTextureCoord);
 
	vec4 vertex = vec4(uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * map.rgb * 0.5, 1.0)); //when 

	gl_Position = vertex; 
}