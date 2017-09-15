var three = require('three');
var __geometry;

function __getPlaneGeometry() {
	if(!__geometry) {
		__geometry = new three.PlaneGeometry(1, 1, 1, 1);
	}
	return __geometry;
}

module.exports = __getPlaneGeometry;