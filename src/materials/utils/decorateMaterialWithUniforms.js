function decorateMaterialWithUniforms(target, keys, params) {

	var uniforms = {};
	keys.forEach(function(key) {
		uniforms[key] = {
			value: params[key]
		};
	});

	target.uniforms = uniforms;
}

module.exports = decorateMaterialWithUniforms;