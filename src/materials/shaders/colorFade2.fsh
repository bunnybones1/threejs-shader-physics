uniform float opacity;
uniform vec3 color;
uniform sampler2D map;

varying vec2 vUv;

void main() {
	vec4 texel = texture2D( map, vUv);
	vec3 newColor = texel.xyz * (1.0 - opacity) + color * opacity;
	float dist = length(newColor - texel.xyz);
	if(dist < 0.01) {
		gl_FragColor = vec4(color, 1.0);
	} else {
		gl_FragColor = vec4(newColor, 1.0);
	}
}
