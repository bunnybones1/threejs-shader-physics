var THREE = require('three');
window.THREE = THREE;
var ManagedView = require('threejs-managed-view');
var OrbitingBalls = require('./');
var urlparam = require('urlparam');
var view = new ManagedView.View({
	// stats:true
	skipFrames: 10
});

//lights
var light = new THREE.PointLight(0xffffff, 3);
view.scene.add(light);
var hemisphereLight = new THREE.HemisphereLight(0x7f6f5f, 0x7f0000);
view.scene.add(hemisphereLight);

var mat = new THREE.MeshPhongMaterial();

var balls = new OrbitingBalls(100, mat);
view.scene.add(balls);

view.renderManager.onEnterFrame.add(balls.onEnterFrame);
function onEnterFrame() {
	//put light and camera focus in the center of gravity
	light.position.copy(balls.centerOfMass);
	view.camera.lookAt(balls.centerOfMass);
}
view.renderManager.onEnterFrame.add(onEnterFrame);

view.renderManager.skipFrames = urlparam('skipFrames', 0);