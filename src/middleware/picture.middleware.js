
import { CURRENT_SERVER_API } from "./server.middleware.js";
  
export async function sharePicture({ userId, description, pictureImage }) {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('description', description);
    formData.append('image', pictureImage);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    const requestUrl = `${CURRENT_SERVER_API}/picture/sharePicture`;
    console.log("Request URL:", requestUrl);

    const response = await fetch(requestUrl, requestOptions);

    if (!response.ok) {
      throw new Error("Sharing picture failed");
    }

    const data = await response.json();
    return {
      imageUrl: data.imageUrl,
      pictureId: data.pictureId, // Extract the pictureId from the response
    };
  } catch (error) {
    console.error("Error sharing picture:", error);
    throw error;
  }
}

  export function updatePictureCaption(pictureId, caption) {
    return fetch(CURRENT_SERVER_API + '/picture/updatePictureCaption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            pictureId: pictureId,
            description: caption
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        }).catch(err => {
            console.log('error');
            console.log(err);
            throw new Error('Updating picture caption failed');
        }).then(resData => {
            console.log('res data');
            console.log(resData);
        })
}

export function deletePicture(pictureId) {
    return fetch(CURRENT_SERVER_API + '/picture/deletePicture/' + pictureId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            if (res.status == 201) {
                return res.json();
            }
            throw new Error('Deleting sunset failed');
        })
}