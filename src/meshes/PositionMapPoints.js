var defaults = require('lodash.defaults');
var three = require('three');

var PositionMapPointMaterial = require('../materials/PositionMapPointMaterial');
var __defaultParams = {
	size: 2,
	color: 0xffffff,
	width: 64,
	height: 64
};

function PositionMapPoints(params) {
	params = defaults(params, __defaultParams);

	var width = params.width;
	var widthM1 = width - 1;
	var height = params.height;
	var heightM1 = height - 1;

	var geom = new three.PlaneGeometry(1, 1, widthM1, heightM1);
	geom.vertices.forEach(function centerTo64Verts(v) {
		v.x = (v.x + 0.5) * widthM1/width;
		v.y = (v.y + 0.5) * heightM1/height;
	});
	if(!params.map) {
		throw new Error('Provide a position map please (rgb[0..255] = xyz[-0.5..0.5])');
	}
	var material = new PositionMapPointMaterial({
		map: params.map,
		size: params.size,
		color: params.color
	});
	three.Points.call(this, geom, material);
}

function onEnterFrame() {

}

var __proto = Object.create(three.Points.prototype);
PositionMapPoints.prototype = __proto;
__proto.onEnterFrame = onEnterFrame;

module.exports = PositionMapPoints;