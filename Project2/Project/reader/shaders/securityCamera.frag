#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

// Texture
uniform sampler2D uSampler2;
// uniform float uGrayScale;
// uniform float vGrayScale;

void main() {
  vec4 color = texture2D(uSampler2, vTextureCoord);

  // if((mod(vTextureCoord.y * uGrayScale, 2.0) > 1.0) || (mod(vTextureCoord.x * vGrayScale, 2.0) > 1.0))
  // if(mod(vTextureCoord.y * uGrayScale, 2.0) > 1.0)
  //   color = vec4(color.rgb*0.8,1.0);

  gl_FragColor = vec4(color.rgb, 1.0);
}
