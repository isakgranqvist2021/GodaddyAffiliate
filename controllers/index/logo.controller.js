import { logoImg } from "../../utils/helpers";

function add(req, res) {
    if (!req.session.cart.some(item => item.type === 'logo')) {
        req.session.cart.push({
            _id: 'logo',
            originalPrice: 40,
            title: 'standard logo plan',
            linkTo: '/checkout',
            originalCurrency: 'EUR',
            type: 'logo',
            service: 'logo',
            images: [logoImg],
            currency: req.session.currency.code,
            price: 40 * req.session.currency.value
        });
    }

    return res.redirect(req.headers.referer);
}

export default { add };