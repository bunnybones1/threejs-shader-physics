var defaults = require('lodash.defaults');
var three = require('three');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');
var BasicNode = require('./Basic');
var ColorFadeMaterial = require('../materials/ColorFade2');

var __defaultParams = {

};

function VelocityMapNode(params) {
	params = defaults(params, __defaultParams);
	BasicNode.call(this, params);
	this.mesh.material = new ColorFadeMaterial({
		color: 0x7f7f7f,
		opacity: 0.1,
		map: this.mesh.material.map
	});
	// this.mesh.material.color.setRGB(0.99, 0.99, 0.99);
}

var __proto = Object.create(BasicNode.prototype);
VelocityMapNode.prototype = __proto;

module.exports = VelocityMapNode;