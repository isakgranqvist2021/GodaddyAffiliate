import { serverImg } from "../../utils/helpers";
import fs from 'fs';
import path from 'path';

function get(req, res) {
    const raw = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/hosting.json'))));

    const plans = raw.map(plan => ({
        ...plan,
        images: [serverImg],
        currency: req.session.currency.code,
        price: plan.originalPrice * req.session.currency.value
    }));

    return res.render('index/pick-hosting', {
        title: 'Pick Hosting',
        plans: plans,
        user: req.user,
        currency: req.session.currency
    })
}

function post(req, res) {
    const raw = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/hosting.json'))));
    let chosen = raw.find(p => p._id === req.body.plan);

    let plan = {
        ...chosen,
        images: [serverImg],
        currency: req.session.currency.code,
        price: chosen.originalPrice * req.session.currency.value
    }

    if (plan !== null && plan !== undefined && !req.session.cart.some(item => item.type === 'hosting')) {
        req.session.cart.push(plan);
    }

    return res.redirect('/checkout');
}

export default { get, post };