import templateModel from "../../models/template.model";
import { getPriceTemplate } from "../../utils/helpers";
import fs from 'fs';
import path from 'path';

function get(req, res) {
    let tags = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/tags.json'))));

    if (!req.session.tag) {
        req.session.alert = { type: 'error', message: 'please pick a tag before you proceed' };
        return res.redirect('/pick-tag');
    }

    return res.render('index/pick-template', {
        title: 'Pick Template',
        tags: tags.map(tag => ({ value: tag, selected: req.session.tag === tag })),
        user: req.user
    });
}

async function post(req, res) {
    let template = await templateModel.findTemplate({ _id: req.body.template });
    req.session.cart.push({
        _id: template._id,
        images: template.images,
        price: getPriceTemplate(template.price, req.session.currency),
        originalPrice: getPriceTemplate(template.price, req.session.currency),
        currency: req.session.currency.code,
        originalCurrency: 'EUR',
        linkTo: '/view-template/' + template._id,
        type: 'template',
        title: template.title,
        service: template.service
    });

    return res.redirect('/pick-domain');
}

export default { get, post };

