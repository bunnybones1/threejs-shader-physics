var three = require('three');
window.THREE = three;
var ManagedView = require('threejs-managed-view');
var ShaderPhysicsWorldTest = require('./src/meshes/ShaderPhysicsWorldTest');
var urlparam = require('urlparam');

var camera = new three.OrthographicCamera(-100, 100, -100, 100, -100, 100);
var view = new ManagedView.View({
	camera: camera
	// stats:true
});

var test = new ShaderPhysicsWorldTest({
	renderer: view.renderer
});
view.scene.add(test);

view.renderManager.onEnterFrame.add(test.onEnterFrame);
function onEnterFrame() {

}
view.renderManager.onEnterFrame.add(onEnterFrame);
view.onResizeSignal.add(onResize);
function onResize(w, h) {
	test.position.x = w * 0.5;
	test.position.y = h * 0.5;
	var s = w < h ? w : h;
	test.scale.set(-s, s, 1);
}
setTimeout(function kickStartResize() {
	onResize(window.innerWidth, window.innerHeight);
}, 100);

setTimeout(function slowDown() {
	view.renderManager.skipFrames = urlparam('skipFrames', 0);
}, 1000);
