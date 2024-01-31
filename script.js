document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasksList = document.getElementById('tasks-list');

        // Create task item
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item';

        // Create task text
        const taskTextElement = document.createElement('span');
        taskTextElement.innerText = taskText;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteTask(taskItem);
        });

        // Append elements to task item
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(deleteButton);

        // Append task item to tasks list
        tasksList.appendChild(taskItem);

        // Clear input
        taskInput.value = '';

        // Save tasks to local storage
        saveTasks();
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

function clearTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    saveTasks();
}

function saveTasks() {
    const tasksList = document.getElementById('tasks-list');
    const tasks = [];

    // Extract task texts
    tasksList.querySelectorAll('.list-group-item span').forEach(function (taskTextElement) {
        tasks.push(taskTextElement.innerText);
    });

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasksList = document.getElementById('tasks-list');
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach(function (taskText) {
            // Create task item
            const taskItem = document.createElement('li');
            taskItem.className = 'list-group-item';

            // Create task text
            const taskTextElement = document.createElement('span');
            taskTextElement.innerText = taskText;

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function () {
                deleteTask(taskItem);
            });

            // Append elements to task item
            taskItem.appendChild(taskTextElement);
            taskItem.appendChild(deleteButton);

            // Append task item to tasks list
            tasksList.appendChild(taskItem);
        });
    }
}
