var calendar = (() => {

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
      today.setHours(0, 0, 0, 0);

      let selectedDate = null;
      
      let initializeCalendar = () => {
        console.log("Init the calendar");
      
        let calendar = document.getElementById("calendar");
      
        calendarHeader(calendar);
      
        // The main calendar body comprises of
        // previous, next button, the current month listing
        let calendarBody = document.createElement("div");
        calendarBody.classList.add("calendar");
      
        let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
        // div for calendar's header
        let monthNav = document.createElement("div");
        monthNav.classList.add("month-nav");
      
        // Previous button
        let previousButton = document.createElement("button");
        previousButton.setAttribute("data-action", "-1");
        previousButton.classList.add("prev");
        previousButton.textContent = "\u003c";
        monthNav.appendChild(previousButton);
      
        // Creating the div that will contain the actual month/year
        let monthDiv = document.createElement("div");
        monthDiv.classList.add("month");
        monthNav.appendChild(monthDiv);
      
        // Next button
        let nextButton = document.createElement("button");
        nextButton.setAttribute("data-action", "1");
        nextButton.textContent = "\u003e";
        nextButton.classList.add("next");
        monthNav.appendChild(nextButton);
      
        calendarBody.appendChild(monthNav);
      
        // Creating the div that will contain the days of our calendar
        let content = document.createElement("div");
        calendarBody.appendChild(content);
      
        //Order of appending DOM is important
        calendar.appendChild(calendarBody);
      
        createDoneCancel(calendar);
      
        // Load current month
        loadMonth(currentMonth, content, monthDiv);
      
        prevNext(calendarBody, currentMonth, content, monthDiv);
      };
      
      let calendarHeader = (calendar) => {
        // The header section consist of the select date text and a text box to enter a date
        let dateHeader = document.createElement("div");
        dateHeader.classList.add("header");
      
        let selectTxt = document.createElement("div");
        selectTxt.classList.add("slDate");
        selectTxt.textContent = "Select Date";
        dateHeader.appendChild(selectTxt);
      
        let selectDate = document.createElement("div");
      
        let txtSelDate = document.createElement("input");
        txtSelDate.id = "selectedDate";
        txtSelDate.type = "text";
        txtSelDate.placeholder = "mm/dd/yyyy";
        txtSelDate.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                //TODO: call loadMonth()
            }
        });
      
        //Add Previous and next button
        // Previous button
        let previousButton = document.createElement("button");
        previousButton.setAttribute("data-action", "-1");
        previousButton.classList.add("prev");
        previousButton.textContent = "\u003c";
      
        // Next button
        let nextButton = document.createElement("button");
        nextButton.setAttribute("data-action", "1");
        nextButton.textContent = "\u003e";
        nextButton.classList.add("next");
      
        selectDate.classList.add("txtDate");
        selectDate.appendChild(txtSelDate);
        selectDate.appendChild(previousButton);
        selectDate.appendChild(nextButton);
      
        dateHeader.appendChild(selectDate);
      
        calendar.appendChild(dateHeader);
      };
      
      let createDoneCancel = (calendar) => {
        // Add Cancel and Done nuttons
        let actionBtn = document.createElement("div");
        actionBtn.classList.add("actionBtn");
      
        let cancel = document.createElement("button");
        cancel.classList.add("cancel");
        cancel.textContent = "Cancel";
        cancel.addEventListener("click", e => {
            selectedDate = null; //reset selected date to today
            //TODO: Toggle back to Today's date
        })
        actionBtn.appendChild(cancel);
      
        let done = document.createElement("button");
        done.classList.add("done");
        done.textContent = "Done";
        actionBtn.appendChild(done);
      
        calendar.appendChild(actionBtn);
      };
      
      let prevNext = (calendarBody, currentMonth, content, monthDiv) => {
        // Next/previous button functionality
        calendarBody.querySelectorAll("button").forEach((element) => {
          if (element.getAttribute("data-action")) {
            element.addEventListener("click", () => {
              currentMonth.setMonth(
                currentMonth.getMonth() * 1 +
                  parseInt(element.getAttribute("data-action")) * 1
              );
      
              loadMonth(currentMonth, content, monthDiv);
            });
          }
        });
      };
      
      let loadMonth = (date, content, monthDiv) => {
        // Empty the calendar
        content.textContent = "";
      
        // Adding the month/year displayed
        monthDiv.textContent = monthList[date.getMonth()] + " " + date.getFullYear();
      
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
            console.log(new Date(timestamp));
            selectedDate = timestamp;
            toggleDateSelection(cell)
          });
      
          // Add a special class for today
          if (timestamp === today.getTime() && selectedDate == null) {
            cell.classList.add("today");
          } else if (selectedDate == timestamp) {
              cell.classList.add("today");
          }
        }
      };

      let toggleDateSelection = (cell) => {
          let todayElm = document.querySelector(".today");
          if (todayElm)
            todayElm.classList.remove("today");

          cell.classList.add("today");
      }
      
      let createDaysNamesCells = (content) => {
        for (let i = 0; i < dayList.length; i++) {
          let cell = document.createElement("span");
          cell.classList.add("cell");
          cell.classList.add("day");
          cell.textContent = dayList[i].toUpperCase();
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
      };

      return {
          init: initializeCalendar()
      }

})();

export default calendar;
