var glslify = require('glslify');
var defaults = require('lodash.defaults');
var three = require('three');

var decorateMaterialProtoypeWithUniformGetterSetters = require('./utils/decorateMaterialProtoypeWithUniformGetterSetters');
var decorateMaterialWithUniforms = require('./utils/decorateMaterialWithUniforms');

var __defaultParams = {
  map: null,
  color: new three.Color(0x7f7f7f),
  opacity: 0.5
};

var __uniformKeys = [
  'map',
  'map2',
  'color',
  'opacity'
];

function AddMapMaterial(params) {
  params = defaults(params, __defaultParams);
  if(!(params.color instanceof three.Color)) {
    params.color = new three.Color(params.color);
  }

  decorateMaterialWithUniforms(this, __uniformKeys, params);

  three.ShaderMaterial.call(
    this,
    {
      vertexShader: glslify('./shaders/colorFade.vsh'),
      fragmentShader: glslify('./shaders/addMap.fsh'),
      transparent: true,
      depthWrite: false,
      uniforms: this.uniforms
    }
  );
  this.opacity = params.opacity;
}

var __proto = Object.create(three.ShaderMaterial.prototype);

AddMapMaterial.prototype = __proto;

decorateMaterialProtoypeWithUniformGetterSetters(__proto, __uniformKeys);

module.exports = AddMapMaterial;