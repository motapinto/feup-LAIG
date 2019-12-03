#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;

uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

varying float height_percentage;

void main() {
	vTextureCoord = aTextureCoord;
	height_percentage = 0.20;
	vec4 map = texture2D(uSampler2, vTextureCoord);
 
	vec4 vertex = vec4(uPMatrix * uMVMatrix * vec4(normScale*(aVertexPosition + aVertexNormal * map.rgb * height_percentage), 1.0));

	height_percentage = 1.0 - map.r;

	gl_Position = vertex; 
}
