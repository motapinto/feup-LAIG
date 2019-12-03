#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler2;
uniform sampler2D uSampler;
uniform float timeFactor;

void main() {
  vec4 color_map = texture2D(uSampler2, vec2(0.5, 1.0 - texture2D(uSampler3, vTextureCoord).r));
  
	gl_FragColor = 0.5*texture2D(uSampler, vTextureCoord) + 0.5*color_map;
}
