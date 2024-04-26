let currentDate = new Date(2024, 3); // April 2024

function createCalendar(year, month) {
  const monthYear = document.getElementById('monthYear');
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = '';

  // Set the month and year title
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // First day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Fill first row from Sunday till the first day of the month
  let date = 1;
  for (let i = 0; i < 7; i++) {
    let cell = document.createElement('td');
    if (i >= firstDay.getDay()) {
      cell.textContent = date++;
      cell.dataset.date = `${year}-${month + 1}-${date - 1}`; // Store the date as a data attribute
      cell.addEventListener('click', handleDayClick); // Add click event listener
      const notes = getNotesForDate(cell.dataset.date);
      if (notes.length > 0) {
        const notesList = document.createElement('ul');
        notesList.classList.add('notes-list');
        notes.forEach((note, index) => {
          const noteItem = document.createElement('li');
          noteItem.textContent = note;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.dataset.index = index;
          deleteButton.dataset.date = cell.dataset.date;
          deleteButton.addEventListener('click', handleNoteDelete);
          noteItem.appendChild(deleteButton);
          notesList.appendChild(noteItem);
        });
        cell.appendChild(notesList);
      }
      calendarBody.appendChild(cell);
    } else {
      calendarBody.appendChild(document.createElement('td'));
    }
  }

  // Fill the rest of the days in the month
  while (date <= lastDay.getDate()) {
    let row = document.createElement('tr');
    for (let i = 0; i < 7 && date <= lastDay.getDate(); i++) {
      let cell = document.createElement('td');
      cell.textContent = date;
      cell.dataset.date = `${year}-${month + 1}-${date}`; // Store the date as a data attribute
      cell.addEventListener('click', handleDayClick); // Add click event listener
      const notes = getNotesForDate(cell.dataset.date);
      if (notes.length > 0) {
        const notesList = document.createElement('ul');
        notesList.classList.add('notes-list');
        notes.forEach((note, index) => {
          const noteItem = document.createElement('li');
          noteItem.textContent = note;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.dataset.index = index;
          deleteButton.dataset.date = cell.dataset.date;
          deleteButton.addEventListener('click', handleNoteDelete);
          noteItem.appendChild(deleteButton);
          notesList.appendChild(noteItem);
        });
        cell.appendChild(notesList);
      }
      row.appendChild(cell);
      date++;
    }
    calendarBody.appendChild(row);
  }
}
function handleDayClick(event) {
    const cell = event.target;
  
    // Remove highlight from all cells
    document.querySelectorAll('td[data-date]').forEach(cell => {
      cell.classList.remove('highlight');
    });
  
    // Add highlight to the clicked cell
    cell.classList.add('highlight');
  }
  
  
function getNotesForDate(date) {
  const storedNotes = localStorage.getItem(date);
  return storedNotes ? JSON.parse(storedNotes) : [];
}

function saveNotesForDate(date, notes) {
  localStorage.setItem(date, JSON.stringify(notes));
}

function changeMonth(step) {
  currentDate.setMonth(currentDate.getMonth() + step);
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Initial call to fill the calendar
createCalendar(currentDate.getFullYear(), currentDate.getMonth());
