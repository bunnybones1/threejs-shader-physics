var defaults = require('lodash.defaults');
var three = require('three');
var ScrollDownNode = require('../renderNodes/ScrollDown');
var PositionMapNode = require('../renderNodes/PositionMap');
var VelocityMapNode = require('../renderNodes/VelocityMap');
var PositionMapPoints = require('../meshes/PositionMapPoints');
var getPlaneGeometry = require('../geometry/static/getPlaneGeometry');
var __defaultParams = {
	width: 1024,
	height: 8
};

function ShaderPhysicsWorldTest(params) {
	params = defaults(params, __defaultParams);

	var width = params.width;
	var height = params.height;
	var scrollNode = new ScrollDownNode({
		width: width,
		height: height,
		renderer: params.renderer
	});

	var velocityMapNode = new VelocityMapNode({
		width: width,
		height: 1,
		renderer: params.renderer
	});

	var positionMapNode = new PositionMapNode({
		width: width,
		height: 1,
		map2: velocityMapNode.getTexture(),
		renderer: params.renderer
	});

	var pointsTest = new PositionMapPoints({
		width: width,
		height: height,
		size: 4,
		map: scrollNode.getTexture()
	});

	var dot = new three.Mesh(
		new three.SphereGeometry(0.5/width * 8, 4, 2),
		new three.MeshBasicMaterial({
			wireframe: true,
			color: 0xffffff
		})
	);
	velocityMapNode.scene.add(dot);
	dot.position.x = (~~(Math.random() * width) + 0.5) / width - 0.5;

	var positionMapPlane = new three.Mesh(
		getPlaneGeometry(),
		new three.MeshBasicMaterial({
			map: positionMapNode.getTexture()
		})
	);
	positionMapPlane.position.y = 0.5 - 0.5 / height;
	positionMapPlane.scale.set(1, -1/height, 1);
	scrollNode.scene.add(positionMapPlane);


	var geom = getPlaneGeometry();
	var mat = new three.MeshBasicMaterial({
		// map: node.getTexture(),
		color: 0xaaaaaa
	});
	three.Mesh.call(this, geom, mat);

	this.add(pointsTest);

	this.positionMapPlane = positionMapPlane;
	this.velocityMapNode = velocityMapNode;
	this.positionMapNode = positionMapNode;
	this.scrollNode = scrollNode;
	this.dot = dot;
	this.pointsTest = pointsTest;
	this.width = width;
	this.height = height;


	this.onEnterFrame = this.onEnterFrame.bind(this);
}

var norm = new three.Vector3();

function onEnterFrame() {
	this.velocityMapNode.onEnterFrame();
	this.positionMapNode.onEnterFrame();
	this.positionMapPlane.material.map = this.positionMapNode.getTexture();
	this.pointsTest.material.map = this.scrollNode.getTexture();
	norm.set(Math.random() - 0.5, Math.random() - 0.5, 0);
	norm.normalize();
	this.dot.material.color.setRGB(norm.x * 0.5 + 0.5, norm.y * 0.5 + 0.5, norm.z);
	this.dot.position.x = (~~(Math.random() * this.width) + 0.5) / this.width - 0.5;
	this.scrollNode.onEnterFrame();
	this.material.map = this.scrollNode.getTexture();
}

var proto = Object.create(three.Mesh.prototype);
ShaderPhysicsWorldTest.prototype = proto;
proto.onEnterFrame = onEnterFrame;

module.exports = ShaderPhysicsWorldTest;