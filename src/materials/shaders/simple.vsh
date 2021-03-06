uniform float size;

void main() {
  vec3 pos = position;
  gl_PointSize = size;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(pos, 1.0);
}
