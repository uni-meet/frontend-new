import { CURRENT_SERVER_API } from './server.middleware';

export function searchUsers(searchString: string) {
    return fetch(CURRENT_SERVER_API + '/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            searchString: searchString
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Searching users failed');
    })
}