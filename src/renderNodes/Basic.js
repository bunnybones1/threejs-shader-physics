var defaults = require('lodash.defaults');
var three = require('three');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');

var __defaultParams = {
	width: 64,
	height: 64
};

function BasicRenderNode(params) {
	params = defaults(params, __defaultParams);

	var camera = new three.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
	var scene = new three.Scene();
	scene.add(camera);
	var renderer = params.renderer;
	if(!renderer) {
		throw new Error('Needs a renderer.');
	}
	var options = {
		minFilter: three.NearestFilter,
		magFilter: three.NearestFilter
	};
	var renderTarget = new three.WebGLRenderTarget(params.width, params.height, options);
	var renderTarget2 = new three.WebGLRenderTarget(params.width, params.height, options);


	var geom = new three.PlaneGeometry(1, 1, 1, 1);
	geom.faceVertexUvs[0].forEach(function offsetUvs(uvs) {
		uvs.forEach(function offsetUv(uv) {
			// uv.x -= 1 / 64;
			uv.y -= 1 / 64;
		});
	});
	var mat = new three.MeshBasicMaterial({
		color: 0xffffff,
		map: renderTarget2
	});
	var mesh = new three.Mesh(geom, mat);
	scene.add(mesh);
	mesh.scale.set(1, -1, 1);

	this.camera = camera;
	this.scene = scene;
	this.mesh = mesh;
	this.renderer = renderer;
	this.renderTarget = renderTarget;
	this.renderTarget2 = renderTarget2;
}

function _swapRenderTargets() {
	this.mesh.material.map = this.renderTarget.texture;
	var temp = this.renderTarget2;
	this.renderTarget2 = this.renderTarget;
	this.renderTarget = temp;
}

var first = true;
function onEnterFrame() {
	if(first) {
		first = false;
		this.renderer.setRenderTarget(this.renderTarget);
		this.renderer.setClearColor(new three.Color(1, 1, 1), 1);
		this.renderer.clear();
		this.renderer.setClearColor(new three.Color(0, 0, 0), 1);
	}
	_swapRenderTargets.call(this);
	this.renderer.render(this.scene, this.camera, this.renderTarget);
}

function getTexture() {
	return this.renderTarget.texture;
}

var proto = {};
BasicRenderNode.prototype = proto;
proto.onEnterFrame = onEnterFrame;
proto.getTexture = getTexture;

module.exports = BasicRenderNode;