import { CURRENT_SERVER_API } from './server.middleware.js';

export function likePicture(pictureId) {
  return fetch(CURRENT_SERVER_API + '/picture/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ pictureId }),
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Liking picture failed');
  });
}