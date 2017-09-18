uniform float opacity;
uniform vec3 color;
uniform sampler2D map;
uniform sampler2D map2;

varying vec2 vUv;

void main() {
	vec4 texel = texture2D( map, vUv);
	vec4 texel2 = texture2D( map2, vUv);
	vec3 delta = (texel2.xyz - color) * opacity;
	gl_FragColor = vec4(texel.xyz + delta, 1.0);
	gl_FragColor.rgb = mod(gl_FragColor.rgb + 10.0, 1.0);
}
