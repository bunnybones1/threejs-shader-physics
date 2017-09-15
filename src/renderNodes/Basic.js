var defaults = require('lodash.defaults');
var three = require('three');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');

var SimplePointMaterial = require('../materials/SimplePointMaterial');
var __defaultParams = {

};

function BasicRenderNode(params) {
  params = defaults(params, __defaultParams);

  var geom = getPlaneGeometry();
  var mat = new SimplePointMaterial({
  	color: 0xff0000
  });
  three.Points.call(this, geom, mat);
}

BasicRenderNode.prototype = Object.create(three.Points.prototype);
BasicRenderNode.prototype.onEnterFrame = function() {

}

module.exports = BasicRenderNode;