  /*const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!fname || !username || !password || !confirmPassword) {
        displayErrorMessage("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        displayErrorMessage("Passwords do not match.");
        return;
    }

    const isUsernameAvailable = await checkUsernameAvailability(username);

    if (!isUsernameAvailable) {
        displayErrorMessage("Username is already in use.");
        return;
    }

    const response = await registerUser(fname, username, password);

    if (response.status === 201) {
        alert("User registered successfully!");
        // Redirect or perform other actions upon successful registration
    } else {
        displayErrorMessage("Error registering user. Please try again later.");
    }
});

async function checkUsernameAvailability(username) {
    const response = await fetch(`http://localhost:8083/api/username_available/${username}`);
    const data = await response.text();
    return data === "YES";
}

async function registerUser(name, username, password) {
    const response = await fetch("http://localhost:8083/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: fname,
            username: username,
            password: password
        })
    });
    return response;
}

function displayErrorMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}*/
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    document.getElementById('new-user-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });
        const password = userData.password;
        const confirmPassword = userData['confirm-password'];
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        fetch(`api/username_available/${userData.username}`)
            .then(response => response.text())
            .then(result => {
                if (result === 'YES') {
                    addUser(userData);
                } else {
                    alert('Username is already in use. Please choose another.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to check username availability.');
            });
    });

    function addUser(userData) {
        fetch('api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                alert('User registered successfully!');
            } else {
                alert('Failed to register user.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to register user.');
        });
    }
});
