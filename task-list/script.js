    //Activate add-button, and add new task to the list
    document.addEventListener("DOMContentLoaded", function() {
        const addButton = document.querySelector('.frame');
        if (!addButton) {
            console.error('Add button not found');
            return; // Stop execution if addButton is not found
        }

        addButton.addEventListener('click', function(event) {
            event.preventDefault(); 

            const inputField = document.querySelector('.text-wrapper');
            if (!inputField) {
                console.error('Input field not found');
                return; 
            }

            const inputText = inputField.value; // Get the value from the text input
            console.log('Adding task:', inputText); // Log input for debugging

            if (inputText.trim() !== "") {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks array or initialize it
                const newTask = {
                    id: Date.now(), // Unique identifier for each task
                    text: inputText,
                    completed: false // Track completion status
                };
                tasks.push(newTask); // Add new task to array
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Store updated array back to localStorage
                window.location.href = 'index.html'; // Redirect to index.html
            } else {
                alert('Please enter a task name.');
            }
        });
    });
        
      
      //adding task to the list 
      document.addEventListener("DOMContentLoaded", function() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const tasksContainer = document.querySelector('.tasks-container');
    
        tasksContainer.innerHTML = '';
    
        tasks.forEach(task => {
            const newTaskHtml = `
                <div class="overlap" data-id="${task.id}">
                    <div class="group">
                        <label class="checkbox-container">
                            <input type="checkbox" class="rectangle-checkbox" ${task.completed ? 'checked' : ''}>
                            <span class="rectangle"></span>
                            <div class="text-wrapper">${task.text}</div>
                            <button class="delete-btn">&#x2716;</button>
                        </label>
                    </div>
                </div>
            `;
            tasksContainer.insertAdjacentHTML('beforeend', newTaskHtml);
        });
    });    
    
    //bluring the task-list bar and move the task to the bottom of the list
      document.addEventListener("DOMContentLoaded", function() {
        const tasksContainer = document.querySelector('.tasks-container');
        const tasks = document.querySelectorAll('.group');
    
        tasks.forEach(task => {
          const checkbox = task.querySelector('.rectangle-checkbox');
          const textWrapper = task.querySelector('.text-wrapper');
    
          // Function to handle checkbox change event
          function handleCheckboxChange() {
            if (checkbox.checked) {
              textWrapper.classList.add('text-completed');
              setTimeout(() => {
                task.parentElement.classList.add('blur-effect');
                tasksContainer.appendChild(task.parentElement);
              }, 300);
            } else {
              textWrapper.classList.remove('text-completed');
              task.parentElement.classList.remove('blur-effect');
            }
          }
    
          // Function to handle text-wrapper click event
          function handleTextWrapperClick(event) {
            event.stopPropagation(); // Prevent checkbox click event from firing
          }
    
          // Add event listener for checkbox change event
          checkbox.addEventListener('change', handleCheckboxChange);
    
          // Add event listener for text-wrapper click event
          textWrapper.addEventListener('click', handleTextWrapperClick);
        });

      });

      //delete button functionality
      document.addEventListener("DOMContentLoaded", function() {
        const tasksContainer = document.querySelector('.tasks-container');
    
        tasksContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-btn')) {
                const taskElement = event.target.closest('.overlap');
                const taskId = parseInt(taskElement.dataset.id); // Make sure IDs are integers
                let tasks = JSON.parse(localStorage.getItem('tasks'));
                tasks = tasks.filter(task => task.id !== taskId);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskElement.remove();
            }
        });
    });

      document.addEventListener("DOMContentLoaded", function() {
      const tasksContainer = document.querySelector('.tasks-container');
      const taskDiv = document.querySelector('.to-do-list .div');

      function updateOverflow() {
          const tasks = document.querySelectorAll('.overlap');
          const taskCount = tasks.length;
          
          if (taskCount >= 10) {
              taskDiv.style.overflowY = 'auto';
          } else {
              taskDiv.style.overflowY = 'hidden';
          }
      }

      updateOverflow();

      tasksContainer.addEventListener('DOMNodeInserted', updateOverflow);
      tasksContainer.addEventListener('DOMNodeRemoved', updateOverflow);
    });

