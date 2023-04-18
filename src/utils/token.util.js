export function createToken(token) {
    // Generate a random token string
    token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save the token to session storage
    sessionStorage.setItem('token', token);
}

export function getToken() {
    return sessionStorage.getItem('token');
}