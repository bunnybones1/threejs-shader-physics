void main() {
  vec3 pos = position;
  gl_PointSize = 1.0;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(pos, 1.0);
}
