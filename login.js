"use strict";
const CURRENT_SERVER_API = "https://bloggini-backend.onrender.com/api";
// User Login
async function loginUser(email, password) {
    try {
        const response = await fetch(CURRENT_SERVER_API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Logged in:", data);
        }
        else {
            throw new Error("Login failed");
        }
    }
    catch (error) {
        console.error(error);
    }
}
// User Sign Up
async function signUpUser(username, email, password) {
    try {
        const response = await fetch(CURRENT_SERVER_API + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Signed up:", data);
        }
        else {
            throw new Error("Sign up failed");
        }
    }
    catch (error) {
        console.error(error);
    }
}
// Event handlers
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    loginUser(email, password);
}
function handleSignUp() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    signUpUser(username, email, password);
}
// Add event listeners for login and sign up buttons
document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('signupButton').addEventListener('click', handleSignUp);
