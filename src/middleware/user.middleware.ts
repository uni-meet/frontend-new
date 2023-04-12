import { CURRENT_SERVER } from './server.middleware';
import { createToken } from '../utils/token.util';
import { ISignupCredentials, ILoginCredentials, IUserGeneralInfo, IUserPasswordInfo } from '../interfaces/user_interface';

export function login(loginCredentials: ILoginCredentials) {
    return fetch(CURRENT_SERVER + '/login', {
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


export function signup(signupCredentials: ISignupCredentials) {
    return fetch(CURRENT_SERVER + '/signup', {
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
//  return fetch(CURRENT_SERVER + `/user/getInfo/${id}` correct way to declare id
export function getUserInfo() {
    return fetch(CURRENT_SERVER + `/user/getUserInfo/${userId}`, {
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
    return fetch(CURRENT_SERVER + '/user/getUserUserName/${userId}', {
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
    return fetch(CURRENT_SERVER + '/user/updateUserInfo', {
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
    return fetch(CURRENT_SERVER + '/user/updateUserPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(userPasswordInfo),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User password not updated');
        })
}

export function deleteUser() {
    return fetch(CURRENT_SERVER + '/user/deleteUser/${userId}', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('User not found');
        })
}
export function getAllPosts() {
    return fetch(CURRENT_SERVER + '/users-posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Failing with fetching');
        })
}


export async function searchUsers(searchString) {
    return fetch(CURRENT_SERVER + '/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(searchString),
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('There was a problem with the fetch operation:');
        })

}



