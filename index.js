import { getAllPosts, getUserInfo } from './src/middleware/user.middleware.js';
import { sharePicture } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';
import { CURRENT_SERVER_API } from './src/middleware/server.middleware.js';

const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById("postImage");

addImageButton.addEventListener('click', () => {
    const token = getToken();
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
  
    const descriptionInput = document.getElementById('descriptionInput');
    const description = descriptionInput.value;
  
    const pictureImage = postImageInput.files[0];
  
    const pictureInfo = {
      userId: userId,
      description: description,
      pictureImage: pictureImage
    };
  
    sharePicture(pictureInfo);
  });
  
  document.getElementById('postButton').addEventListener('click', async (event) => {
    event.preventDefault();
  
    const token = getToken(); // Get the token from session storage
    if (!token) {
      console.error("Token not found");
      return;
    }

  // Decode the token to get the userId
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user.body.userId;

  const userInfo = await getUserInfo(userId);

  if (!userId) {
    console.error("User ID not found");
    return;
  }

  const postDescriptionInput = document.getElementById('postDescription');
  const description = postDescriptionInput.value;
  const image = postImageInput.files[0]; // Get the image file from the input element

  try {
    const newPostData = await createPost(token, userId, postDescription, image);
    console.log("New post data:", newPostData);
  } catch (error) {
    console.error("Error creating post:", error);
  }

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
                  <h3>${userInfo.username}</h3>
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
          <p><b>${userInfo.username}</b>${postDescription}<span class="harsh-tag">#afternoon</span></p>
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

async function createPost(token, userId, description, image) {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("description", description);
      formData.append("image", image);
  
      const response = await fetch(CURRENT_SERVER_API + "/picture", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Post created:", data);
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Post creation failed");
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      throw error;
    }
  }

  async function updateProfile() {
    try {
      const token = getToken();
      if (token) {
        // Decode the token to get the userId
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user.body.userId;
  
        const user = await getUserInfo(userId);
        const profileName = document.querySelector(".left .handdle h4");
        profileName.textContent = user.username;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  async function getAllUserPosts() {
    try {
        const response = await fetch('https://bloggini-backend.onrender.com/api/users-posts', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user posts');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all user posts:', error);
        throw error;
    }
}

async function updateUserInfo() {
    try {
      const token = getToken(); // Get the token from session storage
      if (!token) {
        console.error("Token not found");
        return;
      }

      // Decode the token to get the userId
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user.body.userId;

      const userInfo = await getUserInfo(userId);
  
      if (userInfo) {
        // Update the user info on the page
        document.querySelector("#username").textContent = userInfo.username;
        // Add more code here to update other user info as needed
      } else {
        console.error("User info not found");
        // You can show an error message or handle this case as needed
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }
  

  window.addEventListener("userLoggedIn", updateProfile);

  function getUserIdFromToken(token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.user.body.userId;
  }
  
  const token = sessionStorage.getItem('token');


//const userInfo = await getUserInfo(token);
//const newPostData = await createPost(token, userInfo.userId, postDescription, image);

// Call this function to display all posts when the page loads
async function init() {
    await displayAllPosts();
    getAllUserPosts()
      .then(posts => {
        // Do something with the posts data
        console.log(posts);
      })
      .catch(error => {
        console.error('Error fetching all user posts:', error);
      });
  }
  
  init();
getAllUserPosts()
    .then(posts => {
        // Do something with the posts data
        console.log(posts);
    })
    .catch(error => {
        console.error('Error fetching all user posts:', error);
    });