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
            const profileImage = post.user?.profileImage || 'default_image_url_here';
            const username = post.user?.username || 'Unknown';
            postContainer.innerHTML += `
                <div class="post">
                    <div class="post-header">
                        <img src="${profileImage}" alt="Profile image">
                        <div>
                            <h5>${username}</h5>
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
