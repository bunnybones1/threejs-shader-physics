var defaults = require('lodash.defaults');
var three = require('three');
var SimplePointMaterial = require('../materials/SimplePointMaterial');
var __defaultParams = {

};

function ShaderPhysicsWorldTest(params) {
  params = defaults(params, __defaultParams);

  var geom = new three.PlaneGeometry(100, 100, 200, 200);
  var mat = new SimplePointMaterial({
  	color: 0xff0000
  });
  three.Points.call(this, geom, mat);
}

ShaderPhysicsWorldTest.prototype = Object.create(three.Points.prototype);
ShaderPhysicsWorldTest.prototype.onEnterFrame = function() {

}

module.exports = ShaderPhysicsWorldTest;