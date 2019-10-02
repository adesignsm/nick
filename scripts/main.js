var clientX = -100;
var clientY = -100;

var lastX = 0;
var lastY = 0;
var isStuck = false;
var showCursor = false;
var group, stuckX, stuckY, fillOuterCursor;

const innerCursor = document.querySelector(".cursor-small");

const initCursor = () => {

	document.addEventListener("mousemove", e => {

		clientX = e.clientX;
		clientY = e.clientY;
	});

	const render = () => {

		innerCursor.style.transform = "translate(${clientX}px, ${clientY}px)";

		requestAnimationFrame(render);
	};

	requestAnimationFrame(render);
};

initCursor();

const initCanvas = () => {

	const canvas = document.querySelector(".cursor-canvas");
	const shapeBounds = {

		width: 75,
		height: 75
	};

	paper.setup(canvas);

	const strokeColor = "rgba(255, 0, 0, 255)";
	const strokeWidth = 1;
	const segments = 8;
	const radius = 15;

	const noiseScale = 150;
	const noiseRange = 4;
	var isNoisy = false;

	const polygon = new paper.Path.RegularPolygon(

		new paper.Point(0, 0),
		segments,
		radius
	);

	polygon.strokeColor = strokeColor;
	polygon.strokeWidth = strokeWidth;
	polygon.smooth();

	group = new paper.Group([polygon]);
	group.applyMatrix = false;

	const noiseObjects = polygon.segments.map(() => new SimplexNoise());

	var bigCoordinates = [];

	const lerp = (a, b, n) => {

		return (1 - n) * a + n * b;
	};

	const map = (value, in_min, in_max, out_min, out_max) => {

		return (
			((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min)
	};

	paper.view.onFrame = event => {

		if (!isStuck) {

			lastX = lerp(lastX, clientX, 0.2);
			lastY = lerp(lastY, clientY, 0.2);

			group.position = new paper.Point(lastX, lastY);	
		
		} else if (isStuck) {

			lastX = lerp(lastX, stuckX, 0.2);
			lastY = lerp(lastY, stuckY, 0.2);

			group.position = new paper.Point(lastX, lastY);
		}

		if (isStuck && polygon.bounds.width < shapeBounds.width) {

			polygon.scale(1.08);

		} else if (!isStuck && polygon.bounds.width > 30) {

			if (isNoisy) {

				polygon.segments.forEach((segment, i) => {

					segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
				});

				isNoisy = false;
				bigCoordinates = [];
			}

			const scaleDown = 0.92;
			polygon.scale(scaleDown);
		}

		if (isStuck && polygon.bounds.width >= shapeBounds.width) {

			isNoisy = true;

			if (bigCoordinates.length === 0) {

				polygon.segments.forEach((segment, i) => {

					bigCoordinates[i] = [segment.point.x, segment.point.y];
				});
			}

			polygon.segments.forEach((segment, i) => {

				const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
				const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

				const distortionX = map(noiseX, -1, 1, -noiseRange);
				const distortionY = map(noiseY, -1, 1, -noiseRange);

				const newX = bigCoordinates[i][0] + distortionX;
				const newY = bigCoordinates[i][1] + distortionY;

				segment.point.set(newX, newY);
			});
		}

		polygon.smooth();
	};
}

initCanvas();

$(document).ready(function() {

	$("#menu-icon").on("click", function() {

		$("#menu-page").fadeIn(700);
	});

	$("#menu-close-button img").on("click", function() {

		$("#menu-page").fadeOut(700);
	});
});