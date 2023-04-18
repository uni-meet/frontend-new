// import jwtDecode from 'jsonwebtoken';

// interface DecodedToken {
//     exp: number;
//     iat: number;
//     sub: string;
// }

// export function setAuthToken(token: string): void {
//     sessionStorage.setItem('authToken', token);
// }

// export function getAuthToken(): string | null {
//     return sessionStorage.getItem('authToken');
// }

// export function removeAuthToken(): void {
//     sessionStorage.removeItem('authToken');
// }

// export function isAuthTokenValid(token: string): boolean {
//     const decodedToken = jwtDecode(token) as DecodedToken;
//     const currentTime = Math.floor(Date.now() / 1000);

//     return currentTime < decodedToken.exp;
// }

// export function isUserAuthenticated(): boolean {
//     const token = getAuthToken();

//     if (!token) {
//         return false;
//     }

//     return isAuthTokenValid(token);
// }
export function createToken(token) {
    // Generate a random token string
     token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save the token to session storage
    sessionStorage.setItem('token', token);

}

export function getToken() {
    return sessionStorage.getItem('token');
}
