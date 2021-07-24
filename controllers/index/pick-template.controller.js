import templateModel from "../../models/template.model";
import { getPriceTemplate } from "../../utils/helpers";

function get(req, res) {
    if (!req.session.tag) {
        req.session.alert = { type: 'error', message: 'please pick a tag before you proceed' };
        return res.redirect('/pick-tag');
    }

    return res.render('index/pick-template', {
        title: 'Pick Template',
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
        title: template.title,
        service: template.service
    });

    return res.redirect('/pick-domain');
}

export default { get, post };

