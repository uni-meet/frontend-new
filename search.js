import { searchUsers } from "./src/middleware/search.middleware.js";

const userSearchForm = document.getElementById('user-search-form');
const searchStringInput = document.getElementById('search-string');
const searchResultsDiv = document.getElementById('search-results');

function displaySearchResults(users) {
  searchResultsDiv.innerHTML = '';

  console.log('Response from server:', users);

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.textContent = `${user.name} (${user.username})`;
    searchResultsDiv.appendChild(userElement);
  });
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