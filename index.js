/*import { getUserInfo } from './src/middleware/user.middleware.js';
import { sharePicture } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';
import { CURRENT_SERVER_API } from './src/middleware/server.middleware.js';


document.addEventListener('DOMContentLoaded', async () => {
const postButton = document.getElementById("postButton");
const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById('postImage');
const selectedFileName = document.getElementById('selectedFileName');
const token = getToken();
const userInfo = await getUserInfo(token);

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
});*/

/*import { sharePicture, updatePictureCaption, deletePicture } from './src/middleware/picture.middleware.js';

document.addEventListener('DOMContentLoaded', function() {
  const addImageButton = document.getElementById('addImageButton');
  const postButton = document.getElementById('postButton');
  const postImage = document.getElementById('postImage');
  const postDescription = document.getElementById('postDescription');
  const uploadedFileName = document.getElementById('uploadedFileName');

  addImageButton.addEventListener('click', function() {
    postImage.click();
  });

  postImage.addEventListener('change', function() {
    if (postImage.files && postImage.files[0]) {
      uploadedFileName.textContent = postImage.files[0].name;
      const fileNameElement = document.getElementById('uploadedFileName');
      if (postImage.files.length > 0) {
        fileNameElement.textContent = `Selected file: ${postImage.files[0].name}`;
      } else {
        fileNameElement.textContent = '';
      }
    }
  });

  postButton.addEventListener('click', async function() {
    try {
      const pictureInfo = {
        userId: sessionStorage.getItem('userId'),
        description: postDescription.value,
        pictureImage: postImage.files[0],
      };

      const imageUrl = await sharePicture(pictureInfo);
      console.log('Image URL:', imageUrl);
    } catch (error) {
      console.error('Error posting the picture:', error);
    }
  });
});

function createPostElement(pictureId, userId, imageUrl, description) {
  const postElement = document.createElement('div');
  postElement.className = 'feed';

   postElement.innerHTML = `
    <div class="wrapper">
      <input id="Edit${pictureId}" type="checkbox">
      <label for="Edit${pictureId}">
        <i class="fa-solid fa-ellipsis"></i>
      </label>
      <div class="dropdown">
        <a href="#" onclick="updatePost('${pictureId}')">Edit Post</a>
        <a href="#" onclick="deletePost('${pictureId}', this.closest('.feed'))">Delete Post</a>
      </div>
    </div>
  `;

  return postElement;
}

async function updatePost(pictureId) {
  // Your code to update the post should go here, for example:
  const newCaption = prompt("Enter a new caption:");
  if (newCaption !== null && newCaption !== "") {
    try {
      await updatePictureCaption(pictureId, newCaption);
      // Update the caption in the UI
      const postElement = document.getElementById(`post${pictureId}`);
      postElement.querySelector(".caption").innerHTML = `<p><b>User ${userId}</b>${newCaption}<span class="harsh-tag"> #someHashtag</span></p>`;
    } catch (error) {
      console.error('Error updating the caption:', error);
    }
  }
}

async function deletePost(pictureId, postElement) {
  try {
    await deletePicture(pictureId);
    postElement.remove();
  } catch (error) {
    console.error('Error deleting picture:', error);
  }
}*/


import { getUserInfo } from './src/middleware/user.middleware.js';
import { sharePicture, deletePicture, updatePictureCaption } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';
import { likePicture, commentPicture } from './src/middleware/like_comment_middleware.js';

document.addEventListener('DOMContentLoaded', function() {
  const userId = 'userId';

  const likeButtons = document.querySelectorAll('.interaction-buttons .fa-heart');
  const commentButtons = document.querySelectorAll('.fa-comment-dots');
  const commentInputs = document.querySelectorAll('.comment-input');
  const postCommentButtons = document.querySelectorAll('.postCommentBtn');

  likeButtons.forEach((likeBtn, index) => {
    likeBtn.addEventListener('click', async () => {
      likeBtn.style.color = likeBtn.style.color === 'red' ? '' : 'red';
      // Use index to identify the correct picture ID
      await likePicture(userId, `pictureId${index}`);
    });
  });

  commentButtons.forEach((commentBtn) => {
    commentBtn.addEventListener('click', () => {
        const commentInputWrapper = commentBtn.closest('.feed').querySelector('.comment-input-wrapper');
        commentInputWrapper.style.display = commentInputWrapper.style.display === 'none' ? 'flex' : 'none';
    });
  });

  postCommentButtons.forEach((postCommentBtn, index) => {
    postCommentBtn.addEventListener('click', async () => {
      const commentInput = commentInputs[index];
      const text = commentInput.value;
      if (text) {
        // Use index to identify the correct picture ID
        await commentPicture(userId, `pictureId${index}`, text);
        commentInput.value = '';
      } else {
        alert('Please write a comment before posting.');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', async () => {
  const postButton = document.getElementById("postButton");
  const addImageButton = document.getElementById("addImageButton");
  const postImageInput = document.getElementById('postImage');
  const uploadedFileName = document.getElementById('uploadedFileName');
  const token = getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user.body.userId;
  const userInfo = await getUserInfo(userId);
  console.log("userInfo:", userInfo);

  addImageButton.addEventListener('click', () => {
    postImageInput.click();
  });
  
  postImageInput.addEventListener("change", () => {
    console.log("postImageInput event triggered");
    const selectedFile = postImageInput.files[0];
    if (selectedFile) {
      uploadedFileName.textContent = selectedFile.name;
    } else {
      uploadedFileName.textContent = "";
    }
  });

  postButton.addEventListener("click", async () => {
    const descriptionInput = document.getElementById("postDescription");
    const description = descriptionInput.value;
    const pictureImage = postImageInput.files[0];
  
    if (!pictureImage) {
      alert("Please select an image before submitting.");
      return;
    }
  
    const pictureInfo = {
      userId: userId,
      description: description,
      pictureImage: pictureImage,
    };

  
    // Create a temporary post with a loading indicator
    const temporaryPost = addNewPost(userInfo.username, description, null, true);
  
    try {
        const { imageUrl, pictureId } = await sharePicture(pictureInfo); // Destructure the returned object
        console.log("Post created successfully");
        console.log("imageUrl:", imageUrl, "pictureId:", pictureId); // Add this line
  
      // Remove the temporary post
      temporaryPost.remove();
  
      // Add the new post with the actual image URL
      addNewPost(userInfo.username, description, imageUrl, pictureId); // Pass the pictureId to the addNewPost function
  } catch (error) {
      // Remove the temporary post if there's an error
      temporaryPost.remove();
  
      console.error("Error creating post:", error);
    }
  });

  function addNewPost(username, postDescription, imageUrl, pictureId, temporary = false) {
    const newPost = document.createElement("div");
    newPost.classList.add("feed");
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
          <div class="wrapper">
            <input id="Edit" type="checkbox">
            <label for="Edit">
                <i class="fa-solid fa-ellipsis"></i>
            </label>
            <div class="dropdown">
              <a href="#" onclick="editPost('${pictureId}')">Edit Post</a>
              <a href="#" onclick="deletePost('${pictureId}')">Delete Post</a>
            </div>
          </div>
      </div>
      <div class="photo">
        ${temporary ? '' : `<img src="${imageUrl}">`}
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
      <div class="comment-input-wrapper" style="display: none;">
          <textarea placeholder="Write a comment..." class="custom-input comment-input"></textarea>
          <button class="postCommentBtn">Post</button>
      </div>
    `;
  
    const feedsContainer = document.querySelector(".feeds");
  feedsContainer.appendChild(newPost);

  return newPost;
}
});


function editPost(pictureId) {
    const newCaption = prompt("Please enter the new caption for the post:");
    if (newCaption) {
      updatePictureCaption(pictureId, newCaption)
        .then(() => {
          alert("Caption updated successfully!");
          // Update the UI with the new caption
        })
        .catch((error) => {
          console.error("Error updating caption:", error);
          alert("An error occurred while updating the caption. Please try again.");
        });
    }
  }

  function deletePost(pictureId) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      deletePicture(pictureId)
        .then(() => {
          alert("Post deleted successfully!");
          // Remove the post from the UI
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("An error occurred while deleting the post. Please try again.");
        });
    }
  }

window.editPost = editPost;
window.deletePost = deletePost;