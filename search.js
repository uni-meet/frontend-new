import { searchUsers } from "./src/middleware/search.middleware.js";

const userSearchForm = document.getElementById('user-search-form');
const searchStringInput = document.getElementById('search-string');
const searchResultsDropdown = document.getElementById('search-results');

function displaySearchResults(users) {
  searchResultsDropdown.innerHTML = '';

  users.forEach((user) => {
    const userElement = document.createElement('div');
    userElement.textContent = user.username;
    searchResultsDropdown.appendChild(userElement);
  });

  searchResultsDropdown.classList.add('active');
}

userSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchString = searchStringInput.value;

  searchUsers(searchString)
    .then((users) => {
      displaySearchResults(users);
    })
    .catch((error) => {
      console.error('Error searching users:', error);
    });
});