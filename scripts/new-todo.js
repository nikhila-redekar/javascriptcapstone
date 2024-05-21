// Function to populate users dropdown
function populateUsersDropdown() {
    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        const userDropdown = document.getElementById("user");
        data.forEach(user => {
            const option = document.createElement("option");
            option.text = user.name;
            option.value = user.id;
            userDropdown.add(option);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

// Function to populate categories dropdown
function populateCategoriesDropdown() {
    fetch('http://localhost:8083/api/categories')
    .then(response => response.json())
    .then(data => {
        const categoryDropdown = document.getElementById("category");
        data.forEach(category => {
            const option = document.createElement("option");
            option.text = category.name; 
            categoryDropdown.add(option);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));
}

// Function to add new ToDo task
function addTodo() {
    const formData = new FormData(document.getElementById("todoForm"));
    fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('ToDo task added successfully!');
        } else {
            alert('Failed to add ToDo task.');
        }
    })
    .catch(error => console.error('Error adding ToDo task:', error));
}

// Populate dropdowns when the page loads
window.onload = function() {
    populateUsersDropdown();
    populateCategoriesDropdown();
};