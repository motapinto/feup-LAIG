#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

// Texture
uniform sampler2D uSampler;

//Division
uniform float vGrayScale;

//Time
uniform float timeFactor;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  float radius = 1.0 - sqrt(pow(vTextureCoord.x - 0.5, 2.0) + pow(vTextureCoord.y - 0.5, 2.0));

  color = vec4(color.rgb * radius, 1.0); 

  // minus timeFactor -> lines goes up
  if(mod(vTextureCoord.y * vGrayScale - timeFactor / 10.0, 2.0) > 1.0)
    color = vec4(color.rgb*0.8, 1.0);

  gl_FragColor = color;
}

