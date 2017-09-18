var defaults = require('lodash.defaults');
var three = require('three');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');
var BasicNode = require('./Basic');
var AddMapMaterial = require('../materials/AddMap');

var __defaultParams = {

};

function PositionMapNode(params) {
	params = defaults(params, __defaultParams);
	BasicNode.call(this, params);
	this.mesh.material = new AddMapMaterial({
		color: 0x7f7f7f,
		opacity: 0.025,
		map: this.mesh.material.map,
		map2: params.map2
	});
	// this.mesh.material.color.setRGB(0.99, 0.99, 0.99);
}

var __proto = Object.create(BasicNode.prototype);
PositionMapNode.prototype = __proto;

module.exports = PositionMapNode;