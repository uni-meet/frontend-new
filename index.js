import { getUserInfo } from './src/middleware/user.middleware.js';
import { sharePicture } from './src/middleware/picture.middleware.js';
import { getToken } from './src/utils/index.js';
import { CURRENT_SERVER_API } from './src/middleware/server.middleware.js';

const addImageButton = document.getElementById("addImageButton");
const postImageInput = document.getElementById("postImage");

addImageButton.addEventListener('click', async () => {
    const token = getToken();
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const descriptionInput = document.getElementById('postDescription');
    const description = descriptionInput.value;

    const pictureImage = postImageInput.files[0];

    const pictureInfo = {
        userId: userId,
        description: description,
        pictureImage: pictureImage
    };

    try {
        await sharePicture(pictureInfo);
        console.log('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
    }
});