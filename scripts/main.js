var cursorText = $("#cursor-text");
var cursorTextPos = cursorText.position();

function getPos(e) {

	return {
		x1:e.clientX, y1:e.clientY,
		x2: cursorTextPos.left, y2: cursorTextPos.top
	};
}

document.onmousemove = function(e) {

	var PosCords = getPos(e);
	console.log("move MOUSE: " + PosCords.x1 + " |||| " + PosCords.y1 + "move ELEM: " + PosCords.x2 + " |||| " + PosCords.y2);

	cursorText.animate({
		left: PosCords.x1,
		top: PosCords.y1
	}, 0, "linear");
}

$("#nav-cap-span, #snippets-span").on("mouseenter", function() {

	cursorText.fadeOut(500);
});

$("#nav-cap-span, #snippets-span").on("mouseleave", function() {

	cursorText.fadeIn(100);
});

