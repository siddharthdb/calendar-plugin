import '../styles/scss/index';

export default function CalendarPlugin() {
    const monthList = new Array(
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

    const dayList = new Array("s", "m", "t", "w", "t", "f", "s");

    const today = new Date();

    this.init = () => {
        today.setHours(0, 0, 0, 0);
        console.log("Init the calendar");

        const element = document.getElementById("calendar");

        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // div for calendar's header
        const monthNav = document.createElement("div");
        monthNav.classList.add("month-nav");

        // Our "previous" button
        const previousButton = document.createElement("button");
        previousButton.setAttribute("data-action", "-1");
        previousButton.textContent = "\u003c";
        monthNav.appendChild(previousButton);

        // Creating the div that will contain the actual month/year
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");
        monthNav.appendChild(monthDiv);

        // Our "next" button
        const nextButton = document.createElement("button");
        nextButton.setAttribute("data-action", "1");
        nextButton.textContent = "\u003e";
        monthNav.appendChild(nextButton);

        element.appendChild(monthNav);

        // Creating the div that will contain the days of our calendar
        const content = document.createElement("div");
        element.appendChild(content);

        // Add Cancel and Done nuttons
        const actionBtn = document.createElement("div");

        const cancel = document.createElement("button");
        cancel.classList.add("cancel");

        const done = document.createElement("button");
        done.classList.add("done");
        element.appendChild(actionBtn);

        // Load current month
        this.loadMonth(currentMonth, content, monthDiv);

        // Next/previous button functionality
        element.querySelectorAll("button").forEach((element) => {
            element.addEventListener("click", () => {
                currentMonth.setMonth(
                    currentMonth.getMonth() * 1 +
                    parseInt(element.getAttribute("data-action")) * 1
                );

                this.loadMonth(currentMonth, content, monthDiv);
            });
        });
    };

    this.loadMonth = (date, content, monthDiv) => {
        // Empty the calendar
        content.textContent = "";

        // Adding the month/year displayed
        monthDiv.textContent =
            monthList[date.getMonth()] + " " + date.getFullYear();

        // Creating the cells containing the days of the week. E.g: S M T...
        this.createDaysNamesCells(content);

        // Creating empty cells if necessary
        this.createEmptyCellsIfNecessary(content, date);

        // Number of days in the current month
        const monthLength = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        // Creating the cells containing current's month's days
        for (let i = 1; i <= monthLength; i++) {
            const cell = document.createElement("span");
            cell.classList.add("cell");
            cell.textContent = `${i}`;
            content.appendChild(cell);

            // Cell's timestamp
            const timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();
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

    this.createDaysNamesCells = (content) => {
        dayList.forEach(day => {
            const cell = document.createElement("span");
            cell.classList.add("cell");
            cell.classList.add("day");
            cell.textContent = day.substring(0, 3).toUpperCase();
            content.appendChild(cell);
        })
    };

    this.createEmptyCellsIfNecessary = (content, date) => {
        let i = 0;
        while(i < date.getDay()) {
            const cell = document.createElement("span");
            cell.classList.add("cell");
            cell.classList.add("empty");
            content.appendChild(cell);
            i++;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calendarPlugin = new CalendarPlugin();
    calendarPlugin.init();
})