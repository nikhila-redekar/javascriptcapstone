 document.getElementById("registration-form").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            const name = document.getElementById("name").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
        
            if (!name || !username || !password || !confirmPassword) {
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
        
            const response = await registerUser(name, username, password);
        
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
                    name: name,
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
        }
        