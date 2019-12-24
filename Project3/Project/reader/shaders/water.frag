#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord + vec2(timeFactor*0.02, timeFactor)); //u and v texture cooordinates change with timeFactor
	
	gl_FragColor = color;
}