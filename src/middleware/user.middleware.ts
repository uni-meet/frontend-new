import { CURRENT_SERVER } from './server.middleware';
import {createToken} from './utils/token.utils';
import {ISingupCredentials, ILoginCredentials, IUserGeneralInfo, IUserPasswordInfo } from '../interfaces';

export function login (loginCredentials: ILoginCredentials) {
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
    .then(({token}) => {
        createToken(token);
    })
}


export function signup (signupCredentials: ISingupCredentials) {
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
.then(({token}) => {
    createToken(token);
})
}

export function getUserInfo () {
    return fetch(CURRENT_SERVER + '/user/getInfo/:id', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + createToken(),
        },
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
    })
    .then(({user}) => {
        return user;
    })
}

export function updateUserInfo (userGeneralInfo: IUserGeneralInfo) {
    return fetch(CURRENT_SERVER + '/user/updateUserInfo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userGeneralInfo),
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
    })
}

export function updateUserPassword (userPasswordInfo: IUserPasswordInfo) {
    return fetch(CURRENT_SERVER + '/user/updateUserPassword', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userPasswordInfo),
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
    })
}

export function deleteUser () {
    return fetch(CURRENT_SERVER + '/user/deleteUser', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
    })
}

export function getUserName () {
    return fetch(CURRENT_SERVER + '/user/getUserUserName/:id', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + createToken(),
        },
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not found');
    })
    .then(({user}) => {
        return user.username;
    })
}

