document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    document.getElementById('new-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById("fname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
        const userData = {"name":`${name}`,"username":`${username}`, "password":`${password}`};
       
        //console.log(`${JSON.stringify(userData)}`);
        const pass = userData.password;
        
        if (pass !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        //console.log(`${userData.username}`);
        fetch(`http://localhost:8083/api/username_available/${userData.username}`)
            .then(response => response.json())
            .then(data => {
                //console.log(`${data}`);
                if (data.available === false ) {
                    alert('Username is already in use. Please choose another.');

                    
                } else {
                    addUser(userData);
                    console.log(`add function is called`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to check username availability.');
            });
    });

    function addUser(userData) {
        //console.log(`${JSON.stringify(userData)}`);
        fetch('http://localhost:8083/api/users', {
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
            response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to register user.');
        });
    }
});