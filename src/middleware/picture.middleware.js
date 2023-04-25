
import { CURRENT_SERVER_API } from "./server.middleware.js";

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  
  export async function sharePicture(pictureInfo) {
    const formData = new FormData();
    formData.append("userId", pictureInfo.userId);
    formData.append("description", pictureInfo.description);
  
    // Convert the image file to base64 and append it to formData
    const base64Image = await fileToBase64(pictureInfo.pictureImage);
    formData.append("pictureImage", base64Image);
  
    return fetch(`${CURRENT_SERVER_API}/api/picture/sharePicture`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Sharing picture failed");
      })
      .then((data) => {
        return data.message;
      });
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