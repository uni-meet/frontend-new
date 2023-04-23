
import { CURRENT_SERVER_API } from "./server.middleware.js";

export async function sharePicture(pictureInfo) {
    let formData = new FormData();
    formData.append('userId', pictureInfo.userId);
    formData.append('description', pictureInfo.description);
    formData.append('pictureImage', pictureInfo.pictureImage);
  
    console.log(formData);
  
    const response = await fetch(CURRENT_SERVER_API + '/picture', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
  
    if (!response.ok) {
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      response.text().then(text => console.log('Response text:', text));
      throw new Error('Sharing picture failed');
    }
  
    const resData = await response.json();
    console.log('res data');
    console.log(resData);
  
    // Assuming the server returns the new post's details, and it has a field named 'imageUrl'
    return resData.imageUrl;
  }

export function updatePictureCaption(pictureId, caption) {
    return fetch(CURRENT_SERVER_API + '/picture/updatePictureCaption', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data; ', 'Accept': 'application/json' },
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
    return fetch(CURRENT_SERVER_API + '/picture/deletePicture/:pictureId', {
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