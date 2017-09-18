uniform float size;
uniform sampler2D map;

void main() {
  vec3 pos = texture2D( map, position.xy).xyz - 0.5;
//  vec3 pos = position;
//pos.y = 0.0;
//pos.z = 0.0;
  gl_PointSize = size;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(pos, 1.0);
}
