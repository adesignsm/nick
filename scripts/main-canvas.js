var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var mouse = new THREE.Vector3();

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

document.getElementById("main-page-canvas").appendChild(renderer.domElement);

window.addEventListener("resize", function() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

camera.position.z = 10;

var renderGeo = new THREE.PlaneGeometry(5, 7, 1);
var renderMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("media/main-page/1.png"), side: THREE.DoubleSide});
var render1 = new THREE.Mesh(renderGeo, renderMaterial);
scene.add(render1);

if (w <= 408 && h <= 890) {
	
	document.removeEventListener("mousemove", onMouseMove);

} else {

	document.addEventListener("mousemove", onMouseMove, false);
}

function onMouseMove(event) {

	mouseX = event.clientX - window.innerWidth / 2;
	mouseY = event.clientY - window.innerHeight / 2;

	camera.position.x = (mouseX - camera.position.x) * 0.002;
	camera.position.y = (mouseY - camera.position.y) * 0.002;

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	camera.lookAt(scene.position);
	camera.updateMatrixWorld();
}

var update = function() {


};

var render = function() {

	renderer.render(scene, camera)
};

var animate = function() {

	requestAnimationFrame(animate);

	update();
	render();
};

animate();