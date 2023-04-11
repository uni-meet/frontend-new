import jwtDecode from 'jsonwebtoken';

interface DecodedToken {
    exp: number;
    iat: number;
    sub: string;
}

export function setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
    return localStorage.getItem('authToken');
}

export function removeAuthToken(): void {
    localStorage.removeItem('authToken');
}

export function isAuthTokenValid(token: string): boolean {
    const decodedToken = jwtDecode(token) as DecodedToken;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime < decodedToken.exp;
}

export function isUserAuthenticated(): boolean {
    const token = getAuthToken();

    if (!token) {
        return false;
    }

    return isAuthTokenValid(token);
}
