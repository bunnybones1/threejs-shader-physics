uniform float opacity;
uniform vec3 color;
uniform sampler2D map;

varying vec2 vUv;

void main() {
	vec4 texel = texture2D( map, vUv);
	gl_FragColor = vec4(texel.xyz * (1.0 - opacity) + color * opacity, 1.0);
}
