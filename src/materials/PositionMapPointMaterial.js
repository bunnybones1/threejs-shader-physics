var glslify = require('glslify');
var defaults = require('lodash.defaults');
var three = require('three');

var decorateMaterialProtoypeWithUniformGetterSetters = require('./utils/decorateMaterialProtoypeWithUniformGetterSetters');
var decorateMaterialWithUniforms = require('./utils/decorateMaterialWithUniforms');

var __defaultParams = {
  size: 4,
  color: 0xff00ff,
  opacity: 0.5,
  map: null
};

var __uniformKeys = [
  'size',
  'color',
  'opacity',
  'map'
];

function PositionMapPointMaterial(params) {
  params = defaults(params, __defaultParams);
  if(!(params.color instanceof three.Color)) {
    params.color = new three.Color(params.color);
  }
  decorateMaterialWithUniforms(this, __uniformKeys, params);
  THREE.ShaderMaterial.call(
    this,
    {
      vertexShader: glslify('./shaders/positionMap.vsh'),
      fragmentShader: glslify('./shaders/simple.fsh'),
      transparent: true,
      alphaTest: 0.5,
      depthTest: false,
      depthWrite: false,
      uniforms: this.uniforms
    }
  );
  var _this = this;
  __uniformKeys.forEach(function(key) {
    _this[key] = params[key];
  });
}

var __proto = Object.create(three.ShaderMaterial.prototype);
decorateMaterialProtoypeWithUniformGetterSetters(__proto, __uniformKeys);
PositionMapPointMaterial.prototype = __proto;


module.exports = PositionMapPointMaterial;