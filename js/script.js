var wrapper = $('#wrapper');
var buildGrid = function(input) {
	for (var i = 0; i < input; i++) {
		for (var j = 0; j < input; j++) {
			wrapper.append('<div class="square"></div>');
		};
		wrapper.append('<div class="row"></div>');
	}
	var square = $('.square');
	var size = 100 / input + "%";
	$('.row').css('height', size);
	square.css('height', size);
	square.css('width', size);
};

var destroyGrid = function() {
	wrapper.empty();
};

var drawBlack = function() {
	$('.square').on('mouseenter', function() {
		$(this).css('background-color', 'black');
		$('#color-toggle').on('click', function() {
			$(this).text("---- Black ----");
		});
	});
};

var drawColor = function() {
	$('.square').on('mouseenter', function() {
		$(this).css('background-color', randomColor());  //randomColor script created by David Merfield: https://github.com/davidmerfield/randomColor
		$('#color-toggle').on('click', function() {
			$(this).text("Random Colors");
		});
	});
};

var clearDrawn = function() {
	$('.square').css('background-color', '');
}
// Replication for deprecated jQuery .toggle() method, found on stackoverflow: 
// http://stackoverflow.com/questions/17583215/jquery-toggle-event-deprecated-what-to-use
$.fn.clickToggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).click(function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

//var drawOpaq = function() {
//	$('.square').on('mouseenter', function() {
//
//	})
//}

$(document).ready(function() {

///////////// Initialize the build with a 40x40 grid: ////////////	
	buildGrid(40);
	drawBlack();

///////////// Clear Button: //////////////////////////////////////
	$('#reset').on('click', function() {
		clearDrawn();
	});

///////////// Draw with random color or black: ///////////////////
	$('#color-toggle').clickToggle(drawColor, drawBlack);

///////////// Change the size of the grid: ///////////////////////
	$('#gridSize').on('click', function() {
		input = prompt("Choose the number of rows and columns (1-100)");
		if (input > 0 && input < 101) {
			destroyGrid();
			buildGrid(input);
			if ($('#color-toggle').text() === "Random Colors") {
				drawBlack();
			} else {
				drawColor();
			};
		} else {
			alert("Sorry, that is an incorrect input, please enter a number between 1 and 100.");
		};
	});
});