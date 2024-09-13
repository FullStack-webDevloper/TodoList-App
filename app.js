document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  // Add task handler
  taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

       // Get form values
       const taskName = document.getElementById('taskName').value;
       const taskDesc = document.getElementById('taskDesc').value;
   
       // Create new task item
       const taskItem = document.createElement('li');
       taskItem.classList.add('task-item');
   
       // Task details container
       const taskDetails = document.createElement('div');
       taskDetails.classList.add('task-details');
   
       const taskTitle = document.createElement('h3');
       taskTitle.textContent = taskName;
   
       const taskDescription = document.createElement('p');
       taskDescription.textContent = taskDesc;
   
       taskDetails.appendChild(taskTitle);
       taskDetails.appendChild(taskDescription);
   
       // Task actions container
       const taskActions = document.createElement('div');
       taskActions.classList.add('task-actions');
   
       const completeButton = document.createElement('button');
       completeButton.classList.add('complete');
       completeButton.innerHTML = '<i class="fas fa-check"></i>';
       
       const deleteButton = document.createElement('button');
       deleteButton.classList.add('delete');
       deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
   
       taskActions.appendChild(completeButton);
       taskActions.appendChild(deleteButton);
   
       taskItem.appendChild(taskDetails);
       taskItem.appendChild(taskActions);
   
       // Append task to the task list
       taskList.appendChild(taskItem);
   
       // Clear form fields after submission
       taskForm.reset();
   
       // Mark task as complete
       completeButton.addEventListener('click', function () {
         taskItem.classList.toggle('completed');
       });
   
       // Delete task
       deleteButton.addEventListener('click', function () {
         taskList.removeChild(taskItem);
       });
     });
   });
   
