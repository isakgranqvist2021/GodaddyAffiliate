import env from "./env";
import fetch from 'node-fetch';
const baseURL = 'https://api.ote-godaddy.com/v1';

async function isAvailable(query) {
    let url = `${baseURL}/domains/available?domain=${query}&checkType=FAST&forTransfer=false`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`
        }
    });

    return await response.json();
}

async function retrieveDataForDomains(domains) {
    let url = `${baseURL}/domains/available?checkType=FAST`;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(domains),
        headers: {
            'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`,
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();
    return data.domains;
}

async function findSuggestions(query) {
    const searchDur = 200;
    const limit = 100;

    let url = `${baseURL}/domains/suggest?query=${query}&waitMs=${searchDur}&limit=${limit}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `sso-key ${env.GODADDY_API_KEY}:${env.GODADDY_API_SECRET}`
        }
    });

    let data = await response.json();
    return await retrieveDataForDomains(data.map(d => {
        return d.domain;
    }));
}

export default { isAvailable, retrieveDataForDomains, findSuggestions };