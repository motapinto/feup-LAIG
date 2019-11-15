#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

// Texture
uniform sampler2D uSampler;

//Division
uniform float linesNumber;
uniform float lineDiff;

//Time
uniform float timeFactor;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  float radius = 1.0 - sqrt( (pow(vTextureCoord.x - 0.5, 2.0) + pow(vTextureCoord.y - 0.5, 2.0)) * 2.0);

  color = vec4(color.rgb * radius, 1.0); 

  // minus timeFactor -> lines goes up
  if(mod(vTextureCoord.y * linesNumber - timeFactor / 10.0, 2.0) > lineDiff)
    color = vec4(color.rgb*1.2, 1.0);

  gl_FragColor = color;
}

