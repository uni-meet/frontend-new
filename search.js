import { searchUsers } from './search.middleware.js';

const userSearchForm = document.getElementById('user-search-form');
const searchStringInput = document.getElementById('search-string');

userSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchString = searchStringInput.value;

  searchUsers(searchString)
    .then((users) => {
      console.log('Search results:', users);
      // Do something with the search results, e.g., display them on the page.
    })
    .catch((error) => {
      console.error('Error searching users:', error);
    });
});