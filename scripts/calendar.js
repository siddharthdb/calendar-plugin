(function (root, factory) {
	root.myCalendar = factory(root);
})(this, (root) => {
	
	let monthList = new Array(
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	);
	
	let dayList = new Array("s", "m", "t", "w",	"t", "f", "s");
	
	let today = new Date();
	
	today.setHours(0, 0, 0, 0);

	let init = () => {
		console.log("Init the calendar");

		let element = document.getElementById("calendar");

		let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

		// div for calendar's header
		let monthNav = document.createElement("div");
		monthNav.classList.add("month-nav");
		
		// Our "previous" button
		let previousButton = document.createElement("button");
		previousButton.setAttribute("data-action", "-1");
		previousButton.textContent = "\u003c";
		monthNav.appendChild(previousButton);

		// Creating the div that will contain the actual month/year
		let monthDiv = document.createElement("div");
		monthDiv.classList.add("month");
		monthNav.appendChild(monthDiv);

		// Our "next" button
		let nextButton = document.createElement("button");
		nextButton.setAttribute("data-action", "1");
		nextButton.textContent = "\u003e";
		monthNav.appendChild(nextButton);
		
		element.appendChild(monthNav);

		// Creating the div that will contain the days of our calendar
		let content = document.createElement("div");
		element.appendChild(content);

		// Add Cancel and Done nuttons
		let actionBtn = document.createElement("div");
		
		let cancel = document.createElement("button");
		cancel.classList.add("cancel");

		let done = document.createElement("button");
		done.classList.add("done");
		element.appendChild(actionBtn);

		// Load current month
		loadMonth(currentMonth, content, monthDiv);

		// Next/previous button functionality
		element.querySelectorAll("button").forEach((element) => {
			element.addEventListener("click", () => {
				currentMonth.setMonth(
					currentMonth.getMonth() * 1 +
					parseInt(element.getAttribute("data-action")) * 1
				);
				
				loadMonth(currentMonth, content, monthDiv);
			});
		});
	};

	let loadMonth = (date, content, monthDiv) => {
		// Empty the calendar
		content.textContent = "";

		// Adding the month/year displayed
		monthDiv.textContent =
			monthList[date.getMonth()] + " " + date.getFullYear();

		// Creating the cells containing the days of the week. E.g: S M T...
		createDaysNamesCells(content);

		// Creating empty cells if necessary
		createEmptyCellsIfNecessary(content, date);

		// Number of days in the current month
		let monthLength = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0
		).getDate();

		// Creating the cells containing current's month's days
		for (let i = 1; i <= monthLength; i++) {
			let cell = document.createElement("span");
			cell.classList.add("cell");
			cell.textContent = `${i}`;
			content.appendChild(cell);

			// Cell's timestamp
			let timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();
			cell.addEventListener("click", () => {
				console.log(timestamp);
				console.log(new Date(timestamp))
			});

			// Add a special class for today
			if (timestamp === today.getTime()) {
				cell.classList.add("today");
			}
		}
	}

	let createDaysNamesCells = (content) => {
		for (let i = 0; i < dayList.length; i++) {
			let cell = document.createElement("span");
			cell.classList.add("cell");
			cell.classList.add("day");
			cell.textContent = dayList[i].substring(0, 3).toUpperCase();
			content.appendChild(cell);
		}
	};

	let createEmptyCellsIfNecessary = (content, date) => {
		for (let i = 0; i < date.getDay(); i++) {
			let cell = document.createElement("span");
			cell.classList.add("cell");
			cell.classList.add("empty");
			content.appendChild(cell);
		}
	}

	return {
		init,
	};
});
