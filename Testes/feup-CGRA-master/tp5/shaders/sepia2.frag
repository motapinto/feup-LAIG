#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorSepia2 = color;
	colorSepia2.r = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia2.g = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia2.b = color.r * 0.299 + color.g *0.587 + color.b * 0.114;

	gl_FragColor = colorSepia2;
}