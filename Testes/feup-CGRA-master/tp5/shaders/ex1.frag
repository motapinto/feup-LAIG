#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords; //output from vertex shader

void main() {
    if(coords.y > 0.5)
		gl_FragColor =  vec4(0,0,1, 1.0) ;
    else
    	gl_FragColor =  vec4(1,1,0, 1.0) ;
}

/*
Tutorial:
--------------------------------------------------------------------------------------------------------
Global vars:  
uniform: input to Vertex and Fragment shader
attribute: input per-vertex to Vertex shader
varying: outputing from Vertex shader and interpolated to serve as per-fragment input to Fragment shader
const: compile-time constant (READ-ONLY)
--------------------------------------------------------------------------------------------------------
Data types: 
float, vec2, vec3, vec3, vec4
int ivec2, ivec3, ivec4
bool bvec2, bvec3, bvec4
...
--------------------------------------------------------------------------------------------------------
Accesing vec components:
(x,y,z,w) - coordinates
(r,g,b,a) - colours
(stpq) - texCoords
--------------------------------------------------------------------------------------------------------
Function parameters declaration:
In(default): value initialized on entry but NOT copied on return
out: copied out on return, but not initialized
inout: value initialized on entry and copied out on return
const: const function input
--------------------------------------------------------------------------------------------------------
*/