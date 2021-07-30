import fetch from 'node-fetch';
import orderModel from '../../models/order.model';
import userModel from '../../models/user.model';
import env from '../../utils/env';

const baseUrl = 'https://api.logo.com/api/v2';

async function getToken() {
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

async function createUser(ref, email, token) {
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

async function getUser(id, token) {
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

async function issueCredit(email, id, token) {
    try {
        return await fetch(baseUrl + '/users/' + id, {
            method: 'POST',
            body: JSON.stringify({
                date_expires: (new Date().getMonth() + 1) % 12 + 1,
                redeemable_by: email,
                redeemable_for: 'basic-package'
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

async function ssoLink(id, token) {
    try {
        return fetch(baseUrl + '/users/' + id + '/sso', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

async function post(req, res) {
    if (!req.body.orderId) return res.json({
        message: 'invalid body',
        success: false,
        data: null
    });

    const token = await getToken();

    const user = await userModel.findUser({ _id: req.session.uid });
    user.logoCredits -= 1;
    await user.save();

    await createUser(req.session.uid, req.body.email, token.access_token);
    await issueCredit(req.body.email, req.session.uid, token.access_token);

    const link = await ssoLink(req.session.uid, token.access_token);
    console.log(link);
}

export default { post };