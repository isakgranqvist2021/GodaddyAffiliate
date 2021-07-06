import env from "../../utils/env";
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
    let url = `${baseURL}/domains/suggest?query=${query}&waitMs=50&limit=10`;

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

async function get(req, res) {
    let data = {
        domain: null,
        suggestions: null
    };

    data.domain = await isAvailable(req.params.q);
    data.suggestions = await findSuggestions(req.params.q);

    return res.json({
        message: 'found your stuff',
        success: true,
        data: data
    });
}

export default { get };