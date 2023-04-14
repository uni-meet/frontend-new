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
        alert("Login successful!"); // Added alert for successful login
  
        // Redirect to index.html after successful login (optional)
        window.location.href = "index.html";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message); // Alert user about the login failure
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
