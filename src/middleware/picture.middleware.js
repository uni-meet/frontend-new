
import { CURRENT_SERVER_API } from "./server.middleware.js";

export function sharePicture(pictureInfo) {
    let formData = new FormData();
    formData.append('userId', pictureInfo.userId);
    formData.append('description', pictureInfo.description);
    formData.append('file', pictureInfo.pictureImage);

    console.log(formData);
    return fetch(CURRENT_SERVER_API + '/picture', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(res => {
            if (res.ok) return res.json();
        }).catch(err => {
            console.log('error');
            console.log(err);
            throw new Error('Sharing picture failed');
        }).then(resData => {
            console.log('res data');
            console.log(resData);
        })
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