// JavaScript code goes here

// Get current date
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Function to display the calendar
function displayCalendar(month, year) {
  let firstDay = new Date(year, month, 1);
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let startingDay = firstDay.getDay();

  let calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = '';

  // Display the month and year
  document.getElementById("month_title").textContent = `${month + 1}/${year}`;

  // Generate calendar dates
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    let rowEmpty = true;
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < startingDay) {
        // Leave cells before the start of the month blank
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        // Leave cells after the end of the month blank
        row.appendChild(cell);
      } else {
        // Display date and make it clickable
        cell.textContent = date;
        cell.dataset.date = `${year}-${month + 1}-${date}`;
        cell.addEventListener("click", function() {
          // Handle click event (Add tasks functionality can be implemented here)
          alert(`Clicked on ${this.dataset.date}`);
        });
        row.appendChild(cell);
        date++;
        rowEmpty = false;
      }
    }
    if (!rowEmpty) {
      calendarBody.appendChild(row);
    }
  }
}

// Initial display of calendar
displayCalendar(currentMonth, currentYear);

// Event listeners for changing month
document.getElementById("prev_month").addEventListener("click", function() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  displayCalendar(currentMonth, currentYear);
});

document.getElementById("next_month").addEventListener("click", function() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  displayCalendar(currentMonth, currentYear);
});
