var glslify = require('glslify');
var defaults = require('lodash.defaults');
var three = require('three');

var __defaultParams = {

};

function SimplePointMaterial(params) {
  params = defaults(params, __defaultParams);

  THREE.ShaderMaterial.call(
    this,
    {
      vertexShader: glslify('./shaders/simple.vsh'),
      fragmentShader: glslify('./shaders/simple.fsh'),
      transparent: true,
      alphaTest: 0.5,
      depthWrite: false,
      uniforms: {
      }
    }
  );
}

SimplePointMaterial.prototype = Object.create(three.ShaderMaterial.prototype);

module.exports = SimplePointMaterial;