function getToDoTasks() {
    const userId = document.getElementById("users").value;
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
    .then(response => response.json())
    .then(data => {
        const tasksDiv = document.getElementById("tasks");
        tasksDiv.innerHTML = ""; // Clear previous tasks

        // Slice data into chunks of three tasks each
        const chunks = chunkArray(data, 3);

        chunks.forEach(chunk => {
            let row = document.createElement("div");
            row.classList.add("row");

            chunk.forEach(task => {
                let col = document.createElement("div");
                col.classList.add("col-md-4"); // Bootstrap column class for medium size
                col.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${task.category}</h5>
                            <p class="card-text"><strong>Description: </strong>${task.description}</p>
                            <p><strong>Deadline:</strong> ${task.deadline}</p>
                            <p><strong>Priority:</strong> ${task.priority}</p>
                            <p><strong>Completed:</strong> ${task.completed ? "✓" : "❌"}</p>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            });

            tasksDiv.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Utility function to chunk array into smaller arrays
function chunkArray(arr, chunkSize) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
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
