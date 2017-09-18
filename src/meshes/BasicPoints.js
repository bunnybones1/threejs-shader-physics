var defaults = require('lodash.defaults');
var three = require('three');

var SimplePointMaterial = require('../materials/SimplePointMaterial');
var __defaultParams = {
	size: 2,
	color: 0xff00ff
};

function BasicPoints(params) {
	params = defaults(params, __defaultParams);

	var geom = new three.PlaneGeometry(1, 1, 64, 64);
	var material = new SimplePointMaterial({
		size: params.size,
		color: params.color
	});
	three.Points.call(this, geom, material);
}

function onEnterFrame() {

}

var proto = Object.create(three.Points.prototype)
BasicPoints.prototype = proto;
proto.onEnterFrame = onEnterFrame;

module.exports = BasicPoints;