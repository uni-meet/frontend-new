import { CURRENT_SERVER_API } from './server.middleware.js';
import { createToken, getToken } from '../utils/token.util.js';

export function login(loginCredentials) {
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

export function signup(signupCredentials) {
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
/*
export async function getUserInfo(token) {
    try {
      const response = await fetch(`${CURRENT_SERVER_API}/user/getInfo/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `User info not found: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('getUserInfo error:', error);
      throw error;
    }
  }
*/
/*
export async function getUserInfo(token) {
    try {
      const response = await fetch(CURRENT_SERVER_API + "/user/getInfo/" + token, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
  
      console.log('Server response:', response); // Log the server response
  
      if (response.ok) {
        const userInfo = await response.json();
        return userInfo;
      } else {
        throw new Error("User info not found: " + response.status);
      }
    } catch (error) {
      console.error("getUserInfo error:", error);
      throw error;
    }
  }*/

  export function getUserInfo(userId) {
    return fetch(`${CURRENT_SERVER_API}/user/getInfo/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("User info not found");
      })
      .then((user) => {
        return {
          username: user.username,
        };
      });
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

export function updateUserInfo(userGeneralInfo) {
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

export function updateUserPassword(userPasswordInfo) {
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

export function deleteUser() {
    return fetch(CURRENT_SERVER_API + '/user/deleteUser/${userId}', {
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
