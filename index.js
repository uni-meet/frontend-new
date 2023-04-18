import { getAllPosts, getUserInfo } from './middleware/user.middleware';
import { sharePicture } from './middleware/picture.middleware';
import { getToken } from './utils';

const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById("postImage");
let selectedImage;

addImageButton.addEventListener("click", () => {
  postImageInput.click();
});

postImageInput.addEventListener("change", (event) => {
  if (event.target.files.length > 0) {
    selectedImage = event.target.files[0];
  }
});

document.getElementById('postButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const token = getToken();
    const user = await getUserInfo(token);
    const username = user.username;
    const postDescription = document.getElementById('postDescription').value;

    try {
        await sharePicture({ userId: username, description: postDescription });
        // After successful post creation, you can refresh the posts on the page
        // by calling a function that fetches and displays all the posts.
        displayAllPosts();
    } catch (error) {
        console.log('Error sharing picture:', error);
    }
});

async function displayAllPosts() {
    try {
        const posts = await getAllPosts();
        // Add your logic to display the fetched posts on the page
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = '';
        posts.forEach(post => {
            postContainer.innerHTML += `
                <div class="post">
                    <div class="post-header">
                        <img src="${post.user.profileImage}" alt="Profile image">
                        <div>
                            <h5>${post.user.username}</h5>
                            <small>${post.createdAt}</small>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${post.description}</p>
                        <img src="${post.pictureImage}" alt="Post image">
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.log('Error fetching all posts:', error);
    }
}

// Call this function to display all posts when the page loads
displayAllPosts();
