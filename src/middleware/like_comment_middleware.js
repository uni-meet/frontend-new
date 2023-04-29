import { CURRENT_SERVER_API } from "./server.middleware.js";

// Likes a picture by sending a POST request to the API
export async function likePicture(userId, pictureId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pictureId })
    };

    try {
        const response = await fetch(`${CURRENT_SERVER_API}/picture/like`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log('Picture liked successfully:', data);
    } catch (error) {
        console.error('Error liking picture:', error);
    }
}

// Comments on a picture by sending a POST request to the API
export async function commentPicture(userId, pictureId, text) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pictureId, text })
    };

    try {
        const response = await fetch(`${CURRENT_SERVER_API}/picture/comment`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log('Comment added successfully:', data);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}