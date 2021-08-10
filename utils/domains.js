import env from "./env";
import fetch from 'node-fetch';
const baseURL = 'https://api.ote-godaddy.com/v1';

async function isAvailable(query) {
    try {
        let url = `${baseURL}/domains/available?domain=${query}&checkType=FAST&forTransfer=false`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`
            }
        });

        if(response.status === 401) {
            throw Error('Unauthorized');
        }

        return await response.json();
    } catch(err) {
        return Promise.reject({});
    }
}

async function retrieveDataForDomains(domains) {
    try {
        let url = `${baseURL}/domains/available?checkType=FAST`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(domains),
            headers: {
                'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`,
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 401) {
            throw Error('Unauthorized');
        }

        let data = await response.json();
        return data.domains;
    } catch(err) {
        return Promise.reject([]);
    }
}

async function findSuggestions(query) {
    try {
        const searchDur = 25;
        const limit = 25;

        let url = `${baseURL}/domains/suggest?query=${query}&waitMs=${searchDur}&limit=${limit}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`
            }
        });
        
        if(response.status === 401) {
            throw Error('Unauthorized');
        }

        let data = await response.json();
        return await retrieveDataForDomains(data.map(d => {
            return d.domain;
        }));
    } catch(err) {
        return Promise.reject([]);
    }
}

export default { isAvailable, retrieveDataForDomains, findSuggestions };