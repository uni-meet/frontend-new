import { getUserInfo } from './src/middleware/user.middleware.js';
import { sharePicture } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';
import { CURRENT_SERVER_API } from './src/middleware/server.middleware.js';

const postButton = document.getElementById("postButton");
const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById('postImageInput');
const selectedFileName = document.getElementById('selectedFileName');

addImageButton.addEventListener('click', () => {
    postImageInput.click();
  });
  
  postImageInput.addEventListener('change', () => {
    const selectedFile = postImageInput.files[0];
    if (selectedFile) {
      selectedFileName.textContent = selectedFile.name;
    } else {
      selectedFileName.textContent = '';
    }
  });

postImageInput.addEventListener('change', () => {
    if (postImageInput.files && postImageInput.files[0]) {
        selectedFileName.textContent = postImageInput.files[0].name;
    } else {
        selectedFileName.textContent = '';
    }
});

postButton.addEventListener('click', async () => {
    const token = getToken();
    const decodedToken = jwt_decode(token);
    console.log("Decoded token:", decodedToken);
    const userId = decodedToken.user.body.userId;

    const descriptionInput = document.getElementById('postDescription');
    const description = descriptionInput.value;

    const pictureImage = postImageInput.files[0];

    if (!pictureImage) {
        alert('Please select an image before submitting.');
        return;
    }

    const pictureInfo = {
        userId: userId,
        description: description,
        pictureImage: pictureImage
    };

    try {
        const imageUrl = await sharePicture(pictureInfo);
        console.log("Post created successfully");
    
        addNewPost(userInfo.username, postDescription, imageUrl);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });

function addNewPost(username, postDescription, imageUrl) {
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
          <img src="${imageUrl}">
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
  
    const feedsContainer = document.querySelector('.feeds');
    feedsContainer.appendChild(newPost);
  }

  addNewPost(userInfo.username, postDescription, imageUrl);