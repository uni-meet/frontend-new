"use strict";
const CURRENT_SERVER_API = "https://bloggini-backend.onrender.com/api";
// User Login
async function loginUser(username, password) {
    try {
        const response = await fetch(CURRENT_SERVER_API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Logged in:", data);
        } else {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            throw new Error("Login failed");
        }
    } catch (error) {
        console.error(error);
    }
}

// User Sign Up
async function signUpUser(firstName, lastName, username, email, password) {
    try {
        const response = await fetch(CURRENT_SERVER_API + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, username, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Signed up:", data);
        } else {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            throw new Error("User already exists");
        }
    } catch (error) {
        console.error(error);
    }
}

// Event handlers
function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    loginUser(username, password);
}
function handleSignUp() {
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    signUpUser(firstName, lastName, username, email, password);
}
// Add event listeners for login and sign up buttons
document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('signupButton').addEventListener('click', handleSignUp);
