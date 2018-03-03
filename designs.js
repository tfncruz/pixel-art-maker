jQuery(document).ready(function() {

	// store elements on const variables
	const bgColorPicker = $("#bg-color-picker");
	const fgColorPicker = $("#fg-color-picker");
	const sizePicker = $("#size-picker");

	// store icon elements on const variables
	const pencil_icon = $("#pencil");
	const eraser_icon = $("#eraser");

	// updates the grid background color imediately on change 
	bgColorPicker.change(function() { $("table").css("background-color", bgColorPicker.val()); });

	// Submit button listener/handler
	sizePicker.submit(function(event) {

		// prevent default form button action
		event.preventDefault();

		// remove starting help tip
		if($(".tip").is(":visible")) { $(".tip").toggle(); }

		// build grid
		makeGrid();
	});

	// -------------------------------------- MAKE GRID
	function makeGrid() {

		// clear the previews grid
		$("tr").remove();

		// store the intended width and height of the grid
		let gridWidth = $("#input_width").val();
		let gridHeight = $("#input_height").val(); 

		// create the new grid (outside loop -> TRs, inside loop -> TDs)
		for(let r = 0; r < gridHeight; r++) {
			// create TRs with sequencial class names row0, row1, row2,...
			$("#pixel-canvas").append("<tr class=row"+r+"></tr>");

			for(let d = 0; d < gridWidth; d++) {
				// create TDs with sequencial class names (containing a reference to row) r0d0, r0d1, r0d2,... 
				$(".row"+r).append("<td class=r"+r+"d"+d+"></td>");
			}
		}

		// set the background color
		$("table").css("background-color", bgColorPicker.val());
	}

	// listener/handler for grid cells
	$("#pixel-canvas").mousedown(function(event) {

		// get the class name of clicked cell
		let td = event.target.className;

		// change TD's color if pencil_icon is active
		if(pencil_icon.hasClass("icon-active")) {
			$("."+td).css("background-color", fgColorPicker.val());
		} else {
			$("."+td).css("background-color", bgColorPicker.val());
		}
	});

	// add listener and handle the icons state
	pencil_icon.click(function() {

		// alternate active/inactive classes on the icons
		if(pencil_icon.hasClass("icon-inactive")) {
			pencil_icon.removeClass("icon-inactive");
			pencil_icon.addClass("icon-active");

			eraser_icon.removeClass("icon-active");
			eraser_icon.addClass("icon-inactive");
		}
	});
	eraser_icon.click(function() {
		if(eraser_icon.hasClass("icon-inactive")) {
			eraser_icon.removeClass("icon-inactive");
			eraser_icon.addClass("icon-active");

			pencil_icon.removeClass("icon-active");
			pencil_icon.addClass("icon-inactive");
		}
	});
});


