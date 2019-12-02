#ifdef GL_ES
precision highp float;
#endif

// Texture
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

//Time
uniform float timeFactor;
//Division
uniform float linesNumber;
uniform float lineDiff;
//Radius
uniform float radiusVar;
//Brightness
uniform float brightness;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  float radius = sqrt( (pow(vTextureCoord.x - 0.5, 2.0) + pow(vTextureCoord.y - 0.5, 2.0)) * radiusVar);

  color = vec4(color.rgb * (1.0 - radius), 1.0); 

  // minus timeFactor -> lines goes up
  if(mod(vTextureCoord.y * linesNumber - timeFactor / 10.0, 2.0) > lineDiff)
    color = vec4(color.rgb * brightness, 1.0);

  gl_FragColor = color;
}

