import { CURRENT_SERVER_API } from './server.middleware';
import { createToken } from '../utils/token.util';
import { ISignupCredentials, ILoginCredentials, IUserGeneralInfo, IUserPasswordInfo, IFeedback } from '../interfaces/user_interface';

export function login(loginCredentials: ILoginCredentials) {
    return fetch(CURRENT_SERVER_API + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Login failed');
        })
        .then(({ token }) => {
            createToken(token);
            // sessionStorage.setItem(token, 'token');   // TODO: Implement token save
        })
}
//  export function handleLogin() {
//     const usernameInput = document.getElementById('loginUsername') as HTMLInputElement;
//     const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
//     const username = usernameInput.value;
//     const password = passwordInput.value;
//     const loginCredentials: ILoginCredentials = {
//         username,
//         password
//     }
//     login(loginCredentials);
// }
// document.getElementById('loginButton').addEventListener('click', handleLogin);

export function signup(signupCredentials: ISignupCredentials) {
    return fetch(CURRENT_SERVER_API + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupCredentials),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User already exists');
        })
        .then(({ token }) => {
            createToken(token);
        })
}
//  return fetch(CURRENT_SERVER + `/user/getInfo/${id}`
//TODO -  make parameters with types
export function getUserInfo(userId: string) {
    return fetch(CURRENT_SERVER_API + `/user/getInfo/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User info not found');
        })
        .then(({ user }) => {
            return user;
        })
}

export function getUserName() {
    return fetch(CURRENT_SERVER_API + '/user/getUserUserName/${userId}', {
        method: 'GET',
        headers: {

            'Authorization': 'Bearer ' + sessionStorage.getItem('token'), // TODO: Get token from session storages https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage 
        },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Username not found');
        })
        .then(({ user }) => {
            return user.username;
        })
}


export function updateUserInfo(userGeneralInfo: IUserGeneralInfo) {
    return fetch(CURRENT_SERVER_API + '/user/updateUserInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(userGeneralInfo),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User info not found');
        })
}

export function updateUserPassword(userPasswordInfo: IUserPasswordInfo) {
    return fetch(CURRENT_SERVER_API + '/user/updateUserPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(userPasswordInfo),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User password not updated');
        })
}

export function deleteUser(userId: string) {
    return fetch(CURRENT_SERVER_API + `/user/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User not found');
        })
}

export function getAllPosts() {
    return fetch(CURRENT_SERVER_API + '/users-posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Failing with fetching');
        })
}

export function logOut() {
    sessionStorage.removeItem('token');
}
//TODO - to do feedback interface and to check all fetch API for `${id} `
export async function sendFeedback(feedbackData: IFeedback, userId: string) {

    try {
        const response = await fetch(`/api/feedback/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData)
        });
        const data = await response.json();
        console.log(data.feedback);
    } catch (error) {
        console.error(error);
    }
};


