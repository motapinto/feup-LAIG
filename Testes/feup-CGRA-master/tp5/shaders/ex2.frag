#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;

void main() {
	vec4 color;

	if(coords.y > 0.5)
		color =  vec4(0, 0, 1, 1.0) ;
    else
    	color =  vec4(1, 1, 0, 1.0) ;

	vec4 colorSepia = vec4 (0.0, 0.0, 0.0, 1.0);
	colorSepia.r = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.g = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.b = color.r * 0.299 + color.g *0.587 + color.b * 0.114;

	gl_FragColor = colorSepia;
}