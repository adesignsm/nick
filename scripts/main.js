var cursorText = $("#cursor-text");
var cursorPlaceHolder = "Project 1";
var cursorTextPos = cursorText.position();

var projectsCounter = 0;

function getPos(e) {

	return {
		x1:e.clientX, y1:e.clientY,
		x2: cursorTextPos.left, y2: cursorTextPos.top
	};
}

document.onmousemove = function(e) {

	var PosCords = getPos(e);
	// console.log("move MOUSE: " + PosCords.x1 + " |||| " + PosCords.y1 + "move ELEM: " + PosCords.x2 + " |||| " + PosCords.y2);

	cursorText.animate({
		left: PosCords.x1,
		top: PosCords.y1
	}, 0, "linear");

	if (PosCords.x1 >= 800 && PosCords.y1 <= 400) {

		cursorText.text("Next Project");
	
	} else if (PosCords.x1 <= 600 && PosCords.y1 <= 400) {

		cursorText.text("Previous Project");
	
	} else {

		cursorText.text("Project 1");
	}
}

$("#snippets-span").on("mouseenter", function() {

	cursorText.text("snippets");
});

$("#snippets-span").on("mouseleave", function() {

	cursorText.text(cursorPlaceHolder);
});

$("#nav-cap-span").on("mouseenter", function() {

	cursorText.text("menu");
});

$("#nav-cap-span").on("mouseleave", function() {

	cursorText.text(cursorPlaceHolder);
});

document.onmousedown = function(e) {

	var angle = 0;

	var PosCords = getPos(e);

	if (PosCords.x1 >= 800) {

		if (projectsCounter == 0) {

			$("#banner-image").animate({opacity: "0"}, 100).delay(100).queue(function(next) {
				$(this).attr("src", "media/folder2/f2-img1.jpg"); next();
			}).delay(100).animate({opacity: "1"}, 100);

			cursorText.css({"color" : "#171E26"});

			projectsCounter++;
		
		} else if (projectsCounter == 1) {

				$("#banner-image").animate({opacity: "0"}, 100).delay(100).queue(function(next) {
					$(this).attr("src", "media/folder3/f3-img1.jpg"); next();

					if ($(this).attr("src") === "media/folder3/f3-img1.jpg") {

						$("#banner-image").css({
							
							"webkitTransform" : "rotate(-90deg)",
							"MozTransform" : "rotate(-90deg)",
							"OTransform" : "rotate(-90deg)",
							"transform" : "rotate(-90deg)"
						});
					}

				}).delay(100).animate({opacity: "1"}, 100);

			cursorText.css({"color" : "#171E26"});

			projectsCounter++;
		}
	
	} else if (PosCords.x1 <= 600) {

		console.log("left");
	}
}

