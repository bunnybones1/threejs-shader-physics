function decorateMaterialProtoypeWithUniformGetterSetters(proto, keys) {
	keys.forEach(function(key) {
		Object.defineProperty(proto, key, {
			set: function(val) {
				this.uniforms[key].value = val;
			},
			get: function() {
				return this.uniforms[key].value;
			}
		});
	});
}

module.exports = decorateMaterialProtoypeWithUniformGetterSetters;