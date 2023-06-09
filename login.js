"use strict";
const CURRENT_SERVER_API = "https://bloggini-backend.onrender.com/api";
// token
export function createToken(token) {
  // Generate a random token string
  token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Save the token to session storage
  sessionStorage.setItem('token', token);

}

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
        
      // Save the user ID and token for future use
      setUserId(data.userId); // Replace this line with your own implementation
      createToken(data.token); // Use the createToken function to set the token
      sessionStorage.setItem('token', data.token); // Store the token in sessionStorage
      
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
      createToken(token);
      // Redirect to index.html after successful signup (optional)
      window.location.href = "index.html";
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }
  } catch (error) {
    console.error(error);
  } finally {
    alert("User created!"); // This will show an alert every time, regardless of the result.
  }
}

function setUserId(userId) {
  sessionStorage.setItem('userId', userId);
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
