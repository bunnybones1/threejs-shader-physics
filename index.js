var THREE = require('three');

function OrbitingBalls(totalBalls, material) {
	THREE.Object3D.call(this);
	material = material ? material : new THREE.MeshBasicMaterial();

	//all units are in metres
	this.totalBalls = totalBalls ? totalBalls : 100;
	this.balls = [];

	var birthBoxSize = 1;
	var birthBoxSizeHalf = birthBoxSize * .5;

	//for center of gravity
	this.totalMass = 0;
	this.centerOfMass = new THREE.Vector3();
	
	//for ball physics
	var initVelocity = .0002;
	var initVelocityHalf = initVelocity * .5;

	//let make some balls!
	for (var i = this.totalBalls - 1; i >= 0; i--) {
		//standard threejs ball stuff
		var radius = Math.pow(Math.random(), 4) * .2 + .05;
		var ball = new THREE.Mesh(
			new THREE.SphereGeometry(radius),
			material
		);
		ball.position.set(
			Math.random() * birthBoxSize - birthBoxSizeHalf,
			Math.random() * birthBoxSize - birthBoxSizeHalf,
			Math.random() * birthBoxSize - birthBoxSizeHalf
		)
		this.balls.push(ball);
		this.add(ball);

		//extra stuff for physics
		var mass = Math.pow(radius, 3)
		ball.mass = mass;
		this.totalMass += mass;
		ball.velocity = new THREE.Vector3(
			Math.random() * (initVelocity - initVelocityHalf) / mass,
			Math.random() * (initVelocity - initVelocityHalf) / mass,
			Math.random() * (initVelocity - initVelocityHalf) / mass
		);

	}
	this.onEnterFrame = this.onEnterFrame.bind(this);
}

OrbitingBalls.prototype = Object.create(THREE.Object3D.prototype);

//on every frame
OrbitingBalls.prototype.onEnterFrame = function () {
	// console.log(FPS.animSpeedCompensation);
	//calculate center of gravity
	this.centerOfMass.set(0,0,0);
	for (var i = this.totalBalls - 1; i >= 0; i--) {
		var ball = this.balls[i];
		this.centerOfMass.add(ball.position.clone().multiplyScalar(ball.mass/this.totalMass));
	};
	//keeps the center of gravity from drifting into space
	this.centerOfMass.multiplyScalar(.99);
	//apply physics
	for (var i = this.totalBalls - 1; i >= 0; i--) {
		var ball = this.balls[i];
		var dist = ball.position.clone().sub(this.centerOfMass);
		ball.velocity.sub(
			dist.multiplyScalar(.00001 / (ball.mass * dist.length()))
		);
		ball.position.add(ball.velocity);
		ball.scale.z = 1 + ball.velocity.length() * 30;
		ball.scale.x = ball.scale.y = 1/Math.sqrt(ball.scale.z);
		ball.lookAt(ball.position.clone().add(ball.velocity))
	};
}

module.exports = OrbitingBalls;