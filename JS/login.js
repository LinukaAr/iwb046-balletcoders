"use strict";

// Validation function for input fields
function validate(input) {
    if (input.type === "email" || input.name === "email") {
        const emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
        return emailPattern.test(input.value.trim());
    } else {
        return input.value.trim() !== "";
    }
}

// Show validation message
function showValidate(input) {
    const alert = input.parentElement;
    alert.classList.add("alert-validate");
}

// Hide validation message
function hideValidate(input) {
    const alert = input.parentElement;
    alert.classList.remove("alert-validate");
}

// Handle form submission
document.querySelector(".validate-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    let check = true;
    const inputs = document.querySelectorAll(".validate-input .input100");

    inputs.forEach((input) => {
        if (!validate(input)) {
            showValidate(input);
            check = false;
        }
    });

    if (check) {
        // Proceed with form submission or other logic
    }
});

// Focus event to hide validation messages
document.querySelectorAll(".validate-form .input100").forEach((input) => {
    input.addEventListener("focus", function () {
        hideValidate(this);
    });
});

// Email validation
const emailInput = document.getElementById("email");
const emailFeedback = document.getElementById("emailFeedback");

document.addEventListener("DOMContentLoaded", function () {
  var emailInput = document.getElementById("email");

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      // Your event handler code here
    });
  } else {
    console.error("Element with ID 'emailInput' not found.");
  }
});

// Password matching logic
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const passwordStatus = document.getElementById("password-match-status");
const signUpBtn = document.getElementById("sign_up-btn");

confirmPassword.addEventListener("input", validatePassword);
password.addEventListener("input", validatePassword);

function validatePassword() {
    if (password.value === confirmPassword.value) {
        passwordStatus.textContent = "Passwords match!";
        passwordStatus.style.color = "green"; // Green color if passwords match
        signUpBtn.disabled = false; // Enable submit button when passwords match
    } else {
        passwordStatus.textContent = "Passwords do not match";
        passwordStatus.style.color = "red"; // Red color if passwords do not match
        signUpBtn.disabled = true; // Disable submit button if passwords don't match
    }
}

// Register function for signup
async function register() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    if (!username || !password || !email) {
        alert('Please fill in all fields.');
        return;
    }

    const userInput = {
        username: username,
        password: password,
        email: email
    };

    try {
        const response = await fetch('http://localhost:8081/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        });

        if (response.ok) {
            alert('Registration successful!');
            toggleForms();
        } else {
            alert('Failed to register. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to register.');
    }
}

// Login function for login
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const loginInput = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInput)
        });

        if (response.ok) {
            const message = await response.text();
            if (message === 'Login successful') {
                alert('Login successful!');
                // Redirect or take appropriate action after successful login
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        } else {
            alert('Failed to login. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to login.');
    }
}
