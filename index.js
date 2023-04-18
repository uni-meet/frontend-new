import { getAllPosts, getUserInfo } from './src/middleware/index.js';
import { sharePicture } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';


const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById("postImage");

addImageButton.addEventListener("click", () => {
  postImageInput.click();
});

document.getElementById('postButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const token = getToken();
    const user = await getUserInfo(token);
    const username = user.username;
    const postDescription = document.getElementById('postDescription').value;

    // Create a new post element
    const newPost = document.createElement('div');
    newPost.classList.add('feed');
    newPost.innerHTML = `
        <div class="head">
            <div class="user">
                <div class="profile-photo">
                    <img src="images/profile-1.png">
                </div>
                <div class="ingo">
                    <h3>${username}</h3>
                </div>
            </div>
            <span class="edit">
                <i class="fa-solid fa-ellipsis"></i>
            </span>
        </div>
        <div class="photo">
            <!-- Add the image source here once we implement the image uploading functionality -->
        </div>
        <div class="action-buttons">
            <div class="interaction-buttons">
                <span><i class="fa-solid fa-heart"></i></span>
                <span><i class="fa-solid fa-comment-dots"></i></span>
                <span><i class="fa-solid fa-share-nodes"></i></span>
            </div>
            <div class="bookmark">
                <span><i class="fa-solid fa-bookmark"></i></span>
            </div>
        </div>
        <div class="caption">
            <p><b>${username}</b>${postDescription}<span class="harsh-tag">#afternoon</span></p>
        </div>
    `;

    // Append the new post to the container
    const postContainer = document.getElementById('postContainer');
    postContainer.appendChild(newPost);

    // Clear the post description input
    document.getElementById('postDescription').value = '';
});

async function displayAllPosts() {
    try {
        const posts = await getAllPosts();
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = '';
        posts.forEach(post => {
            postContainer.innerHTML += `
                <div class="feed">
                    <div class="head">
                        <div class="user">
                            <div class="profile-photo">
                                <img src="${post.user?.profileImage || 'images/profile-1.png'}" alt="Profile image">
                            </div>
                            <div class="ingo">
                                <h3>${post.user?.username || 'Unknown User'}</h3>
                            </div>
                        </div>
                        <span class="edit">
                            <i class="fa-solid fa-ellipsis"></i>
                        </span>
                    </div>
                    <div class="photo">
                        <img src="${post.pictureImage || 'images/night.jpeg'}" alt="Post image">
                    </div>
                    <div class="action-buttons">
                        <div class="interaction-buttons">
                            <span><i class="fa-solid fa-heart"></i></span>
                            <span><i class="fa-solid fa-comment-dots"></i></span>
                            <span><i class="fa-solid fa-share-nodes"></i></span>
                        </div>
                        <div class="bookmark">
                            <span><i class="fa-solid fa-bookmark"></i></span>
                        </div>
                    </div>
                    <div class="caption">
                        <p><b>${post.user?.username || 'Unknown User'}</b> ${post.description || ''}<span class="harsh-tag">#night</span></p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.log('Error fetching all posts:', error);
    }
}

async function updateProfile() {
    try {
      const token = getToken();
      if (token) {
        const user = await getUserInfo(token);
        const profileName = document.querySelector(".left .handdle h4");
        profileName.textContent = user.username;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }


  async function updateUserInfo(token) {
    try {
      const userInfo = await getUserInfo(token);
      const usernameElement = document.querySelector('.handdle h4');
      if (usernameElement) {
        usernameElement.textContent = userInfo.username;
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  }

  window.addEventListener("userLoggedIn", updateProfile);

  const token = getToken(); // Get the token from session storage
if (token) {
  updateUserInfo(token);
}
// Call this function to display all posts when the page loads
displayAllPosts();
