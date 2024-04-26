// JavaScript code goes here
// Get current date
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Create a Mapping
let notes = {};

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
      cell.setAttribute('class','box');
      if (i === 0 && j < startingDay) {
        // Leave cells before the start of the month blank
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        // Leave cells after the end of the month blank
        row.appendChild(cell);
      } else {
        // Display date and make it clickable
        cell.classList.add('can-hover');
        cell.textContent = date;
        cell.dataset.date = `${year}-${month + 1}-${date}`;

        // cell.addEventListener("click", function() {
        //   // Handle click event (Add tasks functionality can be implemented here)
        //   alert(`Clicked on ${this.dataset.date}`);
        // });
        
        cell.addEventListener("click", function() {
          // Handle click event (Add tasks functionality can be implemented here)
          let key = this.dataset.date;
          if (notes[key] !== undefined) {
            alert(notes[key]);
          }
          else {
            let inputText = prompt("Please enter the text:");
            if (inputText !== null) {
              // Store the entered text in your mapping
              notes[key] = inputText;
            }
          }
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

document.addEventListener('DOMContentLoaded', function() {
  const calendarBody = document.getElementById('calendarBody');
  const allSquares = calendarBody.querySelectorAll('td');

  // Function to reset the style of all calendar squares
  function resetSquares() {
    allSquares.forEach(square => {
      // square.style.transform = 'scale(1)';
      square.style.zIndex = '0';
    });
  }

  // Event listener to handle clicks on calendar squares
  calendarBody.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
      // Reset all squares
      resetSquares();
      // Enlarge the clicked square
      target.style.transform = 'scale(1.2)';
      target.style.zIndex = '1';
    }
  });

  // Event listener to handle clicks outside of calendar squares
  document.body.addEventListener('click', function(event) {
    const isClickedOutside = !calendarBody.contains(event.target);
    if (isClickedOutside) {
      // Reset all squares when clicked outside
      resetSquares();
    }
  });
});

