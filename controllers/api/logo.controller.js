import fetch from 'node-fetch';
import orderModel from '../../models/order.model';
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

async function post(req, res) {
    if (!req.body.orderId) return res.json({
        message: 'invalid body',
        success: false,
        data: null
    });

    const token = await getToken();
    const order = await orderModel.findOrder({ _id: req.body.orderId });

    console.log(token);

    const response = await createUser(order._id, order.email, token.access_token);
    let user = response.statusCode === 409 ? await getUser(req.body.orderId, token.access_token) : response;

}

export default { post };