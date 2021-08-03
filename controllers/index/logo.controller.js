import { logoImg } from "../../utils/helpers";
import fs from 'fs';
import path from 'path';

function get(req, res) {
    const raw = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/logo-plans.json'))));

    const plans = raw.map(plan => ({
        ...plan,
        images: [logoImg],
        currency: req.session.currency.code,
        price: plan.originalPrice * req.session.currency.value
    }));

    const compare = [
        'Full Customization',
        'PNG/JPEG',
        'SVG Format'
    ].map((feature, i) => {
        return {
            label: feature,
            values: plans.map(p => p.includes[i])
        }
    });

    return res.render('index/build-a-logo', {
        title: 'Build A Logo',
        plans: plans,
        compare: compare,
        user: req.user,
        currency: req.session.currency
    });
}

function add(req, res) {
    const raw = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/logo-plans.json'))));

    let plan = raw.find(plan => plan._id === req.body.plan);
    console.log(plan);

    req.session.cart.push({
        images: [logoImg],
        currency: req.session.currency.code,
        price: plan.originalPrice * req.session.currency.value,
        ...plan
    });

    return res.redirect('/checkout');
}

export default { add, get };