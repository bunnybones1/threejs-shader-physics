var defaults = require('lodash.defaults');
var three = require('three');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');
var BasicNode = require('./Basic');

var __defaultParams = {
	height: 64
};

function ScrollDownNode(params) {
	params = defaults(params, __defaultParams);
	var height = params.height;
	BasicNode.call(this, params);
	var geom = this.mesh.geometry;
	geom.faceVertexUvs[0].forEach(function offsetUvs(uvs) {
		uvs.forEach(function offsetUv(uv) {
			// uv.x -= 1 / 64;
			uv.y -= 1 / height;
		});
	});
}

var proto = Object.create(BasicNode.prototype);
ScrollDownNode.prototype = proto;

module.exports = ScrollDownNode;