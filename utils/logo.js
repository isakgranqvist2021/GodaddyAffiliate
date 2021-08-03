import fetch from 'node-fetch';
import env from './env';
const baseUrl = 'https://api.logo.com/api/v2';

export async function getToken() {
    try {
        return await fetch(baseUrl + '/auth/token', {
            method: 'POST',
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: env.LOGO_API_KEY,
                client_secret: env.LOGO_API_SECRET
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

export async function createUser(ref, email, token) {
    try {
        return await fetch(baseUrl + '/users', {
            method: 'POST',
            body: JSON.stringify({
                ref: ref,
                email: email
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export async function getUser(id, token) {
    try {
        return await fetch(baseUrl + '/users/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => res.json());
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export async function issueCredit(token, plan) {
    try {
        return await fetch(baseUrl + '/credits/', {
            method: 'POST',
            body: JSON.stringify({
                date_expires: new Date((new Date().getMonth() + 1) % 12 + 1).toISOString(),
                redeemable_for: plan
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export async function ssoLink(id, token) {
    try {
        return fetch(baseUrl + '/users/' + id + '/sso', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        return Promise.reject('caught error');
    }
}
