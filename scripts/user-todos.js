function getToDoTasks() {
    const userId = document.getElementById("users").value;
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
    .then(response => response.json())
    .then(data => {
        const tasksDiv = document.getElementById("tasks");
        tasksDiv.innerHTML = ""; // Clear previous tasks
        data.forEach(task => {
            tasksDiv.innerHTML += `
                <div>
                    <p><strong>Category:</strong> ${task.category}</p>
                    <p><strong>Description:</strong> ${task.description}</p>
                    <p><strong>Deadline:</strong> ${task.deadline}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Completed:</strong> ${task.completed ? "✓" : "❌"}</p>
                </div>

            `;
        });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Fetch users and populate dropdown when page loads
window.onload = function() {
    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        const usersDropdown = document.getElementById("users");
        data.forEach(user => {
            const option = document.createElement("option");
            option.text = user.name;
            option.value = user.id;
            usersDropdown.add(option);
        });
        // Fetch tasks for the first user by default
        getToDoTasks();
    })
    .catch(error => console.error('Error fetching users:', error));
};