import { ISharePictureInfo } from "../interfaces/picture_interface";
import { CURRENT_SERVER_API } from "./server.middleware";

// how to make get requests with signifying input?
/*
Router methods
      pictures API endpoints 
router.post('/picture', upload.single('pictureImage'), pictureCtrl.sharePicture)
router.get('/picture/getPictureById/:pictureId', pictureCtrl.getPictureById)
router.get('/picture/getPictureIdByUserId/:userId', pictureCtrl.getPictureIdByUserId)
router.delete('/picture/deletePicture/:pictureId', pictureCtrl.deletePicture)
router.post('/picture/updatePictureCaption', pictureCtrl.updatePictureCaption)

*/


export function sharePicture(pictureInfo: ISharePictureInfo) {
    let formData = new FormData();
    formData.append('userId', pictureInfo.userId);
    formData.append('description', pictureInfo.description);
    formData.append('file', pictureInfo.pictureImage);

    console.log(formData);
    return fetch(CURRENT_SERVER_API + '/picture', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data; ', 'Accept': 'application/json' },
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
export function getPictureById() {
    return fetch(CURRENT_SERVER_API + '/picture/getPictureById/${pictureId}', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Failing with fetching');
        })
}
export function getPictureIdByUserId() {
    return fetch(CURRENT_SERVER_API + '/picture/getPictureIdByUserId/${userId}', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Failing with fetching');
        })
}


export function updatePictureCaption(pictureId: string, caption: string) {
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

export function deletePicture(pictureId: string) {
    return fetch(CURRENT_SERVER_API + '/picture/deletePicture/${pictureId}', {
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


